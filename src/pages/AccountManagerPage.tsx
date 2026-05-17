import { useState, useEffect } from 'react'
import { Plus, Users, Shuffle, Copy, Check, Trash2 } from 'lucide-react'
import AccountCard from '@/components/features/AccountCard'
import type { Account } from '@/types'
import { ACCOUNT_COLORS } from '@/constants/methods'
import { copyToClipboard } from '@/lib/utils'

const STORAGE_KEY = 'multirblx_accounts'

function loadAccounts(): Account[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveAccounts(accounts: Account[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
}

export default function AccountManagerPage() {
  const [accounts, setAccounts] = useState<Account[]>(loadAccounts)
  const [username, setUsername] = useState('')
  const [label, setLabel] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    saveAccounts(accounts)
  }, [accounts])

  const addAccount = () => {
    if (!username.trim()) return
    const newAccount: Account = {
      id: crypto.randomUUID(),
      username: username.trim(),
      label: label.trim() || 'Alt',
      addedAt: new Date().toISOString(),
      color: ACCOUNT_COLORS[accounts.length % ACCOUNT_COLORS.length],
    }
    setAccounts(prev => [...prev, newAccount])
    setUsername('')
    setLabel('')
    console.log('[MultiRBX] Added account:', newAccount.username)
  }

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id))
  }

  const clearAll = () => {
    if (window.confirm('Remove all accounts from the tracker?')) {
      setAccounts([])
    }
  }

  const handleCopyLaunchOrder = async () => {
    if (accounts.length === 0) return
    const text = accounts.map((a, i) => `Instance ${i + 1}: ${a.username} (${a.label})`).join('\n')
    await copyToClipboard(text)
    setCopiedId('all')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const STEPS = [
    'Start the PowerShell mutex script (or Fishstrap with multi-instance enabled)',
    'Log in to roblox.com as Account 1 below and join a game',
    'Keep the game window open — log out on the website',
    'Log in as Account 2, join a game. Repeat for each account.',
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Tool</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Account <span className="gradient-text">Tracker</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Keep track of the Roblox accounts you want to run simultaneously.
            Data is saved locally in your browser — nothing is sent anywhere.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Add account */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card-dark rounded-xl p-5">
              <h3 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" />
                Add Account
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1.5">Roblox Username</label>
                  <input
                    type="text"
                    placeholder="e.g. BuilderBob123"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addAccount()}
                    maxLength={20}
                    className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(180,100%,50%)/0.5] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground mb-1.5">Label / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Main, Farm, Alt"
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addAccount()}
                    maxLength={15}
                    className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(180,100%,50%)/0.5] transition-colors"
                  />
                </div>

                <button
                  onClick={addAccount}
                  disabled={!username.trim()}
                  className="btn-primary w-full px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add Account
                </button>
              </div>
            </div>

            {/* Launch order guide */}
            <div className="card-dark rounded-xl p-5">
              <h3 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Launch Order</h3>
              <ol className="space-y-3">
                {STEPS.map((step, i) => (
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

          {/* Account list */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[hsl(180,100%,50%)]" />
                <span className="font-mono text-sm font-semibold text-foreground">
                  {accounts.length} account{accounts.length !== 1 ? 's' : ''}
                </span>
                {accounts.length > 0 && (
                  <span className="font-mono text-xs text-muted-foreground">
                    — saved in browser
                  </span>
                )}
              </div>

              {accounts.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLaunchOrder}
                    className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded border border-border text-muted-foreground hover:text-[hsl(180,100%,50%)] hover:border-[hsl(180,100%,50%)/0.3] transition-all"
                  >
                    {copiedId === 'all' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy List</>}
                  </button>
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded border border-border text-muted-foreground hover:text-[hsl(0,84%,60%)] hover:border-[hsl(0,84%,60%)/0.3] transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {accounts.length === 0 ? (
              <div className="card-dark rounded-xl p-12 text-center">
                <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">No accounts tracked yet</h3>
                <p className="text-muted-foreground text-sm">
                  Add your Roblox usernames to keep track of which accounts to launch in each instance.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {accounts.map((account, i) => (
                  <div key={account.id} className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground w-6 text-right flex-shrink-0">
                      #{i + 1}
                    </span>
                    <div className="flex-1">
                      <AccountCard account={account} onDelete={deleteAccount} />
                    </div>
                  </div>
                ))}

                {/* Instance count warning */}
                {accounts.length > 6 && (
                  <div className="mt-4 p-3 rounded-lg border border-[hsl(38,92%,60%)/0.25] bg-[hsl(38,92%,60%)/0.05] text-xs text-[hsl(38,92%,60%)] font-mono">
                    ⚠ {accounts.length} accounts requires significant RAM (16–32 GB recommended). Monitor CPU/memory usage.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
