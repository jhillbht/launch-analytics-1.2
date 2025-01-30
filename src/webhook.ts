import express from 'express';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Middleware to parse JSON bodies
app.use(express.json());

// Helper function to analyze build logs
const analyzeBuildError = (logs: string) => {
  if (logs.includes('@layer base') && !logs.includes('@tailwind base')) {
    return {
      type: 'tailwind-config',
      confidence: 0.9,
      fixes: [{
        file: 'src/index.css',
        content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@import './styles/theme.css';`
      }]
    };
  }
  // Add more error patterns here
  return null;
};

// Helper function to create branch and PR
async function createFixPR(error: any, fixes: any[]) {
  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const branchName = `fix/${error.type}-${Date.now()}`;

  // Get the SHA of the latest commit on main
  const { data: ref } = await octokit.git.getRef({
    owner,
    repo,
    ref: 'heads/main'
  });

  // Create new branch
  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha: ref.object.sha
  });

  // Apply fixes
  for (const fix of fixes) {
    try {
      // Get current file content if it exists
      const { data: currentFile } = await octokit.repos.getContent({
        owner,
        repo,
        path: fix.file,
        ref: branchName
      });

      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: fix.file,
        message: `fix: automated fix for ${error.type}`,
        content: Buffer.from(fix.content).toString('base64'),
        branch: branchName,
        ...(currentFile && { sha: (currentFile as any).sha })
      });
    } catch (error) {
      // File doesn't exist yet, create it
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: fix.file,
        message: `fix: automated fix for ${error.type}`,
        content: Buffer.from(fix.content).toString('base64'),
        branch: branchName
      });
    }
  }

  // Create Pull Request
  const { data: pr } = await octokit.pulls.create({
    owner,
    repo,
    title: `fix: automated fix for ${error.type}`,
    head: branchName,
    base: 'main',
    body: 'Automated fix for deployment error'
  });

  return pr;
}

app.post('/webhooks/deployment', async (req, res) => {
  try {
    const { deployment_status, logs } = req.body;
    
    if (deployment_status === 'failed') {
      // Analyze the error
      const errorAnalysis = analyzeBuildError(logs);
      
      if (errorAnalysis && errorAnalysis.confidence > 0.8) {
        // Create fix PR
        const pr = await createFixPR(errorAnalysis, errorAnalysis.fixes);
        
        // Auto-merge if confidence is very high
        if (errorAnalysis.confidence > 0.9) {
          await octokit.pulls.merge({
            owner: process.env.GITHUB_OWNER!,
            repo: process.env.GITHUB_REPO!,
            pull_number: pr.number
          });
        }
        
        return res.json({
          status: 'success',
          message: 'Created fix PR',
          pr: pr.number
        });
      }
    }
    
    res.json({ status: 'no_action_needed' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Webhook handler listening on port ${port}`);
});