"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useFinanceStore } from "@/features/shared/store/finance-store";
import { formatCurrency } from "@/lib/utils";

export function RevenueChart() {
  const tx = useFinanceStore((s) => s.transactions);

  // group by day-of-month for current month
  const map = new Map<number, { day: number; income: number; expense: number }>();
  tx.forEach((t) => {
    const d = new Date(t.date).getDate();
    const cur = map.get(d) ?? { day: d, income: 0, expense: 0 };
    if (t.type === "INCOME") cur.income += t.amount;
    else cur.expense += t.amount;
    map.set(d, cur);
  });
  const data = Array.from(map.values()).sort((a, b) => a.day - b.day);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Intelligence</CardTitle>
        <CardDescription>Arus kas bulan ini</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#575651" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#575651" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b8b7b3" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#b8b7b3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e0" vertical={false} />
              <XAxis dataKey="day" stroke="#9d9c97" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9d9c97" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}jt`} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e7e5e0", fontSize: 12 }}
                formatter={(v) => formatCurrency(Number(v ?? 0))}
              />
              <Area type="monotone" dataKey="income" stroke="#3f3e3a" fill="url(#colorIncome)" strokeWidth={2} />
              <Area type="monotone" dataKey="expense" stroke="#878681" fill="url(#colorExpense)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
