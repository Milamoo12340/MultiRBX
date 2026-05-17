import { Link } from 'react-router-dom'
import { Zap, Layers, Code2, ArrowRight, Terminal, AlertTriangle, Shield, Users, Box, Monitor } from 'lucide-react'
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
    title: 'PowerShell Mutex',
    badge: 'RECOMMENDED',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    desc: 'Pre-claim ROBLOX_singletonEvent before Roblox. 10+ instances. Pure Windows API.',
    diff: 'Beginner',
    diffColor: 'text-[hsl(150,100%,45%)]',
  },
  {
    icon: Zap,
    title: 'Handle.exe Auto-Loop',
    badge: 'AUTOMATED',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    desc: 'Microsoft Handle.exe auto-closes singleton handle as soon as Roblox creates it.',
    diff: 'Intermediate',
    diffColor: 'text-[hsl(38,92%,60%)]',
  },
  {
    icon: Layers,
    title: 'Fishstrap Bootstrapper',
    badge: 'POPULAR',
    badgeColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
    desc: 'Open-source Bloxstrap fork. One-click multi-instance toggle. 511+ GitHub stars.',
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
    desc: 'Different Windows user accounts = completely separate mutex namespace. Very stable.',
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
  {
    icon: Layers,
    title: 'Full Virtual Machine',
    badge: 'MAX ISOLATION',
    badgeColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
    desc: 'VirtualBox/VMware. Complete separate Windows OS. Highest isolation, highest complexity.',
    diff: 'Advanced',
    diffColor: 'text-[hsl(0,84%,60%)]',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Roblox checks for mutex',
    desc: 'When Roblox launches, it looks for the "ROBLOX_singletonEvent" named mutex — a Windows kernel object.'
  },
  {
    step: '02',
    title: 'Mutex found → close old instance',
    desc: 'If the mutex exists and is owned by another Roblox process, the new instance signals the old one to close.'
  },
  {
    step: '03',
    title: 'The bypass: pre-claim or isolate',
    desc: 'Multi-instance methods either pre-claim the mutex (so Roblox can\'t use it to kill others), or run instances in isolated namespaces (VMs, sandbox, different users).'
  },
  {
    step: '04',
    title: 'Multiple instances run freely',
    desc: 'Each Roblox process runs independently. The mutex check is bypassed, making all instances coexist.'
  },
]

const MALWARE_WARNING_ITEMS = [
  {
    emoji: '🚨',
    title: 'Fake multi-instance launchers steal accounts',
    desc: 'Hackers distribute malware named "RobloxMultiLauncher.exe", "MultiRBX.exe", etc. disguised as multi-instance tools. They contain info-stealers that harvest your .ROBLOSECURITY cookie (full account access). In 2025-2026, over 610,000 Roblox accounts were stolen this way.',
  },
  {
    emoji: '⚠️',
    title: 'Only use tools from official GitHub repositories',
    desc: 'Fishstrap: github.com/fishstrap/fishstrap | MultiBloxy: github.com/Zgoly/MultiBloxy | Handle.exe: Microsoft Sysinternals. Any other site offering "multi-instance launchers" as downloads is a red flag.',
  },
  {
    emoji: '🔍',
    title: 'Scan every downloaded executable with VirusTotal',
    desc: 'Before running any .exe, go to virustotal.com and upload the file. Even safe tools get flagged (false positives) — but if 10+ engines flag it, do not run it. Prefer open-source tools where you can read the code.',
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
              <span className="font-mono text-xs text-[hsl(180,100%,50%)]">Updated May 2026 · 11 methods · All verified</span>
            </div>

            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              <span className="gradient-text glow-text-cyan">Multi-Instance</span>
              <br />
              <span className="text-foreground">Roblox Launcher</span>
              <br />
              <span className="text-muted-foreground font-normal text-2xl sm:text-3xl">Complete Hub & Guide</span>
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              Run multiple Roblox accounts simultaneously. 11 working methods — from{' '}
              <span className="text-[hsl(180,100%,50%)]">PowerShell mutex bypass</span> to{' '}
              <span className="text-[hsl(180,100%,50%)]">isolated containers</span> to{' '}
              <span className="text-[hsl(180,100%,50%)]">Windows Sandbox</span>.
              Includes ready-to-run scripts.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/methods" className="btn-primary px-6 py-3 rounded-lg flex items-center gap-2 text-base">
                <Zap className="w-4 h-4" />
                All 11 Methods
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
                { label: 'Methods', value: '11' },
                { label: 'Max Instances', value: '30+' },
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

      {/* Malware warning — above the fold */}
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
            <span>This site only links to official GitHub repositories and Microsoft tools. We generate scripts inline — nothing to download from us except plain text files.</span>
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
            Roblox uses a Windows named mutex called{' '}
            <code className="font-mono text-[hsl(180,100%,50%)] text-sm bg-[hsl(180,100%,50%)/0.1] px-1.5 py-0.5 rounded">ROBLOX_singletonEvent</code>{' '}
            to enforce one-client-per-device. Here's exactly how bypasses work.
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
              label: 'Mutex Methods',
              desc: 'Pre-claim or auto-close ROBLOX_singletonEvent using Windows API or Sysinternals Handle.exe',
              color: 'border-[hsl(180,100%,50%)/0.2] bg-[hsl(180,100%,50%)/0.04]',
              text: 'text-[hsl(180,100%,50%)]',
            },
            {
              label: 'Namespace Isolation',
              desc: 'Different Windows users, Windows Sandbox, or Virtual Machines create completely separate mutex namespaces',
              color: 'border-[hsl(150,100%,45%)/0.2] bg-[hsl(150,100%,45%)/0.04]',
              text: 'text-[hsl(150,100%,45%)]',
            },
            {
              label: 'Device Emulation',
              desc: 'Android emulators and VMs present as entirely separate physical devices — mutex is irrelevant',
              color: 'border-[hsl(38,92%,60%)/0.2] bg-[hsl(38,92%,60%)/0.04]',
              text: 'text-[hsl(38,92%,60%)]',
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
            <p className="text-muted-foreground text-sm mt-1">Click any card for the full step-by-step guide</p>
          </div>
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

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-5 rounded-xl border border-[hsl(38,92%,60%)/0.2] bg-[hsl(38,92%,60%)/0.04] flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[hsl(38,92%,60%)] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-[hsl(38,92%,60%)] font-semibold">Note: </span>
            Multi-instance is not officially supported by Roblox. It is widely used without bans, but Roblox actively patches specific tools.
            Methods using mutex isolation are most reliable. Never combine with exploits or botting.{' '}
            <Link to="/safety" className="text-[hsl(180,100%,50%)] hover:underline">Full safety guide →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
