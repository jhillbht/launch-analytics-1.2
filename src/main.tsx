import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PeriodProvider } from './contexts/PeriodContext';
import { SourceProvider } from './contexts/SourceContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PeriodProvider>
      <SourceProvider>
        <App />
      </SourceProvider>
    </PeriodProvider>
  </StrictMode>
);