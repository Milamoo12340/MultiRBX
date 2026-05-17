import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  label?: string
  compact?: boolean
}

export default function CodeBlock({ code, language = 'powershell', label, compact }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await copyToClipboard(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg overflow-hidden border border-[hsl(220,14%,16%)] bg-[hsl(220,20%,4%)]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[hsl(220,14%,12%)] bg-[hsl(220,16%,6%)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[hsl(0,84%,60%)/0.6]" />
            <div className="w-3 h-3 rounded-full bg-[hsl(38,92%,60%)/0.6]" />
            <div className="w-3 h-3 rounded-full bg-[hsl(150,100%,45%)/0.6]" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-muted-foreground ml-2" />
          <span className="font-mono text-xs text-muted-foreground">
            {label || language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded border border-[hsl(220,14%,18%)] text-muted-foreground hover:text-[hsl(180,100%,50%)] hover:border-[hsl(180,100%,50%,0.3)] transition-all"
          aria-label="Copy code"
        >
          {copied ? (
            <><Check className="w-3 h-3 text-[hsl(150,100%,45%)]" /> Copied</>
          ) : (
            <><Copy className="w-3 h-3" /> Copy</>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre className={`overflow-x-auto text-[hsl(150,100%,70%)] font-mono leading-relaxed ${compact ? 'text-xs p-3' : 'text-sm p-4'}`}>
        <code>{code.trim()}</code>
      </pre>
    </div>
  )
}
