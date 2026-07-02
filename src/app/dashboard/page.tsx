import { WelcomeHeader } from "@/features/dashboard/components/welcome-header";
import { StatsCards } from "@/features/dashboard/components/stats-cards";
import { RevenueChart } from "@/features/dashboard/components/revenue-chart";
import { RecentActivity } from "@/features/dashboard/components/recent-activity";

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 md:gap-6">
      <WelcomeHeader />
      <StatsCards />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
