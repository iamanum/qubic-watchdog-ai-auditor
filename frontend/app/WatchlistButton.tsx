"use client"; // Client Component Boundary Fix

import { Plus } from 'lucide-react';

export default function WatchlistButton() {
    return (
        <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 flex items-center"
            onClick={() => alert("Monitor New Project Modal: Wallet Address input coming soon!")}
        >
            <Plus size={20} className="mr-2" /> 
            Monitor New Project
        </button>
    );
}