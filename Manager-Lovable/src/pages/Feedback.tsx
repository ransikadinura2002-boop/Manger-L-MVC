import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, User, MessageCircle, Calendar, Building2 } from "lucide-react";

export default function Feedback() {
  const { toast } = useToast();
  const [selectedTenant, setSelectedTenant] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const completedLeases = [
    {
      id: 1,
      tenant: "Robert Martinez",
      property: "Sunset Apartment",
      leaseEnd: "2024-01-15",
      duration: "12 months",
      finalRent: 2500,
      hasExistingFeedback: false
    },
    {
      id: 2,
      tenant: "Jessica Wong",
      property: "Downtown Loft", 
      leaseEnd: "2023-12-31",
      duration: "24 months",
      finalRent: 1800,
      hasExistingFeedback: true,
      existingRating: 5,
      existingComment: "Excellent tenant. Always paid on time, kept the property in pristine condition, and was very communicative about any issues."
    },
    {
      id: 3,
      tenant: "David Thompson",
      property: "Garden View House",
      leaseEnd: "2023-11-30",
      duration: "18 months",
      finalRent: 3200,
      hasExistingFeedback: false
    },
    {
      id: 4,
      tenant: "Maria Rodriguez",
      property: "Park Avenue Condo",
      leaseEnd: "2023-10-15",
      duration: "36 months",
      finalRent: 2800,
      hasExistingFeedback: true,
      existingRating: 4,
      existingComment: "Good tenant overall. Occasionally late with rent but always communicated in advance. Property was well-maintained."
    }
  ];

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitFeedback = (tenantId: number) => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting feedback.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: "Your tenant feedback has been saved to their profile and will help future landlords.",
    });

    // Reset form
    setSelectedTenant(null);
    setRating(0);
    setComment("");
  };

  const getRatingColor = (value: number) => {
    if (value >= 4) return "text-success";
    if (value >= 3) return "text-warning";
    return "text-destructive";
  };

  const getRatingText = (value: number) => {
    switch (value) {
      case 5: return "Excellent";
      case 4: return "Good";
      case 3: return "Average";
      case 2: return "Poor";
      case 1: return "Very Poor";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tenant Feedback</h1>
        <p className="text-muted-foreground">Provide feedback for tenants with completed leases</p>
      </div>

      {/* Instructions */}
      <Card className="shadow-card border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-2">Why provide tenant feedback?</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Help other landlords make informed decisions</li>
                <li>• Build a community of responsible rental practices</li>
                <li>• Recognize good tenants and flag problematic ones</li>
                <li>• Your feedback remains confidential to verified landlords only</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completed Leases */}
      <div className="space-y-4">
        {completedLeases.map((lease) => (
          <Card key={lease.id} className="shadow-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{lease.tenant}</h3>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {lease.property}
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Lease ended: {lease.leaseEnd}
                      </span>
                      <span>Duration: {lease.duration}</span>
                      <span>Final rent: ${lease.finalRent}/month</span>
                    </div>
                  </div>
                </div>

                {lease.hasExistingFeedback ? (
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= lease.existingRating! 
                              ? "fill-current text-warning" 
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className={`ml-2 text-sm font-medium ${getRatingColor(lease.existingRating!)}`}>
                        {getRatingText(lease.existingRating!)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Feedback submitted</p>
                  </div>
                ) : (
                  <Button 
                    onClick={() => setSelectedTenant(selectedTenant === lease.id ? null : lease.id)}
                    variant={selectedTenant === lease.id ? "default" : "outline"}
                  >
                    {selectedTenant === lease.id ? "Cancel" : "Add Feedback"}
                  </Button>
                )}
              </div>

              {/* Existing feedback display */}
              {lease.hasExistingFeedback && lease.existingComment && (
                <div className="bg-muted/30 rounded-lg p-4 mt-4">
                  <p className="text-sm text-foreground italic">"{lease.existingComment}"</p>
                </div>
              )}

              {/* Feedback form */}
              {selectedTenant === lease.id && (
                <div className="mt-6 pt-6 border-t border-border space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Rate this tenant:</h4>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingClick(star)}
                          className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= rating 
                                ? "fill-current text-warning hover:text-warning/80" 
                                : "text-muted-foreground hover:text-muted-foreground/80"
                            }`}
                          />
                        </button>
                      ))}
                      {rating > 0 && (
                        <span className={`ml-3 font-medium ${getRatingColor(rating)}`}>
                          {getRatingText(rating)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Additional Comments:</h4>
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience with this tenant. Consider mentioning payment history, property care, communication, and any notable incidents..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedTenant(null);
                        setRating(0);
                        setComment("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => handleSubmitFeedback(lease.id)}>
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Feedback Summary</CardTitle>
          <CardDescription>Your tenant feedback activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">{completedLeases.length}</p>
              <p className="text-sm text-muted-foreground">Completed Leases</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {completedLeases.filter(l => l.hasExistingFeedback).length}
              </p>
              <p className="text-sm text-muted-foreground">Feedback Given</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {completedLeases.filter(l => !l.hasExistingFeedback).length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Feedback</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
