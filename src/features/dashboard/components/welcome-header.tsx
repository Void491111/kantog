"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";

export function WelcomeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-between gap-4 rounded-2xl border border-titan-100 bg-gradient-to-br from-titan-50 to-white p-6 md:flex-row md:items-center"
    >
      <div>
        <h1 className="flex items-center gap-2 text-xl font-semibold tracking-tight md:text-2xl">
          Welcome back <Sparkles className="size-5 text-titan-500" />
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pantau arus keuangan lo hari ini.
        </p>
      </div>
      <Button variant="titan" asChild>
        <Link href="/transactions"><Plus className="size-4" /> Tambah Transaksi</Link>
      </Button>
    </motion.div>
  );
}
