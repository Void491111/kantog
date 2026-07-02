"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { LayoutDashboard, ArrowLeftRight, PieChart, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/reports", label: "Reports", icon: PieChart },
];

export function AppSidebar({
  onNavigate,
  idPrefix = "desktop",
}: {
  onNavigate?: () => void;
  idPrefix?: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-titan-50/60 p-4">
      <Link href="/dashboard" onClick={onNavigate} className="mb-8 flex items-center gap-2 px-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-titan-800 text-white">
          <Wallet className="size-4" />
        </div>
        <span className="text-base font-semibold tracking-tight">Kantong</span>
      </Link>

      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "text-titan-900" : "text-titan-700 hover:bg-white/60 hover:text-titan-900"
              )}
            >
              {active && (
                <motion.span
                  layoutId={`${idPrefix}-sidebar-active`}
                  className="absolute inset-0 rounded-lg bg-white shadow-sm ring-1 ring-titan-100"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className={cn("relative size-4", active ? "text-titan-800" : "text-titan-500")} />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-titan-100 bg-white/70 p-3 text-xs text-titan-600">
        <p className="font-medium text-titan-800">Kantong v0.1</p>
        <p className="mt-0.5">Local-first, no login needed.</p>
      </div>
    </aside>
  );
}
