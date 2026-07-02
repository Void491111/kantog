import { TransactionTable } from "@/features/transactions/components/transaction-table";
import { AddTransactionDialog } from "@/features/transactions/components/add-transaction-dialog";

export default function TransactionsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Transaksi</h1>
          <p className="text-sm text-muted-foreground">Kelola semua pemasukan & pengeluaran</p>
        </div>
        <AddTransactionDialog />
      </div>
      <TransactionTable />
    </div>
  );
}
