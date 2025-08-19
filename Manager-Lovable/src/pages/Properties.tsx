import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2,
  Plus,
  MapPin,
  BedDouble,
  DollarSign
} from "lucide-react";

export default function Properties() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const properties = useAppStore((state) => state.properties);
  const deleteProperty = useAppStore((state) => state.deleteProperty);
  const addNotification = useAppStore((state) => state.addNotification);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleEdit = (propertyId: number) => {
    navigate(`/edit-property/${propertyId}`);
  };

  const handleView = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  const handleDelete = (propertyId: number, address: string) => {
    if (window.confirm(`Are you sure you want to delete the property at ${address}?`)) {
      deleteProperty(propertyId);
      addNotification({
        title: "Property Deleted",
        message: `Property at ${address} has been removed from your portfolio`,
        type: "admin",
        date: new Date().toISOString(),
        read: false,
      });
      toast({
        title: "Property deleted",
        description: "The property has been successfully removed from your portfolio.",
      });
    }
  };

  const handleAddProperty = () => {
    navigate("/add-property");
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || property.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Properties</h1>
          <p className="text-muted-foreground">Manage your property portfolio</p>
        </div>
        <Button className="gap-2" onClick={handleAddProperty}>
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by address or property type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterStatus === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button 
                variant={filterStatus === "occupied" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterStatus("occupied")}
              >
                Occupied
              </Button>
              <Button 
                variant={filterStatus === "vacant" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterStatus("vacant")}
              >
                Vacant
              </Button>
              <Button 
                variant={filterStatus === "maintenance" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterStatus("maintenance")}
              >
                Maintenance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader className="p-0">
              <div className="h-48 bg-muted rounded-t-lg flex items-center justify-center">
                <Building2 className="w-12 h-12 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <StatusBadge status={property.status as any}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </StatusBadge>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">${property.rent}/mo</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground">{property.type}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {property.address}
                  </p>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3 h-3" />
                    {property.bedrooms} bed, {property.bathrooms} bath
                  </span>
                  <span>{property.size}</span>
                </div>

                {property.tenant && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Tenant: </span>
                    <span className="font-medium text-foreground">{property.tenant}</span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleView(property.id)}>
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(property.id)}>
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(property.id, property.address)}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">{properties.length}</p>
              <p className="text-sm text-muted-foreground">Total Properties</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {properties.filter(p => p.status === "occupied").length}
              </p>
              <p className="text-sm text-muted-foreground">Occupied</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {properties.filter(p => p.status === "vacant").length}
              </p>
              <p className="text-sm text-muted-foreground">Vacant</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                ${properties.reduce((sum, p) => sum + p.rent, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Monthly Rent</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}