import { supabase } from "@/lib/supabaseClient";
import ChartSection from './ChartSection'; 
import WatchlistButton from './WatchlistButton'; // Client Component for interactive button
import { Search } from 'lucide-react'; // Icon for Search Bar

// Type definitions
interface Transaction {
  tx_hash: string;
  receiver_address: string;
  risk_score: number;
  ai_explanation: string;
  tx_intent_label: string;
}

interface Project {
  id: number;
  name: string;
}

// Next.js Server Component (RSC)
export default async function Dashboard() {
  
  // Data fetching
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*");

  const { data: transactions, error: transactionsError } = await supabase
    .from("transactions")
    .select("*")
    .limit(50); 

  // Error Handling
  if (projectsError || transactionsError) {
    console.error("Database Fetch Error:", projectsError || transactionsError);
    return <div className="text-red-500 p-8">Error loading data from Supabase. Check RLS Policy.</div>;
  }

  // Data Casting
  const projectList: Project[] = projects as Project[] || [];
  const transactionList: Transaction[] = transactions as Transaction[] || [];

  // Final Render Function 
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      
      {/* HEADER SECTION (Title and Watchlist Button) */}
      <header className="mb-8 border-b border-green-700 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-green-400">Qubic Watchdog Dashboard 👁️</h1>
          <p className="text-lg text-gray-400">Real-Time AI Treasury Auditor for Qubic Projects</p>
        </div>
        
        {/* Client Component Integration */}
        <WatchlistButton /> 
      </header>
      
      {/* SEARCH BAR (Hackathon UX) */}
      <div className="mb-8 flex items-center bg-gray-800 rounded-lg p-3 shadow-inner">
        <Search size={20} className="text-gray-400 mr-3" />
        <input 
            type="text" 
            placeholder="Search Project Name or Wallet Address..." 
            className="w-full bg-transparent text-white focus:outline-none"
        />
      </div>

      {/* ECOSYSTEM OVERVIEW & PROJECT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Big Trust Score Number (The main highlight) */}
          <div className="lg:col-span-1 bg-gray-700 p-6 rounded-xl shadow-xl border-t-4 border-green-500 flex flex-col items-center justify-center">
              <p className="text-sm font-medium text-gray-300">Total Projects Monitored:</p>
              <h2 className="text-6xl font-extrabold text-green-400">{projectList.length || 0}</h2> 
              <p className="text-md font-medium text-gray-300 mt-2">Overall Trust Score:</p>
              <p className="text-3xl font-extrabold text-green-500">85/100 ↑</p>
          </div>

          {/* Project Card (Rendered for demonstration) */}
          {projectList.map(project => (
              <div key={project.id} className="bg-gray-800 p-4 rounded-xl shadow-lg">
                  <h3 className="text-lg font-bold text-yellow-400">{project.name}</h3>
                  <p className="text-sm text-gray-400">Wallet ID: {project.id}</p>
                  <div className="mt-2 flex justify-between items-center">
                      <span className="text-lg font-semibold text-green-500">
                          87/100 🟢
                      </span>
                      <span className="text-xs bg-red-800 px-2 py-1 rounded-full text-white">
                          12% Rug Risk
                      </span>
                  </div>
              </div>
          ))}
      </div>

      {/* CHART INTEGRATION */}
      <div className="mb-8">
          <ChartSection transactions={transactionList} /> 
      </div>
      
      <h2 className="text-2xl font-semibold mb-4 text-white">Latest Audit Trail (Live Feed)</h2>
      
      {/* Transaction List */}
      <div className="space-y-4">
        {transactionList?.map((tx) => (
          <div 
            key={tx.tx_hash} 
            className={`p-4 rounded-lg shadow-md transition duration-300 ${tx.risk_score > 70 ? 'bg-red-900 border-red-600 animate-alert-flash' : 'bg-gray-800 border-green-700'} border-l-4`}
          >
            <p className="font-mono text-sm break-all text-gray-300">Tx Hash: {tx.tx_hash}</p>
            <p className="font-bold text-lg mt-1 text-yellow-200">Risk Score: {tx.risk_score} / 100</p>
            <p className="text-base font-medium">Intent: {tx.tx_intent_label}</p>
            <p className="text-sm italic text-gray-400">Alert: {tx.ai_explanation}</p>
          </div>
        ))}
        {transactionList?.length === 0 && <p className="text-lg text-gray-500">No transactions found yet. Run the cURL tests again!</p>}
      </div>

      {/* LEADERBOARD PLACEHOLDER */}
      <footer className="mt-12 pt-4 border-t border-gray-700 text-center text-gray-500">
          <p>
              ⚡ Leaderboard: Top 10 Safest Projects feature coming soon!
          </p>
      </footer>
    </div>
  );
}