"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useFinanceStore, type TxCategory, type TxType } from "@/features/shared/store/finance-store";

type PresetCategory = "salary" | "food" | "transport" | "shopping" | "bills" | "other";

export function useAddTransactionForm(onSuccess?: () => void) {
    const add = useFinanceStore((s) => s.add);

    const[title, setTitle] = useState("");
    const[amount, setAmount] = useState("");
    const[type, setType] = useState<TxType>("EXPENSE");
    const[category, setCategory] = useState<PresetCategory>("food");
    const[customCategory, setCustomCategory] = useState("");

    const reset = () => {
        setTitle("");
        setAmount("");
        setType("EXPENSE");
        setCategory("food");
        setCustomCategory("");
    };

    const submit = () => {
        const num = Number(amount);
        if (!title.trim() || !num || num <=0) {
            toast.error("Pastikan judul & Nominal sudah di isi");
            return;
        }
        if (category === "other" && !customCategory.trim()) {
            toast.error("Pastikan nama kategori sudah di isi");
            return;
        }

        const finalCategory: TxCategory = 
            category === "other" ? customCategory.trim().toLocaleLowerCase() : category;

            add({
                title: title.trim(),
                amount: num,
                type, 
                category: finalCategory,
                date: new Date().toISOString(),
            });
            toast.success("Transaksi tersimpan");
            reset();
            onSuccess?.();
    };

    return {
        title, amount, type, category, customCategory,
        setTitle,
        setAmount,
        setType: (v: string) => setType(v as TxType),
        setCategory: (v: string) => setCategory(v as PresetCategory),
        setCustomCategory,
        reset,
        submit,
    };
}