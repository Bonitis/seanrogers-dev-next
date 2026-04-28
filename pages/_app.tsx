import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider, useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import BlueSkyIcon from '@/components/icons/BlueSky'

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      title={isDark ? 'light mode' : 'dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

const GithubIcon = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const src =
    mounted && resolvedTheme === 'dark'
      ? '/assets/social/github-light.png'
      : '/assets/social/github.png'

  return (
    <Image
      src={src}
      alt="github-logo"
      height={32}
      width={32}
      sizes="100vw"
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={150}>
      <div className="relative bg-white transition-colors dark:bg-slate-900">
        <nav className="mx-auto mb-8 flex h-16 w-10/12 max-w-5xl items-center justify-between py-4 text-slate-800 dark:text-white">
          <Link
            href="/"
            className="rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Home
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <ThemeToggle />
          </div>
        </nav>
        <Component {...pageProps} />
        <footer className="mx-auto mt-16 w-10/12 max-w-5xl py-12 text-slate-800 dark:text-white">
          <div className="flex flex-col items-center justify-between md:flex-row md:p-0">
            <div>&copy;{` ${new Date().getFullYear()} Sean Rogers `}</div>
            <div className="flex">
              <a
                href="https://github.com/Bonitis"
                aria-label="@bonitis on github"
                target="_blank"
                rel="noreferrer me"
                className="m-2 flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                  <GithubIcon />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/smrogers/"
                aria-label="Sean Rogers linkedin profile"
                target="_blank"
                rel="noreferrer me"
                className="m-2 flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src="/assets/social/linkedin.png"
                    alt="linkedin-logo"
                    height={32}
                    width={32}
                    sizes="100vw"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              </a>
              <a
                href="https://bsky.app/profile/hellosean.bsky.social"
                aria-label="Sean Rogers Bluesky profile"
                target="_blank"
                rel="noreferrer me"
                className="m-2 flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                  <BlueSkyIcon />
                </div>
              </a>
            </div>
          </div>
        </footer>
        <Analytics />
        <Toaster />
      </div>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default MyApp
