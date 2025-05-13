import React from 'react';

type StatCardProps = {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
};

export default function StatCard({ 
  title, 
  value, 
  change, 
  icon, 
  color = 'blue' 
}: StatCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      text: 'text-blue-600',
    },
    green: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      text: 'text-green-600',
    },
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
      text: 'text-purple-600',
    },
    yellow: {
      bg: 'bg-yellow-50',
      iconBg: 'bg-yellow-100',
      iconText: 'text-yellow-600',
      text: 'text-yellow-600',
    },
    red: {
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      iconText: 'text-red-600',
      text: 'text-red-600',
    },
  };

  const classes = colorClasses[color];

  return (
    <div className="relative p-6 overflow-hidden bg-white rounded-lg shadow-sm">
      <div className={`absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full opacity-10 ${classes.bg}`} />
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${classes.iconBg}`}>
          <div className={classes.iconText}>{icon}</div>
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <p 
                className={`ml-2 text-sm font-medium ${
                  change.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change.isPositive ? '+' : ''}{change.value}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 