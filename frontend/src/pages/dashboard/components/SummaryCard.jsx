import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-subtle hover-lift smooth-transition">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.primary}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div
            className={`flex items-center space-x-1 text-sm ${
              trend === 'up'
                ? 'text-success'
                : trend === 'down'
                ? 'text-error'
                : 'text-muted-foreground'
            }`}
          >
            <Icon
              name={
                trend === 'up'
                  ? 'TrendingUp'
                  : trend === 'down'
                  ? 'TrendingDown'
                  : 'Minus'
              }
              size={16}
            />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-foreground mb-1">{value}</h3>
        <p className="text-muted-foreground text-sm">{title}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
