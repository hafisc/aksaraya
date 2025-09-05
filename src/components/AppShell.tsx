import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { AccessibilityPanel } from './AccessibilityPanel'

export function AppShell() {
  return (
    <div className="min-h-screen bg-putih-bersih">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <AccessibilityPanel />
      <footer className="bg-coklat-utama text-putih-bersih py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
              2024 Aksaraya. Kredit sumber glyph: Unicode Consortium, berbagai komunitas pelestari aksara.
            </p>
            <p className="text-xs mt-2 text-putih-bersih/70">
              Lisensi: Creative Commons Attribution-ShareAlike 4.0 International
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
