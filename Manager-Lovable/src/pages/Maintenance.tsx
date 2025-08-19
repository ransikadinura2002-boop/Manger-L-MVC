import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import { 
  Wrench, 
  Plus, 
  Upload,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

export default function Maintenance() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("requests");
  const [showNewRequest, setShowNewRequest] = useState(false);

  const maintenanceRequests = [
    {
      id: "MR-001",
      property: "Sunset Apartment",
      type: "Plumbing",
      issue: "Kitchen sink faucet leaking",
      status: "pending",
      date: "2024-01-15",
      priority: "Medium",
      description: "The kitchen faucet has been dripping for the past week. Tenant reports water pooling around the base.",
      quotation: null
    },
    {
      id: "MR-002",
      property: "Downtown Loft",
      type: "HVAC",
      issue: "Air conditioning not cooling",
      status: "completed",
      date: "2024-01-12",
      priority: "High",
      description: "AC unit not producing cold air. Tenant complains about hot apartment.",
      quotation: { amount: 450, provider: "CoolAir Services", approved: true }
    },
    {
      id: "MR-003",
      property: "Garden View House",
      type: "Electrical",
      issue: "Bedroom outlet not working",
      status: "processing",
      date: "2024-01-10",
      priority: "Low",
      description: "Master bedroom electrical outlet has stopped working completely.",
      quotation: { amount: 125, provider: "ElectroFix Pro", approved: true }
    }
  ];

  const handleNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Maintenance request submitted",
      description: "Your request has been submitted. You'll receive a quotation within 24 hours.",
    });
    setShowNewRequest(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "processing": return <AlertCircle className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Maintenance</h1>
          <p className="text-muted-foreground">Manage property maintenance requests and track progress</p>
        </div>
        <Button onClick={() => setShowNewRequest(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Request Maintenance
        </Button>
      </div>

      {/* New Request Modal/Form */}
      {showNewRequest && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>New Maintenance Request</CardTitle>
            <CardDescription>Submit a new maintenance request for one of your properties</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewRequest} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="property">Select Property *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunset">Sunset Apartment</SelectItem>
                      <SelectItem value="downtown">Downtown Loft</SelectItem>
                      <SelectItem value="garden">Garden View House</SelectItem>
                      <SelectItem value="park">Park Avenue Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Maintenance Type *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="appliance">Appliance</SelectItem>
                      <SelectItem value="structural">Structural</SelectItem>
                      <SelectItem value="cosmetic">Cosmetic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  placeholder="Describe the maintenance issue in detail..."
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documents">Supporting Documents</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Upload photos or documents (optional)</p>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowNewRequest(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        <Button 
          variant={activeTab === "requests" ? "default" : "outline"}
          onClick={() => setActiveTab("requests")}
        >
          All Requests
        </Button>
        <Button 
          variant={activeTab === "pending" ? "default" : "outline"}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </Button>
        <Button 
          variant={activeTab === "quotations" ? "default" : "outline"}
          onClick={() => setActiveTab("quotations")}
        >
          Quotations
        </Button>
      </div>

      {/* Maintenance Requests */}
      <div className="space-y-4">
        {maintenanceRequests.map((request) => (
          <Card key={request.id} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{request.id}</h3>
                    <StatusBadge status={request.status as any}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </StatusBadge>
                    <span className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority} Priority
                    </span>
                  </div>
                  <p className="text-muted-foreground">{request.property} • {request.type}</p>
                  <p className="font-medium text-foreground mt-1">{request.issue}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {request.date}
                  </p>
                  {getStatusIcon(request.status)}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{request.description}</p>

              {request.quotation && (
                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">Quotation Received</p>
                      <p className="text-sm text-muted-foreground">From: {request.quotation.provider}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {request.quotation.amount}
                      </p>
                      {request.quotation.approved ? (
                        <StatusBadge status="paid">Approved & Paid</StatusBadge>
                      ) : (
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">Reject</Button>
                          <Button size="sm">Approve & Pay</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">View Details</Button>
                {request.status === "pending" && (
                  <Button variant="outline" size="sm">Cancel Request</Button>
                )}
                {request.quotation && !request.quotation.approved && (
                  <Button size="sm">Review Quotation</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {maintenanceRequests.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Requests</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {maintenanceRequests.filter(r => r.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-info">
              {maintenanceRequests.filter(r => r.status === "processing").length}
            </p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {maintenanceRequests.filter(r => r.status === "completed").length}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}