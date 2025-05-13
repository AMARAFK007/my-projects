'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type SalesChartProps = {
  data: {
    period: string;
    sales: number;
  }[];
};

export default function SalesChart({ data }: SalesChartProps) {
  const chartData: ChartData<'line'> = {
    labels: data.map(item => item.period),
    datasets: [
      {
        label: 'Sales',
        data: data.map(item => item.sales),
        borderColor: 'rgb(2, 132, 199)',
        backgroundColor: 'rgba(2, 132, 199, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-900">Sales Overview</h3>
      <div className="h-80">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
} 