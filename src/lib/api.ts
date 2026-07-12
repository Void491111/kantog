// API client buat komunikasi ke backend Nest
// Semua fetch request masuk sini biar sentral & type-safe.

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// Type mirror dari model Transaction di backend
// Nanti kalau backend berubah, ini harus disesuaikan manual (atau pake tRPC/GraphQL codegen)
export type ApiTransaction = {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;         // ISO string dari backend
  createdAt: string;
  updatedAt: string;
};

export type CreateTransactionPayload = {
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;         // ISO string
};

export type UpdateTransactionPayload = Partial<CreateTransactionPayload>;

// Helper fetch yang throw error kalau status ga ok, biar caller bisa .catch()
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    // Backend Nest return error body kayak: { statusCode, message, error }
    const errorBody = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(
      Array.isArray(errorBody.message)
        ? errorBody.message.join(", ")
        : errorBody.message ?? "Request gagal",
    );
  }

  return res.json();
}

// Namespaced API — pengelompokan endpoint biar rapi
export const transactionsApi = {
  list: () => request<ApiTransaction[]>("/transactions"),
  get: (id: string) => request<ApiTransaction>(`/transactions/${id}`),
  create: (payload: CreateTransactionPayload) =>
    request<ApiTransaction>("/transactions", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id: string, payload: UpdateTransactionPayload) =>
    request<ApiTransaction>(`/transactions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (id: string) =>
    request<ApiTransaction>(`/transactions/${id}`, {
      method: "DELETE",
    }),
};