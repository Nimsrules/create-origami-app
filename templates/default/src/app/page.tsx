import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, Shield, Layers } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rotate-45 rounded bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <span className="text-lg font-bold">Origami</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="min-h-screen">
        <section className="relative overflow-hidden pb-16 pt-20">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-32 -top-40 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-blue-400/20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-32 h-80 w-80 animate-pulse rounded-full bg-gradient-to-tr from-blue-400/20 via-cyan-400/20 to-teal-400/20 blur-3xl delay-1000"></div>
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10 blur-3xl delay-500"></div>
          </div>

          <div className="container relative mx-auto px-4 text-center">
            {/* Badge */}
            <div className="bg-muted mx-auto mb-8 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
              <Sparkles className="mr-2 h-4 w-4" />
              Fold your ideas into reality
            </div>

            {/* Main heading */}
            <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
                Meet{' '}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Origami
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
                SaaS Boilerplate
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg sm:text-xl">
              A meticulously crafted, production-ready Next.js 14 SaaS
              boilerplate with TypeScript, Supabase, and modern tooling. Ship
              faster without compromising quality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                  14
                </div>
                <div className="text-muted-foreground text-sm">
                  Next.js Version
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent">
                  100%
                </div>
                <div className="text-muted-foreground text-sm">TypeScript</div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-3xl font-bold text-transparent">
                  10+
                </div>
                <div className="text-muted-foreground text-sm">
                  Tools Integrated
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent">
                  5min
                </div>
                <div className="text-muted-foreground text-sm">Setup Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ship fast
              </span>
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-card group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Next.js 14</h3>
                <p className="text-muted-foreground text-sm">
                  Built with App Router and the latest Next.js features for
                  optimal performance.
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </div>

              <div className="bg-card group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <Shield className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">TypeScript</h3>
                <p className="text-muted-foreground text-sm">
                  Fully typed with strict TypeScript configuration for better
                  developer experience.
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </div>

              <div className="bg-card group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Layers className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Supabase</h3>
                <p className="text-muted-foreground text-sm">
                  Authentication and database integration ready to go with
                  minimal setup.
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </div>

              <div className="bg-card group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10">
                  <Sparkles className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Modern Stack</h3>
                <p className="text-muted-foreground text-sm">
                  TanStack Query, Zustand, Tailwind CSS, shadcn/ui and
                  comprehensive tooling.
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Showcase */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-8 text-2xl font-bold">
              Powered by industry leaders
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <div className="h-6 w-6 rounded bg-black dark:bg-white"></div>
                <span>Next.js</span>
              </div>
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <div className="h-6 w-6 rounded bg-blue-600"></div>
                <span>TypeScript</span>
              </div>
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <div className="h-6 w-6 rounded bg-green-600"></div>
                <span>Supabase</span>
              </div>
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <div className="h-6 w-6 rounded bg-cyan-500"></div>
                <span>Tailwind</span>
              </div>
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <div className="h-6 w-6 rounded bg-red-500"></div>
                <span>TanStack</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
