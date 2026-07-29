import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-900 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-lilac-600 text-white shadow-md shadow-lilac-600/20 hover:bg-lilac-700 active:bg-lilac-800",
        outline:
          "border border-lilac-600/50 bg-transparent text-lilac-300 hover:bg-lilac-600/10 hover:border-lilac-500/70 active:bg-lilac-600/20",
        ghost:
          "text-lilac-300 hover:bg-midnight-700 hover:text-lilac-200 active:bg-midnight-600",
        link: "text-lilac-400 underline-offset-4 hover:text-lilac-300 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        default: "h-10 px-5 py-2",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
