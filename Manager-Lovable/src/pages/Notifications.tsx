import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  MessageSquare, 
  Wrench, 
  DollarSign, 
  CheckCircle,
  Clock,
  User,
  AlertTriangle
} from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "inquiry",
      title: "New Booking Inquiry",
      message: "Sarah Johnson is interested in Sunset Apartment. View inquiry details.",
      timestamp: "5 minutes ago",
      read: false,
      icon: MessageSquare,
      priority: "high"
    },
    {
      id: 2,
      type: "maintenance",
      title: "Maintenance Quotation Received",
      message: "CoolAir Services submitted a $450 quotation for HVAC repair at Downtown Loft.",
      timestamp: "2 hours ago",
      read: false,
      icon: Wrench,
      priority: "medium"
    },
    {
      id: 3,
      type: "payment",
      title: "Rent Payment Received",
      message: "Monthly rent payment of $2,500 received from Emily Davis for Park Avenue Condo.",
      timestamp: "1 day ago",
      read: true,
      icon: DollarSign,
      priority: "low"
    },
    {
      id: 4,
      type: "approval",
      title: "Property Listing Approved",
      message: "Your new property listing for Garden View House has been approved and is now active.",
      timestamp: "2 days ago",
      read: true,
      icon: CheckCircle,
      priority: "medium"
    },
    {
      id: 5,
      type: "maintenance",
      title: "Maintenance Request Completed",
      message: "Electrical work at Garden View House has been completed successfully.",
      timestamp: "3 days ago",
      read: true,
      icon: Wrench,
      priority: "low"
    },
    {
      id: 6,
      type: "inquiry",
      title: "Booking Application Submitted",
      message: "Mike Chen submitted a complete rental application for Downtown Loft.",
      timestamp: "4 days ago",
      read: true,
      icon: User,
      priority: "medium"
    },
    {
      id: 7,
      type: "alert",
      title: "Lease Expiring Soon",
      message: "The lease for Sunset Apartment expires in 30 days. Consider renewal options.",
      timestamp: "1 week ago",
      read: true,
      icon: AlertTriangle,
      priority: "high"
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "inquiry": return "text-primary";
      case "maintenance": return "text-warning";
      case "payment": return "text-success";
      case "approval": return "text-info";
      case "alert": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="destructive" className="text-xs">High</Badge>;
      case "medium": return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      case "low": return <Badge variant="outline" className="text-xs">Low</Badge>;
      default: return null;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Bell className="w-8 h-8 text-primary" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Stay updated with important property management alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Mark All Read</Button>
          <Button variant="outline" size="sm">Settings</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <p className="text-2xl font-bold text-foreground">
                {notifications.filter(n => n.type === "inquiry").length}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">Inquiries</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wrench className="w-5 h-5 text-warning" />
              <p className="text-2xl font-bold text-foreground">
                {notifications.filter(n => n.type === "maintenance").length}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">Maintenance</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-success" />
              <p className="text-2xl font-bold text-foreground">
                {notifications.filter(n => n.type === "payment").length}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">Payments</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <p className="text-2xl font-bold text-foreground">
                {notifications.filter(n => n.type === "alert").length}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">Alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <Card 
              key={notification.id} 
              className={`shadow-card transition-all cursor-pointer hover:shadow-elegant ${
                !notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full bg-muted ${getNotificationColor(notification.type)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h3>
                      {getPriorityBadge(notification.priority)}
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <p className={`text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.timestamp}
                      </p>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button variant="ghost" size="sm" className="text-xs">
                            Mark as Read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Notifications</Button>
      </div>
    </div>
  );
}