import { useState } from 'react'
import { Box, Terminal, Users, Monitor, ChevronDown, ChevronRight, CheckCircle, XCircle, AlertTriangle, ExternalLink } from 'lucide-react'
import CodeBlock from '@/components/features/CodeBlock'
import StatusBadge from '@/components/features/StatusBadge'

const CONTAINER_METHODS = [
  {
    id: 'sandbox',
    icon: Box,
    title: 'Windows Sandbox',
    badge: 'BEST ISOLATION',
    badgeColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    requirement: 'Windows 10/11 Pro or Enterprise',
    difficulty: 'Intermediate' as const,
    how: 'Windows Sandbox uses Hyper-V technology to create a completely isolated, temporary Windows environment. Each sandbox session gets a different hardware fingerprint. When closed, all data is wiped. Your main Roblox and the sandbox Roblox are in separate OS sessions — ROBLOX_singletonEvent cannot cross the sandbox boundary.',
    pros: [
      'Hardware-level isolation via Windows Hyper-V',
      'Different device fingerprint — Roblox sees it as a new device',
      'Zero setup malware risk — it\'s a Microsoft feature',
      'Auto-wiped on close — no persistent data left behind',
    ],
    cons: [
      'Pro/Enterprise Windows only (not Home)',
      'Must reinstall Roblox inside sandbox each session',
      'Requires ~4 GB extra RAM per sandbox',
      'Max 2-3 instances before RAM becomes limiting factor',
    ],
    setupCode: `# Step 1: Enable Windows Sandbox (run as Administrator, then restart)
Enable-WindowsOptionalFeature -Online -FeatureName "Containers-DisposableClientVM" -All

# Step 2: Verify virtualization is enabled
# Task Manager > Performance > CPU > "Virtualization: Enabled"
# If not: enter BIOS, enable Intel VT-x or AMD-V

# Step 3: Save this as "RobloxSandbox.wsb" and double-click to launch:`,
    wsbConfig: `<Configuration>
  <VGpu>Enable</VGpu>
  <Networking>Enable</Networking>
  <LogonCommand>
    <Command>cmd /c start https://www.roblox.com/</Command>
  </LogonCommand>
</Configuration>`,
    steps: [
      'Enable Windows Sandbox via PowerShell (requires restart)',
      'Create a RobloxSandbox.wsb config file (see code above)',
      'Double-click the .wsb file to launch the isolated environment',
      'Inside sandbox: go to roblox.com, install Roblox, log in with alt account',
      'Your main Windows + sandbox run Roblox in fully separate sessions',
    ],
  },
  {
    id: 'windows-user',
    icon: Users,
    title: 'Separate Windows User Account',
    badge: 'VERY STABLE',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    requirement: 'Any Windows 10/11 (Pro, Home, Enterprise)',
    difficulty: 'Intermediate' as const,
    how: 'Windows named objects like mutexes live in a per-session object namespace. User A\'s ROBLOX_singletonEvent is completely invisible to User B running in a different session. By using "runas" to launch Roblox as a different Windows user, the mutex check is bypassed at the OS level — Roblox cannot detect the other instance.',
    pros: [
      'Works on ALL Windows editions including Home',
      'Persistent — survives reboots with no re-setup',
      'No scripts running in background required',
      'Not affected by Roblox\'s mutex-detection patches',
      'OS-level isolation — highly stable',
    ],
    cons: [
      'Requires creating additional Windows local user accounts',
      'Must use "runas" command or Shift+Right-click each time',
      'Multiple Windows user profiles take extra disk space',
    ],
    setupCode: `# Create a new local Windows user account (run as Administrator):
net user RobloxAlt1 YourPassword123 /add
net localgroup Users RobloxAlt1 /add

# Find your Roblox executable path:
# %LocalAppData%\\Roblox\\Versions\\version-XXXX\\RobloxPlayerBeta.exe

# Launch Roblox as the alternate user:
runas /user:RobloxAlt1 "%LocalAppData%\\Roblox\\Versions\\version-XXXX\\RobloxPlayerBeta.exe"

# Or use PowerShell with credential prompt:
Start-Process "%LocalAppData%\\Roblox\\Versions\\version-XXXX\\RobloxPlayerBeta.exe" -Credential (Get-Credential)`,
    steps: [
      'Create a secondary Windows local user account (Settings or CMD)',
      'Launch your main Roblox normally on your primary user account',
      'Use "runas /user:RobloxAlt1" or Shift+Right-click to launch Roblox as the alt user',
      'Enter the alt user\'s password when prompted',
      'Log into alt Roblox account in the new window',
      'Repeat for more accounts by creating more Windows users',
    ],
  },
  {
    id: 'emulator',
    icon: Monitor,
    title: 'Android Emulator (Mobile Roblox)',
    badge: '30+ INSTANCES',
    badgeColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
    requirement: 'Hardware virtualization (VT-x / AMD-V) enabled in BIOS',
    difficulty: 'Advanced' as const,
    how: 'Android emulators like MuMu Player and LDPlayer run fully virtualized Android environments. Each emulator instance is presented to Roblox as a completely separate mobile device with its own hardware ID, MAC address, and IMEI. The Windows mutex system is entirely irrelevant — each instance is in a separate Android VM.',
    pros: [
      'True device-level isolation — each emulator = separate phone',
      'Most scalable: 10–30+ instances with enough RAM',
      'ROBLOX_singletonEvent mutex is completely irrelevant',
      'Built-in multi-instance manager and action synchronizer',
      'Not affected by any Roblox Windows-level patches',
    ],
    cons: [
      'High RAM: 2–4 GB per emulator instance',
      'Some games with Byfron anti-cheat detect emulators',
      'Mobile Roblox UI differs from PC (may affect some games)',
      'Requires VT-x / AMD-V enabled in BIOS',
    ],
    setupCode: `# Recommended emulators (official sites only):
# MuMu Player 12:  https://www.mumuplayer.com/
# LDPlayer 9:      https://www.ldplayer.net/
# BlueStacks 5:    https://www.bluestacks.com/

# Per-instance resource allocation (inside emulator settings):
# RAM: 2048 MB minimum (4096 MB ideal)
# CPU: 2 cores per instance  
# Graphics: OpenGL or Vulkan
# Resolution: 1280x720

# Verify VT-x is enabled (PowerShell):
(Get-WmiObject Win32_Processor).VirtualizationFirmwareEnabled`,
    steps: [
      'Enable VT-x/AMD-V in BIOS (required for emulators)',
      'Download MuMu Player or LDPlayer from their official websites',
      'Open the Multi-Instance Manager and create 2–10+ virtual device instances',
      'Install Roblox from Google Play Store in each instance',
      'Log into a different Roblox account in each instance',
      'Set graphics to Level 1 in each Roblox instance',
      'Use Synchronizer to mirror inputs across instances (optional)',
    ],
  },
  {
    id: 'virtual-machine',
    icon: Terminal,
    title: 'Full Virtual Machine',
    badge: 'MAX ISOLATION',
    badgeColor: 'text-muted-foreground border-border bg-secondary',
    requirement: 'Hardware virtualization + 8 GB RAM per VM',
    difficulty: 'Advanced' as const,
    how: 'A full VM like VirtualBox or VMware creates a complete second Windows installation inside your PC. However, Roblox\'s Byfron/Hyperion anti-cheat actively detects common VMs by checking CPUID flags, BIOS strings, and virtualization artifacts. You must apply anti-detection modifications to the VM config before Roblox will run.',
    pros: [
      'Complete OS-level isolation',
      'Persistent sessions (unlike Windows Sandbox)',
      'Snapshot system allows instant clean restore',
    ],
    cons: [
      'Byfron/Hyperion actively detects VirtualBox and VMware',
      'Requires extensive anti-detection configuration',
      'Very high RAM: 4–8 GB per VM',
      'Most games using Hyperion will show "cannot run in VM" error',
      'Not recommended unless you know advanced VM configuration',
    ],
    setupCode: `# Anti-detection commands for VirtualBox (run on HOST PC):
# These must be applied BEFORE first VM boot

# Hide hypervisor CPUID bits:
VBoxManage modifyvm "YourVMName" --cpuidset 00000001 000106e5 00080800 00000001 178bfbff
VBoxManage modifyvm "YourVMName" --cpu-profile "Intel Core i7-6700K"

# Spoof BIOS manufacturer (generate UUID in PS: [guid]::NewGuid()):
VBoxManage modifyvm "YourVMName" --biosuuid "RANDOM-UUID-HERE"
VBoxManage modifyvm "YourVMName" --biosvendor "American Megatrends Inc."
VBoxManage modifyvm "YourVMName" --biosproduct "B550 AORUS PRO AX"

# Disable VirtualBox-specific features:
VBoxManage setextradata "YourVMName" "VBoxInternal/Devices/VMMDev/0/Config/GetHostTimeDisabled" "1"

# IMPORTANT: Do NOT install VirtualBox Guest Additions
# They are the #1 VM detection vector for anti-cheat`,
    steps: [
      'Download VirtualBox from virtualbox.org (free)',
      'Create a new Windows 10/11 VM with 8+ GB RAM, 4 cores, 60+ GB storage',
      'Apply ALL anti-detection VBoxManage commands (see code above) BEFORE first boot',
      'Do NOT install Guest Additions inside the VM',
      'Install Windows and Roblox inside the VM',
      'Test if Roblox launches — some games will still block VMs',
    ],
    warning: 'Many Roblox games using Byfron/Hyperion anti-cheat will show "cannot run in a virtual machine" error even after anti-detection steps. This is the least reliable method for Roblox specifically.',
  },
]

export default function SandboxPage() {
  const [expanded, setExpanded] = useState<string | null>('sandbox')

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Advanced Methods</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Isolated Containers <span className="gradient-text">& Environments</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            The most stable and "undetectable" multi-instance approaches use OS-level isolation instead of mutex manipulation.
            Each method creates a completely separate namespace or device identity for each Roblox instance.
          </p>
        </div>

        {/* Why containers */}
        <div className="p-5 rounded-xl border border-[hsl(180,100%,50%)/0.2] bg-[hsl(180,100%,50%)/0.04] mb-10">
          <div className="flex items-start gap-3">
            <Box className="w-5 h-5 text-[hsl(180,100%,50%)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Why Use Container / Isolation Methods?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Mutex-based methods (PowerShell, Handle.exe, Fishstrap) work by manipulating the{' '}
                <code className="font-mono text-[hsl(180,100%,50%)] text-xs">ROBLOX_singletonEvent</code> kernel object.
                Roblox can patch these by adding additional detection mechanisms. Isolation methods are harder to patch
                because they use Windows architecture itself — separate user sessions, separate hardware virtualization layers.
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: 'Mutex Methods', desc: 'Manipulate the singleton — patchable by Roblox', color: 'text-[hsl(38,92%,60%)]' },
                  { label: 'Namespace Isolation', desc: 'Separate Windows user sessions — mutex invisible across users', color: 'text-[hsl(180,100%,50%)]' },
                  { label: 'Hardware Isolation', desc: 'Separate VMs/emulators — Roblox sees a different device entirely', color: 'text-[hsl(150,100%,45%)]' },
                ].map(({ label, desc, color }) => (
                  <div key={label} className="p-3 rounded-lg bg-secondary border border-border text-sm">
                    <div className={`font-mono text-xs font-semibold ${color} mb-1`}>{label}</div>
                    <p className="text-muted-foreground text-xs leading-snug">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Container method cards */}
        <div className="space-y-4">
          {CONTAINER_METHODS.map((method) => {
            const isOpen = expanded === method.id
            const Icon = method.icon
            return (
              <div key={method.id} className={`card-dark rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-glow' : ''}`}>
                <button
                  className="w-full text-left p-5 flex items-start gap-4"
                  onClick={() => setExpanded(isOpen ? null : method.id)}
                >
                  <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                    isOpen ? 'bg-[hsl(180,100%,50%)/0.15] border border-[hsl(180,100%,50%)/0.3]' : 'bg-secondary border border-border'
                  }`}>
                    <Icon className="w-5 h-5 text-[hsl(180,100%,50%)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-foreground">{method.title}</h3>
                      <span className={`tag border ${method.badgeColor}`}>{method.badge}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{method.requirement}</p>
                    <StatusBadge label={method.difficulty} variant={method.difficulty === 'Intermediate' ? 'intermediate' : 'advanced'} />
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {isOpen
                      ? <ChevronDown className="w-5 h-5 text-[hsl(180,100%,50%)]" />
                      : <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    }
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-border animate-fade-in">
                    {/* How it works */}
                    <div className="p-5 bg-[hsl(220,16%,7%)]">
                      <h4 className="font-mono text-xs font-semibold text-[hsl(180,100%,50%)] uppercase tracking-wider mb-2">How It Works</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{method.how}</p>
                    </div>

                    {/* Pros / Cons */}
                    <div className="p-5 grid sm:grid-cols-2 gap-4 border-t border-border">
                      <div>
                        <h4 className="font-mono text-xs font-semibold text-[hsl(150,100%,45%)] uppercase tracking-wider mb-3">✓ Pros</h4>
                        <ul className="space-y-2">
                          {method.pros.map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-3.5 h-3.5 text-[hsl(150,100%,45%)] mt-0.5 flex-shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-mono text-xs font-semibold text-[hsl(0,84%,60%)] uppercase tracking-wider mb-3">✗ Cons</h4>
                        <ul className="space-y-2">
                          {method.cons.map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <XCircle className="w-3.5 h-3.5 text-[hsl(0,84%,60%)] mt-0.5 flex-shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Warning if present */}
                    {'warning' in method && method.warning && (
                      <div className="px-5 pb-0">
                        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[hsl(38,92%,60%)/0.08] border border-[hsl(38,92%,60%)/0.25]">
                          <AlertTriangle className="w-4 h-4 text-[hsl(38,92%,60%)] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-[hsl(38,92%,60%)]">{method.warning}</p>
                        </div>
                      </div>
                    )}

                    {/* Setup code */}
                    <div className="p-5 border-t border-border">
                      <h4 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Setup Commands</h4>
                      <CodeBlock code={method.setupCode} label="setup.ps1" />
                      {method.id === 'sandbox' && (
                        <div className="mt-3">
                          <h4 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">RobloxSandbox.wsb Config</h4>
                          <CodeBlock code={method.wsbConfig} label="RobloxSandbox.wsb" language="xml" />
                        </div>
                      )}
                    </div>

                    {/* Step list */}
                    <div className="px-5 pb-5">
                      <h4 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Steps</h4>
                      <ol className="space-y-2">
                        {method.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <span className="w-5 h-5 rounded-full bg-[hsl(180,100%,50%)/0.1] border border-[hsl(180,100%,50%)/0.3] flex items-center justify-center flex-shrink-0 font-mono text-xs text-[hsl(180,100%,50%)] mt-0.5">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Comparison table */}
        <div className="mt-12">
          <h2 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-5">Quick Comparison</h2>
          <div className="card-dark rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border bg-[hsl(220,14%,7%)]">
              <span className="col-span-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Method</span>
              <span className="col-span-2 font-mono text-xs text-muted-foreground uppercase tracking-wider text-center">Max</span>
              <span className="col-span-3 font-mono text-xs text-muted-foreground uppercase tracking-wider text-center">Patchable?</span>
              <span className="col-span-3 font-mono text-xs text-muted-foreground uppercase tracking-wider text-right">Requirement</span>
            </div>
            {[
              { name: 'Windows Sandbox', max: '2–3', patchable: 'No', req: 'Pro/Enterprise', pColor: 'text-[hsl(150,100%,45%)]' },
              { name: 'Separate Windows User', max: '3–5', patchable: 'No', req: 'Any Windows', pColor: 'text-[hsl(150,100%,45%)]' },
              { name: 'Android Emulator', max: '30+', patchable: 'Partial', req: 'VT-x + RAM', pColor: 'text-[hsl(38,92%,60%)]' },
              { name: 'Full VM', max: '2–4', patchable: 'Partial', req: 'VT-x + expertise', pColor: 'text-[hsl(38,92%,60%)]' },
              { name: 'PowerShell Mutex', max: '10+', patchable: 'Partially', req: 'Admin PowerShell', pColor: 'text-[hsl(38,92%,60%)]' },
            ].map(({ name, max, patchable, req, pColor }, i) => (
              <div key={name} className={`grid grid-cols-12 px-4 py-3.5 items-center ${i < 4 ? 'border-b border-border' : ''} hover:bg-secondary/40`}>
                <span className="col-span-4 text-sm text-foreground font-medium">{name}</span>
                <span className="col-span-2 text-sm font-mono text-[hsl(180,100%,50%)] text-center">{max}</span>
                <span className={`col-span-3 text-xs font-mono font-semibold text-center ${pColor}`}>{patchable}</span>
                <span className="col-span-3 text-xs text-muted-foreground text-right">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="mt-8 p-4 rounded-xl border border-border bg-secondary/30">
          <h3 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Useful Links</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
              { label: 'Windows Sandbox docs (Microsoft)', url: 'https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview' },
              { label: 'MuMu Player (Android Emulator)', url: 'https://www.mumuplayer.com/' },
              { label: 'LDPlayer (Android Emulator)', url: 'https://www.ldplayer.net/' },
              { label: 'VirtualBox (free VM)', url: 'https://www.virtualbox.org/wiki/Downloads' },
            ].map(({ label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[hsl(180,100%,50%)] hover:underline">
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
