"use client";

import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

// Chart.js elements register karna
ChartJS.register(
    ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title
);

// Types definitions
interface ChartProps {
    transactions: { tx_hash: string; tx_intent_label: string; risk_score: number; }[];
}

export default function ChartSection({ transactions }: ChartProps) {
    // 1. Pie Chart Data (Treasury Spend Breakdown)
    const pieData = useMemo(() => {
        const counts: { [key: string]: number } = {};
        transactions.forEach(tx => {
            const label = tx.tx_intent_label || "UNKNOWN";
            counts[label] = (counts[label] || 0) + 1;
        });

        const labels = Object.keys(counts);
        const data = Object.values(counts);

        return {
            labels,
            datasets: [{ data, backgroundColor: ['#4ade80', '#f87171', '#fbbf24', '#a78bfa'] }],
        };
    }, [transactions]);

    // 2. Line Chart Data (Risk Score Trend)
    const lineData = useMemo(() => {
        const riskScores = transactions.map(tx => tx.risk_score);
        const labels = transactions.map((_, index) => `Tx #${transactions.length - index}`);

        return {
            labels,
            datasets: [{ label: 'Transaction Risk Score', data: riskScores.reverse(), fill: false, borderColor: '#38bdf8', tension: 0.2 }],
        };
    }, [transactions]);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg h-96">
                <h3 className="text-xl font-semibold mb-4 text-green-400">Treasury Spend Breakdown</h3>
                <div className="h-64 flex justify-center"><Pie data={pieData} options={{ maintainAspectRatio: false }} /></div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg h-96">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Risk Score Trend (Last 50 Tx)</h3>
                <div className="h-64">
                     <Line data={lineData} options={{ responsive: true, scales: { y: { min: 0, max: 100 } } }} />
                </div>
            </div>
        </div>
    );
}