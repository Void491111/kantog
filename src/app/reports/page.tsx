import { CategoryBreakdown, ReportSummary } from "@/features/reports/components/report-summary";

export default function ReportsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 md:gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Laporan</h1>
        <p className="text-sm text-muted-foreground">Analisis distribusi keuangan lo</p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2">
          <CategoryBreakdown />
        </div>
        <ReportSummary />
      </div>
    </div>
  );
}
