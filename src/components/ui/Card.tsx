import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { fadeUp, scaleOnHover } from '../../lib/motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  ornamental?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover = true, ornamental = false, onClick }: CardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={hover ? scaleOnHover.hover : undefined}
      onClick={onClick}
      className={cn(
        'bg-gabus-pualam rounded-lg p-6 shadow-lg',
        ornamental && 'border-ukir',
        hover && 'cursor-pointer transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
