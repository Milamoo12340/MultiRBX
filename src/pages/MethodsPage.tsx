import { useState } from 'react'
import { Search, Filter, Terminal, Zap, Info } from 'lucide-react'
import MethodCard from '@/components/features/MethodCard'
import { METHODS } from '@/constants/methods'
import type { Method } from '@/types'

type DiffFilter = 'All' | 'Beginner' | 'Intermediate' | 'Advanced'

const TECHNIQUE_GROUPS = [
  {
    label: 'Pre-Claim / Watcher',
    color: 'text-[hsl(180,100%,50%)]',
    bg: 'bg-[hsl(180,100%,50%)/0.08] border-[hsl(180,100%,50%)/0.2]',
    desc: 'Claim ROBLOX_singletonMutex or singletonEvent before Roblox can use it to kill other instances.',
    ids: ['mutex-powershell', 'fishstrap', 'voidstrap', 'multibloxy', 'multiblox-python'],
  },
  {
    label: 'Active Handle Close',
    color: 'text-[hsl(38,92%,60%)]',
    bg: 'bg-[hsl(38,92%,60%)/0.08] border-[hsl(38,92%,60%)/0.2]',
    desc: 'Force-close singleton handles inside the running Roblox process using DuplicateHandle or Sysinternals tools.',
    ids: ['duplicate-handle-native', 'handle-sysinternals', 'process-explorer'],
  },
  {
    label: 'Namespace / OS Isolation',
    color: 'text-[hsl(150,100%,45%)]',
    bg: 'bg-[hsl(150,100%,45%)/0.08] border-[hsl(150,100%,45%)/0.2]',
    desc: 'Use separate Windows user sessions, Sandbox, or VMs — mutex namespace boundaries prevent cross-session detection.',
    ids: ['dual-client', 'windows-sandbox', 'separate-windows-user', 'browser-profiles'],
  },
  {
    label: 'Device Emulation',
    color: 'text-[hsl(270,80%,70%)]',
    bg: 'bg-[hsl(270,80%,70%)/0.08] border-[hsl(270,80%,70%)/0.2]',
    desc: 'Android emulators and VMs present as entirely separate physical devices — singleton mutex is irrelevant.',
    ids: ['android-emulator', 'virtual-machine'],
  },
]

export default function MethodsPage() {
  const [search, setSearch] = useState('')
  const [diff, setDiff] = useState<DiffFilter>('All')
  const [groupView, setGroupView] = useState(false)

  const filtered = METHODS.filter((m: Method) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      m.tool.toLowerCase().includes(search.toLowerCase())
    const matchDiff = diff === 'All' || m.difficulty === diff
    return matchSearch && matchDiff
  })

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">All Methods</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Multi-Instance <span className="gradient-text">Bypass Methods</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            14 verified methods. Each includes a step-by-step interactive guide and downloadable scripts.
            Methods ordered simplest → most complex.
          </p>
        </div>

        {/* Singleton handle info box */}
        <div className="p-4 rounded-xl border border-[hsl(180,100%,50%)/0.2] bg-[hsl(180,100%,50%)/0.04] mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-[hsl(180,100%,50%)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-2">Key Research Finding: Roblox Uses TWO Singleton Handles</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                Roblox enforces single-instance via <strong>both</strong> a named Event and a named Mutex. Fishstrap's open-source code confirms
                it specifically holds <code className="font-mono text-[hsl(180,100%,50%)] text-xs bg-[hsl(180,100%,50%)/0.1] px-1 rounded">ROBLOX_singletonMutex</code> in its watcher process,
                while older tools only targeted <code className="font-mono text-[hsl(180,100%,50%)] text-xs bg-[hsl(180,100%,50%)/0.1] px-1 rounded">ROBLOX_singletonEvent</code>.
                Methods marked with ★ close or pre-claim both.
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-[hsl(180,100%,50%)/0.1] text-[hsl(180,100%,50%)]">ROBLOX_singletonEvent — Named Event</span>
                <span className="px-2 py-0.5 rounded bg-[hsl(38,92%,60%)/0.1] text-[hsl(38,92%,60%)]">ROBLOX_singletonMutex — Named Mutex</span>
                <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground">Global\\ variants of both</span>
                <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground">\Sessions\1\BaseNamedObjects\\ variants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technique groups overview */}
        {groupView && (
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {TECHNIQUE_GROUPS.map(({ label, color, bg, desc, ids }) => (
              <div key={label} className={`p-4 rounded-xl border ${bg}`}>
                <div className={`font-mono text-xs font-semibold ${color} uppercase tracking-wider mb-1.5`}>{label}</div>
                <p className="text-muted-foreground text-xs leading-relaxed mb-2">{desc}</p>
                <div className="flex flex-wrap gap-1">
                  {ids.map(id => {
                    const m = METHODS.find(x => x.id === id)
                    return m ? (
                      <span key={id} className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                        {m.title.split(' ')[0]}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search methods, tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(180,100%,50%)/0.5] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as DiffFilter[]).map(d => (
              <button
                key={d}
                onClick={() => setDiff(d)}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                  diff === d
                    ? 'bg-[hsl(180,100%,50%)/0.15] text-[hsl(180,100%,50%)] border border-[hsl(180,100%,50%)/0.3]'
                    : 'bg-secondary text-muted-foreground border border-border hover:text-foreground'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Results bar */}
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground mb-4">
          <span>{filtered.length} method{filtered.length !== 1 ? 's' : ''} found</span>
          <button
            onClick={() => setGroupView(v => !v)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all text-xs ${
              groupView
                ? 'text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)/0.3] bg-[hsl(180,100%,50%)/0.08]'
                : 'text-muted-foreground border-border hover:text-foreground'
            }`}
          >
            <Zap className="w-3 h-3" /> Technique groups
          </button>
        </div>

        {/* Method cards */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg mb-2">No methods match your search.</p>
              <button onClick={() => { setSearch(''); setDiff('All') }} className="text-sm text-[hsl(180,100%,50%)] hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            filtered.map((m, i) => (
              <MethodCard key={m.id} method={m} defaultOpen={i === 0} />
            ))
          )}
        </div>

        {/* Deep dive note */}
        <div className="mt-10 p-4 rounded-xl border border-[hsl(180,100%,50%)/0.15] bg-secondary/30">
          <div className="flex items-start gap-3">
            <Terminal className="w-4 h-4 text-[hsl(180,100%,50%)] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-1">Technical Deep Dive</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                The DuplicateHandle Native API method (Method 3) is the most technically advanced approach — it uses
                <code className="font-mono text-[hsl(180,100%,50%)] mx-1 text-[10px] bg-[hsl(180,100%,50%)/0.1] px-1 rounded">NtQuerySystemInformation(SystemHandleInformation)</code>
                to enumerate all system handles, identifies ROBLOX singletons by querying their name via
                <code className="font-mono text-[hsl(180,100%,50%)] mx-1 text-[10px] bg-[hsl(180,100%,50%)/0.1] px-1 rounded">NtQueryObject</code>,
                then force-closes them via
                <code className="font-mono text-[hsl(180,100%,50%)] mx-1 text-[10px] bg-[hsl(180,100%,50%)/0.1] px-1 rounded">DuplicateHandle(..., DUPLICATE_CLOSE_SOURCE)</code>.
                This is the same technique used by unknownperson-vos/MultiBlox (Python) and dat514/Multi-Roblox-Tab — no external tools required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
