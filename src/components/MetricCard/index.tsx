import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import styles from './styles.module.css';

interface MetricCardProps {
  title: string;
  value: number;
  previousValue: number;
  format?: (value: number) => string;
  trend?: number;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  format = (v) => v.toLocaleString(),
  trend,
  icon,
}) => {
  const [gradientAngle, setGradientAngle] = useState(130);
  const change = ((value - previousValue) / previousValue) * 100;
  const isPositive = change >= 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI);
    setGradientAngle(angle);
  };

  return (
    <div
      className={styles.card}
      onMouseMove={handleMouseMove}
      style={{
        '--gradient-angle': `${gradientAngle}deg`,
      } as React.CSSProperties}
    >
      <div className={styles.title}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {title}
      </div>
      <div className={styles.value}>{format(value)}</div>
      <div
        className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}
      >
        {isPositive ? <TrendingUp className={styles.icon} /> : <TrendingDown className={styles.icon} />}
        {Math.abs(change).toFixed(1)}%
        {trend && <span className={styles.trend}>+{trend}% vs avg</span>}
      </div>
    </div>
  );
};

export default React.memo(MetricCard);