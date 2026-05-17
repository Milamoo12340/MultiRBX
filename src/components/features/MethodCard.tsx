import { useState } from 'react'
import { ChevronDown, ChevronRight, ExternalLink, Check, X, AlertTriangle } from 'lucide-react'
import type { Method } from '@/types'
import StatusBadge from './StatusBadge'
import CodeBlock from './CodeBlock'

interface MethodCardProps {
  method: Method
  defaultOpen?: boolean
}

export default function MethodCard({ method, defaultOpen = false }: MethodCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [activeStep, setActiveStep] = useState(0)

  const diffVariant = method.difficulty === 'Beginner' ? 'beginner'
    : method.difficulty === 'Intermediate' ? 'intermediate' : 'advanced'
  const safeVariant = method.safety === 'Safe' ? 'safe'
    : method.safety === 'Caution' ? 'caution' : 'risk'

  return (
    <div className={`card-dark rounded-xl overflow-hidden card-hover transition-all duration-300 ${open ? 'border-glow' : ''}`}>
      {/* Header */}
      <button
        className="w-full text-left p-5 sm:p-6 flex items-start gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 ${
          open ? 'bg-[hsl(180,100%,50%)/0.15] border border-[hsl(180,100%,50%)/0.3]' : 'bg-secondary border border-border'
        }`}>
          <span className="font-mono font-bold text-sm text-[hsl(180,100%,50%)]">
            {method.maxInstances.includes('+') ? '∞' : method.maxInstances}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-foreground leading-tight">{method.title}</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-snug mb-3">{method.subtitle}</p>
          <div className="flex flex-wrap gap-2">
            <StatusBadge label={method.difficulty} variant={diffVariant} />
            <StatusBadge label={`🛡 ${method.safety}`} variant={safeVariant} />
            <StatusBadge label={`Max: ${method.maxInstances} instances`} variant="info" />
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          {open
            ? <ChevronDown className="w-5 h-5 text-[hsl(180,100%,50%)]" />
            : <ChevronRight className="w-5 h-5 text-muted-foreground" />
          }
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-border animate-fade-in">
          {/* Pros / Cons */}
          <div className="p-5 sm:p-6 grid sm:grid-cols-2 gap-4 bg-[hsl(220,16%,7%)]">
            <div>
              <h4 className="font-mono text-xs font-semibold text-[hsl(150,100%,45%)] uppercase tracking-wider mb-3">✓ Pros</h4>
              <ul className="space-y-2">
                {method.pros.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-[hsl(150,100%,45%)] mt-0.5 flex-shrink-0" />
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
                    <X className="w-3.5 h-3.5 text-[hsl(0,84%,60%)] mt-0.5 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps */}
          <div className="p-5 sm:p-6">
            <h4 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Step-by-Step Guide</h4>

            {/* Step tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
              {method.steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                    activeStep === i
                      ? 'bg-[hsl(180,100%,50%)/0.15] text-[hsl(180,100%,50%)] border border-[hsl(180,100%,50%)/0.3]'
                      : 'bg-secondary text-muted-foreground border border-border hover:border-[hsl(180,100%,50%)/0.2] hover:text-foreground'
                  }`}
                >
                  {i + 1}. {step.title.length > 20 ? step.title.slice(0, 20) + '…' : step.title}
                </button>
              ))}
            </div>

            {/* Active step content */}
            {method.steps[activeStep] && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[hsl(180,100%,50%)/0.15] border border-[hsl(180,100%,50%)/0.3] flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-xs font-bold text-[hsl(180,100%,50%)]">{activeStep + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground mb-2">{method.steps[activeStep].title}</h5>
                    <p className="text-muted-foreground text-sm leading-relaxed">{method.steps[activeStep].description}</p>
                  </div>
                </div>

                {method.steps[activeStep].warning && (
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[hsl(38,92%,60%)/0.08] border border-[hsl(38,92%,60%)/0.25]">
                    <AlertTriangle className="w-4 h-4 text-[hsl(38,92%,60%)] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[hsl(38,92%,60%)]">{method.steps[activeStep].warning}</p>
                  </div>
                )}

                {method.steps[activeStep].code && (
                  <CodeBlock
                    code={method.steps[activeStep].code!}
                    label={`step-${activeStep + 1}.ps1`}
                  />
                )}

                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="px-3 py-1.5 text-xs font-mono rounded border border-border text-muted-foreground hover:text-foreground hover:border-[hsl(180,100%,50%)/0.3] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(method.steps.length - 1, activeStep + 1))}
                    disabled={activeStep === method.steps.length - 1}
                    className="px-3 py-1.5 text-xs font-mono rounded border border-border text-muted-foreground hover:text-foreground hover:border-[hsl(180,100%,50%)/0.3] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notes + link */}
          {(method.notes || method.link) && (
            <div className="px-5 sm:px-6 pb-5 space-y-3">
              {method.notes && (
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[hsl(180,100%,50%)/0.05] border border-[hsl(180,100%,50%)/0.15]">
                  <span className="text-[hsl(180,100%,50%)] text-sm">ℹ</span>
                  <p className="text-sm text-muted-foreground">{method.notes}</p>
                </div>
              )}
              {method.link && (
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[hsl(180,100%,50%)] hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Official Download / Docs
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
