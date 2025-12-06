// frontend/types/custom.ts

// Assuming aapki transactions ek array of objects hongi.
// Aap future mein isko sahi Supabase schema se update kar sakte hain.
export interface Transaction {
    tx_hash: string;
    project_id: number;
    risk_score: number;
    ai_explanation: string;
    timestamp: string;
}

// ChartSection component ke liye zaroori props
export interface ChartProps {
    transactions: Transaction[];
    // Aap yahan koi aur props bhi add kar sakte hain, jaise projectId, etc.
}