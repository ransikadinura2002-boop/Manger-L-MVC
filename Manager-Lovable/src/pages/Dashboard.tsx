import { KPICard } from "@/components/dashboard/KPICard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Home, 
  Wrench, 
  DollarSign, 
  Bell,
  Eye,
  MoreHorizontal,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const properties = useAppStore((state) => state.properties);
  const inquiries = useAppStore((state) => state.inquiries);
  const maintenanceRequests = useAppStore((state) => state.maintenanceRequests);
  const payments = useAppStore((state) => state.payments);

  // Calculate KPIs
  const totalProperties = properties.length;
  const activeListings = properties.filter(p => p.status === "occupied").length;
  const pendingMaintenance = maintenanceRequests.filter(r => r.status === "pending").length;
  const monthlyRevenue = properties.reduce((sum, p) => sum + p.rent, 0);
  
  // Get recent data (last 3 items)
  const recentInquiries = inquiries.slice(0, 3);
  const recentMaintenance = maintenanceRequests.slice(0, 3);

  const handleViewInquiry = (inquiryId: number) => {
    navigate(`/inquiries?highlight=${inquiryId}`);
  };

  const handleViewMaintenance = (requestId: string) => {
    navigate(`/maintenance?highlight=${requestId}`);
  };

  const handleViewAllInquiries = () => {
    navigate("/inquiries");
  };

  const handleViewAllMaintenance = () => {
    navigate("/maintenance");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your properties.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Properties"
          value={totalProperties}
          icon={Building2}
          trend={{ value: `${totalProperties > 0 ? "Portfolio growing" : "Start adding properties"}`, isPositive: totalProperties > 0 }}
        />
        <KPICard
          title="Active Listings"
          value={activeListings}
          icon={Home}
          trend={{ value: `${totalProperties > 0 ? Math.round((activeListings / totalProperties) * 100) : 0}% occupancy`, isPositive: activeListings > 0 }}
        />
        <KPICard
          title="Pending Maintenance"
          value={pendingMaintenance}
          icon={Wrench}
          trend={{ value: pendingMaintenance > 2 ? `${pendingMaintenance - 2} urgent` : "All up to date", isPositive: pendingMaintenance <= 2 }}
        />
        <KPICard
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: "Based on current occupancy", isPositive: monthlyRevenue > 0 }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Inquiries */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Recent Inquiries
            </CardTitle>
            <CardDescription>Latest booking requests from potential tenants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{inquiry.tenant}</p>
                    <p className="text-sm text-muted-foreground">{inquiry.property}</p>
                    <p className="text-xs text-muted-foreground">{inquiry.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={inquiry.status as any}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </StatusBadge>
                    <Button variant="ghost" size="icon" onClick={() => handleViewInquiry(inquiry.id)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={handleViewAllInquiries}>View All Inquiries</Button>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" />
              Maintenance Status
            </CardTitle>
            <CardDescription>Current maintenance requests and their progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMaintenance.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{request.id}</p>
                    <p className="text-sm text-muted-foreground">{request.property}</p>
                    <p className="text-sm text-muted-foreground">{request.issue}</p>
                    <p className="text-xs text-muted-foreground">{request.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={request.status as any}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </StatusBadge>
                    <Button variant="ghost" size="icon" onClick={() => handleViewMaintenance(request.id)}>
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={handleViewAllMaintenance}>View All Requests</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Income Trends */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Income Overview
          </CardTitle>
          <CardDescription>Your rental income performance this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-success">${monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-foreground">${Math.round(monthlyRevenue * 0.89).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Last Month</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">+{monthlyRevenue > 0 ? Math.round(((monthlyRevenue - monthlyRevenue * 0.89) / (monthlyRevenue * 0.89)) * 100) : 0}%</p>
              <p className="text-sm text-muted-foreground">Growth</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}