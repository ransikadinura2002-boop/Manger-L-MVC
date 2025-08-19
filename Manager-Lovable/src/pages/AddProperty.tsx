import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/lib/store";
import { 
  Upload, 
  FileText, 
  Image,
  Plus,
  X,
  Loader2
} from "lucide-react";

const propertySchema = z.object({
  address: z.string().min(10, "Address must be at least 10 characters"),
  propertyType: z.string().min(1, "Please select a property type"),
  bedrooms: z.string().min(1, "Please select number of bedrooms"),
  bathrooms: z.string().min(1, "Please select number of bathrooms"),
  size: z.string().optional(),
  rent: z.string().min(1, "Monthly rent is required").refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0;
  }, "Rent must be a positive number"),
  description: z.string().optional(),
});

export default function AddProperty() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const addProperty = useAppStore((state) => state.addProperty);
  const addNotification = useAppStore((state) => state.addNotification);
  
  const [photos, setPhotos] = useState<File[]>([]);
  const [powerOfAttorney, setPowerOfAttorney] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      address: "",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      size: "",
      rent: "",
      description: "",
    },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + photos.length > 10) {
      toast({
        title: "Too many photos",
        description: "You can upload a maximum of 10 photos.",
        variant: "destructive",
      });
      return;
    }
    setPhotos(prev => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handlePowerOfAttorneyUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Power of Attorney document must be less than 10MB.",
        variant: "destructive",
      });
      return;
    }
    setPowerOfAttorney(file);
  };

  const onSubmit = async (values: z.infer<typeof propertySchema>) => {
    if (!powerOfAttorney) {
      toast({
        title: "Missing document",
        description: "Please upload your Power of Attorney document.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add property to store
      addProperty({
        address: values.address,
        type: values.propertyType,
        bedrooms: parseInt(values.bedrooms) || 0,
        bathrooms: parseFloat(values.bathrooms) || 0,
        size: values.size || "",
        rent: parseInt(values.rent),
        status: "vacant",
        description: values.description,
        photos: photos.map(photo => photo.name),
        powerOfAttorney: powerOfAttorney.name,
      });

      // Add notification
      addNotification({
        title: "Property Submitted",
        message: `New property listing at ${values.address} submitted for approval`,
        type: "admin",
        date: new Date().toISOString(),
        read: false,
      });

      toast({
        title: "Property listing submitted!",
        description: "Your property has been submitted for approval and will be reviewed within 24 hours.",
      });

      // Navigate to properties page
      navigate("/properties");
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    const values = form.getValues();
    
    // Save to localStorage for persistence
    localStorage.setItem('propertyDraft', JSON.stringify({
      ...values,
      photos: photos.map(p => p.name),
      powerOfAttorney: powerOfAttorney?.name,
    }));
    
    toast({
      title: "Draft saved",
      description: "Your property draft has been saved. You can continue editing later.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Property</h1>
        <p className="text-muted-foreground">Create a new property listing for your portfolio</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the fundamental details about your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Address *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123 Main Street, City, State, ZIP" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="loft">Loft</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Bedrooms" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">Studio</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4 Bedrooms</SelectItem>
                        <SelectItem value="5">5+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Bathrooms" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                        <SelectItem value="3">3 Bathrooms</SelectItem>
                        <SelectItem value="4">4+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size (sq ft)</FormLabel>
                    <FormControl>
                      <Input placeholder="1,200" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="rent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Rent ($) *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="2500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your property, including amenities, location highlights, and any special features..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Photos Upload */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Property Photos</CardTitle>
            <CardDescription>Upload high-quality photos to showcase your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="photos" className="cursor-pointer">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <Image className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Click to upload photos</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG up to 10MB each</p>
                </div>
              </Label>
              <Input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            {photos.length > 0 && (
              <div className="grid gap-4 md:grid-cols-3">
                {photos.map((photo, index) => (
                  <div key={index} className="relative bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Image className="w-8 h-8 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{photo.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(photo.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Power of Attorney */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Upload required legal documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="powerOfAttorney" className="cursor-pointer">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Upload Power of Attorney</p>
                  <p className="text-xs text-muted-foreground">PDF or image files up to 10MB</p>
                </div>
              </Label>
              <Input
                id="powerOfAttorney"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handlePowerOfAttorneyUpload}
                className="hidden"
              />
            </div>

            {powerOfAttorney && (
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{powerOfAttorney.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(powerOfAttorney.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setPowerOfAttorney(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Submit for Approval
          </Button>
        </div>
        </form>
      </Form>
    </div>
  );
}