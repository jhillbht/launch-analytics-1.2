import React from 'react';

interface LandingPage {
  url: string;
  revenue: number;
  views: number;
  entries: number;
  bounce: number;
  cvr: number;
}

interface LandingPageTableProps {
  data: LandingPage[];
}

export default function LandingPageTable({ data }: LandingPageTableProps) {
  return (
    <div className="metric-card">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Landing Pages Performance</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-[var(--card-border)]">
              <th className="pb-3 text-sm font-medium text-[var(--color-text-secondary)]">PAGE URL</th>
              <th className="pb-3 text-sm font-medium text-[var(--color-text-secondary)]">REVENUE</th>
              <th className="pb-3 text-sm font-medium text-[var(--color-text-secondary)]">VIEWS</th>
              <th className="pb-3 text-sm font-medium text-[var(--color-text-secondary)]">ENTRIES</th>
              <th className="pb-3 text-sm font-medium text-[var(--color-text-secondary)]">BOUNCE</th>
              <th className="pb-3 text-sm font-medium text-[var(--color-text-secondary)]">CVR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((page, index) => (
              <tr
                key={index}
                className="border-b border-[var(--card-border)] last:border-0"
              >
                <td className="py-4 text-sm">{page.url}</td>
                <td className="py-4 text-sm">
                  ${page.revenue.toLocaleString()}
                </td>
                <td className="py-4 text-sm">{page.views.toLocaleString()}</td>
                <td className="py-4 text-sm">{page.entries.toLocaleString()}</td>
                <td className="py-4 text-sm">{page.bounce}%</td>
                <td className="py-4 text-sm">{page.cvr}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}