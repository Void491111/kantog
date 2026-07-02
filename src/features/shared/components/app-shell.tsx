"use client";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useFinanceStore } from "@/features/shared/store/finance-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // manual rehydrate zustand persist, then seed dummy data
  useEffect(() => {
    useFinanceStore.persist.rehydrate()?.then(() => {
      useFinanceStore.getState().seed();
      setHydrated(true);
    });
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* desktop sidebar */}
      <div className="hidden w-64 shrink-0 border-r border-border md:block">
        <AppSidebar idPrefix="desktop" />
      </div>

      <div className="flex flex-1 flex-col">
        {/* mobile topbar */}
        <header className="flex h-14 items-center gap-2 border-b border-border bg-background px-4 md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <AppSidebar idPrefix="mobile" onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="text-sm font-semibold">Kantong</span>
        </header>

        <main className="flex-1 overflow-x-hidden bg-background p-4 md:p-8">
          {hydrated ? children : null}
        </main>
      </div>
    </div>
  );
}
