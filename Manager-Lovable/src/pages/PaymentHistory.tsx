import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { 
  DollarSign, 
  Download, 
  Filter, 
  Search,
  TrendingUp,
  TrendingDown,
  Calendar,
  Building2
} from "lucide-react";

export default function PaymentHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterProperty, setFilterProperty] = useState("all");

  const payments = [
    {
      id: "PAY-001",
      date: "2024-01-15",
      type: "Rent Received",
      property: "Sunset Apartment",
      tenant: "Sarah Johnson",
      amount: 2500,
      status: "paid",
      method: "Bank Transfer",
      description: "Monthly rent payment for January 2024"
    },
    {
      id: "PAY-002", 
      date: "2024-01-14",
      type: "Maintenance Paid",
      property: "Downtown Loft",
      vendor: "CoolAir Services",
      amount: -450,
      status: "paid",
      method: "Credit Card",
      description: "HVAC repair and maintenance"
    },
    {
      id: "PAY-003",
      date: "2024-01-12",
      type: "Rent Received",
      property: "Garden View House",
      tenant: "Mike Chen",
      amount: 3200,
      status: "paid",
      method: "ACH",
      description: "Monthly rent payment for January 2024"
    },
    {
      id: "PAY-004",
      date: "2024-01-10",
      type: "Security Deposit",
      property: "Park Avenue Condo",
      tenant: "Emily Davis",
      amount: 2800,
      status: "paid",
      method: "Certified Check",
      description: "Security deposit for new lease"
    },
    {
      id: "PAY-005",
      date: "2024-01-08",
      type: "Maintenance Paid",
      property: "Garden View House",
      vendor: "ElectroFix Pro",
      amount: -125,
      status: "processing",
      method: "Bank Transfer",
      description: "Electrical outlet repair"
    },
    {
      id: "PAY-006",
      date: "2024-01-05",
      type: "Late Fee",
      property: "Sunset Apartment",
      tenant: "Previous Tenant",
      amount: 75,
      status: "paid",
      method: "Online Payment",
      description: "Late payment fee for December"
    }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (payment.tenant && payment.tenant.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (payment.vendor && payment.vendor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === "all" || 
                       (filterType === "income" && payment.amount > 0) ||
                       (filterType === "expense" && payment.amount < 0);
    
    const matchesProperty = filterProperty === "all" || payment.property === filterProperty;
    
    return matchesSearch && matchesType && matchesProperty;
  });

  const totalIncome = payments.filter(p => p.amount > 0).reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = Math.abs(payments.filter(p => p.amount < 0).reduce((sum, p) => sum + p.amount, 0));
  const netIncome = totalIncome - totalExpenses;

  const properties = [...new Set(payments.map(p => p.property))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment History</h1>
          <p className="text-muted-foreground">Track all rental income and property expenses</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-success">
                  ${totalIncome.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.4% from last month
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-destructive">
                  ${totalExpenses.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingDown className="w-3 h-3" />
                  -8.2% from last month
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Income</p>
                <p className="text-2xl font-bold text-primary">
                  ${netIncome.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +15.3% from last month
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterProperty} onValueChange={setFilterProperty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                {properties.map(property => (
                  <SelectItem key={property} value={property}>{property}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payment History Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>Detailed view of all payments and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${payment.amount > 0 ? 'bg-success/20' : 'bg-destructive/20'}`}>
                    {payment.amount > 0 ? (
                      <TrendingUp className={`w-5 h-5 text-success`} />
                    ) : (
                      <TrendingDown className={`w-5 h-5 text-destructive`} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{payment.id}</h3>
                      <StatusBadge status={payment.status as any}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </StatusBadge>
                    </div>
                    <p className="text-sm text-muted-foreground">{payment.type}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {payment.property}
                      {payment.tenant && ` • ${payment.tenant}`}
                      {payment.vendor && ` • ${payment.vendor}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{payment.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-bold ${payment.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                    {payment.amount > 0 ? '+' : ''}${Math.abs(payment.amount).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {payment.date}
                  </p>
                  <p className="text-xs text-muted-foreground">{payment.method}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Monthly Breakdown</CardTitle>
          <CardDescription>Income and expense summary by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">January 2024</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rent Income:</span>
                  <span className="text-success font-medium">$8,575</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Maintenance Costs:</span>
                  <span className="text-destructive font-medium">$575</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Other Income:</span>
                  <span className="text-success font-medium">$75</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Net Income:</span>
                  <span className="text-primary">$8,075</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">December 2023</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rent Income:</span>
                  <span className="text-success font-medium">$7,800</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Maintenance Costs:</span>
                  <span className="text-destructive font-medium">$825</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Other Income:</span>
                  <span className="text-success font-medium">$0</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Net Income:</span>
                  <span className="text-primary">$6,975</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}