import { Link } from 'react-router-dom'
import { Zap, Shield, Layers, Code2, ArrowRight, Terminal, CheckCircle, AlertTriangle } from 'lucide-react'
import heroBg from '@/assets/hero-bg.jpg'

const QUICK_METHODS = [
  {
    icon: Terminal,
    title: 'PowerShell Mutex',
    badge: 'RECOMMENDED',
    badgeColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    desc: 'Pre-claim ROBLOX_singletonEvent before Roblox launches. No third-party software. 10+ instances.',
    diff: 'Beginner',
    diffColor: 'text-[hsl(150,100%,45%)]',
  },
  {
    icon: Zap,
    title: 'Fishstrap Bootstrapper',
    badge: 'POPULAR',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    desc: 'One-click multi-instance toggle. Active GitHub fork with 511+ stars. Replaces Roblox bootstrapper.',
    diff: 'Beginner',
    diffColor: 'text-[hsl(150,100%,45%)]',
  },
  {
    icon: Layers,
    title: 'Process Explorer',
    badge: 'MICROSOFT',
    badgeColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
    desc: 'Official Sysinternals tool. Close ROBLOX_singletonEvent handle manually. No installs needed.',
    diff: 'Intermediate',
    diffColor: 'text-[hsl(38,92%,60%)]',
  },
  {
    icon: Zap,
    title: 'MultiBloxy Tray App',
    badge: 'LIGHTWEIGHT',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    desc: 'System tray app. 3 MB RAM, 0% CPU. Automatically manages mutex for unlimited instances.',
    diff: 'Beginner',
    diffColor: 'text-[hsl(150,100%,45%)]',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Roblox checks for mutex', desc: 'When Roblox launches, it looks for the "ROBLOX_singletonEvent" mutex — a Windows kernel object.' },
  { step: '02', title: 'Mutex found → close existing', desc: 'If the mutex exists and is owned by another Roblox process, the new instance signals the old one to close itself.' },
  { step: '03', title: 'The bypass: pre-claim it', desc: 'Multi-instance tools create this mutex first, as an "owner" that never closes. Roblox finds the mutex "already claimed" and launches without shutting down other instances.' },
  { step: '04', title: 'Multiple instances run freely', desc: 'Each Roblox process now believes it is the only instance (from the mutex perspective) and runs independently.' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-16 overflow-hidden min-h-[85vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,16%,6%)/0.85] via-[hsl(220,16%,6%)/0.75] to-[hsl(220,16%,6%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(150,100%,45%)] animate-pulse" />
              <span className="font-mono text-xs text-[hsl(180,100%,50%)]">Updated May 2026 · All methods verified</span>
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              <span className="gradient-text glow-text-cyan">Multi-Instance</span>
              <br />
              <span className="text-foreground">Roblox Launcher</span>
              <br />
              <span className="text-muted-foreground font-normal text-2xl sm:text-3xl">Hub & Guide</span>
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              Run multiple Roblox accounts simultaneously by bypassing the{' '}
              <code className="font-mono text-[hsl(180,100%,50%)] bg-[hsl(180,100%,50%)/0.1] px-1.5 py-0.5 rounded text-base">ROBLOX_singletonEvent</code>{' '}
              mutex. Step-by-step guides, copy-paste scripts, and tool downloads.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/methods" className="btn-primary px-6 py-3 rounded-lg flex items-center gap-2 text-base">
                <Zap className="w-4 h-4" />
                View All Methods
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/scripts" className="px-6 py-3 rounded-lg border border-border text-foreground hover:border-[hsl(180,100%,50%)/0.4] hover:bg-[hsl(180,100%,50%)/0.05] transition-all text-base flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Script Generator
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-12 flex flex-wrap gap-6">
              {[
                { label: 'Methods', value: '5' },
                { label: 'Max Instances', value: '30+' },
                { label: 'OS Required', value: 'Windows 10/11' },
                { label: 'Cost', value: 'Free' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-mono font-bold text-xl text-[hsl(180,100%,50%)]">{value}</div>
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works — technical explainer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
            <Terminal className="w-3.5 h-3.5" />
            Technical Breakdown
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Why Does Roblox Close Previous Instances?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Roblox uses a Windows kernel mutex named <code className="font-mono text-[hsl(180,100%,50%)] text-sm">ROBLOX_singletonEvent</code> to enforce a one-client-per-device policy. Here's exactly how the bypass works.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOW_IT_WORKS.map(({ step, title, desc }) => (
            <div key={step} className="card-dark rounded-xl p-5 relative overflow-hidden group card-hover">
              <div className="font-mono text-5xl font-bold text-[hsl(180,100%,50%)/0.08] absolute top-3 right-4 select-none">{step}</div>
              <div className="font-mono text-xs font-semibold text-[hsl(180,100%,50%)] mb-2">STEP {step}</div>
              <h3 className="font-semibold text-foreground text-base mb-2 leading-snug">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Mutex name highlight */}
        <div className="mt-8 p-5 rounded-xl border border-[hsl(180,100%,50%)/0.2] bg-[hsl(180,100%,50%)/0.04] flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-[hsl(180,100%,50%)/0.1] border border-[hsl(180,100%,50%)/0.3] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-[hsl(180,100%,50%)]" />
            </div>
          </div>
          <div>
            <div className="font-mono text-sm font-semibold text-[hsl(180,100%,50%)] mb-1">The Key Mutex Name:</div>
            <code className="font-mono text-lg text-foreground bg-[hsl(220,20%,4%)] px-3 py-1 rounded border border-border">
              ROBLOX_singletonEvent
            </code>
            <p className="text-muted-foreground text-sm mt-2">
              This is the exact Windows named mutex/event object that Roblox creates. All multi-instance methods target this specific kernel object.
            </p>
          </div>
        </div>
      </section>

      {/* Method cards overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Quick Method Overview</h2>
          <Link to="/methods" className="text-sm text-[hsl(180,100%,50%)] hover:underline font-mono flex items-center gap-1">
            Full guides <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_METHODS.map(({ icon: Icon, title, badge, badgeColor, desc, diff, diffColor }) => (
            <Link
              key={title}
              to="/methods"
              className="card-dark rounded-xl p-5 card-hover group flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center group-hover:border-[hsl(180,100%,50%)/0.3] transition-colors">
                  <Icon className="w-4 h-4 text-[hsl(180,100%,50%)]" />
                </div>
                <span className={`tag border ${badgeColor}`}>{badge}</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base mb-1">{title}</h3>
                <p className="text-muted-foreground text-sm leading-snug">{desc}</p>
              </div>
              <div className="mt-auto">
                <span className={`font-mono text-xs font-semibold ${diffColor}`}>{diff}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Warning banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-5 rounded-xl border border-[hsl(38,92%,60%)/0.25] bg-[hsl(38,92%,60%)/0.05] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[hsl(38,92%,60%)] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-[hsl(38,92%,60%)] font-semibold">Important: </span>
            Multi-instance launching is not officially supported by Roblox. While it is widely used and Roblox has not mass-banned for it alone,
            use it responsibly. Do not combine with exploits or bot farming that violates Roblox TOS.
            Methods may break after Roblox client updates — check community channels for status.{' '}
            <Link to="/safety" className="text-[hsl(180,100%,50%)] hover:underline">Read the full safety guide →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
