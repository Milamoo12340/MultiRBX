import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Terminal, Menu, X, Layers, Zap, Users, Code2, Shield, Box, Apple } from 'lucide-react'

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Zap },
  { to: '/methods', label: 'Methods', icon: Layers },
  { to: '/sandbox', label: 'Containers', icon: Box },
  { to: '/scripts', label: 'Scripts', icon: Code2 },
  { to: '/accounts', label: 'Accounts', icon: Users },
  { to: '/mac', label: 'Mac Guide', icon: Apple },
  { to: '/safety', label: 'Safety', icon: Shield },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-cyan-dim border border-cyan-border flex items-center justify-center group-hover:border-cyan/50 transition-colors">
              <Terminal className="w-4 h-4 text-[hsl(180,100%,50%)]" />
            </div>
            <span className="font-mono font-bold text-lg tracking-tight">
              <span className="text-[hsl(180,100%,50%)]">Multi</span>
              <span className="text-foreground">RBX</span>
            </span>
            <span className="hidden sm:inline tag bg-[hsl(180,100%,50%)/0.1] text-[hsl(180,100%,50%)] border border-cyan-border">
              v2026
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const active = pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    active
                      ? 'bg-cyan-dim text-[hsl(180,100%,50%)] border border-cyan-border'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/fishstrap/fishstrap/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-4 py-2 rounded-md text-sm flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Get Fishstrap
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const active = pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                    active
                      ? 'bg-cyan-dim text-[hsl(180,100%,50%)] border border-cyan-border'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
            <div className="pt-2 border-t border-border">
              <a
                href="https://github.com/fishstrap/fishstrap/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full px-4 py-2.5 rounded-md text-sm flex items-center justify-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                Get Fishstrap
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
