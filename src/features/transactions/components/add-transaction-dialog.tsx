"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddTransactionForm } from "./use-add-transaction-form";

export function AddTransactionDialog() {
  const [open, setOpen] = useState(false);
  const form = useAddTransactionForm(() => setOpen(false));

  const handleOpenChange = (next: boolean) => {
    if (!next) form.reset();
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="titan"><Plus className="size-4" /> Tambah</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Transaksi</DialogTitle>
          <DialogDescription>Catat pemasukan atau pengeluaran lo.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="title">Judul</Label>
            <Input id="title" placeholder="contoh: Makan siang"
              value={form.title} onChange={(e) => form.setTitle(e.target.value)} />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="amount">Nominal (IDR)</Label>
            <Input id="amount" type="number" placeholder="50000"
              value={form.amount} onChange={(e) => form.setAmount(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label>Tipe</Label>
              <Select value={form.type} onValueChange={form.setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Pemasukan</SelectItem>
                  <SelectItem value="expense">Pengeluaran</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Kategori</Label>
              <Select value={form.category} onValueChange={form.setCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">Gaji</SelectItem>
                  <SelectItem value="food">Makanan</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="shopping">Belanja</SelectItem>
                  <SelectItem value="bills">Tagihan</SelectItem>
                  <SelectItem value="other">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Muncul cuma pas user pilih "Lainnya" */}
          {form.category === "other" && (
            <div className="grid gap-1.5">
              <Label htmlFor="customCategory">Nama Kategori</Label>
              <Input id="customCategory" placeholder="contoh: hobi, hadiah, donasi"
                value={form.customCategory}
                onChange={(e) => form.setCustomCategory(e.target.value)}
                autoFocus />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>Batal</Button>
          <Button variant="titan" onClick={form.submit}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}