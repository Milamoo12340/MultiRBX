import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import MethodCard from '@/components/features/MethodCard'
import { METHODS } from '@/constants/methods'
import type { Method } from '@/types'

type DiffFilter = 'All' | 'Beginner' | 'Intermediate' | 'Advanced'

export default function MethodsPage() {
  const [search, setSearch] = useState('')
  const [diff, setDiff] = useState<DiffFilter>('All')

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
        <div className="mb-10">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">All Methods</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Multi-Instance <span className="gradient-text">Bypass Methods</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            Every known working method to run multiple Roblox instances simultaneously. Each includes a step-by-step interactive guide.
            Methods are ordered from simplest to most complex.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
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

        {/* Results count */}
        <div className="font-mono text-xs text-muted-foreground mb-4">
          {filtered.length} method{filtered.length !== 1 ? 's' : ''} found
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
      </div>
    </div>
  )
}
