#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import gradient from 'gradient-string';
import { createProject } from './create-project';
import { validateProjectName } from './utils/validate';
import { PackageManager, ProjectOptions } from './types';

const program = new Command();

// ASCII Art for Origami
const origamiArt = `
╔══════════════════════════════════════╗
║                                      ║
║    ██████  ██████  ██  ██████  ██    ║
║   ██    ██ ██   ██ ██ ██       ██    ║
║   ██    ██ ██████  ██ ██   ███ ██    ║
║   ██    ██ ██   ██ ██ ██    ██ ██    ║
║    ██████  ██   ██ ██  ██████  ██    ║
║                                      ║
║        Fold your ideas into reality  ║
╚══════════════════════════════════════╝
`;

function displayWelcome() {
  console.clear();
  console.log(gradient.cristal(origamiArt));
  console.log(
    chalk.cyan('\n🎨 Welcome to') + 
    chalk.bold(' create-origami-app') + 
    chalk.cyan(' - The modern SaaS boilerplate CLI\n')
  );
}

async function promptForProjectDetails(projectName?: string): Promise<ProjectOptions> {
  const questions = [];

  if (!projectName) {
    questions.push({
      type: 'input',
      name: 'name',
      message: '📁 What is your project named?',
      default: 'my-origami-app',
      validate: (input: string) => {
        const validation = validateProjectName(input);
        if (!validation.valid) {
          return validation.problems![0]!;
        }
        return true;
      },
    });
  }

  questions.push(
    {
      type: 'list',
      name: 'packageManager',
      message: '📦 Which package manager would you like to use?',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' },
        { name: 'bun', value: 'bun' },
      ],
      default: 'npm',
    },
    {
      type: 'confirm',
      name: 'installDependencies',
      message: '⚡ Install dependencies?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'initializeGit',
      message: '📚 Initialize a git repository?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'setupSupabase',
      message: '🔐 Configure Supabase (you can do this later)?',
      default: false,
    }
  );

  const answers = await inquirer.prompt(questions);

  return {
    name: projectName || answers.name,
    packageManager: answers.packageManager as PackageManager,
    installDependencies: answers.installDependencies,
    initializeGit: answers.initializeGit,
    setupSupabase: answers.setupSupabase,
  };
}

async function promptForSupabaseConfig() {
  console.log(chalk.cyan('\n🔐 Supabase Configuration'));
  console.log(chalk.gray('You can find these values in your Supabase project settings.\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'supabaseUrl',
      message: '🌐 Supabase Project URL:',
      validate: (input: string) => {
        if (!input.trim()) return 'Supabase URL is required';
        if (!input.includes('supabase.co')) return 'Please enter a valid Supabase URL';
        return true;
      },
    },
    {
      type: 'password',
      name: 'supabaseAnonKey',
      message: '🔑 Supabase Anon Key:',
      validate: (input: string) => {
        if (!input.trim()) return 'Supabase Anon Key is required';
        return true;
      },
    },
  ]);

  return answers;
}

async function main() {
  displayWelcome();

  program
    .name('create-origami-app')
    .description('Create a new Origami SaaS project')
    .version('1.0.0')
    .argument('[name]', 'project name')
    .option('--npm', 'use npm')
    .option('--yarn', 'use yarn')
    .option('--pnpm', 'use pnpm')
    .option('--bun', 'use bun')
    .option('--no-install', "don't install dependencies")
    .option('--no-git', "don't initialize git repository")
    .action(async (name, options) => {
      try {
        let projectOptions = await promptForProjectDetails(name);

        // Override with CLI flags
        if (options.npm) projectOptions.packageManager = 'npm';
        if (options.yarn) projectOptions.packageManager = 'yarn';
        if (options.pnpm) projectOptions.packageManager = 'pnpm';
        if (options.bun) projectOptions.packageManager = 'bun';
        if (options.install === false) projectOptions.installDependencies = false;
        if (options.git === false) projectOptions.initializeGit = false;

        let supabaseConfig = null;
        if (projectOptions.setupSupabase) {
          supabaseConfig = await promptForSupabaseConfig();
        }

        console.log(chalk.cyan('\n🚀 Creating your Origami project...\n'));

        await createProject(projectOptions, supabaseConfig);

        // Success message
        console.log(chalk.green('\n✅ Project created successfully!\n'));
        
        console.log(chalk.cyan('📋 Next steps:'));
        console.log(chalk.white(`   cd ${projectOptions.name}`));
        
        if (!projectOptions.installDependencies) {
          console.log(chalk.white(`   ${projectOptions.packageManager} install`));
        }
        
        if (!projectOptions.setupSupabase) {
          console.log(chalk.white('   Set up your Supabase credentials in .env.local'));
        }
        
        console.log(chalk.white(`   ${projectOptions.packageManager} run dev`));
        
        console.log(chalk.cyan('\n🎨 Happy coding with Origami! '));
        console.log(chalk.gray('📖 Documentation: https://github.com/yourusername/origami-docs'));

      } catch (error) {
        console.error(chalk.red('\n❌ Error creating project:'), error);
        process.exit(1);
      }
    });

  await program.parseAsync(process.argv);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(chalk.red('Unexpected error:'), error);
    process.exit(1);
  });
}