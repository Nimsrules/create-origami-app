declare module 'validate-npm-package-name' {
  interface ValidationResult {
    validForNewPackages: boolean
    validForOldPackages: boolean
    warnings?: string[]
    errors?: string[]
  }

  function validateNpmPackageName(name: string): ValidationResult

  export = validateNpmPackageName
}
