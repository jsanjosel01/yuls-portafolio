import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-lilac-400/60 focus:ring-offset-2 focus:ring-offset-midnight-900",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-lilac-600 text-white shadow-sm shadow-lilac-600/20 hover:bg-lilac-700",
        secondary:
          "border-transparent bg-lilac-600/15 text-lilac-300 hover:bg-lilac-600/25",
        outline:
          "border-lilac-600/40 text-lilac-300 hover:border-lilac-500/60 hover:bg-lilac-600/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
