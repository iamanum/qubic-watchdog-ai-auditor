// frontend/app/project/[id]/page.tsx

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const projectId = params.id;

  return (
    <div className="container mx-auto p-6">
      <Link href="/" className="flex items-center text-blue-400 hover:text-blue-300 mb-6">
        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
      </Link>
      
      <h1 className="text-3xl font-bold text-white mb-4">
        Project Alpha Launch - Detail Audit ({projectId})
      </h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <p className="text-gray-300">
          Trust Score History Line Graph (Coming Soon)
        </p>
        <p className="text-gray-300">
          Full Treasury Breakdown (Coming Soon)
        </p>
        <p className="text-gray-300">
          Last 20 Transactions List (Coming Soon)
        </p>
      </div>
    </div>
  );
}