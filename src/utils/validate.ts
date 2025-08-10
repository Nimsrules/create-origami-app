import validateNpmPackageName from 'validate-npm-package-name'
import { ValidationResult } from '../types'

export function validateProjectName(name: string): ValidationResult {
  const validation = validateNpmPackageName(name)

  if (!validation.validForNewPackages) {
    return {
      valid: false,
      problems: [...(validation.errors || []), ...(validation.warnings || [])],
    }
  }

  // Additional checks
  if (name.length === 0) {
    return {
      valid: false,
      problems: ['Project name cannot be empty'],
    }
  }

  if (name.length > 214) {
    return {
      valid: false,
      problems: ['Project name cannot be longer than 214 characters'],
    }
  }

  return { valid: true }
}
