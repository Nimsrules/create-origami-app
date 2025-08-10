import fs from 'fs-extra'
import path from 'path'
import ora from 'ora'
import chalk from 'chalk'
import execa from 'execa'
import { ProjectOptions, SupabaseConfig } from './types'

export async function createProject(
  options: ProjectOptions,
  supabaseConfig?: SupabaseConfig | null
) {
  const { name, packageManager, installDependencies, initializeGit } = options
  const projectPath = path.resolve(process.cwd(), name)

  // Check if directory exists
  if (await fs.pathExists(projectPath)) {
    throw new Error(`Directory ${name} already exists`)
  }

  // Create project directory
  let spinner = ora('📁 Creating project directory...').start()
  await fs.ensureDir(projectPath)
  spinner.succeed()

  // Clone template from GitHub
  spinner = ora('📋 Copying template files...').start()
  try {
    // Clone the boilerplate repository
    await execa(
      'git',
      [
        'clone',
        'https://github.com/nimsrules/origami-saas-boilerplate.git',
        '.',
      ],
      { cwd: projectPath }
    )

    // Remove .git directory from cloned repo
    await fs.remove(path.join(projectPath, '.git'))

    spinner.succeed()
  } catch (error) {
    spinner.fail('Failed to download template')
    throw new Error(
      'Could not download template from GitHub. Please check your internet connection.'
    )
  }

  // Update package.json with project name
  spinner = ora('📝 Updating package.json...').start()
  const packageJsonPath = path.join(projectPath, 'package.json')

  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath)
    packageJson.name = name
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
    spinner.succeed()
  } else {
    spinner.fail('package.json not found in template')
    throw new Error('Invalid template: package.json not found')
  }

  // Setup environment variables
  spinner = ora('🔧 Setting up environment variables...').start()
  await setupEnvironmentFiles(projectPath, supabaseConfig)
  spinner.succeed()

  // Install dependencies first (before git init to avoid husky issues)
  if (installDependencies) {
    spinner = ora(
      `📦 Installing dependencies with ${packageManager}...`
    ).start()
    try {
      const installCmd =
        packageManager === 'yarn'
          ? 'yarn'
          : packageManager === 'pnpm'
          ? 'pnpm'
          : packageManager === 'bun'
          ? 'bun'
          : 'npm'
      const installArgs =
        packageManager === 'yarn'
          ? []
          : packageManager === 'bun'
          ? ['install']
          : ['install']

      await execa(installCmd, installArgs, {
        cwd: projectPath,
        stdio: 'pipe', // Suppress output to avoid clutter
      })
      spinner.succeed()
    } catch (error) {
      spinner.fail(`Failed to install dependencies with ${packageManager}`)
      console.log(chalk.yellow(`\nYou can install them manually by running:`))
      console.log(chalk.white(`  cd ${name}`))
      console.log(chalk.white(`  ${packageManager} install`))
      console.log(chalk.red(`\nError: ${error}`))
      throw error // Re-throw to stop execution
    }
  }

  // Initialize git repository (after dependency installation)
  if (initializeGit) {
    spinner = ora('📚 Initializing git repository...').start()
    try {
      await execa('git', ['init'], { cwd: projectPath })
      await execa('git', ['add', '.'], { cwd: projectPath })
      await execa(
        'git',
        ['commit', '-m', 'Initial commit from create-origami-app'],
        { cwd: projectPath }
      )
      spinner.succeed()
    } catch (error) {
      spinner.warn('Git initialization failed (git might not be installed)')
    }
  }

  // Setup husky hooks after both git init and dependency installation
  if (initializeGit && installDependencies) {
    spinner = ora('🪝 Setting up git hooks...').start()
    try {
      // Check if husky is available before trying to use it
      await execa('npx', ['husky', 'install'], {
        cwd: projectPath,
        stdio: 'pipe',
      })

      // Only add pre-commit hook if lint-staged is in package.json
      const packageJson = await fs.readJson(
        path.join(projectPath, 'package.json')
      )
      if (
        packageJson.devDependencies?.['lint-staged'] ||
        packageJson.dependencies?.['lint-staged']
      ) {
        await execa(
          'npx',
          ['husky', 'add', '.husky/pre-commit', 'npx lint-staged'],
          { cwd: projectPath, stdio: 'pipe' }
        )
      }
      spinner.succeed()
    } catch (error) {
      spinner.warn('Git hooks setup failed')
    }
  }
}

async function setupEnvironmentFiles(
  projectPath: string,
  supabaseConfig?: SupabaseConfig | null
) {
  const envExamplePath = path.join(projectPath, '.env.example')
  const envLocalPath = path.join(projectPath, '.env.local')

  let envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database
DATABASE_URL=your_database_url

# NextAuth (if using)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
`

  // Write .env.example (don't overwrite if it exists from template)
  if (!(await fs.pathExists(envExamplePath))) {
    await fs.writeFile(envExamplePath, envContent)
  }

  // Write .env.local with actual values if provided
  if (supabaseConfig) {
    const actualEnvContent = envContent
      .replace('your_supabase_project_url', supabaseConfig.supabaseUrl)
      .replace('your_supabase_anon_key', supabaseConfig.supabaseAnonKey)

    await fs.writeFile(envLocalPath, actualEnvContent)
  } else {
    await fs.writeFile(envLocalPath, envContent)
  }
}
