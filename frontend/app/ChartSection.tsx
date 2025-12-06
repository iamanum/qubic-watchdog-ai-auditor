"use client";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { ChartProps } from '@/types/custom'; // Assuming aapke paas ChartProps defined hai

// ✅ Chart.js ki zaroori components ko register karein
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title
);

// --- Dummy Data Definitions ---

// ✅ 1. Treasury Spend Breakdown (Pie Chart Data)
const PIE_CHART_DATA = {
  labels: ['Exchanges (12%)', 'Marketing (48%)', 'Team/Dev (25%)', 'Others (15%)'],
  datasets: [
    {
      data: [12, 48, 25, 15],
      // Red, Green, Yellow, Blue colors (Tailwind color palette se matching)
      backgroundColor: ['#ef4444', '#22c55e', '#facc15', '#3b82f6'], 
      hoverBackgroundColor: ['#b91c1c', '#15803d', '#a16207', '#1e40af'],
      borderWidth: 1,
    },
  ],
};

const PIE_OPTIONS = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
            labels: {
                color: 'white', // Legend text color
            }
        },
        tooltip: {
            // ... custom tooltip settings
        }
    }
};

// ✅ 2. Risk Score Trend (Line Chart Data)
const LINE_CHART_DATA = {
    labels: ['Tx-10', 'Tx-9', 'Tx-8', 'Tx-7', 'Tx-6', 'Tx-5', 'Tx-4', 'Tx-3', 'Tx-2', 'Tx-1'], // Last 10 transactions
    datasets: [
        {
            label: 'Transaction Risk Score',
            data: [95, 80, 85, 90, 75, 95, 100, 90, 80, 85], // Dummy risk scores
            borderColor: '#3b82f6', // Blue color
            backgroundColor: 'rgba(59, 130, 246, 0.5)', 
            tension: 0.4,
            pointBorderColor: '#3b82f6',
            pointBackgroundColor: '#fff',
        },
    ],
};

const LINE_OPTIONS = {
    responsive: true,
    scales: {
        y: {
            min: 70, // Y-axis start from 70
            max: 100, // Y-axis max is 100
            ticks: { color: '#a1a1aa' }, // Axis labels color
            grid: { color: 'rgba(255, 255, 255, 0.1)' } // Grid line color
        },
        x: {
            ticks: { color: '#a1a1aa' }, // Axis labels color
            grid: { color: 'rgba(255, 255, 255, 0.1)' } // Grid line color
        }
    },
    plugins: {
        legend: {
            labels: { color: 'white' },
        },
        title: {
            display: false,
        }
    }
};


// --- Component Rendering ---

export default function ChartSection({ transactions }: ChartProps) {
  // transactions prop abhi use nahi ho raha, lekin future mein real data ke liye use hoga.

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* 1. Treasury Spend Breakdown (Pie Chart) */}
      <div className="p-4 bg-gray-800 rounded-lg shadow-xl border border-gray-700 h-96 flex flex-col justify-center items-center">
        <h3 className="text-xl font-semibold text-white mb-4">Treasury Spend Breakdown</h3>
        <div className="w-full max-w-sm h-64">
            <Pie data={PIE_CHART_DATA} options={PIE_OPTIONS} /> 
        </div>
      </div>
      
      {/* 2. Risk Score Trend (Line Chart) */}
      <div className="p-4 bg-gray-800 rounded-lg shadow-xl border border-gray-700 h-96">
        <h3 className="text-xl font-semibold text-white mb-4">Risk Score Trend (Last 50 Tx)</h3>
        <Line data={LINE_CHART_DATA} options={LINE_OPTIONS} />
      </div>
      
    </div>
  );
}