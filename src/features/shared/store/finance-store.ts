import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TxType = "income" | "expense";
export type TxCategory = "salary" | "food" | "transport" | "shopping" | "bills" | "other";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TxType;
  category: TxCategory;
  date: string;
}

interface FinanceState {
  transactions: Transaction[];
  add: (tx: Omit<Transaction, "id">) => void;
  remove: (id: string) => void;
  seed: () => void;
}

const seedData = (): Transaction[] => {
  const now = new Date();
  const iso = (d: number) => new Date(now.getFullYear(), now.getMonth(), d).toISOString();
  return [
    { id: "1", title: "Gaji Bulanan", amount: 8500000, type: "income", category: "salary", date: iso(1) },
    { id: "2", title: "Freelance Project", amount: 3200000, type: "income", category: "salary", date: iso(5) },
    { id: "3", title: "Belanja Bulanan", amount: 1250000, type: "expense", category: "shopping", date: iso(6) },
    { id: "4", title: "Bensin Motor", amount: 150000, type: "expense", category: "transport", date: iso(8) },
    { id: "5", title: "Makan Siang", amount: 45000, type: "expense", category: "food", date: iso(10) },
    { id: "6", title: "Listrik & Internet", amount: 480000, type: "expense", category: "bills", date: iso(12) },
    { id: "7", title: "Kopi & Cafe", amount: 78000, type: "expense", category: "food", date: iso(14) },
  ];
};

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      add: (tx) =>
        set({ transactions: [{ ...tx, id: crypto.randomUUID() }, ...get().transactions] }),
      remove: (id) =>
        set({ transactions: get().transactions.filter((t) => t.id !== id) }),
      seed: () => {
        if (get().transactions.length === 0) set({ transactions: seedData() });
      },
    }),
    {
      name: "kantong-finance",
      skipHydration: true, // manual rehydrate di client, avoid SSR mismatch
    }
  )
);
