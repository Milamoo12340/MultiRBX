import { useState } from 'react'
import { Apple, Terminal, Layers, ExternalLink, ChevronDown, ChevronRight, CheckCircle, XCircle, AlertTriangle, Info, Shield } from 'lucide-react'
import CodeBlock from '@/components/features/CodeBlock'
import StatusBadge from '@/components/features/StatusBadge'

// ────────────────────────────────────────────────────
// Mac-specific method definitions
// ────────────────────────────────────────────────────
const MAC_METHODS = [
  {
    id: 'rororo-mac',
    icon: Apple,
    title: 'RORORO Mac',
    badge: 'RECOMMENDED',
    badgeColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    requirement: 'macOS 14 (Sonoma) or later · Apple Silicon or Intel',
    difficulty: 'Beginner' as const,
    safety: 'Safe' as const,
    link: 'https://github.com/estevanhernandez-stack-ed/rororo-mac',
    how: [
      'macOS uses POSIX named semaphores (instead of Windows mutexes) to enforce single-instance behavior.',
      'The semaphore is named "/RobloxPlayerUniq" (or similar). When Roblox launches it calls sem_open() to check if the semaphore exists. If it does and another Roblox process owns it, the new instance signals the old one to close.',
      'RORORO Mac calls sem_unlink("/RobloxPlayerUniq") immediately after launch — destroying the semaphore before Roblox can use it to detect existing instances. It also copies the Roblox.app bundle per-launch (so each instance has its own data directory) and flips the LSMultipleInstancesProhibited plist key to false. The result: multiple fully independent Roblox clients run side by side.',
    ].join(' '),
    pros: [
      'Apple-notarized and code-signed — no Gatekeeper warnings',
      'Homebrew install (brew install --cask rororo) or direct DMG',
      'One-click multi-instance toggle in menu-bar tray',
      'Saved account vault — "Launch As" opens any saved account directly',
      'Credentials stored in macOS Keychain, never in plaintext on disk',
      'No telemetry, open source (MIT)',
      'Auto-updates via Sparkle (EdDSA-signed)',
    ],
    cons: [
      'Requires macOS 14+ (Sonoma) — older macOS users need another method',
      'New project (May 2026) — still being tested at scale',
      'Roblox cookie is required for Launch As (handled securely via embedded WKWebView)',
    ],
    setupCode: `# Option A: Homebrew (recommended — auto-updates)
brew tap estevanhernandez-stack-ed/rororo
brew install --cask rororo

# Option B: Direct DMG download
# https://github.com/estevanhernandez-stack-ed/rororo-mac/releases/latest
# Drag RORORO.app to /Applications. Signed & notarized — no Gatekeeper warning.`,
    steps: [
      'Install via Homebrew or download the DMG from GitHub Releases',
      'Open RORORO from /Applications (or from the menu-bar tray icon)',
      'Click "+ Add Account" — log in with Roblox inside the embedded web view (password never touches RORORO)',
      'Repeat for each alt account',
      'Toggle "Multi-Instance: ON" in the toolbar or tray menu',
      'Click "Launch As" next to each saved account — each spawns an independent Roblox client',
    ],
  },

  {
    id: 'bash-sem-unlink',
    icon: Terminal,
    title: 'Terminal: sem_unlink + App-Copy (Manual Script)',
    badge: 'NO INSTALL',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    requirement: 'macOS 10.13+ · Any Mac (Apple Silicon or Intel) · Terminal',
    difficulty: 'Intermediate' as const,
    safety: 'Safe' as const,
    link: null,
    how: 'macOS enforces single-instance via two mechanisms: (1) LSMultipleInstancesProhibited = true in Roblox.app/Contents/Info.plist prevents the macOS Launch Services daemon from opening a second copy of the same bundle. (2) A POSIX named semaphore ("/RobloxPlayerUniq") signals existing instances to quit. The script bypasses both: it copies the Roblox.app bundle to a temp location (giving it a unique bundle path), patches LSMultipleInstancesProhibited to false via PlistBuddy, then calls sem_unlink() via a compiled C snippet to destroy the semaphore before using "open -n" to launch the copy.',
    pros: [
      'Zero third-party tools — pure macOS built-in commands',
      'Works on any macOS version (10.13+) without extra software',
      'Fully auditable — plain shell script, nothing hidden',
      'Understand exactly what it does before running',
    ],
    cons: [
      'More technical than RORORO — requires Terminal familiarity',
      'Must be re-run for each new instance',
      'The sem_unlink C one-liner requires clang (included in Xcode CLT)',
    ],
    setupCode: `#!/bin/bash
# MultiRBX Mac -- sem_unlink + App-Copy launcher
# Based on the technique from Insadem/multi-roblox-macos
# and the POSIX semaphore approach used by RORORO Mac.
#
# REQUIREMENTS: macOS 10.13+, Roblox installed at /Applications/Roblox.app
# HOW TO RUN:
#   1. Save this as multirblx.sh
#   2. chmod +x multirblx.sh
#   3. ./multirblx.sh   (each run spawns a new Roblox instance)

set -euo pipefail

ROBLOX_SRC="/Applications/Roblox.app"
INSTANCE_DIR="/tmp/MultiRBX_Instances"
SEMAPHORE_NAME="/RobloxPlayerUniq"

# ── Step 1: Verify Roblox is installed ────────────────────────
if [ ! -d "$ROBLOX_SRC" ]; then
    echo "[ERROR] Roblox.app not found at $ROBLOX_SRC"
    echo "[FIX]   Install Roblox from roblox.com first."
    exit 1
fi

# ── Step 2: Copy the Roblox bundle to a unique temp path ──────
mkdir -p "$INSTANCE_DIR"
INSTANCE_ID=$(date +%s%N 2>/dev/null || date +%s)
INSTANCE_PATH="$INSTANCE_DIR/Roblox_$INSTANCE_ID.app"

echo "[INFO]  Copying Roblox.app to temp location..."
cp -a "$ROBLOX_SRC" "$INSTANCE_PATH"

# ── Step 3: Patch LSMultipleInstancesProhibited ───────────────
PLIST="$INSTANCE_PATH/Contents/Info.plist"
if /usr/libexec/PlistBuddy -c "Print :LSMultipleInstancesProhibited" "$PLIST" 2>/dev/null | grep -q "true"; then
    echo "[INFO]  Patching LSMultipleInstancesProhibited → false"
    /usr/libexec/PlistBuddy -c "Set :LSMultipleInstancesProhibited false" "$PLIST"
else
    echo "[INFO]  LSMultipleInstancesProhibited not set (or already false) — skipping"
fi

# ── Step 4: Destroy the POSIX semaphore ───────────────────────
# Compile a tiny C program that calls sem_unlink() and run it.
# sem_unlink removes the named semaphore so Roblox cannot use it
# to detect and signal existing instances.
SEM_UNLINK_SRC="/tmp/multirblx_sem_unlink.c"
SEM_UNLINK_BIN="/tmp/multirblx_sem_unlink"

cat > "$SEM_UNLINK_SRC" << 'EOF'
#include <semaphore.h>
#include <stdio.h>
int main(int argc, char* argv[]) {
    if (argc < 2) { printf("Usage: sem_unlink <semaphore_name>\n"); return 1; }
    int r = sem_unlink(argv[1]);
    if (r == 0)  printf("[OK] sem_unlink(\"%s\") succeeded\n", argv[1]);
    else         printf("[INFO] sem_unlink(\"%s\"): %m (semaphore may not exist yet)\n", argv[1]);
    return 0;
}
EOF

# Compile if not already compiled
if [ ! -f "$SEM_UNLINK_BIN" ]; then
    echo "[INFO]  Compiling sem_unlink helper..."
    clang -o "$SEM_UNLINK_BIN" "$SEM_UNLINK_SRC" 2>/dev/null || {
        echo "[WARN]  clang not found. Install Xcode Command Line Tools:"
        echo "        xcode-select --install"
        echo "[WARN]  Skipping sem_unlink step..."
    }
fi

[ -f "$SEM_UNLINK_BIN" ] && "$SEM_UNLINK_BIN" "$SEMAPHORE_NAME"

# ── Step 5: Remove quarantine attribute from the copied bundle ─
xattr -cr "$INSTANCE_PATH" 2>/dev/null || true

# ── Step 6: Launch the instance ───────────────────────────────
echo "[INFO]  Launching: $INSTANCE_PATH"
open -n "$INSTANCE_PATH"

echo ""
echo "[OK]    Roblox instance launched!"
echo "[NEXT]  Log in with your Roblox account in the new window."
echo "[NEXT]  Run this script again to spawn additional instances."
echo "[INFO]  Temp copies cleaned up automatically on next run."

# ── Cleanup old instances (> 1 hour old) ─────────────────────
find "$INSTANCE_DIR" -maxdepth 1 -name "Roblox_*.app" -mmin +60 -exec rm -rf {} + 2>/dev/null || true`,
    steps: [
      'Install Roblox normally at /Applications/Roblox.app via roblox.com',
      'Save the script above as multirblx.sh anywhere on your Mac',
      'Open Terminal and make it executable: chmod +x ~/Desktop/multirblx.sh',
      'If you don\'t have Xcode CLT: xcode-select --install (needed for clang)',
      'Run: ./multirblx.sh — a new Roblox window opens',
      'Log in with Account 1. Then run the script again for Account 2, etc.',
    ],
  },

  {
    id: 'insadem-app',
    icon: Terminal,
    title: 'Insadem multi-roblox-macos',
    badge: 'OPEN SOURCE',
    badgeColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
    requirement: 'macOS 10.x+ · Apple Silicon (M1/M2) recommended · Intel supported',
    difficulty: 'Beginner' as const,
    safety: 'Safe' as const,
    link: 'https://github.com/Insadem/multi-roblox-macos',
    how: 'An open-source Go + Objective-C app (24 GitHub stars) that was the original Mac multi-instance solution. It implements the same sem_unlink + per-launch app-copy recipe but wrapped in a simple GUI. Launch it, then click Play on roblox.com in different browser sessions — each click spawns a separate Roblox instance. Supports teleport between servers.',
    pros: [
      'Original Mac multi-instance implementation (24 stars, 5 forks)',
      'Works out of the box — no configuration needed',
      'Supports Roblox teleport between game servers',
      'Open source in Go — auditable code',
      'Works on both Apple Silicon and Intel Macs',
    ],
    cons: [
      'Not code-signed — requires xattr -c to remove Gatekeeper quarantine',
      'Last updated 2024 — may need community patches for newer Roblox versions',
      '12 open issues — check before relying on it',
      'Less actively maintained than RORORO Mac',
    ],
    setupCode: `# Step 1: Download from GitHub Releases
# https://github.com/Insadem/multi-roblox-macos/releases

# Step 2: Remove Gatekeeper quarantine (REQUIRED — it is not code-signed)
# Replace /path/to with where you downloaded the .app
xattr -c /path/to/multiroblox.app

# Step 3: Launch the app
open /path/to/multiroblox.app

# The app window will appear. Now:
# Step 4: Click Play on roblox.com in Browser 1 (log in as Account 1)
# Step 5: Click Play on roblox.com in Browser 2 (log in as Account 2)
# Each click spawns a separate Roblox client.

# Optional: Build from source (requires Go installed)
git clone https://github.com/Insadem/multi-roblox-macos
cd multi-roblox-macos
go build   # builds for your architecture
# For Intel Mac: GOOS=darwin GOARCH=amd64 CGO_ENABLED=1 go build`,
    steps: [
      'Download multiroblox.app from GitHub Releases (link above)',
      'Open Terminal and run: xattr -c /path/to/multiroblox.app (removes quarantine flag)',
      'Double-click to launch multiroblox.app',
      'Open roblox.com in Browser 1, log in as Account 1, click Play',
      'Open roblox.com in Browser 2 (or incognito), log in as Account 2, click Play',
      'Each Play click spawns a new independent Roblox instance',
    ],
  },

  {
    id: 'appleblox',
    icon: Layers,
    title: 'AppleBlox (Experimental Multi-Instance)',
    badge: 'BUGGY / NOT MAINTAINED',
    badgeColor: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
    requirement: 'macOS 10.13 (High Sierra) or later · Apple Silicon or Intel',
    difficulty: 'Beginner' as const,
    safety: 'Safe' as const,
    link: 'https://github.com/AppleBlox/appleblox',
    how: 'AppleBlox (150+ GitHub stars, 19,000+ downloads) is the macOS equivalent of Bloxstrap — a feature-rich Roblox launcher with Discord rich presence, FastFlags, and mods. It includes an experimental multi-instance feature under Behavior > Multiple Instances. However, as of 2025-2026, AppleBlox\'s own docs note the feature is "very buggy and no longer actively maintained" and that "Roblox has been cracking down on multi-instance usage, so it may not work at all."',
    pros: [
      '150+ GitHub stars, 19,000+ downloads — large community',
      'Supports macOS 10.13+ (wider compatibility than RORORO Mac)',
      'Good for other features: FastFlags, Discord RPC, mods, region selection',
      'Easy install via DMG or Homebrew',
    ],
    cons: [
      'Multi-instance feature officially marked UNSUPPORTED and BUGGY',
      'Roblox patched the mechanism AppleBlox uses in 2025',
      'Use AppleBlox for other features; use RORORO Mac for multi-instance',
      'No official support provided for multi-instance issues',
    ],
    setupCode: `# Install AppleBlox:
# Download DMG from: https://github.com/AppleBlox/appleblox/releases/latest
# Or via Homebrew:
brew install --cask appleblox

# Enable multi-instance (WARNING: currently marked UNSUPPORTED/BUGGY):
# 1. Open AppleBlox
# 2. Go to Behavior in the sidebar
# 3. Find "Multiple Instances" section
# 4. Toggle "Enable Multi-Instance"
# 5. Click "New Instance" to open additional Roblox windows

# NOTE from AppleBlox docs:
# "Multi-instance is very buggy and is no longer actively maintained.
#  Roblox has been cracking down on multi-instance usage, so it may
#  not work at all. No support is provided for this feature."
#
# If it fails, use RORORO Mac or the bash sem_unlink script instead.`,
    steps: [
      'Download AppleBlox DMG from GitHub (link above) and install',
      'Open AppleBlox → Behavior → Multiple Instances',
      'Enable "Multi-Instance" toggle',
      'Click "New Instance" to open additional Roblox windows',
      'If it fails (likely), switch to RORORO Mac or the Terminal sem_unlink script',
    ],
  },

  {
    id: 'browsers-mac',
    icon: Layers,
    title: 'Multiple Browsers (No Tools)',
    badge: 'EASIEST',
    badgeColor: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
    requirement: 'Any Mac · No tools needed',
    difficulty: 'Beginner' as const,
    safety: 'Safe' as const,
    link: null,
    how: 'macOS allows multiple different browsers to each manage their own Roblox web session independently. When you click Play in Safari and then Play in Chrome, each browser launches Roblox via a different roblox:// URI invocation. Depending on your macOS version and Roblox client version, the semaphore check may or may not block the second launch. Combine with the sem_unlink script for guaranteed success.',
    pros: [
      'Zero setup — works instantly with browsers you already have',
      'No scripts, no downloads, no technical steps',
      'Perfectly safe — no system modification whatsoever',
      'Good for testing with 2 accounts quickly',
    ],
    cons: [
      'POSIX semaphore may still block the 2nd instance — not guaranteed without sem_unlink',
      'Limited by number of different browsers installed',
      'Can\'t get more than 4–5 without combining with another method',
    ],
    setupCode: `# Available Mac browsers for separate sessions:
# Safari (built-in)    — Account 1
# Chrome               — Account 2 (download: google.com/chrome)
# Firefox              — Account 3 (download: mozilla.org/firefox)
# Brave                — Account 4 (download: brave.com)
# Arc                  — Account 5 (download: arc.net)
# Opera                — Account 6 (download: opera.com)

# For extra sessions in the same browser, use Profiles:
# Chrome: Profile icon (top right) > Add → New Chrome profile per account
# Edge:   Profile icon > Add Profile → New Edge profile per account

# Also: Safari + Private Window = 2nd separate session in Safari:
# File > New Private Window → log in with Account 2`,
    steps: [
      'Open Safari and go to roblox.com, log in with Account 1, click Play',
      'Open Chrome and go to roblox.com, log in with Account 2, click Play',
      'Open Firefox and go to roblox.com, log in with Account 3, click Play',
      'If the 2nd+ instance doesn\'t open, run the sem_unlink script first (Method 2)',
    ],
  },

  {
    id: 'mac-user-account',
    icon: Apple,
    title: 'Separate macOS User Account',
    badge: 'VERY STABLE',
    badgeColor: 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.1]',
    requirement: 'Any Mac · macOS 10.x+',
    difficulty: 'Intermediate' as const,
    safety: 'Safe' as const,
    link: null,
    how: 'On macOS (just like Windows), POSIX named semaphores are scoped per user session via /dev/shm or the POSIX semaphore namespace. Running Roblox as a different macOS user means the /RobloxPlayerUniq semaphore from User A is completely invisible to User B. This is a guaranteed OS-level namespace boundary — Roblox cannot cross it.',
    pros: [
      'Works on all macOS versions — no tools required',
      'Semaphore namespace boundary is guaranteed at OS level',
      'Cannot be patched by Roblox — it\'s Apple\'s OS design',
      'Persistent — works every boot without re-setup',
    ],
    cons: [
      'Requires creating a secondary macOS user account',
      'Must use Fast User Switching or "su" to launch Roblox as alt user',
      'Each macOS user account uses ~2–4 GB extra disk space',
    ],
    setupCode: `# Step 1: Create a secondary macOS user account
# System Settings > Users & Groups > Add User...
# OR via Terminal (requires admin password):
sudo dscl . -create /Users/RobloxAlt
sudo dscl . -create /Users/RobloxAlt UserShell /bin/bash
sudo dscl . -create /Users/RobloxAlt RealName "Roblox Alt"
sudo dscl . -create /Users/RobloxAlt UniqueID 600
sudo dscl . -create /Users/RobloxAlt PrimaryGroupID 20
sudo dscl . -create /Users/RobloxAlt NFSHomeDirectory /Users/RobloxAlt
sudo dscl . -passwd /Users/RobloxAlt "YourAltPassword"
sudo createhomedir -c -u RobloxAlt 2>/dev/null

# Step 2: Enable Fast User Switching
# System Settings > Control Center > Fast User Switching → Show in Menu Bar

# Step 3: Launch your main Roblox session on your primary account
# Open roblox.com, log in, join a game

# Step 4: Switch to the alt user without logging out
# Click user icon in menu bar > RobloxAlt (Fast User Switching)
# Open Roblox in that session and log in with alt account

# ALTERNATIVE: Run Roblox as alt user without full session switch:
# Launch Roblox.app as a different user via macOS's "su":
su - RobloxAlt -c "open /Applications/Roblox.app"`,
    steps: [
      'Create a secondary macOS user account (System Settings → Users & Groups)',
      'Enable Fast User Switching in Control Center settings',
      'Launch Roblox normally on your primary user account, log in with Account 1',
      'Use Fast User Switching (menu bar user icon) to switch to the alt account — keep the Roblox window open',
      'In the alt session: install Roblox (or it shares /Applications), open it, log in with Account 2',
      'Switch between sessions via the menu bar — both Roblox instances remain running',
    ],
  },
]

const MAC_TECH_NOTE = {
  title: 'macOS vs Windows: Different Singleton Mechanism',
  body: [
    'Windows uses named Mutex/Event kernel objects (ROBLOX_singletonMutex, ROBLOX_singletonEvent) + the Win32 API.',
    'macOS uses POSIX named semaphores stored in /dev/shm — semaphore name: /RobloxPlayerUniq.',
    'macOS also uses the LSMultipleInstancesProhibited flag in Roblox.app/Contents/Info.plist to prevent Launch Services from opening duplicate bundles.',
    'Bypass on Mac requires: (1) sem_unlink("/RobloxPlayerUniq") to destroy the POSIX semaphore, AND (2) Launching from a copied bundle with LSMultipleInstancesProhibited patched to false.',
    'Windows bypass tools (PowerShell mutex scripts, Handle.exe, Fishstrap) will NOT work on Mac — use RORORO Mac or the Bash script instead.',
  ].join(' '),
}

// ────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────
export default function MacPage() {
  const [expanded, setExpanded] = useState<string | null>('rororo-mac')

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="mb-10">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Platform Guide</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            <span className="gradient-text">macOS</span> Multi-Instance Guide
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Mac-specific methods for running multiple Roblox instances simultaneously.
            macOS uses a completely different mechanism from Windows — these guides are Mac-only.
            Windows tools like PowerShell and Fishstrap do not apply.
          </p>
        </div>

        {/* ── Mac vs Windows info box ─────────────────────── */}
        <div className="p-5 rounded-xl border border-[hsl(180,100%,50%)/0.2] bg-[hsl(180,100%,50%)/0.04] mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[hsl(180,100%,50%)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">Why Mac Needs Different Methods</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">{MAC_TECH_NOTE.body}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary border border-border">
                  <div className="font-mono text-xs font-semibold text-[hsl(38,92%,60%)] mb-1.5">Windows Singleton</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Named Mutex: <code className="text-[hsl(180,100%,50%)]">ROBLOX_singletonMutex</code></li>
                    <li>• Named Event: <code className="text-[hsl(180,100%,50%)]">ROBLOX_singletonEvent</code></li>
                    <li>• Win32 kernel objects</li>
                    <li>• Bypass: PowerShell, Handle.exe, Fishstrap</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-secondary border border-border">
                  <div className="font-mono text-xs font-semibold text-[hsl(150,100%,45%)] mb-1.5">macOS Singleton</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• POSIX semaphore: <code className="text-[hsl(180,100%,50%)]">/RobloxPlayerUniq</code></li>
                    <li>• Plist flag: <code className="text-[hsl(180,100%,50%)]">LSMultipleInstancesProhibited</code></li>
                    <li>• Darwin/POSIX APIs</li>
                    <li>• Bypass: sem_unlink + app-copy (RORORO Mac, bash script)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Safety notice ─────────────────────────────── */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-[hsl(0,84%,60%)/0.2] bg-[hsl(0,84%,60%)/0.04] mb-8">
          <AlertTriangle className="w-4 h-4 text-[hsl(0,84%,60%)] flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="text-[hsl(0,84%,60%)] font-semibold">Same malware risks apply on Mac. </span>
            <span className="text-muted-foreground">
              Only download tools from the official GitHub links listed below. Never use DMGs from YouTube descriptions, Discord DMs, or third-party websites.
              Credential stealers exist for macOS too — any tool that asks for your Roblox password or cookie outside of roblox.com is malicious.
            </span>
          </div>
        </div>

        {/* ── Quick comparison ───────────────────────────── */}
        <div className="mb-8">
          <h2 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Quick Comparison</h2>
          <div className="card-dark rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border bg-[hsl(220,14%,7%)]">
              <span className="col-span-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">Method</span>
              <span className="col-span-2 font-mono text-xs text-muted-foreground uppercase tracking-wider text-center">Max</span>
              <span className="col-span-3 font-mono text-xs text-muted-foreground uppercase tracking-wider text-center">Difficulty</span>
              <span className="col-span-3 font-mono text-xs text-muted-foreground uppercase tracking-wider text-right">Requirement</span>
            </div>
            {[
              { name: 'RORORO Mac', max: '10+', diff: 'Beginner', req: 'macOS 14+', diffColor: 'text-[hsl(150,100%,45%)]' },
              { name: 'Bash sem_unlink Script', max: '10+', diff: 'Intermediate', req: 'macOS 10.13+', diffColor: 'text-[hsl(38,92%,60%)]' },
              { name: 'Insadem App', max: '5+', diff: 'Beginner', req: 'macOS 10.x+', diffColor: 'text-[hsl(150,100%,45%)]' },
              { name: 'AppleBlox (exp.)', max: '2–3', diff: 'Beginner', req: 'macOS 10.13+', diffColor: 'text-[hsl(150,100%,45%)]' },
              { name: 'Multiple Browsers', max: '4–6', diff: 'Beginner', req: 'Any Mac', diffColor: 'text-[hsl(150,100%,45%)]' },
              { name: 'Separate macOS User', max: '3–5', diff: 'Intermediate', req: 'Any Mac', diffColor: 'text-[hsl(38,92%,60%)]' },
            ].map(({ name, max, diff, req, diffColor }, i) => (
              <div key={name} className={`grid grid-cols-12 px-4 py-3.5 items-center ${i < 5 ? 'border-b border-border' : ''} hover:bg-secondary/40`}>
                <span className="col-span-4 text-sm text-foreground font-medium">{name}</span>
                <span className="col-span-2 text-sm font-mono text-[hsl(180,100%,50%)] text-center">{max}</span>
                <span className={`col-span-3 text-xs font-mono font-semibold text-center ${diffColor}`}>{diff}</span>
                <span className="col-span-3 text-xs text-muted-foreground text-right">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Method accordion cards ─────────────────────── */}
        <div className="space-y-4 mb-12">
          {MAC_METHODS.map((method) => {
            const isOpen = expanded === method.id
            const Icon = method.icon
            return (
              <div
                key={method.id}
                className={`card-dark rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-glow' : ''}`}
              >
                <button
                  className="w-full text-left p-5 flex items-start gap-4"
                  onClick={() => setExpanded(isOpen ? null : method.id)}
                >
                  <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                    isOpen
                      ? 'bg-[hsl(180,100%,50%)/0.15] border border-[hsl(180,100%,50%)/0.3]'
                      : 'bg-secondary border border-border'
                  }`}>
                    <Icon className="w-5 h-5 text-[hsl(180,100%,50%)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-foreground">{method.title}</h3>
                      <span className={`tag border ${method.badgeColor}`}>{method.badge}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{method.requirement}</p>
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge
                        label={method.difficulty}
                        variant={method.difficulty === 'Beginner' ? 'beginner' : 'intermediate'}
                      />
                      <StatusBadge label={method.safety} variant="safe" />
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {isOpen
                      ? <ChevronDown className="w-5 h-5 text-[hsl(180,100%,50%)]" />
                      : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
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
                        <h4 className="font-mono text-xs font-semibold text-[hsl(150,100%,45%)] uppercase tracking-wider mb-3">Pros</h4>
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
                        <h4 className="font-mono text-xs font-semibold text-[hsl(0,84%,60%)] uppercase tracking-wider mb-3">Cons</h4>
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

                    {/* Code */}
                    <div className="p-5 border-t border-border">
                      <h4 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        {method.id === 'bash-sem-unlink' ? 'Complete Launch Script' : 'Setup Commands'}
                      </h4>
                      <CodeBlock
                        code={method.setupCode}
                        label={method.id === 'bash-sem-unlink' ? 'multirblx.sh' : 'terminal'}
                        language="bash"
                      />
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

                      {method.link && (
                        <a
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-4 text-sm text-[hsl(180,100%,50%)] hover:underline font-mono"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Official GitHub → {method.link.replace('https://github.com/', '')}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Mac safety / tool verdicts ─────────────────── */}
        <div className="mb-12">
          <h2 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-5">
            <Shield className="w-4 h-4" /> Mac Tool Verdicts
          </h2>
          <div className="space-y-3">
            {[
              {
                name: 'RORORO Mac',
                verdict: 'Recommended',
                color: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
                desc: 'Apple-notarized, code-signed, Homebrew available. Keychain-backed cookie storage. MIT license. Only from github.com/estevanhernandez-stack-ed/rororo-mac.',
                url: 'https://github.com/estevanhernandez-stack-ed/rororo-mac',
              },
              {
                name: 'Bash sem_unlink Script (on this page)',
                verdict: 'Most Transparent',
                color: 'text-[hsl(150,100%,45%)] border-[hsl(150,100%,45%)/0.3] bg-[hsl(150,100%,45%)/0.1]',
                desc: 'Generated inline — nothing to download. Pure shell script using macOS built-in commands. Fully auditable before running.',
                url: null,
              },
              {
                name: 'Insadem multi-roblox-macos',
                verdict: 'Caution (check issues)',
                color: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
                desc: 'Open source Go app (24 stars). Not code-signed — requires xattr -c. Last updated 2024. Check GitHub issues before using. Only from github.com/Insadem/multi-roblox-macos.',
                url: 'https://github.com/Insadem/multi-roblox-macos',
              },
              {
                name: 'AppleBlox',
                verdict: 'Safe but multi-instance broken',
                color: 'text-[hsl(38,92%,60%)] border-[hsl(38,92%,60%)/0.3] bg-[hsl(38,92%,60%)/0.1]',
                desc: 'Great launcher for other features (FastFlags, Discord RPC). Multi-instance feature marked unsupported/buggy by their own docs. Use for everything except multi-instance. Only from github.com/AppleBlox/appleblox.',
                url: 'https://github.com/AppleBlox/appleblox',
              },
              {
                name: 'ANY random .dmg or .pkg claiming to be a Mac Roblox multi-launcher',
                verdict: 'AVOID',
                color: 'text-[hsl(0,84%,60%)] border-[hsl(0,84%,60%)/0.3] bg-[hsl(0,84%,60%)/0.1]',
                desc: 'macOS infostealer malware (KeyChainStealer, Atomic Stealer) is distributed as fake Roblox tools. They target macOS Keychain, browser cookies, and app passwords. Only use tools linked from official GitHub repos.',
                url: null,
              },
            ].map(({ name, verdict, color, desc, url }) => (
              <div key={name} className="card-dark rounded-xl p-5 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-semibold text-foreground text-sm">{name}</h3>
                    <span className={`tag border font-mono ${color}`}>{verdict}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
                {url && (
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

        {/* ── Performance notes ──────────────────────────── */}
        <div className="p-5 rounded-xl border border-[hsl(180,100%,50%)/0.15] bg-secondary/30">
          <h3 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Info className="w-3.5 h-3.5" /> Mac-Specific Performance Notes
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-[hsl(150,100%,45%)] mt-0.5">→</span>
              <span><strong className="text-foreground">Apple Silicon (M1/M2/M3/M4):</strong> Excellent multi-instance performance. 8 GB base RAM handles 2–3 instances; 16 GB handles 4–6. Roblox uses Apple Metal for GPU — no OpenGL overhead.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(150,100%,45%)] mt-0.5">→</span>
              <span><strong className="text-foreground">Intel Mac:</strong> Performance is lower. Limit to 2–3 instances on Intel i5/i7 with 8 GB RAM. Disable iGPU sharing between instances via Roblox graphics settings.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(150,100%,45%)] mt-0.5">→</span>
              <span><strong className="text-foreground">Set graphics to Level 1</strong> in every Roblox instance (Settings → Graphics → Manual → Level 1). This is the single biggest performance gain.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(150,100%,45%)] mt-0.5">→</span>
              <span><strong className="text-foreground">Best Graphics API:</strong> Metal (default on Apple Silicon). Do not switch to OpenGL unless you need to exceed 240 FPS — it reduces performance on Apple Silicon.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[hsl(150,100%,45%)] mt-0.5">→</span>
              <span><strong className="text-foreground">Memory pressure:</strong> Each Roblox instance uses ~500–1200 MB RAM on Mac. Monitor Activity Monitor → Memory tab. Red memory pressure = too many instances.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
