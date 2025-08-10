# 🎨 Origami SaaS Boilerplate

> **Fold your ideas into reality** - A meticulously crafted, production-ready Next.js SaaS boilerplate that helps you ship faster without compromising on quality.

## ✨ What makes Origami different?

Origami isn't just another boilerplate - it's a thoughtfully designed foundation that combines modern web technologies with developer experience best practices. Like the ancient art of paper folding, every component is carefully crafted and purposefully placed.

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Authentication**: Supabase Auth
- **State Management**:
  - TanStack Query (server state)
  - Zustand (client state)
- **Styling**: Tailwind CSS + shadcn/ui
- **Theme**: Built-in dark/light mode toggle
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier + Husky
- **Documentation**: Mintlify ready
- **Deployment**: Netlify optimized

## 🎯 Features

- ⚡ **Lightning Fast** - Optimized for performance and developer experience
- 🔒 **Authentication Ready** - Supabase integration with minimal setup
- 🎨 **Beautiful UI** - shadcn/ui components with dark/light theme
- 📱 **Responsive** - Mobile-first design approach
- 🧪 **Test Ready** - Comprehensive testing setup
- 📊 **Data Fetching** - TanStack Query with built-in loading states
- 🔧 **Developer Tools** - Hot reload, TypeScript strict mode, linting
- 📚 **Well Documented** - Clear setup instructions and architecture decisions

## 🏗️ Project Structure

src/
├── app/ # Next.js 14 App Router
├── components/ # Reusable UI components
│ └── ui/ # shadcn/ui components
├── lib/ # Utility functions
├── hooks/ # Custom React hooks
├── stores/ # Zustand stores
├── types/ # TypeScript type definitions
└── utils/ # Helper functions

## 🚦 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/yourusername/origami-saas-boilerplate.git
   cd origami-saas-boilerplate
   npm install
   ```
2. Environment Setup
   ````cp .env.example .env.local
   # Add your Supabase credentials```
   ````
3. Run Development Server

```
npm run dev
```

🛠️ Available Scripts

npm run dev - Start development server
npm run build - Build for production
npm run test - Run tests
npm run lint - Lint code
npm run format - Format code with Prettier

📋 Requirements

Node.js 18.17.0 or higher
npm or yarn
Supabase account (for authentication)

🤝 Contributing
Contributions are welcome! Please read our contributing guidelines and code of conduct.
📄 License
MIT License - see LICENSE file for details.
🙏 Acknowledgments
Built with love using the amazing open-source ecosystem. Special thanks to the teams behind Next.js, Supabase, Tailwind CSS, and all the other fantastic tools that make this possible.
