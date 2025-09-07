import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { scaleOnHover } from '../../lib/motion'

interface IconBadgeProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'accent' | 'cultural'
}

export function IconBadge({ 
  children, 
  className, 
  size = 'md',
  variant = 'primary' 
}: IconBadgeProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-12 h-12 p-2.5',
    lg: 'w-16 h-16 p-3.5'
  }

  const variantClasses = {
    primary: 'bg-[#592B18] text-white',
    accent: 'bg-[#592B18] text-white',
    cultural: 'bg-[#592B18] text-white'
  }

  return (
    <motion.div
      whileHover={scaleOnHover.hover}
      className={cn(
        'rounded-full flex items-center justify-center shadow-lg transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        'glow-coklat',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
