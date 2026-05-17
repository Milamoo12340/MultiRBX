export interface Account {
  id: string
  username: string
  label: string
  cookie?: string
  addedAt: string
  color: string
}

export interface Method {
  id: string
  title: string
  subtitle: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  safety: 'Safe' | 'Caution' | 'Risk'
  tool: string
  maxInstances: string
  pros: string[]
  cons: string[]
  steps: Step[]
  notes?: string
  link?: string
}

export interface Step {
  title: string
  description: string
  code?: string
  warning?: string
}

export type ScriptType = 'powershell' | 'batch' | 'manual'
