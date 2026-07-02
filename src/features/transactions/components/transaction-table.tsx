"use client";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFinanceStore } from "@/features/shared/store/finance-store";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

export function TransactionTable() {
  const tx = useFinanceStore((s) => s.transactions);
  const remove = useFinanceStore((s) => s.remove);

  const handleRemove = (id: string, title: string) => {
    remove(id);
    toast.success(`"${title}" dihapus`);
  };

  if (tx.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-titan-200 p-10 text-center text-sm text-muted-foreground">
        Belum ada transaksi. Klik tombol Tambah di kanan atas.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* mobile: card list */}
      <div className="divide-y divide-border md:hidden">
        <AnimatePresence initial={false}>
          {tx.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-3 p-4"
            >
              <div className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg",
                t.type === "income" ? "bg-emerald-50 text-emerald-700" : "bg-titan-100 text-titan-700"
              )}>
                {t.type === "income" ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.title}</p>
                <p className="text-xs text-muted-foreground">{formatDate(t.date)} · {t.category}</p>
              </div>
              <div className="text-right">
                <p className={cn("text-sm font-semibold tabular-nums", t.type === "income" ? "text-emerald-700" : "text-titan-800")}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </p>
                <Button variant="ghost" size="icon" className="size-7" onClick={() => handleRemove(t.id, t.title)}>
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* desktop: table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Nominal</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence initial={false}>
              {tx.map((t) => (
                <motion.tr
                  key={t.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "flex size-7 items-center justify-center rounded-md",
                        t.type === "income" ? "bg-emerald-50 text-emerald-700" : "bg-titan-100 text-titan-700"
                      )}>
                        {t.type === "income" ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                      </div>
                      {t.title}
                    </div>
                  </TableCell>
                  <TableCell className="capitalize text-muted-foreground">{t.category}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(t.date)}</TableCell>
                  <TableCell className={cn("text-right font-semibold tabular-nums", t.type === "income" ? "text-emerald-700" : "text-titan-800")}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="size-7" onClick={() => handleRemove(t.id, t.title)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
