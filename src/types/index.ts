export interface Step {
  title: string
  description: string
  code?: string
  warning?: string
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
  link?: string
  notes?: string
}

export interface Account {
  id: string
  username: string
  label: string
  addedAt: string
  color: string
}

export type ScriptType =
  | 'powershell_mutex'
  | 'handle_auto_close'
  | 'batch_launcher'
  | 'startup_task'
  | 'ahk_process_explorer'
  | 'windows_sandbox_config'
  | 'runas_launcher'
