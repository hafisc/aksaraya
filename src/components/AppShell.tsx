import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'

export function AppShell() {
  return (
    <div className="min-h-screen bg-[#592B18]">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <footer className="bg-[#592B18] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">
            © 2025 Aksaraya. Hak Cipta Dilindungi.
            </p>
            <p className="text-xs mt-2 text-white/70">
              <a href="https://hafis.cloud" target="_blank" rel="noopener noreferrer">Mohammad Al Hafis H</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
