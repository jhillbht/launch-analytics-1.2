import { useEffect } from 'react';
import { usePeriod } from '../contexts/PeriodContext';
import { useSource } from '../contexts/SourceContext';

export function useDataRefresh(onRefresh: () => void) {
  const { period } = usePeriod();
  const { source } = useSource();

  // Refresh data when period or source changes
  useEffect(() => {
    onRefresh();
  }, [period, source, onRefresh]);

  // Set up auto-refresh interval for real-time data
  useEffect(() => {
    if (period === 'today') {
      const interval = setInterval(onRefresh, 30000); // Refresh every 30 seconds for real-time
      return () => clearInterval(interval);
    }
  }, [period, onRefresh]);
}