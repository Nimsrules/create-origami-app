# create-origami-app

🎨 The official CLI for creating Origami SaaS projects.

## Quick Start

Create a new Origami project with a single command:

```bash
# Using npx (recommended)
npx create-origami-app@latest my-app

# Using npm
npm create origami-app@latest my-app

# Using yarn
yarn create origami-app my-app

# Using pnpm
pnpm create origami-app my-app

# Using bun
bun create origami-app my-app
```

## Interactive Mode

Simply run the command without a project name for interactive setup:

```bash
npx create-origami-app@latest
```

## CLI Options

- `--npm` / `--yarn` / `--pnpm` / `--bun` - Choose your package manager
- `--no-install` - Skip dependency installation
- `--no-git` - Skip git repository initialization

## Examples

```bash
# Create with yarn and skip installation
npx create-origami-app@latest my-app --yarn --no-install

# Create without git initialization
npx create-origami-app@latest my-app --no-git

# Create with pnpm
npx create-origami-app@latest my-app --pnpm
```

## What's Included

- **Next.js 14** with App Router
- **TypeScript** with strict configuration
- **Supabase** integration for auth and database
- **TanStack Query** for server state management
- **Zustand** for client state management
- **Tailwind CSS** + **shadcn/ui** components
- **Dark/Light mode** toggle
- **ESLint** + **Prettier** + **Husky** for code quality
- **Vitest** + **React Testing Library** for testing
- **Comprehensive tooling** and configurations

## After Creation

1. Navigate to your project:

   ```bash
   cd my-app
   ```

2. Set up your environment variables in `.env.local`

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Supabase Setup

During project creation, you can optionally configure Supabase:

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key from the project settings
3. The CLI will automatically add them to your `.env.local` file

## Support

- 📖 [Documentation](https://github.com/yourusername/origami-docs)
- 🐛 [Report Issues](https://github.com/yourusername/create-origami-app/issues)
- 💬 [Discussions](https://github.com/yourusername/create-origami-app/discussions)

## License

MIT © [Your Name]
