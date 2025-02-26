import { Period } from '../contexts/PeriodContext';
import { Source } from '../contexts/SourceContext';

// Seed for consistent random numbers based on period and source
export function seededRandom(seed: string) {
  const hash = Array.from(seed).reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
  }, 0);
  
  let value = Math.abs(hash);
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function generateMetrics(period: Period, source: Source) {
  const random = seededRandom(`${period}-${source}`);
  
  const baseMultiplier = source === 'retargeting' ? 1.5 : 
    source === 'email' ? 1.3 : 
    source === 'paid-social' ? 0.9 : 1;

  const periodMultiplier = period === 'today' ? 1 :
    period === 'yesterday' ? 0.95 :
    period === '7days' ? 0.85 :
    0.75;

  const cvr = (2 + random() * 2) * baseMultiplier * periodMultiplier;
  const revenue = Math.floor((30000 + random() * 30000) * baseMultiplier * periodMultiplier);
  const sessions = Math.floor((50000 + random() * 30000) * baseMultiplier * periodMultiplier);
  const engagement = (35 + random() * 15) * baseMultiplier * periodMultiplier;
  const bounce = (15 + random() * 10) * (1 / baseMultiplier) * (1 / periodMultiplier);
  const avgOrder = Math.floor((100 + random() * 100) * baseMultiplier * periodMultiplier);

  // Generate change percentages
  const getChange = () => (random() * 20 - 10).toFixed(1);

  return {
    metrics: [
      {
        title: "Conversion Rate",
        value: `${cvr.toFixed(1)}%`,
        change: { value: `${getChange()}%`, isPositive: random() > 0.5 },
        subtitle: "vs Previous Period"
      },
      {
        title: "Revenue",
        value: `$${revenue.toLocaleString()}`,
        change: { value: `${getChange()}%`, isPositive: random() > 0.5 },
        subtitle: "vs Previous Period"
      },
      {
        title: "Sessions",
        value: sessions.toLocaleString(),
        change: { value: `${getChange()}%`, isPositive: random() > 0.5 },
        subtitle: "vs Previous Period"
      },
      {
        title: "Engagement",
        value: `${engagement.toFixed(1)}%`,
        change: { value: `${getChange()}%`, isPositive: random() > 0.5 },
        subtitle: "vs Previous Period"
      },
      {
        title: "Bounce Rate",
        value: `${bounce.toFixed(1)}%`,
        change: { value: `${getChange()}%`, isPositive: random() > 0.5 },
        subtitle: "vs Previous Period"
      },
      {
        title: "Avg Order",
        value: `$${avgOrder}`,
        change: { value: `${getChange()}%`, isPositive: random() > 0.5 },
        subtitle: "vs Previous Period"
      }
    ],
    timeSeriesData: Array.from({ length: 24 }, (_, i) => {
      const hourRandom = seededRandom(`${period}-${source}-${i}`);
      return {
        time: `${i}:00`,
        current: Math.floor((300 + hourRandom() * 700) * baseMultiplier * periodMultiplier),
        previous: Math.floor((300 + hourRandom() * 700) * baseMultiplier * periodMultiplier * 0.9)
      };
    }),
    landingPages: [
      '/checkout/success',
      '/products',
      '/product/details',
      '/cart',
      '/category/electronics',
      '/category/clothing'
    ].map(url => {
      const pageRandom = seededRandom(`${period}-${source}-${url}`);
      return {
        url,
        revenue: Math.floor(pageRandom() * revenue),
        cvr: +(pageRandom() * cvr).toFixed(1),
        keyEvents: Math.floor(pageRandom() * 300000),
        bounce: +(pageRandom() * bounce).toFixed(1),
        sessions: Math.floor(pageRandom() * sessions)
      };
    })
  };
}