import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface PitaAksenProps {
  className?: string
  variant?: 'horizontal' | 'vertical'
  length?: 'short' | 'medium' | 'long'
}

export function PitaAksen({ className, variant = 'horizontal', length = 'medium' }: PitaAksenProps) {
  const lengthClasses = {
    short: variant === 'horizontal' ? 'w-12' : 'h-12',
    medium: variant === 'horizontal' ? 'w-24' : 'h-24', 
    long: variant === 'horizontal' ? 'w-32' : 'h-32'
  }

  const dimensionClasses = variant === 'horizontal' 
    ? `h-1 ${lengthClasses[length]}` 
    : `w-1 ${lengthClasses[length]}`

  return (
    <motion.div
      initial={{ scaleX: variant === 'horizontal' ? 0 : 1, scaleY: variant === 'vertical' ? 0 : 1 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        'bg-gradient-to-r from-giring-emas to-jade-tenun rounded-full',
        dimensionClasses,
        className
      )}
    />
  )
}
