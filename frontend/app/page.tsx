import { supabase } from "@/lib/supabaseClient";
import ChartSection from './ChartSection'; 
import WatchlistButton from './WatchlistButton'; // Aap isko MonitorModal se replace kar sakte hain agar modal banaya
import Link from 'next/link';
import { Search } from 'lucide-react'; 

// --- DUMMY DATA ---

// ✅ Live Feed Data (Audit Trail)
const DUMMY_FEED = [
  { time: '2 min ago', alert: 'Green Alert', text: 'Project Alpha ne Lunar Strategy ko 30k QUBIC marketing ke liye bheja', color: 'text-green-400', animation: 'animate-alert-flash' },
  { time: '15 min ago', alert: 'Red Alert', text: 'Project Beta ne 80k QUBIC Binance hot wallet pe transfer kiya – Selling pressure possible!', color: 'text-red-500', animation: '' },
  { time: '1 hour ago', alert: 'Yellow Alert', text: 'Internal team wallet transfer detected', color: 'text-yellow-400', animation: '' },
  { time: '3 hours ago', alert: 'Green Alert', text: 'Audit Trail data update successful', color: 'text-green-400', animation: '' },
  { time: '4 hours ago', alert: 'Yellow Alert', text: 'Large contract deployment detected', color: 'text-yellow-400', animation: '' },
];

// --- MAIN SERVER COMPONENT ---

export default async function Dashboard() {
  
  // Data fetching logic (Server Component)
  // Hum dummy data use kar rahe hain agar fetching fail ho.
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .limit(50);

  // Note: Hum abhi transactions data ko seedhe ChartSection mein pass nahi kar rahe hain 
  // kyunki hum ChartSection mein dummy data use kar rahe hain.
  
  if (projectsError) {
    console.error("Supabase Projects Fetch Error:", projectsError.message);
    // Real-time mein, yahan user ko error dikhana chahiye.
  }

  // Dummy Project Card Data for consistent UI
  const projectData = projects && projects.length > 0 ? projects[0] : { 
    id: 1, 
    name: "Project Alpha Launch", 
    treasury_address: "0xABC...DEF",
    trust_score: 87,
    rug_risk: 12,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      <header className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
        <h1 className="text-3xl font-extrabold text-blue-400">Qubic Watchdog Dashboard</h1>
        {/* WatchlistButton/MonitorNewProject yahan aayega */}
        <WatchlistButton /> 
      </header>

      {/* SEARCH BAR & SUMMARY */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex items-center w-full md:w-1/3 bg-gray-800 rounded-lg p-3 shadow-inner">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search Project Name or Wallet Address..."
            className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="text-right mt-4 md:mt-0">
          <p className="text-lg text-gray-300">Total Projects Monitored:</p>
          <p className="text-3xl font-bold text-green-400">
            {projects?.length || 1}
          </p>
        </div>
      </div>
      
      {/* BIG NUMBER / PROJECT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Overall Trust Score Card (Fixed) */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-xl border-l-4 border-green-500">
          <p className="text-gray-300">Overall Trust Score</p>
          <p className="text-4xl font-extrabold text-green-500 mt-2">85/100 ↑</p>
        </div>

        {/* Project Card (Link to Detail Page) */}
        <Link href={`/project/${projectData.id}`} passHref className="col-span-1">
          <div className="p-4 bg-gray-800 rounded-lg shadow-xl cursor-pointer hover:bg-gray-700 transition duration-200 border border-yellow-500">
            <h3 className="text-xl font-bold text-yellow-400">{projectData.name}</h3>
            <p className="text-sm text-gray-400 mt-1">Wallet ID: {projectData.id}</p>
            <div className="mt-3 flex justify-between items-center">
                <span className="text-3xl font-bold text-green-400">{projectData.trust_score}/100</span>
                <span className="text-sm text-red-500 bg-red-900/50 px-2 py-1 rounded">
                    {projectData.rug_risk}% Rug Risk
                </span>
            </div>
          </div>
        </Link>
        
        {/* Dummy Card 3 */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-xl">
            <p className="text-gray-300">Alerts in Last 24H</p>
            <p className="text-4xl font-extrabold text-red-500 mt-2">3 RED</p>
        </div>

        {/* Dummy Card 4 */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-xl">
            <p className="text-gray-300">Transactions Audited</p>
            <p className="text-4xl font-extrabold text-blue-400 mt-2">1,245</p>
        </div>
      </div>

      {/* CHART INTEGRATION */}
      {/* We pass an empty array, as ChartSection uses its internal dummy data now */}
      <ChartSection transactions={[]} /> 
      
      {/* AUDIT TRAIL LIST (Live Feed) */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-4">Latest Audit Trail (Live Feed)</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {DUMMY_FEED.map((item, index) => (
            <div key={index} className={`flex items-start p-3 bg-gray-800 rounded-lg shadow-md border-l-4 ${item.color.replace('text', 'border')}`}>
              <span className={`${item.color} font-bold mr-3 shrink-0 text-sm`}>[{item.alert}]</span>
              <div>
                <p className={`text-white text-sm ${item.alert === 'Red Alert' ? 'font-semibold' : ''}`}>{item.text}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LEADERBOARD FOOTER */}
      <footer className="mt-10 pt-4 border-t border-gray-700 text-center text-gray-500">
        <p>Leaderboard: Top 10 Safest Projects feature coming soon.</p>
        {/* Bonus: GitHub + Twitter + Telegram links yahan add kar sakte hain */}
      </footer>
    </div>
  );
}