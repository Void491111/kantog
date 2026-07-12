"use client";
import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Wallet, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedNumber } from "@/features/shared/components/animated-number";
import { useFinanceStore } from "@/features/shared/store/finance-store";
import { formatCurrency } from "@/lib/utils";

export function StatsCards() {
  const tx = useFinanceStore((s) => s.transactions);

  const income = tx.filter((t) => t.type === "INCOME").reduce((a, b) => a + b.amount, 0);
  const expense = tx.filter((t) => t.type === "EXPENSE").reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;
  const savingsRate = income > 0 ? Math.max(0, ((income - expense) / income) * 100) : 0;

  const stats = [
    { label: "Total Balance", value: balance, icon: Wallet, tone: "titan" as const, format: formatCurrency },
    { label: "Income", value: income, icon: ArrowUpRight, tone: "green" as const, format: formatCurrency },
    { label: "Expense", value: expense, icon: ArrowDownRight, tone: "red" as const, format: formatCurrency },
    { label: "Savings Rate", value: savingsRate, icon: TrendingUp, tone: "titan" as const, format: (n: number) => `${n.toFixed(1)}%` },
  ];

  const toneMap = {
    titan: "bg-titan-100 text-titan-800",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-rose-50 text-rose-700",
  };

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
        >
          <Card>
            <CardContent className="p-4 md:p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground md:text-sm">{s.label}</span>
                <div className={`flex size-8 items-center justify-center rounded-lg ${toneMap[s.tone]}`}>
                  <s.icon className="size-4" />
                </div>
              </div>
              <div className="mt-3 text-lg font-semibold tracking-tight md:text-2xl">
                <AnimatedNumber value={s.value} format={s.format} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
