import { Link } from 'react-router-dom'
import { Zap, Layers, Code2, ArrowRight, Terminal, AlertTriangle, Shield, Users, Box, Monitor, GitBranch } from 'lucide-react'
import heroBg from '@/assets/hero-bg.jpg'

const QUICK_METHODS = [
  {
    icon: Terminal,
    title: 'Dual Client (No Tools)',
    badge: 'ZERO SETUP',
    badgeColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    desc: 'Store app + browser player side-by-side. No scripts, no tools, zero risk.',
    diff: 'Beginner',
    diffColor: 'text-[hsl(150,100%,45%)]',
  },
  {
    icon: Zap,
    title: 'PowerShell Full Claim v3',
    badge: 'RECOMMENDED',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    desc: 'Claims both ROBLOX_singletonMutex AND singletonEvent. 10+ instances. Pure Windows API.',
    diff: 'Beginner',
    diffColor: 'text-[hsl(150,100%,45%)]',
  },
  {
    icon: Code2,
    title: 'DuplicateHandle Native API',
    badge: 'NO TOOLS',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    desc: 'Uses Windows NtQuerySystemInformation + DuplicateHandle to force-close handles in Roblox process.',
    diff: 'Intermediate',
    diffColor: 'text-[hsl(38,92%,60%)]',
  },
  {
    icon: Zap,
    title: 'Handle.exe Auto-Loop',
    badge: 'AUTOMATED',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    desc: 'Microsoft Handle64.exe watches for & closes both singleton handles automatically.',
    diff: 'Intermediate',
    diffColor: 'text-[hsl(38,92%,60%)]',
  },
  {
    icon: Layers,
    title: 'Fishstrap Bootstrapper',
    badge: 'POPULAR',
    badgeColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
    desc: 'Open-source fork. Watcher process holds ROBLOX_singletonMutex. 511+ GitHub stars.',
    diff: 'Beginner',
    diffColor: 'text-[hsl(150,100%,45%)]',
  },
  {
    icon: GitBranch,
    title: 'Voidstrap Bootstrapper',
    badge: '194 STARS',
    badgeColor: 'text-[hsl(270,80%,70%)] border-[hsl(270,80%,70%)/0.3] bg-[hsl(270,80%,70%)/0.1]',
    desc: 'Active Bloxstrap fork with multi-instance, advanced customization. 58+ releases in 2026.',
    diff: 'Beginner',
    diffColor: 'text-[hsl(150,100%,45%)]',
  },
  {
    icon: Box,
    title: 'Windows Sandbox',
    badge: 'ISOLATED',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    desc: 'Run Roblox in a containerized isolated OS. Separate device fingerprint per session.',
    diff: 'Intermediate',
    diffColor: 'text-[hsl(38,92%,60%)]',
  },
  {
    icon: Users,
    title: 'Separate Windows User',
    badge: 'STABLE',
    badgeColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    desc: 'Different Windows user accounts = separate mutex namespace. Not patchable by Roblox.',
    diff: 'Intermediate',
    diffColor: 'text-[hsl(38,92%,60%)]',
  },
  {
    icon: Monitor,
    title: 'Android Emulator',
    badge: '30+ INSTANCES',
    badgeColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
    desc: 'MuMu Player / LDPlayer. Each emulator = separate device. Best for mass instances.',
    diff: 'Advanced',
    diffColor: 'text-[hsl(0,84%,60%)]',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Roblox checks for singleton handles',
    desc: 'When Roblox launches, it checks for "ROBLOX_singletonMutex" (Mutex) AND "ROBLOX_singletonEvent" (Event) — two Windows kernel objects.'
  },
  {
    step: '02',
    title: 'Handle found → signal old instance to close',
    desc: 'If either handle exists and is owned by another Roblox process, the new instance uses it to signal the old one to exit.'
  },
  {
    step: '03',
    title: 'Bypass: pre-claim, close, or isolate',
    desc: 'Methods either pre-claim both handles (so Roblox can\'t use them), actively close them via DuplicateHandle, or run instances in isolated namespaces (VMs, Sandbox, different users).'
  },
  {
    step: '04',
    title: 'Multiple instances run freely',
    desc: 'Each Roblox process runs independently. Both singleton checks are bypassed, making all instances coexist.'
  },
]

const MALWARE_WARNING_ITEMS = [
  {
    emoji: '🚨',
    title: 'Fake launchers steal accounts',
    desc: 'Executables like "RobloxMultiLauncher.exe" contain Lumma/RedLine infostealers that harvest your .ROBLOSECURITY cookie (full account access). 610,000+ accounts stolen in 2025-2026 this way.',
  },
  {
    emoji: '⚠️',
    title: 'Use only official GitHub repositories',
    desc: 'Fishstrap: github.com/fishstrap/fishstrap | Voidstrap: github.com/voidstrap/Voidstrap | MultiBlox: github.com/unknownperson-vos/MultiBlox | MultiBloxy: github.com/Zgoly/MultiBloxy',
  },
  {
    emoji: '🔍',
    title: 'Scan every .exe with VirusTotal first',
    desc: 'Upload to virustotal.com before running. If 10+ engines flag it, do not run. Better: use open-source tools (Fishstrap, Voidstrap) where you can audit the code. Or use our inline PowerShell scripts — no .exe download needed.',
  },
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
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,16%,6%)/0.88] via-[hsl(220,16%,6%)/0.78] to-[hsl(220,16%,6%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(150,100%,45%)] animate-pulse" />
              <span className="font-mono text-xs text-[hsl(180,100%,50%)]">Updated May 2026 · 14 methods · Covers both singletonEvent + singletonMutex</span>
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              <span className="gradient-text glow-text-cyan">Multi-Instance</span>
              <br />
              <span className="text-foreground">Roblox Launcher</span>
              <br />
              <span className="text-muted-foreground font-normal text-2xl sm:text-3xl">Complete Hub & Guide</span>
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              Run multiple Roblox accounts simultaneously. 14 working methods — from{' '}
              <span className="text-[hsl(180,100%,50%)]">DuplicateHandle native API</span> to{' '}
              <span className="text-[hsl(180,100%,50%)]">isolated containers</span> to{' '}
              <span className="text-[hsl(180,100%,50%)]">bootstrapper watcher processes</span>.
              Includes 7 ready-to-run scripts.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/methods" className="btn-primary px-6 py-3 rounded-lg flex items-center gap-2 text-base">
                <Zap className="w-4 h-4" />
                All 14 Methods
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/scripts" className="px-6 py-3 rounded-lg border border-border text-foreground hover:border-[hsl(180,100%,50%)/0.4] hover:bg-[hsl(180,100%,50%)/0.05] transition-all text-base flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Script Generator
              </Link>
              <Link to="/safety" className="px-6 py-3 rounded-lg border border-[hsl(0,84%,60%)/0.3] text-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,60%)/0.08] transition-all text-base flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Safety Guide
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-12 flex flex-wrap gap-8">
              {[
                { label: 'Methods', value: '14' },
                { label: 'Singleton Handles', value: '2' },
                { label: 'Downloadable Scripts', value: '7' },
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

      {/* Malware warning */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="p-5 rounded-xl border border-[hsl(0,84%,60%)/0.3] bg-[hsl(0,84%,60%)/0.05]">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-[hsl(0,84%,60%)] flex-shrink-0 mt-0.5" />
            <h2 className="font-bold text-[hsl(0,84%,60%)] text-base">
              SECURITY WARNING: Fake Multi-Instance Launchers Are Credential Stealers
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {MALWARE_WARNING_ITEMS.map(({ emoji, title, desc }) => (
              <div key={title} className="p-3 rounded-lg bg-[hsl(220,16%,6%)] border border-[hsl(0,84%,60%)/0.15]">
                <div className="font-semibold text-sm text-foreground mb-1.5">{emoji} {title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Shield className="w-3.5 h-3.5 text-[hsl(150,100%,45%)]" />
            <span>This site only links to official GitHub repositories and Microsoft tools. Scripts are generated inline — nothing to download from us.</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
            <Terminal className="w-3.5 h-3.5" />
            Technical Breakdown
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Why Does Roblox Close Previous Instances?
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Roblox uses two Windows kernel objects for singleton enforcement:{' '}
            <code className="font-mono text-[hsl(180,100%,50%)] text-sm bg-[hsl(180,100%,50%)/0.1] px-1.5 py-0.5 rounded">ROBLOX_singletonMutex</code>
            {' '}and{' '}
            <code className="font-mono text-[hsl(38,92%,60%)] text-sm bg-[hsl(38,92%,60%)/0.1] px-1.5 py-0.5 rounded">ROBLOX_singletonEvent</code>.
            Here's exactly how bypasses work.
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

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            {
              label: 'Pre-Claim / Watcher',
              desc: 'Claim ROBLOX_singletonMutex + singletonEvent before Roblox launches. Fishstrap uses a dedicated watcher process. PowerShell uses CreateMutex + CreateEvent.',
              color: 'border-[hsl(180,100%,50%)/0.2] bg-[hsl(180,100%,50%)/0.04]',
              text: 'text-[hsl(180,100%,50%)]',
            },
            {
              label: 'Active Handle Close',
              desc: 'Use DuplicateHandle (DUPLICATE_CLOSE_SOURCE) or Sysinternals Handle.exe to force-close the singleton handles inside the running Roblox process.',
              color: 'border-[hsl(38,92%,60%)/0.2] bg-[hsl(38,92%,60%)/0.04]',
              text: 'text-[hsl(38,92%,60%)]',
            },
            {
              label: 'Namespace / Device Isolation',
              desc: 'Windows user sessions, Sandbox, VMs, and Android emulators create completely separate mutex namespaces or present as different devices entirely.',
              color: 'border-[hsl(150,100%,45%)/0.2] bg-[hsl(150,100%,45%)/0.04]',
              text: 'text-[hsl(150,100%,45%)]',
            },
          ].map(({ label, desc, color, text }) => (
            <div key={label} className={`p-4 rounded-xl border ${color}`}>
              <div className={`font-mono text-xs font-semibold ${text} mb-2 uppercase tracking-wider`}>{label}</div>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Method cards overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">All Methods Overview</h2>
            <p className="text-muted-foreground text-sm mt-1">14 methods — click for full step-by-step guides</p>
          </div>
          <Link to="/methods" className="text-sm text-[hsl(180,100%,50%)] hover:underline font-mono flex items-center gap-1">
            All 14 guides <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <h3 className="font-semibold text-foreground text-sm mb-1">{title}</h3>
                <p className="text-muted-foreground text-xs leading-snug">{desc}</p>
              </div>
              <div className="mt-auto">
                <span className={`font-mono text-xs font-semibold ${diffColor}`}>{diff}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-5 rounded-xl border border-[hsl(38,92%,60%)/0.2] bg-[hsl(38,92%,60%)/0.04] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[hsl(38,92%,60%)] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-[hsl(38,92%,60%)] font-semibold">Note: </span>
            Multi-instance is not officially supported by Roblox. Widely used without bans, but Roblox actively patches specific tools.
            Never combine with exploits or botting.{' '}
            <Link to="/safety" className="text-[hsl(180,100%,50%)] hover:underline">Full safety guide →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
