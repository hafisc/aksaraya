import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-giring-emas text-indigo-lurik hover:bg-giring-emas/90 focus-visible:ring-giring-emas',
        secondary: 'bg-gabus-pualam text-sogan-batik border border-sogan-batik/20 hover:bg-sogan-batik/10 focus-visible:ring-sogan-batik',
        outline: 'border border-giring-emas text-giring-emas hover:bg-giring-emas hover:text-indigo-lurik focus-visible:ring-giring-emas',
        ghost: 'text-sogan-batik hover:bg-gabus-pualam focus-visible:ring-sogan-batik',
        cultural: 'bg-gradient-to-r from-indigo-lurik to-jade-tenun text-gabus-pualam hover:from-indigo-lurik/90 hover:to-jade-tenun/90 focus-visible:ring-jade-tenun'
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
Button.displayName = 'Button'

export { Button, buttonVariants }
