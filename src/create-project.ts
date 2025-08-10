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

  // Copy template files
  spinner = ora('📋 Copying template files...').start()
  const templatePath = path.join(__dirname, '..', 'templates', 'default')
  await fs.copy(templatePath, projectPath)
  spinner.succeed()

  // Update package.json with project name
  spinner = ora('📝 Updating package.json...').start()
  const packageJsonPath = path.join(projectPath, 'package.json')
  const packageJson = await fs.readJson(packageJsonPath)
  packageJson.name = name
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
  spinner.succeed()

  // Setup environment variables
  spinner = ora('🔧 Setting up environment variables...').start()
  await setupEnvironmentFiles(projectPath, supabaseConfig)
  spinner.succeed()

  // Initialize git repository
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

  // Install dependencies
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

      await execa(installCmd, installArgs, { cwd: projectPath })
      spinner.succeed()
    } catch (error) {
      spinner.fail(`Failed to install dependencies with ${packageManager}`)
      console.log(chalk.yellow(`\nYou can install them manually by running:`))
      console.log(chalk.white(`  cd ${name}`))
      console.log(chalk.white(`  ${packageManager} install`))
    }
  }

  // Setup husky hooks if git is initialized
  if (initializeGit && installDependencies) {
    spinner = ora('🪝 Setting up git hooks...').start()
    try {
      await execa('npx', ['husky', 'install'], { cwd: projectPath })
      await execa(
        'npx',
        ['husky', 'add', '.husky/pre-commit', 'npx lint-staged'],
        { cwd: projectPath }
      )
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

  // Write .env.example
  await fs.writeFile(envExamplePath, envContent)

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
