
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
    subtitle: 'Create ROBLOX_singletonEvent AND ROBLOX_singletonMutex before Roblox does — cleanest script method',
    difficulty: 'Beginner',
    safety: 'Safe',
    tool: 'PowerShell (built-in Windows)',
    maxInstances: '10+',
    pros: [
      'No third-party software required',
      'Works reliably on Windows 10 and 11',
      'No antivirus flags — pure Windows .NET API',
      'Claims BOTH singleton handles (Event + Mutex)',
      'Persists as long as the PowerShell window stays open',
      'Can be set to auto-start on login via Task Scheduler',
    ],
    cons: [
      'PowerShell window must remain open in background',
      'Needs to be running BEFORE Roblox launches',
      'Roblox may add additional detection in future updates',
    ],
    steps: [
      {
        title: 'Understand what to claim',
        description: 'Roblox actually uses TWO kernel objects for singleton enforcement: ROBLOX_singletonEvent (a named Event) and ROBLOX_singletonMutex (a named Mutex). The updated script claims BOTH to ensure maximum compatibility with all Roblox versions.',
        code: `# Roblox singleton handles (as of 2025-2026):
# 1. ROBLOX_singletonEvent   — Named Event object
# 2. ROBLOX_singletonMutex   — Named Mutex object
# 3. Global\\ROBLOX_singletonEvent  — Global namespace variant
# 4. \\Sessions\\1\\BaseNamedObjects\\ROBLOX_singletonEvent — Session variant
# Our script claims all of these.`,
      },
      {
        title: 'Open PowerShell as Administrator',
        description: 'Press Win + X → select "Windows PowerShell (Admin)" or "Terminal (Admin)". Administrator rights are required to hold named system kernel objects across sessions.',
      },
      {
        title: 'Run the Full Mutex + Event Pre-Claim Script',
        description: 'Paste the full script below into the Admin PowerShell window and press Enter. It claims ROBLOX_singletonEvent (Event) AND ROBLOX_singletonMutex (Mutex) across both standard and Global namespaces.',
        code: [
          '# MultiRBX -- Full Singleton Pre-Claim Script v3',
          '# Claims: ROBLOX_singletonEvent + ROBLOX_singletonMutex',
          '# Run as Administrator. Keep this window open while gaming.',
          '',
          'Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force',
          '',
          'Add-Type -TypeDefinition @"',
          'using System;',
          'using System.Threading;',
          'using System.Runtime.InteropServices;',
          '',
          'public class MultiRBXFull {',
          '    [DllImport("kernel32.dll", SetLastError = true)]',
          '    public static extern IntPtr CreateMutex(IntPtr a, bool b, string name);',
          '',
          '    [DllImport("kernel32.dll", SetLastError = true)]',
          '    public static extern IntPtr CreateEvent(IntPtr a, bool bManualReset, bool bInitialState, string name);',
          '',
          '    public static void ClaimAll() {',
          '        // Claim the Mutex variant',
          '        IntPtr m1 = CreateMutex(IntPtr.Zero, true, "ROBLOX_singletonMutex");',
          '        IntPtr m2 = CreateMutex(IntPtr.Zero, true, @"Global\\ROBLOX_singletonMutex");',
          '        // Claim the Event variant',
          '        IntPtr e1 = CreateEvent(IntPtr.Zero, true, true, "ROBLOX_singletonEvent");',
          '        IntPtr e2 = CreateEvent(IntPtr.Zero, true, true, @"Global\\ROBLOX_singletonEvent");',
          '        if (m1 != IntPtr.Zero) Console.WriteLine("[OK] Claimed: ROBLOX_singletonMutex");',
          '        if (m2 != IntPtr.Zero) Console.WriteLine("[OK] Claimed: Global\\\\ROBLOX_singletonMutex");',
          '        if (e1 != IntPtr.Zero) Console.WriteLine("[OK] Claimed: ROBLOX_singletonEvent");',
          '        if (e2 != IntPtr.Zero) Console.WriteLine("[OK] Claimed: Global\\\\ROBLOX_singletonEvent");',
          '    }',
          '}',
          '"@',
          '',
          'Clear-Host',
          'Write-Host "======================================================" -ForegroundColor DarkCyan',
          'Write-Host "  MultiRBX Full Singleton Holder v3 -- Active" -ForegroundColor Cyan',
          'Write-Host "======================================================" -ForegroundColor DarkCyan',
          'Write-Host ""',
          '[MultiRBXFull]::ClaimAll()',
          'Write-Host ""',
          'Write-Host "[READY] Launch Roblox instances NOW" -ForegroundColor Green',
          'Write-Host "[INFO]  Keep this window open the entire session" -ForegroundColor Yellow',
          'Write-Host "[INFO]  Press CTRL+C when finished to release all handles" -ForegroundColor DarkGray',
          'Write-Host ""',
          '$t = 0',
          'while ($true) {',
          '    Start-Sleep -Seconds 5',
          '    $t += 5',
          '    Write-Host -NoNewline ("' + '`r' + '[RUNNING] $([math]::Floor($t/60))m $($t%60)s elapsed -- all singletons held... ")',
          '}',
        ].join('\n'),
      },
      {
        title: 'Launch Roblox instances',
        description: 'Open roblox.com in your browser, log in with Account 1, and join a game. Keep the game window open. Log OUT on the website (keep game open), log in as Account 2, join a game. Repeat for each account.',
      },
      {
        title: 'When finished — stop the script',
        description: 'Press CTRL+C in the PowerShell window to release all claimed handles. You can also just close the window.',
      },
    ],
    notes: 'Updated v3 script claims all 4 singleton handles: ROBLOX_singletonMutex, ROBLOX_singletonEvent, and their Global\\ namespace variants. This covers both the Mutex and Event that Fishstrap/Roblox documentation confirms are in use as of 2026.',
  },

  // ── METHOD 3 ────────────────────────────────────────────────
  {
    id: 'duplicate-handle-native',
    title: 'DuplicateHandle Native API (No External Tools)',
    subtitle: 'Use Windows NtQuerySystemInformation + DuplicateHandle to force-close singleton handles cross-process',
    difficulty: 'Intermediate',
    safety: 'Safe',
    tool: 'PowerShell (Windows .NET / kernel32.dll)',
    maxInstances: '10+',
    pros: [
      'No external tools required — pure Windows API',
      'Closes handles IN the Roblox process — most direct method',
      'Closes both ROBLOX_singletonEvent AND ROBLOX_singletonMutex',
      'Works even when Roblox is already running',
      'Most reliable active-close technique',
      'Does not require handle.exe or Process Explorer',
    ],
    cons: [
      'Requires Admin privileges (SeDebugPrivilege)',
      'More complex PowerShell code than pre-claim method',
      'Must be run AFTER Roblox is already running in a game',
      'Roblox may recreate handles; run again for each new instance',
    ],
    steps: [
      {
        title: 'Understand how DuplicateHandle close works',
        description: 'The technique: (1) Open Roblox process with PROCESS_DUP_HANDLE access. (2) Enumerate ALL system handles with NtQuerySystemInformation(SystemHandleInformation). (3) For each handle belonging to the Roblox PID, duplicate it to get a local copy. (4) Query the name via NtQueryObject to identify singleton handles. (5) Call DuplicateHandle(..., DUPLICATE_CLOSE_SOURCE) which closes the handle IN the target process.',
        code: `# Why this works:
# DuplicateHandle with DUPLICATE_CLOSE_SOURCE = 0x00000001
# Forces the SOURCE process (Roblox) to close the handle.
# No need for external tools — just kernel32.dll + ntdll.dll.`,
      },
      {
        title: 'Launch Roblox with Account 1 first',
        description: 'Open roblox.com, log in with Account 1, and join a game. Wait until fully loaded. Note: the handle-close script runs AFTER Roblox is running.',
      },
      {
        title: 'Run the DuplicateHandle Close Script',
        description: 'Run this PowerShell script as Administrator. It enumerates all Roblox handles, identifies both ROBLOX_singletonEvent and ROBLOX_singletonMutex by name, then force-closes them using DuplicateHandle with DUPLICATE_CLOSE_SOURCE.',
        code: [
          '# MultiRBX -- Native DuplicateHandle Close Script',
          '# Uses kernel32.dll NtQuerySystemInformation + DuplicateHandle',
          '# Closes handles IN the Roblox process -- no external tools needed',
          '# Run as Administrator AFTER Roblox is running in-game',
          '',
          'Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force',
          '',
          'Add-Type -TypeDefinition @"',
          'using System;',
          'using System.Runtime.InteropServices;',
          'using System.Collections.Generic;',
          '',
          'public class RblxHandleCloser {',
          '    [DllImport("kernel32.dll")] static extern IntPtr OpenProcess(uint access, bool inh, uint pid);',
          '    [DllImport("kernel32.dll")] static extern bool CloseHandle(IntPtr h);',
          '    [DllImport("kernel32.dll")] static extern bool DuplicateHandle(',
          '        IntPtr srcProc, IntPtr srcHandle, IntPtr tgtProc,',
          '        out IntPtr tgtHandle, uint access, bool inh, uint opts);',
          '    [DllImport("ntdll.dll")] static extern int NtQuerySystemInformation(',
          '        int cls, IntPtr buf, uint sz, out uint ret);',
          '    [DllImport("ntdll.dll")] static extern int NtQueryObject(',
          '        IntPtr h, int cls, IntPtr buf, uint sz, out uint ret);',
          '',
          '    const uint PROCESS_DUP_HANDLE = 0x0040;',
          '    const uint DUPLICATE_CLOSE_SOURCE = 0x00000001;',
          '    const uint DUPLICATE_SAME_ACCESS  = 0x00000002;',
          '    const int  SystemHandleInformation = 16;',
          '',
          '    static string[] SINGLETON_NAMES = {',
          '        "ROBLOX_singletonEvent",',
          '        "ROBLOX_singletonMutex",',
          '        "roblox_singletonevent",',
          '        "roblox_singletonmutex"',
          '    };',
          '',
          '    public static int CloseRobloxSingletons(int pid) {',
          '        IntPtr srcProc = OpenProcess(PROCESS_DUP_HANDLE, false, (uint)pid);',
          '        if (srcProc == IntPtr.Zero) return -1;',
          '        IntPtr self = (IntPtr)(-1);',
          '        int closed = 0;',
          '        try {',
          '            uint bufSz = 0x100000;',
          '            while (true) {',
          '                IntPtr buf = Marshal.AllocHGlobal((int)bufSz);',
          '                try {',
          '                    uint ret;',
          '                    int status = NtQuerySystemInformation(SystemHandleInformation, buf, bufSz, out ret);',
          '                    if (status == unchecked((int)0xC0000004)) { // STATUS_INFO_LENGTH_MISMATCH',
          '                        bufSz = ret + 0x10000; Marshal.FreeHGlobal(buf); continue;',
          '                    }',
          '                    if (status != 0) break;',
          '                    int count = Marshal.ReadInt32(buf);',
          '                    IntPtr entry = buf + 4; // offset past count',
          '                    for (int i = 0; i < count; i++, entry += 16) {',
          '                        int entryPid = Marshal.ReadInt16(entry + 4);',
          '                        if (entryPid != pid) continue;',
          '                        IntPtr hval = (IntPtr)Marshal.ReadInt16(entry + 6);',
          '                        IntPtr dup = IntPtr.Zero;',
          '                        if (!DuplicateHandle(srcProc, hval, self, out dup, 0, false, DUPLICATE_SAME_ACCESS)) continue;',
          '                        try {',
          '                            uint nameSz = 512;',
          '                            IntPtr nameBuf = Marshal.AllocHGlobal((int)nameSz);',
          '                            try {',
          '                                uint nameRet;',
          '                                if (NtQueryObject(dup, 1, nameBuf, nameSz, out nameRet) == 0) {',
          '                                    short len = Marshal.ReadInt16(nameBuf);',
          '                                    IntPtr ptr = Marshal.ReadIntPtr(nameBuf + 4);',
          '                                    if (len > 0 && ptr != IntPtr.Zero) {',
          '                                        string name = Marshal.PtrToStringUni(ptr, len / 2);',
          '                                        foreach (string s in SINGLETON_NAMES) {',
          '                                            if (name.IndexOf(s, StringComparison.OrdinalIgnoreCase) >= 0) {',
          '                                                IntPtr dummy;',
          '                                                if (DuplicateHandle(srcProc, hval, self, out dummy, 0, false, DUPLICATE_CLOSE_SOURCE)) {',
          '                                                    if (dummy != IntPtr.Zero) CloseHandle(dummy);',
          '                                                    closed++;',
          '                                                    Console.WriteLine("[CLOSED] " + name + " in PID " + pid);',
          '                                                }',
          '                                                break;',
          '                                            }',
          '                                        }',
          '                                    }',
          '                                }',
          '                            } finally { Marshal.FreeHGlobal(nameBuf); }',
          '                        } finally { CloseHandle(dup); }',
          '                    }',
          '                } finally { Marshal.FreeHGlobal(buf); }',
          '                break;',
          '            }',
          '        } finally { CloseHandle(srcProc); }',
          '        return closed;',
          '    }',
          '}',
          '"@',
          '',
          'Clear-Host',
          'Write-Host "MultiRBX -- Native DuplicateHandle Closer" -ForegroundColor Cyan',
          'Write-Host "Searching for Roblox processes..." -ForegroundColor DarkGray',
          '',
          '$procs = Get-Process -Name "RobloxPlayerBeta" -ErrorAction SilentlyContinue',
          'if (-not $procs) {',
          '    Write-Host "[ERROR] No Roblox process found. Launch Roblox first." -ForegroundColor Red',
          '    Read-Host "Press Enter to exit"; exit 1',
          '}',
          '',
          '$total = 0',
          'foreach ($p in $procs) {',
          '    Write-Host "[INFO]  Processing PID: $($p.Id)" -ForegroundColor Yellow',
          '    $n = [RblxHandleCloser]::CloseRobloxSingletons($p.Id)',
          '    if ($n -lt 0) {',
          '        Write-Host "[WARN]  Could not open PID $($p.Id) -- try running as Admin" -ForegroundColor Red',
          '    } elseif ($n -eq 0) {',
          '        Write-Host "[INFO]  No singleton handles found in PID $($p.Id) (already clear?)" -ForegroundColor DarkGray',
          '    } else {',
          '        Write-Host "[OK]    Closed $n handle(s) in PID $($p.Id)" -ForegroundColor Green',
          '        $total += $n',
          '    }',
          '}',
          '',
          'Write-Host ""',
          'if ($total -gt 0) {',
          '    Write-Host "[DONE]  Closed $total singleton handle(s) total." -ForegroundColor Green',
          '    Write-Host "[NEXT]  Log out on roblox.com, log in as Account 2, join a game." -ForegroundColor Cyan',
          '} else {',
          '    Write-Host "[WARN]  No handles closed. Make sure Roblox is in-game (not loading screen)." -ForegroundColor Yellow',
          '}',
          'Read-Host "Press Enter to exit"',
        ].join('\n'),
      },
      {
        title: 'Launch Account 2',
        description: 'After the script reports handles closed, log out on roblox.com (keep the game window open), log in with Account 2, and join a game. A second Roblox instance opens.',
      },
      {
        title: 'Repeat for each additional instance',
        description: 'Each time you launch a new Roblox instance, run the script again to close the singleton handles in the new process PID. The script targets ALL running RobloxPlayerBeta.exe processes automatically.',
      },
    ],
    notes: 'This is the same technique used by unknownperson-vos/MultiBlox (Python) and dat514/Multi-Roblox-Tab. The DUPLICATE_CLOSE_SOURCE flag tells Windows to close the handle in the SOURCE process (Roblox) as part of the DuplicateHandle call — no injection required.',
  },

  // ── METHOD 4 ────────────────────────────────────────────────
  {
    id: 'handle-sysinternals',
    title: 'Sysinternals Handle.exe (Auto-Close Loop)',
    subtitle: 'Uses Microsoft Handle.exe to detect and auto-close BOTH singleton handles as soon as they appear',
    difficulty: 'Intermediate',
    safety: 'Safe',
    tool: 'Microsoft Handle.exe + PowerShell',
    maxInstances: '10+',
    pros: [
      'Completely automated — no manual steps after setup',
      'Uses official Microsoft Sysinternals tool (Handle.exe)',
      'Closes BOTH ROBLOX_singletonEvent AND ROBLOX_singletonMutex',
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
        description: 'Download the official Sysinternals Handle tool from Microsoft. Extract the ZIP and note the path to handle64.exe.',
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
        description: 'Open PowerShell as Administrator, set the $HandleExe path to where you saved handle64.exe, then run the script. It watches for BOTH ROBLOX_singletonEvent AND ROBLOX_singletonMutex and closes them the moment Roblox creates either.',
        code: `# MultiRBX -- Handle.exe Auto-Close Loop (closes Event + Mutex)
# Based on: github.com/Clayell/Roblox-Multi-Instance-Script
# Edit $HandleExe to match your download path!

$HandleExe = "C:\\Tools\\Handle\\handle64.exe"   # <-- EDIT THIS PATH

if (-not (Test-Path $HandleExe)) {
    Write-Host "[ERROR] handle64.exe not found at: $HandleExe" -ForegroundColor Red
    Read-Host "Press Enter to exit"; exit 1
}

& $HandleExe -accepteula 2>&1 | Out-Null
reg add "HKCU\\Software\\Sysinternals\\Handle" /v EulaAccepted /t REG_DWORD /d 1 /f | Out-Null

Write-Host "===============================" -ForegroundColor Cyan
Write-Host "  MultiRBX Handle.exe Watcher" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Cyan
Write-Host "[ACTIVE] Watching for singletons..." -ForegroundColor Green
Write-Host "[INFO]   Targets: ROBLOX_singletonEvent + ROBLOX_singletonMutex" -ForegroundColor Yellow
Write-Host "[INFO]   Press CTRL+C to stop." -ForegroundColor DarkGray
Write-Host ""

$logFile = "$PSScriptRoot\\multirblx_log.txt"
$TARGETS = @("ROBLOX_singletonEvent", "ROBLOX_singletonMutex")

while ($true) {
    try {
        $output = & $HandleExe -p RobloxPlayerBeta.exe -accepteula 2>&1
        foreach ($line in $output) {
            foreach ($target in $TARGETS) {
                if ($line -match [regex]::Escape($target)) {
                    if ($line -match "([0-9A-Fa-f]+):") {
                        $handleId = $Matches[1]
                        $ts = Get-Date -Format "HH:mm:ss"
                        Write-Host "[$ts] [FOUND] $target handle $handleId -- closing..." -ForegroundColor Yellow
                        & $HandleExe -p RobloxPlayerBeta.exe -c $handleId -y -accepteula 2>&1 | Out-Null
                        Write-Host "[$ts] [CLOSED] $target (#$handleId)" -ForegroundColor Green
                        Add-Content -Path $logFile -Value "[$ts] Closed $target handle: $handleId" -ErrorAction SilentlyContinue
                    }
                }
            }
        }
    } catch { }
    Start-Sleep -Milliseconds 500
}`,
      },
      {
        title: 'Launch Roblox instances freely',
        description: 'With the script running, open as many Roblox instances as you want. Each time Roblox tries to create either singleton handle, the script immediately closes it.',
      },
    ],
    link: 'https://learn.microsoft.com/en-us/sysinternals/downloads/handle',
    notes: 'Updated to close BOTH handles: ROBLOX_singletonEvent and ROBLOX_singletonMutex. Based on Clayell\'s GitHub script. Note: use handle64.exe (64-bit) not handle.exe (32-bit) for 64-bit Roblox.',
  },

  // ── METHOD 5 ────────────────────────────────────────────────
  {
    id: 'process-explorer',
    title: 'Process Explorer Handle Close (Manual)',
    subtitle: 'Use Microsoft\'s official Sysinternals GUI tool to close BOTH singleton handles manually',
    difficulty: 'Intermediate',
    safety: 'Safe',
    tool: 'Microsoft Process Explorer',
    maxInstances: '3–4',
    pros: [
      'Official Microsoft tool — zero malware risk',
      'No installation required (portable .exe)',
      'Visual GUI — you can see exactly what you\'re doing',
      'Works on both Event and Mutex handle types',
    ],
    cons: [
      'Manual process — must repeat for each new instance',
      'Must close BOTH handles for full coverage',
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
        title: 'Launch Roblox Instance 1 and enter a game',
        description: 'Open roblox.com in your browser, log in with Account 1, and join a game. Wait until you are fully loaded into the game world.',
      },
      {
        title: 'Close ROBLOX_singletonEvent',
        description: 'In Process Explorer\'s top pane, click on RobloxPlayerBeta.exe. In the lower pane, scroll to find "ROBLOX_singletonEvent" (type: Event). Right-click it → "Close Handle". Click OK on the warning.',
        warning: 'The warning dialog is normal — click OK. You are closing a handle that the process owns but no longer needs once we have bypassed the check.',
      },
      {
        title: 'Close ROBLOX_singletonMutex',
        description: 'Still in Process Explorer with RobloxPlayerBeta.exe selected, find "ROBLOX_singletonMutex" (type: Mutex) in the lower pane. Right-click → "Close Handle". This second handle is also used for singleton enforcement.',
        warning: 'You must close BOTH handles. Closing only the Event may not be sufficient with newer Roblox builds that also check the Mutex.',
      },
      {
        title: 'Log out on website — launch Account 2',
        description: 'Go to roblox.com, log out (keep the game window open!), log in as Account 2, click Play. A second instance launches. Repeat Steps 4–5 for each new instance.',
      },
    ],
    link: 'https://learn.microsoft.com/en-us/sysinternals/downloads/process-explorer',
    notes: 'Important update: Close BOTH ROBLOX_singletonEvent (type: Event) AND ROBLOX_singletonMutex (type: Mutex). Fishstrap\'s source code confirms Roblox checks ROBLOX_singletonMutex specifically for multi-instance prevention as of 2026.',
  },

  // ── METHOD 6 ────────────────────────────────────────────────
  {
    id: 'fishstrap',
    title: 'Fishstrap Bootstrapper',
    subtitle: 'Popular open-source Bloxstrap fork with built-in multi-instance watcher process',
    difficulty: 'Beginner',
    safety: 'Safe',
    tool: 'Fishstrap (GitHub open source)',
    maxInstances: '10+',
    pros: [
      'One-click toggle — no scripts or manual steps',
      'Actively maintained (511+ stars, regular 2026 releases)',
      'Open source and auditable on GitHub',
      'Launches a background watcher that holds ROBLOX_singletonMutex',
      'Bonus: FPS unlock, rich presence, FastFlag editor',
      'Compatible with Voidstrap and MultiBlox (Python)',
    ],
    cons: [
      'Requires installing a custom bootstrapper (replaces official)',
      'Unsigned app may trigger Windows SmartScreen (false positive)',
      'Slightly heavier than a standalone script',
    ],
    steps: [
      {
        title: 'Download Fishstrap (official GitHub only)',
        description: 'ONLY download from the official GitHub repo or fishstrap.app. Never use unofficial mirrors.',
        code: `# Official GitHub (ONLY trusted source):
https://github.com/fishstrap/fishstrap/releases/latest
# Official website:
https://www.fishstrap.app`,
      },
      {
        title: 'Install Fishstrap',
        description: 'Run FishstrapSetup.exe. If SmartScreen shows "Windows Protected Your PC": click "More info" → "Run anyway". This is a false positive — Fishstrap is open source.',
        warning: 'Fishstrap replaces the Roblox bootstrapper. You\'ll launch Roblox through Fishstrap from now on. You can uninstall and switch back at any time.',
      },
      {
        title: 'Enable Multi-Instance Launching',
        description: 'Open Fishstrap from Start Menu or tray icon → Settings → Behaviour tab → Toggle "Allow multi-instance launching" to ON. Save settings.',
      },
      {
        title: 'How Fishstrap\'s multi-instance works (technical)',
        description: 'When enabled, Fishstrap launches a separate background watcher process that acquires ROBLOX_singletonMutex before Roblox does. It waits for an EventWaitHandle named "Bloxstrap-MultiInstanceWatcherInitialisationFinished" to confirm the watcher is ready before Roblox starts. This ensures the mutex is held before Roblox can use it for singleton detection.',
        code: `# Fishstrap multi-instance watcher (from source code - LaunchHandler.cs):
# 1. Checks if ROBLOX_singletonMutex already exists
# 2. If not: launches "Fishstrap.exe --watcher" background process
# 3. Watcher acquires ROBLOX_singletonMutex with bInitialOwner=true
# 4. Watcher signals EventWaitHandle "Bloxstrap-MultiInstanceWatcherInitialisationFinished"
# 5. Bootstrapper waits up to 2 seconds for initialization
# 6. Roblox then starts and finds the mutex already claimed by watcher
# GitHub: github.com/fishstrap/fishstrap/blob/main/Bloxstrap/LaunchHandler.cs`,
      },
      {
        title: 'Launch multiple Roblox instances',
        description: 'Open roblox.com in multiple browser tabs/windows (each logged in to different accounts) and click Play on each. Each instance opens independently.',
      },
    ],
    link: 'https://github.com/fishstrap/fishstrap/releases/latest',
    notes: 'Fishstrap\'s DeepWiki technical documentation confirms the watcher process holds ROBLOX_singletonMutex. This is separate from ROBLOX_singletonEvent. Using a dedicated watcher process is more reliable than manual handle closing.',
  },

  // ── METHOD 7 ────────────────────────────────────────────────
  {
    id: 'voidstrap',
    title: 'Voidstrap Bootstrapper',
    subtitle: 'Another active Bloxstrap fork (194+ stars) with multi-instance support and advanced customization',
    difficulty: 'Beginner',
    safety: 'Safe',
    tool: 'Voidstrap (GitHub open source)',
    maxInstances: '10+',
    pros: [
      'Active fork with 194+ stars and 67 forks',
      'Regular releases (58+ releases as of 2026)',
      'Multi-instance launching included',
      'Advanced customization beyond Fishstrap',
      'Open source — auditable on GitHub',
      'Compatible with Fishstrap and MultiBlox (Python)',
    ],
    cons: [
      'Still in "early development" per their own README',
      'Some features may be unfinished',
      'Unsigned app triggers SmartScreen (expected)',
      'Less community documentation than Fishstrap',
    ],
    steps: [
      {
        title: 'Download Voidstrap from official GitHub only',
        description: 'Only download from the official voidstrap/Voidstrap repository. Their README specifically warns against unofficial sites.',
        code: `# Official GitHub only:
https://github.com/voidstrap/Voidstrap/releases/latest
# Official website:
https://voidstrapp.netlify.app`,
      },
      {
        title: 'Install Voidstrap',
        description: 'Run the Voidstrap installer. If SmartScreen warns you, click "More info" → "Run anyway" — this is a false positive for unsigned launchers.',
        warning: 'Voidstrap replaces the Roblox bootstrapper like Fishstrap and Bloxstrap. The multi-instance feature allows opening multiple Voidstrap tasks simultaneously. Each additional task uses some CPU overhead.',
      },
      {
        title: 'Launch Roblox through Voidstrap',
        description: 'Open Voidstrap from Start Menu. Log into different Roblox accounts in separate browser windows and click Play on each. Voidstrap handles the multi-instance management automatically.',
      },
      {
        title: 'Manage multiple Voidstrap tasks',
        description: 'Each Roblox instance runs under its own Voidstrap process in Task Manager. This is normal behavior. For many instances, the CPU overhead multiplies — keep instances reasonable for your hardware.',
      },
    ],
    link: 'https://github.com/voidstrap/Voidstrap/releases/latest',
    notes: 'Voidstrap is a three-way fork (Bloxstrap + Fishstrap + Voidstrap). It lists Fishstrap as a dependency. As of March 2026 it is at v1.1.0.3. An alternative to Fishstrap if you prefer its additional customization features.',
  },

  // ── METHOD 8 ────────────────────────────────────────────────
  {
    id: 'multibloxy',
    title: 'MultiBloxy System Tray App (Zgoly)',
    subtitle: 'Lightweight tray app that pre-claims the singleton — 3 MB RAM, 0% CPU',
    difficulty: 'Beginner',
    safety: 'Caution',
    tool: 'MultiBloxy (GitHub - Zgoly)',
    maxInstances: '10+',
    pros: [
      'Extremely lightweight — 3 MB RAM, 0% CPU idle',
      'Single .exe — no installation needed',
      'System tray icon with pause/resume controls',
      'Works alongside Bloxstrap, Fishstrap, and Voidstrap',
    ],
    cons: [
      'Roblox is actively patching anti-MultiBloxy measures since 2024',
      'May stop working after Roblox client updates',
      'Check GitHub issue tracker before relying on it',
    ],
    steps: [
      {
        title: 'Download MultiBloxy from official GitHub ONLY',
        description: 'ONLY use the official Zgoly repository. Third-party sites claiming to host MultiBloxy are often credential stealers.',
        code: `# ONLY official source:
https://github.com/Zgoly/MultiBloxy/releases/latest`,
      },
      {
        title: 'Check current working status first',
        description: 'Before downloading, check the GitHub issues page to see if MultiBloxy currently works with your Roblox version. Roblox has been deploying updates targeting it.',
        code: `# Check current status:
https://github.com/Zgoly/MultiBloxy/issues`,
        warning: 'As of late 2025, Roblox has been deploying updates specifically targeting MultiBloxy. If the issues page shows recent "not working" reports, use the PowerShell Mutex or Fishstrap method instead.',
      },
      {
        title: 'Run MultiBloxy.exe',
        description: 'Double-click MultiBloxy.exe. A tray icon appears. If SmartScreen appears: click "More info" → "Run anyway".',
      },
      {
        title: 'Launch Roblox instances',
        description: 'Open Roblox through roblox.com as many times as needed. MultiBloxy intercepts each mutex/event check.',
      },
    ],
    link: 'https://github.com/Zgoly/MultiBloxy/releases/latest',
    notes: 'This is MultiBloxy by Zgoly (C# tray app). Separate from unknownperson-vos/MultiBlox (Python GUI). Note the spelling: MultiBloxy vs MultiBlox.',
  },

  // ── METHOD 9 ────────────────────────────────────────────────
  {
    id: 'multiblox-python',
    title: 'MultiBlox Python GUI (unknownperson-vos)',
    subtitle: 'Advanced Python GUI manager — auto-detects Roblox processes, closes handles live, shows account info',
    difficulty: 'Intermediate',
    safety: 'Safe',
    tool: 'Python 3.9+ + MultiBlox (GitHub)',
    maxInstances: '10+',
    pros: [
      'Real-time process detection with GUI',
      'Auto-detects new Roblox instances as they launch',
      'Closes both ROBLOX_singletonEvent AND ROBLOX_singletonMutex',
      'Shows Roblox username, user ID, and avatar per instance',
      'Supports regex-based handle detection for Roblox updates',
      'Custom script execution on Roblox launch/close',
      'Installer quarantine prevents forced Roblox updates',
      'Fully open source — 16 stars, MIT license',
    ],
    cons: [
      'Requires Python 3.9+ and pip packages',
      'Also requires handle64.exe from Sysinternals',
      'More complex setup than one-click tools',
      'Uses .exe build which may trigger antivirus',
    ],
    steps: [
      {
        title: 'Download from official GitHub only',
        description: 'Only download from the official repository. This is a separate project from Zgoly\'s MultiBloxy.',
        code: `# Official repository:
https://github.com/unknownperson-vos/MultiBlox/releases/latest

# To run from source (Python):
pip install psutil requests pillow pyperclip
# Also download handle64.exe from Microsoft:
https://download.sysinternals.com/files/Handle.zip
# Place handle64.exe in: handle/handle64.exe (relative to MultiBlox.py)`,
      },
      {
        title: 'Run MultiBlox.exe or from source',
        description: 'Extract the downloaded ZIP and run MultiBlox.exe directly (it includes Python bundled). OR run from source if you prefer to audit the code.',
        warning: 'The prebuilt MultiBlox.exe may trigger Windows Defender due to PyInstaller bundling. Run from source (START.bat) if you prefer to verify the Python code before running.',
      },
      {
        title: 'Launch Roblox accounts normally',
        description: 'With MultiBlox running, just open roblox.com and log in with each account in separate browsers. MultiBlox automatically detects each new Roblox process and closes the singleton handles.',
      },
      {
        title: 'Use the advanced features',
        description: 'In the MultiBlox GUI, you can see each running instance\'s Roblox username, PID, and handle status in real-time. You can set up automation scripts that trigger when instances launch or close.',
      },
    ],
    link: 'https://github.com/unknownperson-vos/MultiBlox/releases/latest',
    notes: 'This project uses NtQuerySystemInformation + DuplicateHandle (DUPLICATE_CLOSE_SOURCE) internally — the same technique as our "DuplicateHandle Native API" method, but wrapped in a user-friendly Python GUI. Also closes ROBLOX_singletonMutex in addition to the Event.',
  },

  // ── METHOD 10 ────────────────────────────────────────────────
  {
    id: 'windows-sandbox',
    title: 'Windows Sandbox (Isolated Container)',
    subtitle: 'Run Roblox in a completely isolated Windows environment — undetectable as same device',
    difficulty: 'Intermediate',
    safety: 'Safe',
    tool: 'Windows Sandbox (Windows 10/11 Pro/Enterprise)',
    maxInstances: '2–3',
    pros: [
      'Hardware-level isolation via Windows Hyper-V',
      'Roblox cannot detect the sandbox as same device',
      'Zero setup malware risk — it\'s a Microsoft feature',
      'Auto-wiped on close — no persistent data left behind',
      'Each sandbox session appears as a brand new device',
    ],
    cons: [
      'Requires Windows 10/11 Pro or Enterprise (not Home)',
      'Must reinstall Roblox inside sandbox each session',
      'Requires ~4 GB extra RAM per sandbox',
      'Max 2-3 instances before RAM becomes limiting factor',
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
        title: 'Create a .wsb configuration file',
        description: 'Create a file named "RobloxSandbox.wsb" for auto-setup.',
        code: `<Configuration>
  <VGpu>Enable</VGpu>
  <Networking>Enable</Networking>
  <LogonCommand>
    <Command>cmd /c start https://www.roblox.com/</Command>
  </LogonCommand>
</Configuration>`,
      },
      {
        title: 'Launch Windows Sandbox and install Roblox',
        description: 'Double-click the .wsb file. Inside the sandbox, go to roblox.com, log in with an alt account, and click Play. Roblox installs and runs inside the fully isolated environment.',
        warning: 'Everything inside Windows Sandbox is wiped when you close it. You must re-install Roblox each sandbox session unless you use a persistent mapped folder.',
      },
    ],
    notes: 'Windows Sandbox uses Hyper-V. Each sandbox session gets a different hardware profile — Roblox sees it as a brand-new device. The mutex namespace is also completely separate from your host Windows session.',
  },

  // ── METHOD 11 ────────────────────────────────────────────────
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
      'Persistent — works across reboots without re-setup',
      'Not patchable by Roblox — OS-level architecture',
    ],
    cons: [
      'Requires creating additional Windows user accounts',
      'Must use "runas" for each extra instance',
      'Multiple Windows user profiles use more disk space',
    ],
    steps: [
      {
        title: 'Create a new Windows local user account',
        description: 'Open Settings → Accounts → Family & other users → Add someone. Or use CMD as Administrator.',
        code: `# Create via Command Prompt as Administrator:
net user RobloxAlt1 Password123 /add
net localgroup Users RobloxAlt1 /add`,
      },
      {
        title: 'Launch Roblox normally on your main account',
        description: 'Open Roblox on your main Windows user account as usual. Log in with Account 1 and join a game.',
      },
      {
        title: 'Open Roblox as the alternate Windows user',
        description: 'Hold SHIFT and right-click the Roblox shortcut → "Run as different user". Enter RobloxAlt1 credentials.',
        code: `# Or via CMD:
runas /user:RobloxAlt1 "%LocalAppData%\\Roblox\\Versions\\version-XXXX\\RobloxPlayerBeta.exe"`,
        warning: 'Replace "version-XXXX" with your actual Roblox version folder name. Find it in %LocalAppData%\\Roblox\\Versions.',
      },
      {
        title: 'Log in and join a game as the alternate user',
        description: 'A new Roblox window opens running under RobloxAlt1 Windows session. The ROBLOX_singletonMutex and ROBLOX_singletonEvent from Account 1 are completely invisible in the other user\'s namespace.',
      },
    ],
    notes: 'Windows user session boundaries completely isolate named kernel objects (mutexes, events). ROBLOX_singletonMutex created under User A cannot be seen or checked by Roblox running under User B. This is an OS architectural guarantee — not patchable.',
  },

  // ── METHOD 12 ────────────────────────────────────────────────
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
      'Most scalable: 10–30+ instances on strong hardware',
      'Windows mutex system is entirely irrelevant',
      'Built-in multi-instance manager and action synchronizer',
    ],
    cons: [
      'High RAM: 2–4 GB per instance',
      'Some games with Byfron anti-cheat detect emulators',
      'Mobile UI differs from PC client',
      'Requires VT-x / AMD-V in BIOS',
    ],
    steps: [
      {
        title: 'Download a reputable emulator',
        description: 'Use only well-known emulators from their official websites.',
        code: `# Recommended (official sites):
MuMu Player 12: https://www.mumuplayer.com/
LDPlayer 9:     https://www.ldplayer.net/
BlueStacks 5:   https://www.bluestacks.com/`,
      },
      {
        title: 'Enable VT-x in BIOS and create instances',
        description: 'Enable Intel VT-x or AMD-V in BIOS. In the emulator, open the Multi-Instance Manager and create 2–10+ virtual device instances. Allocate 2–4 GB RAM each.',
      },
      {
        title: 'Install Roblox and log in per instance',
        description: 'Inside each emulator instance, install Roblox from Google Play Store and log into a different Roblox account. Set graphics to Level 1 for performance.',
        warning: 'Some Roblox games with Byfron/Hyperion anti-cheat detect Android emulators and will refuse to load. Test your target game before setting up many instances.',
      },
    ],
    notes: 'Best emulators for Roblox in 2026: MuMu Player 12 (best performance) and LDPlayer 9 (best for high counts). Windows mutex system is irrelevant — each Android VM is a separate virtual device.',
  },

  // ── METHOD 13 ────────────────────────────────────────────────
  {
    id: 'virtual-machine',
    title: 'Full Virtual Machine (VirtualBox / VMware)',
    subtitle: 'Run a complete second Windows OS — maximum isolation but requires anti-detection',
    difficulty: 'Advanced',
    safety: 'Safe',
    tool: 'VirtualBox (free) or VMware Workstation',
    maxInstances: '2–4',
    pros: [
      'Complete OS-level isolation',
      'Persistent sessions (unlike Windows Sandbox)',
      'VM snapshots for instant clean restore',
    ],
    cons: [
      'Roblox (Byfron/Hyperion) actively detects common VMs',
      'Very high RAM: 4–8 GB per VM',
      'Requires extensive anti-detection configuration',
      'Most games will show "cannot run in VM" error without prep',
    ],
    steps: [
      {
        title: 'Install VirtualBox and create VM',
        description: 'Download from virtualbox.org. Create VM with 8+ GB RAM, 4 CPU cores, 60+ GB storage, Windows 10/11.',
        code: `# Official download:
https://www.virtualbox.org/wiki/Downloads`,
      },
      {
        title: 'Apply anti-detection BEFORE first boot',
        description: 'Run these VBoxManage commands on your HOST PC to hide VM signatures from Roblox\'s Hyperion anti-cheat.',
        code: `# Run on HOST PC (replace "YourVMName"):
VBoxManage modifyvm "YourVMName" --cpuidset 00000001 000106e5 00080800 00000001 178bfbff
VBoxManage modifyvm "YourVMName" --cpu-profile "Intel Core i7-6700K"
VBoxManage modifyvm "YourVMName" --biosuuid "YOUR-RANDOM-UUID"
VBoxManage modifyvm "YourVMName" --biosvendor "American Megatrends Inc."
VBoxManage modifyvm "YourVMName" --biosproduct "B550 AORUS PRO AX"
VBoxManage setextradata "YourVMName" "VBoxInternal/Devices/VMMDev/0/Config/GetHostTimeDisabled" "1"

# Generate UUID in PowerShell:
[guid]::NewGuid().ToString()`,
        warning: 'Do NOT install VirtualBox Guest Additions — they are the #1 VM detection vector. Without them you lose clipboard sharing but gain better anti-detection.',
      },
      {
        title: 'Install Windows and Roblox in VM',
        description: 'Boot, install Windows, then go to roblox.com and install Roblox. Log in with an alt account. Test if your target game runs before investing more time in setup.',
      },
    ],
    notes: 'VMs are the least reliable method for Roblox specifically due to Byfron/Hyperion. Many games will still refuse to load. Best for games that only use Roblox\'s basic anti-cheat, not Byfron.',
  },

  // ── METHOD 14 ────────────────────────────────────────────────
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
      'Zero risk — no system modification at all',
      'Works on any Windows version',
    ],
    cons: [
      'ROBLOX_singletonMutex/Event may still block — combine with mutex method',
      'High RAM per browser instance',
      'Limited to how many browsers/profiles you have',
    ],
    steps: [
      {
        title: 'Use different browsers for each account',
        description: 'Use a different browser for each account: Chrome for Account 1, Edge for Account 2, Firefox for Account 3, Brave for Account 4.',
        code: `# Browser download links:
Chrome:  https://www.google.com/chrome/
Edge:    Built into Windows
Firefox: https://www.mozilla.org/firefox/
Brave:   https://brave.com/`,
      },
      {
        title: 'Log into different Roblox accounts in each browser',
        description: 'Open each browser, go to roblox.com, log in with a different Roblox account in each. Then click Play on a game in each browser.',
        warning: 'The browser method handles account session isolation but does NOT bypass the Windows-level mutex. Combine with the PowerShell Mutex method (Method 2) for reliable multi-instance.',
      },
    ],
    notes: 'Best used in combination with the PowerShell Mutex Pre-Claim script. The browser method handles account isolation; the mutex method handles the Windows kernel restriction.',
  },
]

export const MUTEX_NAME = 'ROBLOX_singletonEvent'
export const MUTEX_NAME_2 = 'ROBLOX_singletonMutex'

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
