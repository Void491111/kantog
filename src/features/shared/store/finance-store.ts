import { create } from "zustand";
import { transactionsApi, type ApiTransaction } from "@/lib/api";

// Tipe TxType di FE match enum backend: UPPERCASE.
export type TxType = "INCOME" | "EXPENSE";
export type TxCategory =
  | "salary"
  | "food"
  | "transport"
  | "shopping"
  | "bills"
  | "other"
  | (string & {});

// Type internal FE mirror dari ApiTransaction backend
export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: TxType;
  category: string;
  date: string;
};

type FinanceState = {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  add: (input: Omit<Transaction, "id">) => Promise<void>;
  update: (id: string, input: Partial<Omit<Transaction, "id">>) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

// Map dari ApiTransaction (backend format) ke Transaction (FE format).
// Sekarang identical, tapi bikin helper biar gampang extend kalau field-nya nanti beda.
function toTransaction(api: ApiTransaction): Transaction {
  return {
    id: api.id,
    title: api.title,
    amount: api.amount,
    type: api.type,
    category: api.category,
    date: api.date,
  };
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await transactionsApi.list();
      set({ transactions: data.map(toTransaction), isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Gagal load transaksi",
        isLoading: false,
      });
    }
  },

  add: async (input) => {
    set({ error: null });
    try {
      const created = await transactionsApi.create({
        title: input.title,
        amount: input.amount,
        type: input.type,
        category: input.category,
        date: input.date,
      });
      // Optimistic sync: append hasil dari backend ke cache
      set((state) => ({
        transactions: [toTransaction(created), ...state.transactions],
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal simpan transaksi";
      set({ error: message });
      throw err; // re-throw biar dialog bisa handle & tampilin toast
    }
  },

  update: async (id, input) => {
    set({ error: null });
    try {
      const updated = await transactionsApi.update(id, input);
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? toTransaction(updated) : t,
        ),
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal update transaksi";
      set({ error: message });
      throw err;
    }
  },

  remove: async (id) => {
    set({ error: null });
    try {
      await transactionsApi.remove(id);
      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal hapus transaksi";
      set({ error: message });
      throw err;
    }
  },
}));