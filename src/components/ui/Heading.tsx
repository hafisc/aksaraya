import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { fadeUp } from '../../lib/motion'

interface HeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  cultural?: boolean
  gradient?: boolean
}

export function Heading({ 
  children, 
  level = 1, 
  className, 
  cultural = false,
  gradient = false 
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  const baseClasses = {
    1: 'text-4xl sm:text-5xl lg:text-6xl font-bold',
    2: 'text-3xl sm:text-4xl lg:text-5xl font-bold',
    3: 'text-2xl sm:text-3xl lg:text-4xl font-semibold',
    4: 'text-xl sm:text-2xl lg:text-3xl font-semibold',
    5: 'text-lg sm:text-xl lg:text-2xl font-medium',
    6: 'text-base sm:text-lg lg:text-xl font-medium'
  }

  return (
    <motion.div variants={fadeUp}>
      <Tag className={cn(
        baseClasses[level],
        cultural ? 'font-cultural' : 'font-jakarta',
        gradient && 'bg-gradient-to-r from-giring-emas to-jade-tenun bg-clip-text text-transparent',
        'leading-tight tracking-tight',
        className
      )}>
        {children}
      </Tag>
    </motion.div>
  )
}
