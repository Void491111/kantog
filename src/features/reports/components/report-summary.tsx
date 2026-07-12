"use client";
import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useFinanceStore } from "@/features/shared/store/finance-store";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#3f3e3a", "#575651", "#6f6e69", "#878681", "#9d9c97", "#b8b7b3"];

export function CategoryBreakdown() {
  const tx = useFinanceStore((s) => s.transactions).filter((t) => t.type === "EXPENSE");
  const totals = new Map<string, number>();
  tx.forEach((t) => totals.set(t.category, (totals.get(t.category) ?? 0) + t.amount));
  const data = Array.from(totals.entries()).map(([name, value]) => ({ name, value }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengeluaran per Kategori</CardTitle>
        <CardDescription>Distribusi expense bulan ini</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e7e5e0", fontSize: 12 }}
                formatter={(v) => formatCurrency(Number(v ?? 0))}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function ReportSummary() {
  const tx = useFinanceStore((s) => s.transactions);
  const income = tx.filter((t) => t.type === "INCOME").reduce((a, b) => a + b.amount, 0);
  const expense = tx.filter((t) => t.type === "EXPENSE").reduce((a, b) => a + b.amount, 0);
  const net = income - expense;
  const avgExpense = tx.filter((t) => t.type === "EXPENSE").length
    ? expense / tx.filter((t) => t.type === "EXPENSE").length
    : 0;

  const rows = [
    { label: "Total Pemasukan", value: formatCurrency(income), tone: "text-emerald-700" },
    { label: "Total Pengeluaran", value: formatCurrency(expense), tone: "text-titan-800" },
    { label: "Net Cash Flow", value: formatCurrency(net), tone: net >= 0 ? "text-emerald-700" : "text-rose-700" },
    { label: "Rata2 per Pengeluaran", value: formatCurrency(avgExpense), tone: "text-titan-700" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ringkasan</CardTitle>
        <CardDescription>Insight singkat keuangan lo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0"
          >
            <span className="text-sm text-muted-foreground">{r.label}</span>
            <span className={`text-sm font-semibold tabular-nums ${r.tone}`}>{r.value}</span>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
