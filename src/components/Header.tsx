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
    <header className="bg-navy-950 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Rocket className="text-purple-400 h-6 w-6" />
          <h1 className="text-purple-400 text-xl font-semibold">Launch Analytics</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="text-gray-400 mr-2">Period:</span>
            <button 
              className="bg-navy-900 text-white px-3 py-1 rounded flex items-center hover:bg-navy-900/80 transition-colors duration-200"
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
              <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-navy-900 ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {periods.map((p) => (
                    <button
                      key={p.value}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        period === p.value 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'text-gray-300 hover:bg-navy-950 hover:text-white'
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
            <span className="text-gray-400 mr-2">Source:</span>
            <button 
              className="bg-navy-900 text-white px-3 py-1 rounded flex items-center hover:bg-navy-900/80 transition-colors duration-200"
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
              <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-navy-900 ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {sources.map((s) => (
                    <button
                      key={s.value}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        source === s.value 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'text-gray-300 hover:bg-navy-950 hover:text-white'
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

          <button 
            className={`bg-purple-500 text-white px-4 py-1 rounded flex items-center transition-all duration-200 ${
              isRefreshing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-purple-600'
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
    </header>
  );
}