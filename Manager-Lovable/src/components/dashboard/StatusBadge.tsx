import { Badge } from "@/components/ui/badge";
import { cva, type VariantProps } from "class-variance-authority";

const statusVariants = cva(
  "font-medium",
  {
    variants: {
      status: {
        active: "bg-success text-success-foreground",
        pending: "bg-warning text-warning-foreground",
        completed: "bg-info text-info-foreground",
        rejected: "bg-destructive text-destructive-foreground",
        vacant: "bg-muted text-muted-foreground",
        occupied: "bg-primary text-primary-foreground",
        maintenance: "bg-warning text-warning-foreground",
        paid: "bg-success text-success-foreground",
        processing: "bg-info text-info-foreground",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusVariants> {
  children: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <Badge className={statusVariants({ status })}>
      {children}
    </Badge>
  );
}