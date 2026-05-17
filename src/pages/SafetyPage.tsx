import { Shield, AlertTriangle, CheckCircle, XCircle, ExternalLink, Info } from 'lucide-react'
import { Link } from 'react-router-dom'

const SAFETY_ITEMS = [
  {
    icon: CheckCircle,
    color: 'text-[hsl(150,100%,45%)]',
    bg: 'bg-[hsl(150,100%,45%)/0.08] border-[hsl(150,100%,45%)/0.2]',
    title: 'Multi-instance itself is NOT bannable',
    desc: 'Roblox has not mass-banned users specifically for running multiple instances. The restriction exists to combat bot farms, not regular players. As of 2025–2026, thousands of users run multi-instance daily without bans.',
  },
  {
    icon: CheckCircle,
    color: 'text-[hsl(150,100%,45%)]',
    bg: 'bg-[hsl(150,100%,45%)/0.08] border-[hsl(150,100%,45%)/0.2]',
    title: 'Mutex methods do not modify game files',
    desc: 'The PowerShell mutex approach, Process Explorer handle close, Fishstrap, and MultiBloxy all operate at the Windows kernel level — they do not inject code into Roblox, modify game memory, or alter any Roblox files.',
  },
  {
    icon: AlertTriangle,
    color: 'text-[hsl(38,92%,60%)]',
    bg: 'bg-[hsl(38,92%,60%)/0.08] border-[hsl(38,92%,60%)/0.2]',
    title: 'Roblox is actively patching multi-instance tools',
    desc: 'As of late 2024 into 2025, Roblox has deployed updates specifically targeting multi-instance detection. Tools like MultiBloxy and older Bloxstrap versions may stop working after client updates. Always check community channels for current status.',
  },
  {
    icon: AlertTriangle,
    color: 'text-[hsl(38,92%,60%)]',
    bg: 'bg-[hsl(38,92%,60%)/0.08] border-[hsl(38,92%,60%)/0.2]',
    title: 'High-frequency bot farming increases ban risk',
    desc: 'If you use multi-instance combined with automation scripts, AFK farming at unrealistic speeds, or anything that mimics bot behavior, Roblox\'s anti-cheat (and game-specific anti-cheats like Byfron) may flag your account. Multi-instance alone is low risk; combining it with suspicious behavior is high risk.',
  },
  {
    icon: XCircle,
    color: 'text-[hsl(0,84%,60%)]',
    bg: 'bg-[hsl(0,84%,60%)/0.08] border-[hsl(0,84%,60%)/0.2]',
    title: 'NEVER download from unofficial sources',
    desc: 'Malicious actors create fake "multi-instance" tools that are actually malware, RATs, or stealers. Only use tools from their official GitHub repositories (fishstrap/fishstrap, Zgoly/MultiBloxy) or the official Microsoft Sysinternals suite. Always scan with VirusTotal before running any .exe.',
  },
  {
    icon: XCircle,
    color: 'text-[hsl(0,84%,60%)]',
    bg: 'bg-[hsl(0,84%,60%)/0.08] border-[hsl(0,84%,60%)/0.2]',
    title: 'Do NOT share cookies or account credentials',
    desc: 'Some older "account managers" required you to paste your .ROBLOSECURITY cookie. This gives complete account access to whoever holds it. Never share cookies with any tool you haven\'t fully audited, and never with other people.',
  },
]

const RECOMMENDED_TOOLS = [
  {
    name: 'Fishstrap',
    url: 'https://github.com/fishstrap/fishstrap',
    desc: 'Best overall — open source bootstrapper fork, actively maintained, 511+ stars',
    verdict: 'Recommended',
    verdictColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
  },
  {
    name: 'MultiBloxy',
    url: 'https://github.com/Zgoly/MultiBloxy',
    desc: 'Lightweight tray app, easy to use, but Roblox actively patches it — check issue tracker',
    verdict: 'Use with caution',
    verdictColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
  },
  {
    name: 'Process Explorer',
    url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer',
    desc: 'Official Microsoft Sysinternals tool — completely safe, no install needed',
    verdict: 'Safe',
    verdictColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
  },
  {
    name: 'MultiRBX PowerShell Script',
    url: '/scripts',
    desc: 'Generated here — pure Windows API, no third-party software, fully auditable',
    verdict: 'Recommended',
    verdictColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    internal: true,
  },
  {
    name: 'Roblox Account Manager (old)',
    url: 'https://github.com/ic3w0lf22/Roblox-Account-Manager',
    desc: 'Largely broken in 2025 — Roblox now detects it. Cookie-based = security risk.',
    verdict: 'Avoid',
    verdictColor: 'text-[hsl(0,84%,60%)] border-[hsl(0,84%,60%)/0.3] bg-[hsl(0,84%,60%)/0.1]',
  },
]

const PERF_TIPS = [
  { tip: 'Set graphics to Manual Level 1 in every Roblox instance', impact: 'High' },
  { tip: 'Close Discord, browsers, and other heavy apps', impact: 'High' },
  { tip: 'Use an SSD — loading multiple instances from HDD causes severe lag', impact: 'High' },
  { tip: 'In Windows Power Options: set "Maximum Processor State" to 99%', impact: 'Medium' },
  { tip: 'Limit FPS cap in each instance (some farming games run fine at 15 FPS)', impact: 'Medium' },
  { tip: 'Monitor with Task Manager — exit instances if RAM exceeds 90%', impact: 'Medium' },
  { tip: 'Enable hardware-accelerated GPU scheduling in Windows settings', impact: 'Low' },
]

export default function SafetyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Guide</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Safety & <span className="gradient-text">Best Practices</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Everything you need to know about ban risk, legitimate tool sources, security considerations,
            and how to optimize performance for multiple instances.
          </p>
        </div>

        {/* Safety items */}
        <div className="space-y-4 mb-14">
          <h2 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4" /> Safety Assessment
          </h2>
          {SAFETY_ITEMS.map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} className={`p-5 rounded-xl border ${bg} flex items-start gap-4`}>
              <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
              <div>
                <h3 className={`font-semibold text-base mb-1.5 ${color}`}>{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted tools */}
        <div className="mb-14">
          <h2 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-5">
            <CheckCircle className="w-4 h-4" /> Trusted Tools Verdict
          </h2>
          <div className="space-y-3">
            {RECOMMENDED_TOOLS.map(({ name, url, desc, verdict, verdictColor, internal }) => (
              <div key={name} className="card-dark rounded-xl p-5 flex items-start justify-between gap-4 card-hover">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-semibold text-foreground text-base">{name}</h3>
                    <span className={`tag border font-mono ${verdictColor}`}>{verdict}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
                {internal ? (
                  <Link
                    to={url}
                    className="flex-shrink-0 flex items-center gap-1 text-xs font-mono text-[hsl(180,100%,50%)] hover:underline mt-1"
                  >
                    Open <ExternalLink className="w-3 h-3" />
                  </Link>
                ) : (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1 text-xs font-mono text-[hsl(180,100%,50%)] hover:underline mt-1"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Performance tips */}
        <div className="mb-14">
          <h2 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-5">
            <Info className="w-4 h-4" /> Performance Optimization
          </h2>
          <div className="card-dark rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 px-4 py-2 border-b border-border bg-[hsl(220,14%,7%)]">
              <span className="col-span-9 font-mono text-xs text-muted-foreground uppercase tracking-wider">Tip</span>
              <span className="col-span-3 font-mono text-xs text-muted-foreground uppercase tracking-wider text-right">Impact</span>
            </div>
            {PERF_TIPS.map(({ tip, impact }, i) => (
              <div
                key={i}
                className={`grid grid-cols-12 px-4 py-3.5 items-center ${i < PERF_TIPS.length - 1 ? 'border-b border-border' : ''} hover:bg-secondary/50 transition-colors`}
              >
                <span className="col-span-9 text-sm text-muted-foreground pr-4">{tip}</span>
                <div className="col-span-3 flex justify-end">
                  <span className={`tag border font-mono ${
                    impact === 'High' ? 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.08]'
                    : impact === 'Medium' ? 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.08]'
                    : 'text-muted-foreground border-border bg-secondary'
                  }`}>{impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System requirements */}
        <div>
          <h2 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-5">System Requirements</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { tier: '2–3 Instances', ram: '8 GB RAM', cpu: 'Intel i5 / Ryzen 5', gpu: 'Any dedicated GPU', ssd: 'Recommended' },
              { tier: '4–6 Instances', ram: '16 GB RAM', cpu: 'Intel i7 / Ryzen 7', gpu: 'Mid-range GPU', ssd: 'Required' },
              { tier: '8–30+ Instances', ram: '32 GB+ RAM', cpu: 'Intel i9 / Ryzen 9', gpu: 'High-end or emulator', ssd: 'Required (NVMe)' },
            ].map(({ tier, ram, cpu, gpu, ssd }) => (
              <div key={tier} className="card-dark rounded-xl p-5 border-glow">
                <div className="font-mono text-xs font-semibold text-[hsl(180,100%,50%)] mb-3">{tier}</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span className="text-muted-foreground">RAM</span><span className="text-foreground font-mono">{ram}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">CPU</span><span className="text-foreground font-mono text-xs">{cpu}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">GPU</span><span className="text-foreground text-xs">{gpu}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Storage</span><span className="text-foreground text-xs">{ssd}</span></li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
