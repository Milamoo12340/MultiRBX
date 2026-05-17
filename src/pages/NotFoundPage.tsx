import { Link } from 'react-router-dom'
import { Terminal, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center px-4">
        <div className="font-mono text-8xl font-bold text-[hsl(180,100%,50%)/0.15] mb-6 select-none">404</div>
        <div className="w-12 h-12 rounded-xl bg-[hsl(180,100%,50%)/0.1] border border-[hsl(180,100%,50%)/0.3] flex items-center justify-center mx-auto mb-4">
          <Terminal className="w-6 h-6 text-[hsl(180,100%,50%)]" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6 text-sm">The route you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground hover:border-[hsl(180,100%,50%)/0.4] hover:bg-[hsl(180,100%,50%)/0.05] transition-all text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
