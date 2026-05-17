import { Trash2, User } from 'lucide-react'
import type { Account } from '@/types'

interface AccountCardProps {
  account: Account
  onDelete: (id: string) => void
}

export default function AccountCard({ account, onDelete }: AccountCardProps) {
  return (
    <div className="card-dark rounded-lg p-4 flex items-center gap-3 card-hover group">
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm"
        style={{
          background: `${account.color}18`,
          border: `1px solid ${account.color}40`,
          color: account.color,
        }}
      >
        {account.username.charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-foreground truncate">{account.username}</span>
          {account.label && (
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 rounded border flex-shrink-0"
              style={{ color: account.color, borderColor: `${account.color}40`, background: `${account.color}10` }}
            >
              {account.label}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">
          Added {new Date(account.addedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Actions */}
      <button
        onClick={() => onDelete(account.id)}
        className="p-2 rounded text-muted-foreground hover:text-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,60%)/0.1] transition-all opacity-0 group-hover:opacity-100"
        aria-label="Remove account"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
