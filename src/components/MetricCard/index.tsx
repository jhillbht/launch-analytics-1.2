import React from 'react';
import styles from './styles.module.css';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  timeframe: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  timeframe,
}) => {
  // Calculate the gradient angle based on hover position
  const [gradientAngle, setGradientAngle] = React.useState(45);

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
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.value}>{value.toLocaleString()}</div>
      <div className={`${styles.change} ${change >= 0 ? styles.positive : styles.negative}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
      </div>
      <div className={styles.timeframe}>{timeframe}</div>
    </div>
  );
};

export default React.memo(MetricCard);