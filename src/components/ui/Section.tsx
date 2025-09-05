import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { fadeUp } from '../../lib/motion'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: 'default' | 'pattern' | 'gradient'
}

export function Section({ children, className, id, background = 'default' }: SectionProps) {
  const backgroundClasses = {
    default: '',
    pattern: 'pattern-batik',
    gradient: 'bg-gradient-to-br from-coklat-gradient-start via-coklat-gradient-end to-coklat-utama'
  }

  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        'py-16 sm:py-20',
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </motion.section>
  )
}
