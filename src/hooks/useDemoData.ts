import { useState, useCallback } from 'react';

interface DemoMetric {
  value: number;
  change: number;
}

interface DemoData {
  conversionRate: DemoMetric;
  revenue: DemoMetric;
  sessions: DemoMetric;
  engagement: DemoMetric;
  bounceRate: DemoMetric;
  avgOrder: DemoMetric;
}

const generateRandomChange = () => {
  const isPositive = Math.random() > 0.5;
  return Number((Math.random() * 15 * (isPositive ? 1 : -1)).toFixed(1));
};

const generateRandomMetric = (min: number, max: number, decimals = 1): DemoMetric => {
  return {
    value: Number((Math.random() * (max - min) + min).toFixed(decimals)),
    change: generateRandomChange(),
  };
};

export const useDemoData = () => {
  const [data, setData] = useState<DemoData>({
    conversionRate: { value: 3.8, change: -9.9 },
    revenue: { value: 23848, change: -14.1 },
    sessions: { value: 55681, change: 8.9 },
    engagement: { value: 30.3, change: 3.4 },
    bounceRate: { value: 31.7, change: -1.3 },
    avgOrder: { value: 148, change: 8.3 },
  });

  const refreshData = useCallback(() => {
    setData({
      conversionRate: generateRandomMetric(2, 5, 1),
      revenue: generateRandomMetric(15000, 35000, 0),
      sessions: generateRandomMetric(40000, 70000, 0),
      engagement: generateRandomMetric(25, 35, 1),
      bounceRate: generateRandomMetric(25, 35, 1),
      avgOrder: generateRandomMetric(100, 200, 0),
    });
  }, []);

  const generateTimeSeriesData = useCallback((hours: number) => {
    const currentPeriod = Array.from({ length: hours }, (_, i) => ({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 800) + 400,
    }));

    const previousPeriod = currentPeriod.map(point => ({
      time: point.time,
      value: Math.floor(Math.random() * 800) + 400,
    }));

    return { currentPeriod, previousPeriod };
  }, []);

  return {
    data,
    refreshData,
    generateTimeSeriesData,
  };
};