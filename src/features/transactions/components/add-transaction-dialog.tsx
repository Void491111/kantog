"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFinanceStore, type TxCategory, type TxType } from "@/features/shared/store/finance-store";

export function AddTransactionDialog() {
  const [open, setOpen] = useState(false);
  const add = useFinanceStore((s) => s.add);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TxType>("expense");
  const [category, setCategory] = useState<TxCategory>("food");

  const handleSubmit = () => {
    const num = Number(amount);
    if (!title.trim() || !num || num <= 0) {
      toast.error("Isi judul & nominal dulu boss.");
      return;
    }
    add({ title: title.trim(), amount: num, type, category, date: new Date().toISOString() });
    toast.success("Transaksi tersimpan");
    setTitle(""); setAmount(""); setType("expense"); setCategory("food");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Input id="title" placeholder="contoh: Makan siang" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="amount">Nominal (IDR)</Label>
            <Input id="amount" type="number" placeholder="50000" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label>Tipe</Label>
              <Select value={type} onValueChange={(v) => setType(v as TxType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Pemasukan</SelectItem>
                  <SelectItem value="expense">Pengeluaran</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label>Kategori</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as TxCategory)}>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="titan" onClick={handleSubmit}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
