import { Rocket } from 'lucide-react';
import { useState } from 'react';
import { usePeriod } from '../contexts/PeriodContext';
import { useSource } from '../contexts/SourceContext';

interface HeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function Header({ onRefresh, isRefreshing }: HeaderProps) {
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const { period, setPeriod } = usePeriod();
  const { source, setSource } = useSource();

  const periods = [
    { label: 'Today (real-time)', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: '7 days', value: '7days' },
    { label: '30 days', value: '30days' }
  ];

  const sources = [
    { label: 'All Traffic', value: 'all' },
    { label: 'Retargeting', value: 'retargeting' },
    { label: 'Email', value: 'email' },
    { label: 'Paid Social', value: 'paid-social' },
    { label: 'Organic Social', value: 'organic-social' },
    { label: 'Paid Search', value: 'paid-search' },
    { label: 'Organic Search', value: 'organic-search' }
  ];

  const handlePeriodChange = (value: string) => {
    setPeriod(value as 'today' | 'yesterday' | '7days' | '30days');
    setIsPeriodDropdownOpen(false);
  };

  const handleSourceChange = (value: string) => {
    setSource(value as 'all' | 'retargeting' | 'email' | 'paid-social' | 'organic-social' | 'paid-search' | 'organic-search');
    setIsSourceDropdownOpen(false);
  };

  return (
    <header className="bg-navy-900 border-b border-slate-700/30 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-60 group-hover:opacity-80 transition duration-1000"></div>
            <Rocket className="relative text-blue-500 h-6 w-6" />
          </div>
          <h1 className="text-white text-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Launch Analytics
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="text-slate-400 mr-2">Period:</span>
            <button 
              className="bg-navy-800/50 text-white px-4 py-2 rounded-lg border border-slate-700/30 flex items-center hover:bg-navy-800/70 transition-colors duration-200"
              onClick={() => {
                setIsPeriodDropdownOpen(!isPeriodDropdownOpen);
                setIsSourceDropdownOpen(false);
              }}
            >
              {periods.find(p => p.value === period)?.label}
              <svg 
                className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${isPeriodDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isPeriodDropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 rounded-lg shadow-lg bg-navy-800 border border-slate-700/30">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {periods.map((p) => (
                    <button
                      key={p.value}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        period === p.value 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                      } transition-colors duration-150`}
                      role="menuitem"
                      onClick={() => handlePeriodChange(p.value)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <span className="text-slate-400 mr-2">Source:</span>
            <button 
              className="bg-navy-800/50 text-white px-4 py-2 rounded-lg border border-slate-700/30 flex items-center hover:bg-navy-800/70 transition-colors duration-200"
              onClick={() => {
                setIsSourceDropdownOpen(!isSourceDropdownOpen);
                setIsPeriodDropdownOpen(false);
              }}
            >
              {sources.find(s => s.value === source)?.label}
              <svg 
                className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${isSourceDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isSourceDropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 rounded-lg shadow-lg bg-navy-800 border border-slate-700/30">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {sources.map((s) => (
                    <button
                      key={s.value}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        source === s.value 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'text-slate-300 hover:bg-navy-900 hover:text-white'
                      } transition-colors duration-150`}
                      role="menuitem"
                      onClick={() => handleSourceChange(s.value)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-60 group-hover:opacity-80 transition duration-1000"></div>
            <button 
              className={`relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${
                isRefreshing ? 'opacity-75 cursor-not-allowed' : 'hover:from-blue-600 hover:to-indigo-600'
              }`}
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              <svg 
                className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}