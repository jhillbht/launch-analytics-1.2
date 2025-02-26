import { useState } from 'react';

interface LandingPage {
  url: string;
  revenue: number;
  cvr: number;
  keyEvents: number;
  bounce: number;
  sessions: number;
}

type SortField = keyof LandingPage;
type SortDirection = 'asc' | 'desc';

export function LandingPagesTable({ pages }: { pages: LandingPage[] }) {
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPages = [...pages].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * multiplier;
  });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="ml-1 inline-block text-slate-600">
      {field === sortField ? (
        sortDirection === 'asc' ? '↑' : '↓'
      ) : '↕'}
    </span>
  );

  return (
    <div className="bg-navy-800/50 rounded-xl border border-slate-700/30 p-6">
      <h2 className="text-2xl font-semibold text-white mb-8">Landing Pages Performance</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm tracking-wider text-slate-400 text-left border-b border-slate-700/30">
              <th className="pb-4 font-medium cursor-pointer hover:text-slate-300" onClick={() => handleSort('url')}>
                PAGE URL <SortIcon field="url" />
              </th>
              <th className="pb-4 font-medium cursor-pointer hover:text-slate-300" onClick={() => handleSort('revenue')}>
                REVENUE <SortIcon field="revenue" />
              </th>
              <th className="pb-4 font-medium cursor-pointer hover:text-slate-300" onClick={() => handleSort('cvr')}>
                CVR <SortIcon field="cvr" />
              </th>
              <th className="pb-4 font-medium cursor-pointer hover:text-slate-300" onClick={() => handleSort('keyEvents')}>
                KEY EVENTS <SortIcon field="keyEvents" />
              </th>
              <th className="pb-4 font-medium cursor-pointer hover:text-slate-300" onClick={() => handleSort('bounce')}>
                BOUNCE <SortIcon field="bounce" />
              </th>
              <th className="pb-4 font-medium cursor-pointer hover:text-slate-300" onClick={() => handleSort('sessions')}>
                SESSIONS <SortIcon field="sessions" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPages.map((page, index) => (
              <tr 
                key={index} 
                className="border-b border-slate-700/30 hover:bg-navy-800/70 transition-colors duration-150"
              >
                <td className="py-4">
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                    {page.url}
                  </span>
                </td>
                <td className="py-4">
                  <span className="text-emerald-500">
                    {page.revenue > 0 ? `$${page.revenue.toLocaleString()}` : '-'}
                  </span>
                </td>
                <td className="py-4">
                  <span className="text-slate-300">
                    {page.cvr}%
                  </span>
                </td>
                <td className="py-4">
                  <span className="text-slate-300">
                    {page.keyEvents.toLocaleString()}
                  </span>
                </td>
                <td className="py-4">
                  <span className="text-slate-300">
                    {page.bounce}%
                  </span>
                </td>
                <td className="py-4">
                  <span className="text-slate-300">
                    {page.sessions.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}