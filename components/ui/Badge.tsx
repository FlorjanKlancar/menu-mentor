import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset text-white",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/80 ring-primary-600/20",
        secondary: "bg-secondary hover:bg-secondary/80",
        success:
          "ring-green-600/20 bg-green-100 text-green-700 hover:bg-green-200/80",
        alert: "ring-red-600/20 bg-red-100 text-red-700 hover:bg-red-200/80",
        greenOutline: "ring-green-600/20 bg-green-300 text-green-700",
        suggestion:
          "ring-secondary/50 text-secondary cursor-pointer hover:bg-secondary/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
