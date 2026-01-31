import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-slate-950 dark:focus-visible:ring-primary-400",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-glow-purple",
        destructive:
          "bg-danger-500 text-slate-50 hover:bg-danger-600 hover:shadow-glow-danger dark:bg-danger-900 dark:text-slate-50 dark:hover:bg-danger-800",
        outline:
          "border border-primary-300 bg-white hover:bg-primary-50 hover:text-primary-700 hover:border-primary-600 dark:border-primary-800 dark:bg-slate-950 dark:hover:bg-primary-900/30 dark:hover:text-primary-400",
        secondary:
          "bg-accent-100 text-accent-900 hover:bg-accent-200 hover:shadow-glow-cyan dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700",
        ghost: "hover:bg-primary-100 hover:text-primary-900 dark:hover:bg-primary-900/30 dark:hover:text-primary-400",
        link: "text-primary-600 underline-offset-4 hover:underline hover:text-primary-700 dark:text-primary-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
