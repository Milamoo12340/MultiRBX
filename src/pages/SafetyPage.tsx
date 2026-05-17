import { Shield, AlertTriangle, CheckCircle, XCircle, ExternalLink, Info, AlertOctagon } from 'lucide-react'
import { Link } from 'react-router-dom'

const SAFETY_ITEMS = [
  {
    icon: CheckCircle,
    color: 'text-[hsl(150,100%,45%)]',
    bg: 'bg-[hsl(150,100%,45%)/0.08] border-[hsl(150,100%,45%)/0.2]',
    title: 'Multi-instance itself is NOT bannable (as of 2026)',
    desc: 'Roblox has not mass-banned users specifically for running multiple instances. The restriction exists to combat bot farms, not regular players. Thousands use multi-instance daily without bans.',
  },
  {
    icon: CheckCircle,
    color: 'text-[hsl(150,100%,45%)]',
    bg: 'bg-[hsl(150,100%,45%)/0.08] border-[hsl(150,100%,45%)/0.2]',
    title: 'Mutex methods do not modify Roblox game files',
    desc: 'PowerShell mutex, Handle.exe auto-close, Fishstrap, and MultiBloxy operate at the Windows kernel object level — they do not inject code into Roblox, touch game memory, or modify any Roblox files on disk.',
  },
  {
    icon: CheckCircle,
    color: 'text-[hsl(150,100%,45%)]',
    bg: 'bg-[hsl(150,100%,45%)/0.08] border-[hsl(150,100%,45%)/0.2]',
    title: 'Windows Sandbox and separate user methods are the most isolated',
    desc: 'Running Roblox in Windows Sandbox or as a different Windows user creates complete OS-level isolation. These methods cannot be detected by Roblox at the mutex level because the sessions are in separate namespaces.',
  },
  {
    icon: AlertTriangle,
    color: 'text-[hsl(38,92%,60%)]',
    bg: 'bg-[hsl(38,92%,60%)/0.08] border-[hsl(38,92%,60%)/0.2]',
    title: 'Roblox actively patches multi-instance tools',
    desc: 'Since late 2024, Roblox has deployed targeted updates against MultiBloxy and similar tools. Methods that pre-claim or auto-close the mutex at the OS level (PowerShell, Handle.exe) are harder to patch than app-level tools.',
  },
  {
    icon: AlertTriangle,
    color: 'text-[hsl(38,92%,60%)]',
    bg: 'bg-[hsl(38,92%,60%)/0.08] border-[hsl(38,92%,60%)/0.2]',
    title: 'Byfron/Hyperion anti-cheat blocks VMs and some emulators',
    desc: 'Roblox\'s Hyperion anti-cheat (from Byfron) actively detects VirtualBox, VMware, and some Android emulators. Games using Hyperion may refuse to load or show "cannot run in a virtual machine." Not all games use Hyperion — test your target game first.',
  },
  {
    icon: AlertTriangle,
    color: 'text-[hsl(38,92%,60%)]',
    bg: 'bg-[hsl(38,92%,60%)/0.08] border-[hsl(38,92%,60%)/0.2]',
    title: 'High-frequency bot farming significantly raises ban risk',
    desc: 'Multi-instance alone = low ban risk. Combined with automation scripts, AFK farming at unrealistic speed, or suspicious cross-account behavior = high risk. Roblox bans for behavior, not just for multiple instances.',
  },
  {
    icon: XCircle,
    color: 'text-[hsl(0,84%,60%)]',
    bg: 'bg-[hsl(0,84%,60%)/0.08] border-[hsl(0,84%,60%)/0.2]',
    title: 'CRITICAL: Fake multi-instance tools are credential stealers',
    desc: 'In 2025-2026, over 610,000 Roblox accounts were stolen via malware disguised as game tools. Executables named "RobloxMultiLauncher.exe", "MultiInstance.exe", "RobloxExecutor.exe" from unofficial sites contain Lumma, RedLine, and Raccoon infostealers that harvest your .ROBLOSECURITY cookie and all browser passwords.',
  },
  {
    icon: XCircle,
    color: 'text-[hsl(0,84%,60%)]',
    bg: 'bg-[hsl(0,84%,60%)/0.08] border-[hsl(0,84%,60%)/0.2]',
    title: 'NEVER share your .ROBLOSECURITY cookie with any tool',
    desc: 'Your .ROBLOSECURITY cookie provides complete access to your Roblox account without needing a password. Legitimate multi-instance tools (Fishstrap, MultiBloxy, mutex scripts) never ask for it. Any tool that does is a stealer.',
  },
]

const RECOMMENDED_TOOLS = [
  {
    name: 'PowerShell Mutex Script',
    url: '/scripts',
    desc: 'Generated inline on this site — plain text, no download from third parties, fully auditable before running.',
    verdict: 'Most Recommended',
    verdictColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    internal: true,
  },
  {
    name: 'Fishstrap',
    url: 'https://github.com/fishstrap/fishstrap',
    desc: 'Open source Bloxstrap fork, 511+ stars, actively maintained. Only download from github.com/fishstrap/fishstrap.',
    verdict: 'Recommended',
    verdictColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    internal: false,
  },
  {
    name: 'Handle.exe (Microsoft)',
    url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/handle',
    desc: 'Official Microsoft Sysinternals tool. 100% safe. Used by the auto-close loop script.',
    verdict: 'Safe (Microsoft)',
    verdictColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    internal: false,
  },
  {
    name: 'Process Explorer (Microsoft)',
    url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer',
    desc: 'Official Microsoft Sysinternals tool. Zero malware risk. Portable — no install needed.',
    verdict: 'Safe (Microsoft)',
    verdictColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    internal: false,
  },
  {
    name: 'MultiBloxy',
    url: 'https://github.com/Zgoly/MultiBloxy',
    desc: 'Open source, lightweight tray app. Check GitHub issues for current working status — Roblox actively patches it.',
    verdict: 'Caution (check status)',
    verdictColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
    internal: false,
  },
  {
    name: 'Windows Sandbox',
    url: '/methods',
    desc: 'Built into Windows 10/11 Pro. Microsoft feature — zero third-party risk. Pro/Enterprise only.',
    verdict: 'Safe (Built-in)',
    verdictColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    internal: true,
  },
  {
    name: 'MuMu Player / LDPlayer',
    url: 'https://www.mumuplayer.com/',
    desc: 'Reputable Android emulators. Download only from official websites. Best for high instance counts.',
    verdict: 'Safe (official sites)',
    verdictColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    internal: false,
  },
  {
    name: 'Bloxstrap',
    url: 'https://github.com/bloxstraplabs/bloxstrap',
    desc: 'Multi-instance feature has been REMOVED. Do not use for multi-instance. Use Fishstrap (the active fork) instead.',
    verdict: 'Not for multi-instance',
    verdictColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
    internal: false,
  },
  {
    name: 'Roblox Account Manager (old)',
    url: 'https://github.com/ic3w0lf22/Roblox-Account-Manager',
    desc: 'Largely broken in 2025-2026. Cookie-based authentication is a security risk. Not recommended.',
    verdict: 'Avoid',
    verdictColor: 'text-[hsl(0,84%,60%)] border-[hsl(0,84%,60%)/0.3] bg-[hsl(0,84%,60%)/0.1]',
    internal: false,
  },
]

const RED_FLAGS = [
  'Requires you to paste your .ROBLOSECURITY cookie',
  'Downloaded from sites other than official GitHub repos',
  'Executable is packed or obfuscated (check VirusTotal)',
  'Promises "unlimited free Robux" alongside multi-instance',
  'YouTube video that links to Mediafire/MEGA instead of GitHub',
  'Site asks you to disable antivirus before downloading',
  'Tool has no public source code or GitHub repository',
  'Discord server that direct-messages you "free" tools',
]

const PERF_TIPS = [
  { tip: 'Set graphics to Manual Level 1 in every Roblox instance', impact: 'High' },
  { tip: 'Close Discord, browsers, and other heavy background apps', impact: 'High' },
  { tip: 'Use an SSD — loading multiple instances from HDD causes extreme lag', impact: 'High' },
  { tip: 'In Windows Power Options: set "Maximum Processor State" to 99%', impact: 'Medium' },
  { tip: 'Limit FPS cap in each instance (farming games work fine at 15 FPS)', impact: 'Medium' },
  { tip: 'Monitor with Task Manager — exit instances if RAM exceeds 90%', impact: 'Medium' },
  { tip: 'Enable hardware-accelerated GPU scheduling in Windows settings', impact: 'Low' },
  { tip: 'For emulators: allocate specific CPU cores per instance, not "auto"', impact: 'Medium' },
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
            Ban risk assessment, trusted tool verification, malware red flags,
            and performance optimization for multiple instances.
          </p>
        </div>

        {/* CRITICAL malware warning */}
        <div className="p-5 rounded-xl border border-[hsl(0,84%,60%)/0.35] bg-[hsl(0,84%,60%)/0.06] mb-10">
          <div className="flex items-start gap-3 mb-4">
            <AlertOctagon className="w-6 h-6 text-[hsl(0,84%,60%)] flex-shrink-0" />
            <h2 className="font-bold text-[hsl(0,84%,60%)] text-lg">
              Credential Stealer Warning — 610,000+ Roblox Accounts Stolen in 2025-2026
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Cybersecurity researchers documented a mass campaign where hackers distributed infostealer malware
            (Lumma, RedLine, Vidar, Raccoon) disguised as Roblox game enhancement tools — including "multi-instance launchers".
            These executables harvest your browser cookies (including .ROBLOSECURITY), passwords, and authentication tokens.
          </p>
          <div>
            <div className="font-mono text-xs font-semibold text-[hsl(0,84%,60%)] uppercase tracking-wider mb-3">
              Red Flags — Walk Away Immediately If You See:
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {RED_FLAGS.map((flag, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <XCircle className="w-3.5 h-3.5 text-[hsl(0,84%,60%)] flex-shrink-0 mt-0.5" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Safety assessment */}
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
            <CheckCircle className="w-4 h-4" /> Tool Verdict — Trusted vs Avoid
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
                    Link <ExternalLink className="w-3 h-3" />
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
                    impact === 'High'
                      ? 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.08]'
                      : impact === 'Medium'
                      ? 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.08]'
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
              { tier: '2–3 Instances', ram: '8 GB RAM', cpu: 'Intel i5 / Ryzen 5', storage: 'SSD recommended', notes: 'Mutex methods work fine' },
              { tier: '4–8 Instances', ram: '16 GB RAM', cpu: 'Intel i7 / Ryzen 7', storage: 'SSD required', notes: 'Use mutex or emulators' },
              { tier: '10–30+ Instances', ram: '32 GB+ RAM', cpu: 'Intel i9 / Ryzen 9', storage: 'NVMe SSD', notes: 'Android emulators only' },
            ].map(({ tier, ram, cpu, storage, notes }) => (
              <div key={tier} className="card-dark rounded-xl p-5 border-glow">
                <div className="font-mono text-xs font-semibold text-[hsl(180,100%,50%)] mb-3">{tier}</div>
                <ul className="space-y-2 text-sm mb-3">
                  <li className="flex justify-between"><span className="text-muted-foreground">RAM</span><span className="text-foreground font-mono">{ram}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">CPU</span><span className="text-foreground font-mono text-xs">{cpu}</span></li>
                  <li className="flex justify-between"><span className="text-muted-foreground">Storage</span><span className="text-foreground text-xs">{storage}</span></li>
                </ul>
                <p className="text-xs text-muted-foreground border-t border-border pt-2">{notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
