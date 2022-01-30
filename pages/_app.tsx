import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react';


export const THEME_KEY = 'dark_mode';
export enum Theme {
  LIGHT="light",
  DARK="dark"
}

export const updateTheme = (theme: string) => {
  localStorage.setItem(THEME_KEY, theme);
  const htmlEl = document.documentElement;
  htmlEl.className = theme;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<string>(Theme.LIGHT);
  
  useEffect(() => {
    const currentTheme = localStorage.getItem(THEME_KEY) || Theme.LIGHT
    setTheme(localStorage.getItem(THEME_KEY) || Theme.LIGHT);
    updateTheme(currentTheme);
  }, [])

  const handleTheme = useCallback(() => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    setTheme(newTheme);
    updateTheme(newTheme)
  }, [theme])

  return (
    <div className="dark:bg-slate-900 bg-white transition-colors relative">
      <nav className="w-10/12 max-w-5xl h-16 mx-auto mb-8 flex items-center justify-between py-4 dark:text-white text-slate-800">
        <Link href="/" passHref>
          <a className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
            Home
          </a>
        </Link>
        <button
          title={theme === Theme.LIGHT ? 'dark mode' : 'light mode'}
          className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"
          onClick={handleTheme}
        >
          <div
            className="dark:invert"
            style={{
              backgroundImage: `url(${theme === Theme.LIGHT ? '/assets/icons/darkmode.svg' : '/assets/icons/lightmode.svg' })`,
              height: '24px',
              width: '24px'
            }}
          />
        </button>
      </nav>
      <Component {...pageProps} />
      <footer className="dark:text-white text-slate-800 w-full mt-16 py-12">
        <div className="md:p-0 w-full md:w-10/12 flex flex-col md:flex-row justify-between max-w-5xl mx-8 md:mx-auto">
          <div>&copy;{` ${new Date().getFullYear()} Sean Rogers `}</div>
          <div>Social Links</div>
        </div>
      </footer>
    </div>
  )
}

export default MyApp
