import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { 
  MessageSquare, 
  User, 
  Building2, 
  Calendar, 
  Phone,
  Mail,
  Eye,
  CheckCircle,
  X,
  Clock
} from "lucide-react";

export default function Inquiries() {
  const [selectedInquiry, setSelectedInquiry] = useState<number | null>(null);

  const inquiries = [
    {
      id: 1,
      tenant: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        profile: "Young professional, works in tech industry"
      },
      property: "Sunset Apartment",
      date: "2024-01-15",
      status: "pending",
      moveInDate: "2024-02-01",
      leaseDuration: "12 months",
      message: "Hi! I'm very interested in this apartment. I work remotely and love the natural light in the photos. I have excellent credit and can provide references. Would love to schedule a viewing this week.",
      budget: 2500,
      urgency: "high"
    },
    {
      id: 2,
      tenant: {
        name: "Mike Chen",
        email: "mike.chen@email.com", 
        phone: "+1 (555) 987-6543",
        profile: "Graduate student, non-smoker, no pets"
      },
      property: "Downtown Loft",
      date: "2024-01-14",
      status: "active",
      moveInDate: "2024-01-25",
      leaseDuration: "6 months",
      message: "I'm a graduate student looking for a quiet place to study. This loft looks perfect for my needs. I have a guarantor and can provide proof of income.",
      budget: 1800,
      urgency: "medium"
    },
    {
      id: 3,
      tenant: {
        name: "Emily Davis",
        email: "emily.davis@email.com",
        phone: "+1 (555) 456-7890",
        profile: "Small family with one child, stable employment"
      },
      property: "Garden View House",
      date: "2024-01-13",
      status: "pending",
      moveInDate: "2024-03-01",
      leaseDuration: "24 months",
      message: "My family and I are relocating for work and this house seems perfect for us. We have a 5-year-old and are looking for a safe neighborhood with good schools nearby.",
      budget: 3200,
      urgency: "low"
    },
    {
      id: 4,
      tenant: {
        name: "Alex Rodriguez",
        email: "alex.rodriguez@email.com",
        phone: "+1 (555) 321-0987",
        profile: "Working professional, excellent references"
      },
      property: "Park Avenue Condo",
      date: "2024-01-12",
      status: "rejected",
      moveInDate: "2024-02-15",
      leaseDuration: "18 months",
      message: "I'm interested in renting this condo. I travel frequently for work but am looking for a stable home base. Can provide employment verification and references.",
      budget: 2800,
      urgency: "medium"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "active": return <Eye className="w-4 h-4" />;
      case "approved": return <CheckCircle className="w-4 h-4" />;
      case "rejected": return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleApprove = (inquiryId: number) => {
    // Handle approval logic
    console.log("Approved inquiry:", inquiryId);
  };

  const handleReject = (inquiryId: number) => {
    // Handle rejection logic
    console.log("Rejected inquiry:", inquiryId);
  };

  const selectedInquiryData = inquiries.find(i => i.id === selectedInquiry);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Inquiries & Bookings</h1>
        <p className="text-muted-foreground">Manage rental inquiries and booking requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <p className="text-2xl font-bold text-foreground">{inquiries.length}</p>
            </div>
            <p className="text-sm text-muted-foreground">Total Inquiries</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {inquiries.filter(i => i.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {inquiries.filter(i => i.status === "active").length}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">
              {inquiries.filter(i => i.urgency === "high").length}
            </p>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Inquiries List */}
        <div className="lg:col-span-2 space-y-4">
          {inquiries.map((inquiry) => (
            <Card 
              key={inquiry.id} 
              className={`shadow-card cursor-pointer transition-all hover:shadow-elegant ${
                selectedInquiry === inquiry.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedInquiry(inquiry.id)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{inquiry.tenant.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {inquiry.property}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getUrgencyColor(inquiry.urgency)}>
                      {inquiry.urgency} priority
                    </Badge>
                    <StatusBadge status={inquiry.status as any}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </StatusBadge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {inquiry.message}
                </p>

                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Move-in: {inquiry.moveInDate}
                  </span>
                  <span>Budget: ${inquiry.budget}/month</span>
                  <span>{inquiry.date}</span>
                </div>

                {inquiry.status === "pending" && (
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(inquiry.id);
                      }}
                    >
                      Reject
                    </Button>
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(inquiry.id);
                      }}
                    >
                      Approve
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inquiry Details */}
        <div>
          {selectedInquiryData ? (
            <Card className="shadow-card sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Inquiry Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{selectedInquiryData.tenant.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {selectedInquiryData.tenant.email}
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {selectedInquiryData.tenant.phone}
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      {selectedInquiryData.property}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Rental Details</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Move-in Date: {selectedInquiryData.moveInDate}</p>
                    <p>Lease Duration: {selectedInquiryData.leaseDuration}</p>
                    <p>Budget: ${selectedInquiryData.budget}/month</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Profile</h4>
                  <p className="text-sm text-muted-foreground">{selectedInquiryData.tenant.profile}</p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Message</h4>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm text-foreground italic">"{selectedInquiryData.message}"</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Tenant
                  </Button>
                  {selectedInquiryData.status === "pending" && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleReject(selectedInquiryData.id)}
                      >
                        Reject Inquiry
                      </Button>
                      <Button 
                        className="w-full"
                        onClick={() => handleApprove(selectedInquiryData.id)}
                      >
                        Approve & Schedule Viewing
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select an inquiry to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}