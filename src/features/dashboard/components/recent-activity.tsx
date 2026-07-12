"use client";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useFinanceStore } from "@/features/shared/store/finance-store";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function RecentActivity() {
  const tx = useFinanceStore((s) => s.transactions).slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>5 transaksi terakhir</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {tx.length === 0 && (
          <p className="text-sm text-muted-foreground">Belum ada transaksi.</p>
        )}
        {tx.map((t) => (
          <div key={t.id} className="flex items-center gap-3">
            <div className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg",
              t.type === "INCOME" ? "bg-emerald-50 text-emerald-700" : "bg-titan-100 text-titan-700"
            )}>
              {t.type === "INCOME" ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{t.title}</p>
              <p className="text-xs text-muted-foreground">{formatDate(t.date)}</p>
            </div>
            <span className={cn(
              "text-sm font-semibold tabular-nums",
              t.type === "INCOME" ? "text-emerald-700" : "text-titan-800"
            )}>
              {t.type === "INCOME" ? "+" : "-"}{formatCurrency(t.amount)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
