import type { Method } from '@/types'

export const METHODS: Method[] = [
  // ── METHOD 1 ────────────────────────────────────────────────
  {
    id: 'dual-client',
    title: 'Dual Client (No Tools Required)',
    subtitle: 'Run Microsoft Store app + Roblox website player side-by-side — no scripts needed',
    difficulty: 'Beginner',
    safety: 'Safe',
    tool: 'Built-in Windows (no install)',
    maxInstances: '2',
    pros: [
      'Completely official — no third-party software',
      'Zero antivirus/SmartScreen issues',
      'Works on every Windows 10/11 PC',
      'Both instances are fully separate clients',
      'Best method for beginners with 2 accounts',
    ],
    cons: [
      'Hard limit of exactly 2 instances',
      'Store app and web player behave slightly differently',
      'Requires both Roblox clients installed',
    ],
    steps: [
      {
        title: 'Install the Microsoft Store Roblox app',
        description: 'Open the Microsoft Store on Windows, search for "Roblox" and install it. This installs a completely separate Roblox client from the browser-based one.',
        code: `# Open Microsoft Store directly:
ms-windows-store://pdp/?ProductId=9NBLGGGZM6WM`,
      },
      {
        title: 'Install the website Roblox player',
        description: 'Go to roblox.com in your browser, click Play on any game — this installs the desktop Roblox bootstrapper/player separately from the Store version.',
      },
      {
        title: 'Launch Account 1 via the Store app',
        description: 'Open the Roblox Store app, log in with Account 1, and join a game.',
      },
      {
        title: 'Launch Account 2 via the browser player',
        description: 'Go to roblox.com in your browser, log in with Account 2, and click Play on a game. The browser-launched player opens as a second independent instance.',
      },
    ],
    notes: 'This is the only method officially supported by Windows. The two clients are completely independent — different install paths, different process names.',
  },

  // ── METHOD 2 ────────────────────────────────────────────────
  {
    id: 'mutex-powershell',
    title: 'PowerShell Mutex Pre-Claim',
    subtitle: 'Create ROBLOX_singletonEvent before Roblox does — cleanest script method',
    difficulty: 'Beginner',
    safety: 'Safe',
    tool: 'PowerShell (built-in Windows)',
    maxInstances: '10+',
    pros: [
      'No third-party software required',
      'Works reliably on Windows 10 and 11',
      'No antivirus flags — pure Windows .NET API',
      'Persists as long as the PowerShell window stays open',
      'Fully reversible — just close the script',
      'Can be set to auto-start on login via Task Scheduler',
    ],
    cons: [
      'PowerShell window must remain open in background',
      'Needs to be running BEFORE Roblox launches',
      'Roblox may add additional detection in future updates',
    ],
    steps: [
      {
        title: 'Open PowerShell as Administrator',
        description: 'Press Win + X → select "Windows PowerShell (Admin)" or "Terminal (Admin)". Administrator rights are required to hold a named system mutex.',
      },
      {
        title: 'Set execution policy (if needed)',
        description: 'If running a .ps1 file, first paste this in PowerShell to allow scripts for this session only:',
        code: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`,
      },
      {
        title: 'Run the Mutex Pre-Claim Script',
        description: 'Paste the full script below into the Admin PowerShell window and press Enter. It claims ROBLOX_singletonEvent using the Windows Mutex API, preventing Roblox from using it to close other instances.',
        code: `# MultiRBX — Mutex Pre-Claim Script v2
# Run as Administrator. Keep this window open while gaming.

Add-Type -TypeDefinition @"
using System;
using System.Threading;
using System.Runtime.InteropServices;

public class MultiRBXMutex {
    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern IntPtr CreateMutex(
        IntPtr lpMutexAttributes,
        bool bInitialOwner,
        string lpName
    );
    
    public static IntPtr handle1 = IntPtr.Zero;
    public static IntPtr handle2 = IntPtr.Zero;
    
    public static void HoldAll() {
        handle1 = CreateMutex(IntPtr.Zero, true, "ROBLOX_singletonEvent");
        if (handle1 != IntPtr.Zero)
            Console.WriteLine("[OK] Claimed: ROBLOX_singletonEvent");

        handle2 = CreateMutex(IntPtr.Zero, true, "Global\\\\ROBLOX_singletonEvent");
        if (handle2 != IntPtr.Zero)
            Console.WriteLine("[OK] Claimed: Global\\\\ROBLOX_singletonEvent");
    }
}
"@

Clear-Host
Write-Host "======================================================" -ForegroundColor DarkCyan
Write-Host "  MultiRBX Mutex Holder - Active" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor DarkCyan
Write-Host ""
[MultiRBXMutex]::HoldAll()
Write-Host ""
Write-Host "[READY] Launch Roblox instances NOW" -ForegroundColor Green
Write-Host "[INFO]  Keep this window open the entire session" -ForegroundColor Yellow
Write-Host "[INFO]  Press CTRL+C when finished to release" -ForegroundColor DarkGray
Write-Host ""

$t = 0
while ($true) {
    Start-Sleep -Seconds 5
    $t += 5
    Write-Host -NoNewline ("`r[RUNNING] $([math]::Floor($t/60))m $($t%60)s elapsed — mutex active... ")
}`,
      },
      {
        title: 'Launch Roblox instances',
        description: 'Open roblox.com in your browser, log in with Account 1, and join a game. Keep the game window open. Then log OUT on the website (do NOT close the game), log in as Account 2, and join another game. Repeat for each account.',
      },
      {
        title: 'When finished — stop the script',
        description: 'Press CTRL+C in the PowerShell window to release the mutex. You can also just close the PowerShell window.',
      },
    ],
    notes: 'The script claims both "ROBLOX_singletonEvent" and "Global\\ROBLOX_singletonEvent" for maximum compatibility with different Roblox versions.',
  },

  // ── METHOD 3 ────────────────────────────────────────────────
  {
    id: 'handle-sysinternals',
    title: 'Sysinternals Handle.exe (Auto-Close Loop)',
    subtitle: 'Uses Microsoft Handle.exe to detect and auto-close the singleton as soon as it appears',
    difficulty: 'Intermediate',
    safety: 'Safe',
    tool: 'Microsoft Handle.exe + PowerShell',
    maxInstances: '10+',
    pros: [
      'Completely automated — no manual steps after setup',
      'Uses official Microsoft Sysinternals tool (Handle.exe)',
      'Closes singleton immediately when Roblox creates it',
      'Can be run at startup via Task Scheduler',
      'No modifications to Roblox files',
    ],
    cons: [
      'Requires downloading Handle.exe (Microsoft, safe)',
      'Must run as Administrator',
      'Slightly more setup than the pure mutex method',
    ],
    steps: [
      {
        title: 'Download Microsoft Handle.exe',
        description: 'Download the official Sysinternals Handle tool from Microsoft. Extract the ZIP and note the path to handle.exe.',
        code: `# Official Microsoft download:
https://learn.microsoft.com/en-us/sysinternals/downloads/handle
# Direct ZIP:
https://download.sysinternals.com/files/Handle.zip`,
      },
      {
        title: 'Accept the Sysinternals EULA',
        description: 'Run handle.exe once manually (double-click) and accept the license agreement. This prevents the EULA prompt from blocking the automated script.',
        code: `# Or accept via registry (run in Admin PowerShell):
reg add "HKCU\\Software\\Sysinternals\\Handle" /v EulaAccepted /t REG_DWORD /d 1 /f`,
      },
      {
        title: 'Run the Auto-Close Loop Script',
        description: 'Open PowerShell as Administrator, set the $HandleExe path to where you saved handle.exe, then run the script below. It watches for ROBLOX_singletonEvent and closes it the moment Roblox creates it.',
        code: `# MultiRBX -- Handle.exe Auto-Close Loop
# Based on: github.com/Clayell/Roblox-Multi-Instance-Script
# Edit $HandleExe to match your download path!

$HandleExe = "C:\\Tools\\Handle\\handle.exe"   # <-- EDIT THIS PATH

if (-not (Test-Path $HandleExe)) {
    Write-Host "[ERROR] handle.exe not found at: $HandleExe" -ForegroundColor Red
    Write-Host "[INFO]  Download from: https://download.sysinternals.com/files/Handle.zip" -ForegroundColor Cyan
    Read-Host "Press Enter to exit"
    exit 1
}

# Accept EULA silently
& $HandleExe -accepteula 2>&1 | Out-Null

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  MultiRBX -- Handle.exe Singleton Watcher" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "[ACTIVE] Watching for ROBLOX_singletonEvent..." -ForegroundColor Green
Write-Host "[INFO]   Launch Roblox instances freely now." -ForegroundColor Yellow
Write-Host "[INFO]   Press CTRL+C to stop." -ForegroundColor DarkGray
Write-Host ""

$logFile = "$PSScriptRoot\\multirblx_log.txt"

while ($true) {
    # Find ROBLOX_singletonEvent handle in any Roblox process
    $output = & $HandleExe -p RobloxPlayerBeta.exe -accepteula 2>&1
    
    foreach ($line in $output) {
        if ($line -match "ROBLOX_singletonEvent") {
            # Extract handle hex value
            if ($line -match "([0-9A-Fa-f]+):\s+Event\s+.*ROBLOX_singletonEvent") {
                $handleId = $Matches[1]
                Write-Host "[FOUND] Singleton handle $handleId -- closing..." -ForegroundColor Yellow
                
                # Close the handle
                & $HandleExe -p RobloxPlayerBeta.exe -c $handleId -y -accepteula 2>&1 | Out-Null
                
                $timestamp = Get-Date -Format "HH:mm:ss"
                $msg = "[$timestamp] Closed ROBLOX_singletonEvent handle: $handleId"
                Write-Host "[CLOSED] $msg" -ForegroundColor Green
                Add-Content -Path $logFile -Value $msg
            }
        }
    }
    
    Start-Sleep -Milliseconds 500
}`,
      },
      {
        title: 'Launch Roblox instances freely',
        description: 'With the script running, open as many Roblox instances as you want. Each time Roblox tries to create ROBLOX_singletonEvent, the script immediately closes it before Roblox can use it to kill other instances.',
      },
    ],
    link: 'https://learn.microsoft.com/en-us/sysinternals/downloads/handle',
    notes: 'This method is based on Clayell\'s open-source script on GitHub (github.com/Clayell/Roblox-Multi-Instance-Script). It is the most automated approach using only Microsoft tools.',
  },

  // ── METHOD 4 ────────────────────────────────────────────────
  {
    id: 'process-explorer',
    title: 'Process Explorer Handle Close (Manual)',
    subtitle: 'Use Microsoft\'s official Sysinternals GUI tool to kill the singleton handle manually',
    difficulty: 'Intermediate',
    safety: 'Safe',
    tool: 'Microsoft Process Explorer',
    maxInstances: '3–4',
    pros: [
      'Official Microsoft tool — zero malware risk',
      'No installation required (portable .exe)',
      'Visual GUI — you can see exactly what you\'re doing',
      'Works 100% reliably when done correctly',
    ],
    cons: [
      'Manual process — must repeat for each new instance',
      'Must use correct Roblox process / handle',
      'Slightly technical for complete beginners',
    ],
    steps: [
      {
        title: 'Download Process Explorer',
        description: 'Download from the official Microsoft Sysinternals page. Extract the ZIP, then run procexp64.exe (64-bit) as Administrator.',
        code: `# Official download:
https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer
# Direct ZIP:
https://download.sysinternals.com/files/ProcessExplorer.zip`,
      },
      {
        title: 'Enable the Handles lower pane',
        description: 'In Process Explorer: go to View → Lower Pane View → Handles. This shows all kernel object handles held by the selected process.',
      },
      {
        title: 'Launch Roblox Instance 1',
        description: 'Open roblox.com in your browser, log in with Account 1, and join a game. Wait until you are fully loaded into the game world.',
      },
      {
        title: 'Find and close ROBLOX_singletonEvent',
        description: 'In Process Explorer\'s top pane, click on RobloxPlayerBeta.exe. In the lower pane, scroll to find "ROBLOX_singletonEvent" (type: Event). Right-click it → "Close Handle".',
        warning: 'A warning dialog will appear — this is normal. Click OK to confirm closing the handle.',
      },
      {
        title: 'Log out on website — launch Account 2',
        description: 'Go to roblox.com, log out of Account 1 (keep the game window open!), log in as Account 2, and join a game. A second instance launches. Repeat Step 4 each time for more instances.',
      },
    ],
    link: 'https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer',
    notes: 'Keep the first game window open at all times — it must never be closed or all other instances may terminate.',
  },

  // ── METHOD 5 ────────────────────────────────────────────────
  {
    id: 'fishstrap',
    title: 'Fishstrap Bootstrapper',
    subtitle: 'Popular open-source Bloxstrap fork with built-in multi-instance toggle',
    difficulty: 'Beginner',
    safety: 'Safe',
    tool: 'Fishstrap (GitHub open source)',
    maxInstances: '10+',
    pros: [
      'One-click toggle in settings — no scripts needed',
      'Actively maintained (511+ stars, regular releases)',
      'Completely open source — auditable on GitHub',
      'Bonus features: FPS unlock, rich presence, flag editor',
      'Handles mutex management automatically in the background',
    ],
    cons: [
      'Requires installing a custom bootstrapper',
      'Unsigned app may trigger Windows SmartScreen (safe to bypass)',
      'Replaces the official Roblox bootstrapper',
    ],
    steps: [
      {
        title: 'Download Fishstrap',
        description: 'Download only from the official GitHub repo or fishstrap.app. Never use unofficial mirrors — credential stealers often masquerade as bootstrappers.',
        code: `# Official GitHub (ONLY trusted source):
https://github.com/fishstrap/fishstrap/releases/latest
# Official website:
https://www.fishstrap.app`,
      },
      {
        title: 'Install Fishstrap',
        description: 'Run FishstrapSetup.exe. If Windows SmartScreen shows "Windows Protected Your PC": click "More info" → "Run anyway". This is a false positive on unsigned apps.',
        warning: 'SmartScreen warning does NOT mean the file is malicious. Fishstrap is open source — you can verify the source code yourself at github.com/fishstrap/fishstrap',
      },
      {
        title: 'Open Fishstrap Settings',
        description: 'Fishstrap installs to your Start Menu and system tray. Open the Settings window from the tray icon or Start Menu.',
      },
      {
        title: 'Enable Multi-Instance Launching',
        description: 'Navigate to the "Behaviour" tab in Fishstrap Settings. Find "Allow multi-instance launching" and toggle it ON. Save and close settings.',
      },
      {
        title: 'Launch multiple instances',
        description: 'Open roblox.com in multiple browser windows/tabs (each logged into different accounts) and click Play on each. Each instance opens independently without closing the others.',
      },
    ],
    link: 'https://github.com/fishstrap/fishstrap/releases/latest',
    notes: 'Fishstrap v3.x is the current recommended version (as of 2026). Do not use Bloxstrap for multi-instance — its multi-instance feature was removed. Fishstrap is the maintained fork with this feature.',
  },

  // ── METHOD 6 ────────────────────────────────────────────────
  {
    id: 'multibloxy',
    title: 'MultiBloxy System Tray App',
    subtitle: 'Lightweight tray app that pre-claims the mutex — 3 MB RAM, 0% CPU',
    difficulty: 'Beginner',
    safety: 'Caution',
    tool: 'MultiBloxy (GitHub)',
    maxInstances: '10+',
    pros: [
      'Extremely lightweight — 3 MB RAM, 0% CPU idle',
      'Single .exe — no installation needed',
      'System tray icon with pause/resume controls',
      'Works alongside Bloxstrap and the original Roblox bootstrapper',
    ],
    cons: [
      'Roblox is actively patching anti-MultiBloxy measures',
      'May stop working after Roblox client updates',
      'Check GitHub issue tracker before relying on it',
      'Unsigned exe may trigger SmartScreen',
    ],
    steps: [
      {
        title: 'Download MultiBloxy from official GitHub',
        description: 'ONLY download from the official GitHub repository. Do NOT use third-party sites claiming to host MultiBloxy — many are credential stealers.',
        code: `# ONLY official source:
https://github.com/Zgoly/MultiBloxy/releases/latest`,
      },
      {
        title: '(Optional) Set to auto-start with Windows',
        description: 'Press Win + R, paste the path below, press Enter, then drag MultiBloxy.exe into the opened folder.',
        code: `%ALLUSERSPROFILE%\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp`,
      },
      {
        title: 'Run MultiBloxy.exe',
        description: 'Double-click MultiBloxy.exe. A tray icon appears in the taskbar. If SmartScreen appears: click "More info" → "Run anyway".',
        warning: 'Note: As of late 2025, Roblox has been deploying updates specifically targeting MultiBloxy. Check github.com/Zgoly/MultiBloxy/issues for current working status before proceeding.',
      },
      {
        title: 'Launch Roblox instances',
        description: 'Open Roblox through roblox.com as many times as needed. MultiBloxy intercepts each mutex check, allowing all instances to coexist.',
      },
    ],
    link: 'https://github.com/Zgoly/MultiBloxy/releases/latest',
    notes: 'Check the GitHub issues page before using MultiBloxy — Roblox has been actively patching it since late 2024. If issues show recent "not working" reports, use the PowerShell Mutex or Fishstrap method instead.',
  },

  // ── METHOD 7 ────────────────────────────────────────────────
  {
    id: 'windows-sandbox',
    title: 'Windows Sandbox (Isolated Container)',
    subtitle: 'Run Roblox in a completely isolated Windows environment — undetectable as same device',
    difficulty: 'Intermediate',
    safety: 'Safe',
    tool: 'Windows Sandbox (Windows 10/11 Pro/Enterprise)',
    maxInstances: '2–3',
    pros: [
      'True hardware-level isolation — separate OS kernel session',
      'Roblox cannot detect the sandbox as same device',
      'Auto-wipes on close — zero persistent data',
      'Uses Windows hypervisor (official Microsoft feature)',
      'Each sandbox session appears as a brand new device',
    ],
    cons: [
      'Requires Windows 10/11 Pro or Enterprise (not Home)',
      'Each sandbox needs ~4 GB RAM',
      'Must reinstall Roblox inside sandbox every session (auto-wiped)',
      'Limited to 2–3 instances due to RAM requirements',
      'Hardware virtualization must be enabled in BIOS',
    ],
    steps: [
      {
        title: 'Enable Windows Sandbox',
        description: 'Open PowerShell as Administrator and run the command below, then restart your PC. Requires Windows 10/11 Pro or Enterprise.',
        code: `# Enable Windows Sandbox (run as Administrator, then restart):
Enable-WindowsOptionalFeature -Online -FeatureName "Containers-DisposableClientVM" -All

# Alternative: Control Panel → Turn Windows features on or off
# → Check "Windows Sandbox" → OK → Restart`,
      },
      {
        title: 'Verify virtualization is enabled',
        description: 'Open Task Manager → Performance tab → CPU. Check that "Virtualization" shows "Enabled". If not, enter your BIOS/UEFI settings and enable Intel VT-x or AMD-V.',
      },
      {
        title: 'Create a .wsb configuration file (optional)',
        description: 'Create a file named "RobloxSandbox.wsb" to auto-configure the sandbox with optimal settings for Roblox.',
        code: `<Configuration>
  <VGpu>Enable</VGpu>
  <Networking>Enable</Networking>
  <LogonCommand>
    <Command>cmd /c start https://www.roblox.com/</Command>
  </LogonCommand>
</Configuration>`,
      },
      {
        title: 'Launch Windows Sandbox',
        description: 'Search "Windows Sandbox" in Start Menu and launch it. A new Windows desktop appears inside a window. This is a completely isolated OS instance.',
      },
      {
        title: 'Install Roblox inside the sandbox',
        description: 'Inside the sandbox window, open Edge, go to roblox.com, log in with an alt account, and click Play on a game. The Roblox installer runs inside the sandbox — completely isolated from your main Roblox install.',
        warning: 'Remember: Everything inside Windows Sandbox is wiped when you close it. You will need to re-install Roblox each sandbox session unless you use a persistent .wsb config.',
      },
      {
        title: 'Use both instances simultaneously',
        description: 'Your main Windows account runs Roblox normally. The Windows Sandbox window runs a separate Roblox instance. They are 100% isolated — different device fingerprints, different sessions.',
      },
    ],
    notes: 'Windows Sandbox uses Hyper-V technology. Each sandbox session gets a different hardware profile, making this the most "undetectable" method from Roblox\'s perspective. Major limitation: data is wiped each session.',
  },

  // ── METHOD 8 ────────────────────────────────────────────────
  {
    id: 'separate-windows-user',
    title: 'Separate Windows User Account',
    subtitle: 'Run Roblox as a different Windows user — each session has its own mutex namespace',
    difficulty: 'Intermediate',
    safety: 'Safe',
    tool: 'Windows User Accounts (built-in)',
    maxInstances: '3–5',
    pros: [
      'No third-party software required',
      'Each Windows user has a completely separate mutex namespace',
      'No script must stay running in background',
      'Persistent — works across reboots without setup',
      'Stable — not affected by Roblox mutex patches',
    ],
    cons: [
      'Requires creating additional Windows user accounts',
      'Must use "Run as different user" for each extra instance',
      'Slightly complex initial setup',
      'Multiple Windows user profiles use more disk space',
    ],
    steps: [
      {
        title: 'Create a new Windows local user account',
        description: 'Open Settings → Accounts → Family & other users → Add someone else. Create a local account (no Microsoft account needed). Name it something like "RobloxAlt1".',
        code: `# Or via Command Prompt as Administrator:
net user RobloxAlt1 Password123 /add
net localgroup Users RobloxAlt1 /add`,
      },
      {
        title: 'Launch Roblox as your main user normally',
        description: 'Open Roblox on your main Windows account as usual. Log in with Account 1 and join a game.',
      },
      {
        title: 'Open Roblox as the alternate Windows user',
        description: 'Hold SHIFT and right-click the Roblox shortcut (or the .exe in its install folder) → "Run as different user". Enter the credentials for RobloxAlt1.',
        code: `# Alternatively, use runas command in CMD:
runas /user:RobloxAlt1 "C:\\Users\\YourName\\AppData\\Local\\Roblox\\Versions\\version-XXXX\\RobloxPlayerBeta.exe"

# Or launch via PowerShell:
Start-Process "C:\\Users\\YourName\\AppData\\Local\\Roblox\\Versions\\version-XXXX\\RobloxPlayerBeta.exe" -Credential (Get-Credential)`,
        warning: 'The Roblox install path contains the version folder — replace "version-XXXX" with your actual version folder name. Find it in %LocalAppData%\\Roblox\\Versions.',
      },
      {
        title: 'Log in and join a game as the alternate user',
        description: 'A new Roblox window opens running under the RobloxAlt1 Windows session. Log in with Roblox Account 2. Because each Windows user has separate mutex namespaces, ROBLOX_singletonEvent from Account 1 is invisible to the Account 2 instance.',
      },
      {
        title: 'Repeat for additional accounts',
        description: 'Create more Windows user accounts (RobloxAlt2, etc.) and repeat. Each "runas" session is in a fully separate Windows user space — the mutex cannot cross user boundaries.',
      },
    ],
    notes: 'This is one of the most stable methods because Windows user session boundaries completely isolate named kernel objects. The mutex that Roblox creates under your main user account is invisible to other user sessions.',
  },

  // ── METHOD 9 ────────────────────────────────────────────────
  {
    id: 'android-emulator',
    title: 'Android Emulator (Mobile Roblox)',
    subtitle: 'Run Roblox Mobile in isolated virtual Android devices — best for 10–30+ instances',
    difficulty: 'Advanced',
    safety: 'Safe',
    tool: 'MuMu Player 12 / LDPlayer / BlueStacks',
    maxInstances: '30+',
    pros: [
      'True device-level isolation — each emulator = separate device',
      'Most scalable method: 10–30+ instances on strong hardware',
      'Roblox mutex isolation is irrelevant — separate Android VMs',
      'Built-in multi-instance manager in MuMu and LDPlayer',
      'Synchronizer feature to mirror inputs across all instances',
    ],
    cons: [
      'High RAM: 2–4 GB per instance',
      'Some Roblox games detect emulated environments',
      'Mobile UI differs from PC client',
      'Complex setup for first-time users',
      'Requires hardware virtualization (VT-x/AMD-V) in BIOS',
    ],
    steps: [
      {
        title: 'Download a reputable Android emulator',
        description: 'Use only well-known emulators from their official websites. Avoid random emulators from app stores or unknown sites.',
        code: `# Recommended emulators (official sites only):
MuMu Player 12: https://www.mumuplayer.com/
LDPlayer 9:     https://www.ldplayer.net/
BlueStacks 5:   https://www.bluestacks.com/`,
      },
      {
        title: 'Enable hardware virtualization in BIOS',
        description: 'Restart your PC, enter BIOS (usually F2/DEL key), and enable Intel VT-x or AMD-V. This is required for Android emulators. Check Task Manager → Performance → CPU to verify "Virtualization: Enabled".',
      },
      {
        title: 'Open the Multi-Instance Manager',
        description: 'In MuMu Player or LDPlayer, find the "Multi-Instance Manager" or "Multi-Drive" tool. Create 2–10+ separate virtual device instances. Each acts as a fully independent Android phone.',
        code: `# Per-instance allocation recommendations:
RAM per instance:   2048 MB (minimum) / 4096 MB (ideal)
CPU cores per:      2 cores
Graphics mode:      OpenGL or Vulkan
Screen resolution:  1280x720 (lower = better performance)`,
      },
      {
        title: 'Install Roblox in each instance',
        description: 'Inside each emulator instance, open the Google Play Store and install the Roblox app. Log in with a different Roblox account in each instance.',
      },
      {
        title: 'Configure Roblox performance settings',
        description: 'Inside each Roblox instance, go to Settings → Graphics → set to Manual Level 1. This dramatically reduces CPU/RAM usage and allows more instances to run simultaneously.',
      },
      {
        title: 'Launch all instances',
        description: 'Start all emulator instances simultaneously. Use the Synchronizer feature in MuMu to mirror tap inputs across instances if you want synchronized AFK farming.',
        warning: 'Some Roblox games (especially those with Byfron anti-cheat) may detect emulator environments and show a "cannot run in virtual machine" error. Test your specific target game first.',
      },
    ],
    notes: 'Best emulator for Roblox multi-instance in 2026: MuMu Player 12 (best performance/compatibility) and LDPlayer 9 (best for high instance counts). BlueStacks works but uses more resources.',
  },

  // ── METHOD 10 ────────────────────────────────────────────────
  {
    id: 'virtual-machine',
    title: 'Full Virtual Machine (VirtualBox / VMware)',
    subtitle: 'Run a complete second Windows OS inside your PC — maximum isolation',
    difficulty: 'Advanced',
    safety: 'Safe',
    tool: 'VirtualBox (free) or VMware Workstation',
    maxInstances: '2–4',
    pros: [
      'Complete OS-level isolation — separate Windows instance',
      'Completely separate hardware fingerprint',
      'Persistent across sessions (unlike Windows Sandbox)',
      'Most powerful isolation method available',
      'VM snapshots let you restore clean states instantly',
    ],
    cons: [
      'Very high resource usage: 4–8 GB RAM per VM',
      'Roblox (Byfron/Hyperion) actively detects common VMs',
      'Requires anti-detection steps to bypass Hyperion in a VM',
      'Complex setup — not recommended for beginners',
      'May require a second Windows license',
    ],
    steps: [
      {
        title: 'Install VirtualBox (free)',
        description: 'Download VirtualBox from the official Oracle website. Install the VirtualBox Extension Pack for better performance.',
        code: `# Official download:
https://www.virtualbox.org/wiki/Downloads
# VMware (paid but better performance):
https://www.vmware.com/products/workstation-player.html`,
      },
      {
        title: 'Create a new Windows VM',
        description: 'Create a new VM with: Windows 10/11 64-bit, 8+ GB RAM, 4 CPU cores, 60+ GB storage. Use a fresh Windows ISO from Microsoft.',
        code: `# Download official Windows 11 ISO:
https://www.microsoft.com/software-download/windows11`,
      },
      {
        title: 'Apply anti-detection settings (CRITICAL)',
        description: 'Roblox\'s Hyperion anti-cheat detects VMs. Apply these VBoxManage commands BEFORE first boot to hide VM signatures:',
        code: `# Run these in CMD on your HOST PC (replace "YourVMName"):
# These commands hide VirtualBox signatures from guest OS

VBoxManage modifyvm "YourVMName" --cpuidset 00000001 000106e5 00080800 00000001 178bfbff
VBoxManage modifyvm "YourVMName" --cpu-profile "Intel Core i7-6700K"
VBoxManage modifyvm "YourVMName" --biosuuid "YOUR-RANDOM-UUID"
VBoxManage modifyvm "YourVMName" --biosvendor "American Megatrends Inc."
VBoxManage modifyvm "YourVMName" --biosproduct "B550 AORUS PRO AX"
VBoxManage setextradata "YourVMName" "VBoxInternal/Devices/VMMDev/0/Config/GetHostTimeDisabled" "1"

# Generate a random UUID in PowerShell:
[guid]::NewGuid().ToString()`,
        warning: 'Do NOT install VirtualBox Guest Additions — these are the #1 VM detection vector. Without them, you lose clipboard sharing and seamless mouse, but Roblox is less likely to detect the VM.',
      },
      {
        title: 'Install Windows and Roblox inside the VM',
        description: 'Boot the VM and install Windows. Then go to roblox.com inside the VM and install Roblox. Log in with an alt account.',
      },
      {
        title: 'Remove virtual hardware traces inside VM',
        description: 'Inside the VM, open Device Manager and update drivers to hide virtual hardware. Also apply registry tweaks to further obscure VM artifacts.',
        code: `# Inside the VM — run in Admin PowerShell:
# Remove VirtualBox display adapter name from registry
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Video\\{*}\\0000" /v "HardwareInformation.AdapterString" /d "Intel(R) UHD Graphics 630" /f

# Check for VM artifacts:
Get-WmiObject -Class Win32_ComputerSystemProduct | Select-Object -ExpandProperty Name`,
      },
    ],
    notes: 'VMs with Roblox are difficult due to Byfron/Hyperion anti-cheat. Many games will show "Cannot run in a virtual machine." This method works best for games that only use Roblox\'s built-in anti-cheat (not Byfron). KVM/QEMU with hardware passthrough has the best success rate for anti-detection but requires advanced Linux knowledge.',
  },

  // ── METHOD 11 ────────────────────────────────────────────────
  {
    id: 'browser-profiles',
    title: 'Multiple Browser Profiles / Incognito',
    subtitle: 'Use different browsers or incognito modes — each runs a separate Roblox web session',
    difficulty: 'Beginner',
    safety: 'Safe',
    tool: 'Chrome, Edge, Firefox, Brave (built-in)',
    maxInstances: '4–6',
    pros: [
      'No tools, no scripts, no installs needed',
      'Absolutely zero risk — no system modification',
      'Works on any Windows version',
      'Each browser profile is a separate session',
    ],
    cons: [
      'Only works if Roblox launches in-browser (not store app)',
      'Each browser instance uses significant RAM',
      'Limited to how many browsers/profiles you have',
      'Some functionality differs in browser-launched Roblox',
    ],
    steps: [
      {
        title: 'Set up browser profiles or use different browsers',
        description: 'Use a different browser for each account: Chrome for Account 1, Edge for Account 2, Firefox for Account 3, Brave for Account 4. Alternatively, use incognito/private mode to create isolated sessions in the same browser.',
        code: `# Browser download links:
Chrome:  https://www.google.com/chrome/
Edge:    Built into Windows
Firefox: https://www.mozilla.org/firefox/
Brave:   https://brave.com/

# Chrome profiles: Menu (⋮) → Profiles → Add Profile
# Creates isolated cookie/session environments per profile`,
      },
      {
        title: 'Log into different Roblox accounts in each browser',
        description: 'Open each browser, go to roblox.com, and log in with a different Roblox account in each. Browser profiles and different browsers maintain completely separate login sessions.',
      },
      {
        title: 'Join games in each browser',
        description: 'In each browser, navigate to a game and click Play. Each will launch a Roblox player instance. Because they\'re separate browser sessions, Roblox treats each as a unique client.',
        warning: 'This method works best when using the browser-launched Roblox player (not the Microsoft Store app). If only one account launches the game, the ROBLOX_singletonEvent mutex may still block others — combine with the PowerShell mutex method for reliability.',
      },
    ],
    notes: 'Best used in combination with the PowerShell mutex method. The browser method handles account session isolation; the mutex method handles the Windows-level instance restriction.',
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
  '#00ffff', '#00ff88', '#ff6b6b', '#ffd93d', '#a855f7', '#3b82f6', '#f97316', '#ec4899',
  '#06b6d4', '#10b981', '#f59e0b', '#ef4444',
]
