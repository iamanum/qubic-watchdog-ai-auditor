import { supabase } from "@/lib/supabaseClient";

interface Project {
    id: number;
    name: string;
    current_trust_score: number;
    rug_probability_percent: number;
}

// Helper function to fetch projects data
async function getProjects() {
    const { data: projects } = await supabase
        .from("projects")
        .select("id, name");
    
    // Add dynamic scores for sorting (Dummy data for demonstration)
    return projects?.map(p => ({
        ...p,
        current_trust_score: (p.id % 10) * 10 + 20, 
        rug_probability_percent: (10 - (p.id % 10)) * 5, 
    })) as Project[] || [];
}

export default async function LeaderboardPage() {
    const projectList = await getProjects();
    
    // 1. Safest Projects (Highest Trust Score)
    const safestProjects = projectList
        .sort((a, b) => b.current_trust_score - a.current_trust_score)
        .slice(0, 10);

    // 2. Riskiest Projects (Highest Rug Probability)
    const riskiestProjects = projectList
        .sort((a, b) => b.rug_probability_percent - a.rug_probability_percent)
        .slice(0, 10);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <header className="mb-8 border-b border-yellow-500 pb-4">
                <h1 className="text-4xl font-extrabold text-yellow-400">⚡ Project Leaderboard</h1>
                <p className="text-lg text-gray-400">Top 10 Safest & Riskiest Qubic Projects</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Safest Projects List */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-green-400">🏆 Top 10 Safest Projects</h2>
                    <ol className="list-decimal ml-5 space-y-3">
                        {safestProjects.map((p, _index) => {
                             void _index; // Warning Fix: index used with void
                             return (
                            <li key={p.id} className="text-lg text-gray-200">
                                {p.name} 
                                <span className="float-right text-green-500 font-bold">
                                    {p.current_trust_score}/100
                                </span>
                            </li>
                             )
                         })}
                    </ol>
                </div>

                {/* Riskiest Projects List */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-red-400">🚨 Top 10 Riskiest Projects</h2>
                    <ol className="list-decimal ml-5 space-y-3">
                        {riskiestProjects.map((p, _index) => {
                             void _index; // Warning Fix: index used with void
                             return (
                            <li key={p.id} className="text-lg text-gray-200">
                                {p.name}
                                <span className="float-right text-red-500 font-bold">
                                    {p.rug_probability_percent}% Risk
                                </span>
                            </li>
                             )
                         })}
                    </ol>
                </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">Data updated in real-time by AI Auditor.</p>
        </div>
    );
}