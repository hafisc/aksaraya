import { useState, useEffect } from 'react'

export interface AccessibilitySettings {
  highContrast: boolean
  reducedMotion: boolean
  fontSize: 'small' | 'medium' | 'large'
  focusVisible: boolean
}

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('aksaraya-accessibility')
    return saved ? JSON.parse(saved) : {
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium',
      focusVisible: true
    }
  })

  useEffect(() => {
    localStorage.setItem('aksaraya-accessibility', JSON.stringify(settings))
    
    // Apply settings to document
    const root = document.documentElement
    
    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }
    
    // Font size
    root.classList.remove('font-small', 'font-medium', 'font-large')
    root.classList.add(`font-${settings.fontSize}`)
    
    // Focus visible
    if (settings.focusVisible) {
      root.classList.add('focus-visible')
    } else {
      root.classList.remove('focus-visible')
    }
  }, [settings])

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const toggleHighContrast = () => {
    updateSetting('highContrast', !settings.highContrast)
  }

  const toggleReducedMotion = () => {
    updateSetting('reducedMotion', !settings.reducedMotion)
  }

  const setFontSize = (size: AccessibilitySettings['fontSize']) => {
    updateSetting('fontSize', size)
  }

  return {
    settings,
    updateSetting,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize
  }
}
