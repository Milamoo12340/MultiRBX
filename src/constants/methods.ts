import type { Method } from '@/types'

export const METHODS: Method[] = [
  {
    id: 'mutex-powershell',
    title: 'Mutex Pre-Claim (PowerShell)',
    subtitle: 'Create ROBLOX_singletonEvent before Roblox does — the cleanest method',
    difficulty: 'Beginner',
    safety: 'Safe',
    tool: 'PowerShell (built-in)',
    maxInstances: '10+',
    pros: [
      'No third-party software required',
      'Works reliably on all modern Windows versions',
      'No antivirus flags — pure Windows API',
      'Persists as long as the script runs',
      'Fully reversible — just close the script',
    ],
    cons: [
      'Script must stay open in the background',
      'Needs to run before Roblox launches',
      'Roblox may patch detection in future updates',
    ],
    steps: [
      {
        title: 'Open PowerShell as Administrator',
        description: 'Press Win + X → select "Windows PowerShell (Admin)" or "Terminal (Admin)". This is required to create system-level mutex handles.',
      },
      {
        title: 'Run the Mutex Pre-Claim Script',
        description: 'Paste the script below into PowerShell and press Enter. It creates the ROBLOX_singletonEvent mutex that Roblox checks for on startup, claiming it first so Roblox cannot use it to block new instances.',
        code: `# MultiRBX — Mutex Pre-Claim Script
# Keep this window open while running multiple instances

Add-Type -TypeDefinition @"
using System;
using System.Threading;
public class MutexHold {
    public static Mutex m;
    public static void Hold(string name) {
        bool created;
        m = new Mutex(true, name, out created);
        Console.WriteLine("[OK] Mutex claimed: " + name);
    }
}
"@

MutexHold::Hold("ROBLOX_singletonEvent")
Write-Host "[MultiRBX] Mutex is active. Keep this window open." -ForegroundColor Cyan
Write-Host "[MultiRBX] Launch as many Roblox instances as you need." -ForegroundColor Green
Write-Host "[MultiRBX] Press CTRL+C to release when done." -ForegroundColor Yellow
while ($true) { Start-Sleep 60 }`,
      },
      {
        title: 'Launch your first Roblox instance',
        description: 'Open Roblox normally via your browser or the Roblox app. Log in with Account 1 and join a game. Keep the game window open.',
      },
      {
        title: 'Log out on the website (keep game open)',
        description: 'Go to roblox.com in your browser. Log out of Account 1 — but do NOT close the game window. The first instance continues running.',
      },
      {
        title: 'Log in with Account 2 and join another game',
        description: 'Log in with your second account on roblox.com and join any game. A second Roblox window will open alongside the first. Repeat for additional accounts.',
      },
    ],
    notes: 'Keep the PowerShell window open the entire time. Closing it releases the mutex and may cause new instances to start closing the previous one again.',
  },
  {
    id: 'process-explorer',
    title: 'Process Explorer Handle Close',
    subtitle: 'Use Microsoft\'s official Sysinternals tool to kill the singleton handle',
    difficulty: 'Intermediate',
    safety: 'Safe',
    tool: 'Microsoft Process Explorer',
    maxInstances: '3–4',
    pros: [
      'Official Microsoft tool — zero malware risk',
      'No installation required (portable)',
      'One-time handle close per instance pair',
      'Full transparency — inspect handles yourself',
    ],
    cons: [
      'Manual process repeated for each new instance',
      'Slightly technical — requires navigating handles pane',
      'Must be done after each Roblox launch',
    ],
    steps: [
      {
        title: 'Download Process Explorer',
        description: 'Download from the official Microsoft Sysinternals page: https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer — Extract the ZIP and run procexp64.exe as Administrator.',
        code: `# Direct download link (official Microsoft):
https://download.sysinternals.com/files/ProcessExplorer.zip`,
      },
      {
        title: 'Enable Handles pane',
        description: 'In Process Explorer, go to View → Lower Pane View → Handles. This shows all kernel handles held by the selected process.',
      },
      {
        title: 'Launch first Roblox instance',
        description: 'Open Roblox normally, log in with Account 1, and join a game. Wait until you are fully in the game world.',
      },
      {
        title: 'Find and close the singleton handle',
        description: 'In Process Explorer, click on "RobloxPlayerBeta.exe" in the top pane. In the lower Handles pane, look for "ROBLOX_singletonEvent". Right-click it → "Close Handle". Confirm the warning dialog.',
        warning: 'You may see a warning about closing handles. Click OK — this is expected and safe.',
      },
      {
        title: 'Log out on browser, log in with Account 2',
        description: 'Go to roblox.com, log out, then log in with Account 2. Join a game — a second instance will open. Repeat Step 4 each time you want another instance.',
      },
    ],
    link: 'https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer',
  },
  {
    id: 'fishstrap',
    title: 'Fishstrap Bootstrapper',
    subtitle: 'Popular Bloxstrap fork with built-in multi-instance toggle',
    difficulty: 'Beginner',
    safety: 'Safe',
    tool: 'Fishstrap (GitHub)',
    maxInstances: '10+',
    pros: [
      'One-click toggle in settings UI',
      'Actively maintained fork with frequent updates',
      'Includes many extra features (FPS unlock, rich presence)',
      'Open source — fully auditable',
      'Handles mutex management automatically',
    ],
    cons: [
      'Requires installing a custom bootstrapper',
      'Some antivirus may flag (unsigned app)',
      'Replaces official Roblox bootstrapper',
    ],
    steps: [
      {
        title: 'Download Fishstrap',
        description: 'Download the latest release from the official GitHub repository. Only download from github.com/fishstrap/fishstrap or fishstrap.app — avoid unofficial mirrors.',
        code: `# Official sources ONLY:
https://github.com/fishstrap/fishstrap/releases/latest
https://www.fishstrap.app`,
      },
      {
        title: 'Run the Fishstrap installer',
        description: 'Run FishstrapSetup.exe. If Windows SmartScreen appears, click "More Info" → "Run Anyway". Fishstrap will install and replace the Roblox bootstrapper (roblox.com links will open through Fishstrap).',
        warning: 'If Windows Defender flags it, this is a false positive. Fishstrap is open source and safe. You can compile it yourself from the GitHub source.',
      },
      {
        title: 'Open Fishstrap Settings',
        description: 'Find Fishstrap in your system tray or search Start Menu. Open the Settings window.',
      },
      {
        title: 'Enable Multi-Instance Launching',
        description: 'Go to the "Behaviour" or "Bootstrapper" settings tab. Find "Allow multi-instance launching" and toggle it ON. Save settings.',
      },
      {
        title: 'Launch multiple instances',
        description: 'Open Roblox through roblox.com or any game link. Each time you click a play link (while logged into different accounts/browsers), a new instance will open without closing the previous.',
      },
    ],
    link: 'https://github.com/fishstrap/fishstrap/releases/latest',
    notes: 'Fishstrap v3.x actively supports multi-instance. As of 2025–2026, it is the most recommended bootstrapper method.',
  },
  {
    id: 'multibloxy',
    title: 'MultiBloxy System Tray App',
    subtitle: 'Lightweight tray app that pre-claims the mutex and manages instance sessions',
    difficulty: 'Beginner',
    safety: 'Safe',
    tool: 'MultiBloxy (GitHub)',
    maxInstances: '10+',
    pros: [
      'Extremely lightweight (3 MB RAM, 0% CPU)',
      'Single .exe — no installation needed',
      'System tray icon with pause/resume controls',
      'Works with Bloxstrap and original bootstrapper',
      'Supports multiple languages',
    ],
    cons: [
      'Roblox actively patching — may stop working with updates',
      'Unsigned executable may trigger SmartScreen',
      'Must be running before you launch Roblox',
    ],
    steps: [
      {
        title: 'Download MultiBloxy',
        description: 'Download MultiBloxy.exe from the official GitHub release page.',
        code: `https://github.com/Zgoly/MultiBloxy/releases/latest`,
      },
      {
        title: '(Optional) Add to Windows Startup',
        description: 'To auto-start with Windows, press Win + R, type the path below, and drag MultiBloxy.exe into the folder.',
        code: `%ALLUSERSPROFILE%\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp`,
      },
      {
        title: 'Launch MultiBloxy.exe',
        description: 'Run MultiBloxy.exe. A small icon appears in the system tray (bottom-right taskbar area). MultiBloxy is now running in the background.',
        warning: 'If SmartScreen blocks it: click "More info" → "Run anyway". This is a false positive.',
      },
      {
        title: 'Launch multiple Roblox instances',
        description: 'Open Roblox as many times as you want. MultiBloxy intercepts the mutex check each time, allowing each new instance to open without closing the previous one.',
      },
      {
        title: 'Manage from system tray',
        description: 'Right-click the MultiBloxy tray icon to pause/resume mutex control, or exit the app when you are done with multi-instance sessions.',
      },
    ],
    link: 'https://github.com/Zgoly/MultiBloxy/releases/latest',
    notes: 'Note: As of late 2024–2025, Roblox has been actively patching multi-instance tools. MultiBloxy may have intermittent compatibility. Check the GitHub issues page for current status.',
  },
  {
    id: 'emulator',
    title: 'Android Emulator Method',
    subtitle: 'Run Roblox mobile in isolated virtual Android devices — best for 10+ instances',
    difficulty: 'Advanced',
    safety: 'Safe',
    tool: 'MuMu Player / LDPlayer / BlueStacks',
    maxInstances: '30+',
    pros: [
      'True isolation — each emulator is a separate device',
      'Most scalable: 10–30+ instances on strong hardware',
      'Roblox cannot detect cross-instance via mutex',
      'Built-in multi-instance manager in most emulators',
      'No risk of instances closing each other',
    ],
    cons: [
      'High RAM usage (2–4 GB per instance)',
      'Some games detect and block emulators',
      'Mobile Roblox experience differs from PC client',
      'Setup is more complex',
    ],
    steps: [
      {
        title: 'Download MuMu Player 12 (or LDPlayer)',
        description: 'Download MuMu Player from the official site or LDPlayer from ldplayer.net. Both are free and reputable.',
        code: `MuMu Player: https://www.mumuplayer.com/
LDPlayer: https://www.ldplayer.net/
BlueStacks: https://www.bluestacks.com/`,
      },
      {
        title: 'Create multiple emulator instances',
        description: 'Open the Multi-Instance Manager built into MuMu/LDPlayer. Create 2–10+ virtual device instances. Each instance acts as a fully separate Android phone.',
      },
      {
        title: 'Install Roblox in each instance',
        description: 'Inside each emulator instance, open the Google Play Store and install Roblox. Sign in with a different account in each instance.',
      },
      {
        title: 'Configure performance settings',
        description: 'Set each emulator to use 2 CPU cores and 2048 MB RAM minimum. Lower graphics in Roblox to Level 1. Enable virtualization (VT-x/AMD-V) in BIOS for best performance.',
        code: `Recommended per-instance allocation:
RAM: 2048 MB minimum (4096 MB ideal)
CPU: 2 cores per instance
Graphics: Software rendering or OpenGL`,
      },
      {
        title: 'Launch all instances',
        description: 'Start all emulator instances. Open Roblox in each and join your target game/server. Use the Synchronizer feature in MuMu to mirror inputs across instances if farming.',
      },
    ],
    notes: 'Some Roblox experiences detect emulated environments and may restrict features or show anti-cheat messages. Test your target game first.',
  },
]

export const MUTEX_NAME = 'ROBLOX_singletonEvent'

export const DIFFICULTY_COLORS = {
  Beginner: 'text-neon-green border-green-500/30 bg-green-500/10',
  Intermediate: 'text-neon-amber border-amber-500/30 bg-amber-500/10',
  Advanced: 'text-neon-red border-red-500/30 bg-red-500/10',
} as const

export const SAFETY_COLORS = {
  Safe: 'text-neon-green',
  Caution: 'text-neon-amber',
  Risk: 'text-neon-red',
} as const

export const ACCOUNT_COLORS = [
  '#00ffff', '#00ff88', '#ff6b6b', '#ffd93d', '#a855f7', '#3b82f6', '#f97316', '#ec4899'
]
