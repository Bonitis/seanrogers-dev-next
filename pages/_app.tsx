import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { Analytics } from '@vercel/analytics/react'

export const THEME_KEY = 'dark_mode'
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export const updateTheme = (theme: string) => {
  localStorage.setItem(THEME_KEY, theme)
  const htmlEl = document.documentElement
  if (htmlEl) {
    htmlEl.className = theme
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<string>(Theme.LIGHT)

  useEffect(() => {
    const currentTheme = localStorage.getItem(THEME_KEY) || Theme.LIGHT
    setTheme(localStorage.getItem(THEME_KEY) || Theme.LIGHT)
    updateTheme(currentTheme)
  }, [])

  const handleTheme = useCallback(() => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    setTheme(newTheme)
    updateTheme(newTheme)
  }, [theme])

  return (
    <div className="relative bg-white transition-colors dark:bg-slate-900">
      <nav className="mx-auto mb-8 flex h-16 w-10/12 max-w-5xl items-center justify-between py-4 text-slate-800 dark:text-white">
        <Link
          href="/"
          className="rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          Home
        </Link>
        <button
          title={theme === Theme.LIGHT ? 'dark mode' : 'light mode'}
          className="rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
          onClick={handleTheme}
        >
          <div
            className="dark:invert"
            style={{
              backgroundImage: `url(${
                theme === Theme.LIGHT
                  ? '/assets/icons/darkmode.svg'
                  : '/assets/icons/lightmode.svg'
              })`,
              height: '24px',
              width: '24px',
            }}
          />
        </button>
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
              rel="noreferrer"
              className="m-2 h-10 rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <Image
                src={
                  theme === Theme.LIGHT
                    ? '/assets/social/github.png'
                    : '/assets/social/github-light.png'
                }
                alt="github-logo"
                height={32}
                width={32}
                sizes="100vw"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/smrogers/"
              aria-label="Sean Rogers linkedin profile"
              target="_blank"
              rel="noreferrer"
              className="m-2 h-10 rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
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
            </a>
            <a
              href="https://twitter.com/helloseann"
              aria-label="@helloseann on twitter"
              target="_blank"
              rel="noreferrer"
              className="m-2 h-10 rounded p-1 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              <Image
                src="/assets/social/twitter.png"
                alt="twitter-logo"
                height={32}
                width={32}
                sizes="100vw"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </a>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  )
}

export default MyApp
