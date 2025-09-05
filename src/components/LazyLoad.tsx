import { lazy, Suspense, type ComponentType } from 'react'
import { motion } from 'framer-motion'

interface LazyLoadProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LazyLoad({ children, fallback }: LazyLoadProps) {
  const defaultFallback = (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-giring-emas border-t-transparent rounded-full"
      />
    </div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}

// Lazy load heavy components
export const LazyAtlas = lazy(() => import('../pages/Atlas').then(module => ({ default: module.Atlas })))
export const LazyPractice = lazy(() => import('../pages/Practice').then(module => ({ default: module.Practice })))
export const LazyQuiz = lazy(() => import('../pages/Quiz').then(module => ({ default: module.Quiz })))

// HOC for lazy loading
export function withLazyLoad<T extends object>(Component: ComponentType<T>) {
  return function LazyComponent(props: T) {
    return (
      <LazyLoad>
        <Component {...props} />
      </LazyLoad>
    )
  }
}
