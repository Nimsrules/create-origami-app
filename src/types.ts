export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun'

export interface ProjectOptions {
  name: string
  packageManager: PackageManager
  installDependencies: boolean
  initializeGit: boolean
  setupSupabase: boolean
}

export interface SupabaseConfig {
  supabaseUrl: string
  supabaseAnonKey: string
}

export interface ValidationResult {
  valid: boolean
  problems?: string[]
}
