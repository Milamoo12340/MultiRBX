import { Terminal, Github, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded bg-cyan-dim border border-cyan-border flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-[hsl(180,100%,50%)]" />
              </div>
              <span className="font-mono font-bold text-base">
                <span className="text-[hsl(180,100%,50%)]">Multi</span>RBX
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              The definitive guide to running multiple Roblox instances simultaneously on Windows. Research-backed methods, scripts, and tools.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">Status:</span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-[hsl(150,100%,45%)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(150,100%,45%)] animate-pulse" />
                Methods Updated May 2026
              </span>
            </div>
          </div>

          {/* Methods */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Methods</h4>
            <ul className="space-y-2">
              {['Mutex Script', 'Process Explorer', 'Fishstrap', 'MultiBloxy', 'Android Emulator'].map(m => (
                <li key={m}>
                  <Link to="/methods" className="text-sm text-muted-foreground hover:text-[hsl(180,100%,50%)] transition-colors">{m}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/fishstrap/fishstrap" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[hsl(180,100%,50%)] transition-colors flex items-center gap-1">
                  <Github className="w-3 h-3" /> Fishstrap
                </a>
              </li>
              <li>
                <a href="https://github.com/Zgoly/MultiBloxy" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[hsl(180,100%,50%)] transition-colors flex items-center gap-1">
                  <Github className="w-3 h-3" /> MultiBloxy
                </a>
              </li>
              <li>
                <a href="https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-[hsl(180,100%,50%)] transition-colors flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" /> Process Explorer
                </a>
              </li>
              <li>
                <Link to="/safety" className="text-sm text-muted-foreground hover:text-[hsl(180,100%,50%)] transition-colors">Safety Guide</Link>
              </li>
              <li>
                <Link to="/scripts" className="text-sm text-muted-foreground hover:text-[hsl(180,100%,50%)] transition-colors">Script Generator</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 MultiRBX · Not affiliated with Roblox Corporation
          </p>
          <p className="font-mono text-xs text-muted-foreground text-center">
            ⚠ For informational purposes only. Use responsibly and within Roblox TOS.
          </p>
        </div>
      </div>
    </footer>
  )
}
