import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  label: string
  variant: 'safe' | 'caution' | 'risk' | 'beginner' | 'intermediate' | 'advanced' | 'info'
  size?: 'sm' | 'md'
}

const VARIANT_STYLES = {
  safe: 'text-[hsl(150,100%,45%)] bg-[hsl(150,100%,45%)/0.1] border-[hsl(150,100%,45%)/0.3]',
  caution: 'text-[hsl(38,92%,60%)] bg-[hsl(38,92%,60%)/0.1] border-[hsl(38,92%,60%)/0.3]',
  risk: 'text-[hsl(0,84%,60%)] bg-[hsl(0,84%,60%)/0.1] border-[hsl(0,84%,60%)/0.3]',
  beginner: 'text-[hsl(150,100%,45%)] bg-[hsl(150,100%,45%)/0.1] border-[hsl(150,100%,45%)/0.3]',
  intermediate: 'text-[hsl(38,92%,60%)] bg-[hsl(38,92%,60%)/0.1] border-[hsl(38,92%,60%)/0.3]',
  advanced: 'text-[hsl(0,84%,60%)] bg-[hsl(0,84%,60%)/0.1] border-[hsl(0,84%,60%)/0.3]',
  info: 'text-[hsl(180,100%,50%)] bg-[hsl(180,100%,50%)/0.1] border-[hsl(180,100%,50%)/0.3]',
}

export default function StatusBadge({ label, variant, size = 'sm' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'tag border font-mono',
        VARIANT_STYLES[variant],
        size === 'md' ? 'text-xs px-2.5 py-1' : 'text-[10px] px-2 py-0.5'
      )}
    >
      {label}
    </span>
  )
}
