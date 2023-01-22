import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import Image from "next/image";
import { useState, useEffect, useCallback } from 'react';


export const THEME_KEY = 'dark_mode';
export enum Theme {
  LIGHT="light",
  DARK="dark"
}

export const updateTheme = (theme: string) => {
  localStorage.setItem(THEME_KEY, theme);
  const htmlEl = document.documentElement;
  if (htmlEl) {
    htmlEl.className = theme;
  }
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
        <Link href="/" className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
          Home
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
      <footer className="dark:text-white text-slate-800 w-10/12 max-w-5xl mx-auto mt-16 py-12">
        <div className="md:p-0 flex flex-col md:flex-row justify-between items-center">
          <div>&copy;{` ${new Date().getFullYear()} Sean Rogers `}</div>
          <div className="flex">
            <a href="https://github.com/Bonitis" aria-label="@bonitis on github" target="_blank" rel="noreferrer" className="m-2 h-10 p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
              <Image
                src={theme === Theme.LIGHT ? "/assets/social/github.png" : "/assets/social/github-light.png"}
                alt="github-logo"
                height={32}
                width={32}
                sizes="100vw"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </a>
            <a href="https://www.linkedin.com/in/smrogers/" aria-label="Sean Rogers linkedin profile" target="_blank" rel="noreferrer" className="m-2 h-10 p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
              <Image
                src="/assets/social/linkedin.png"
                alt="linkedin-logo"
                height={32}
                width={32}
                sizes="100vw"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </a>
            <a href="https://twitter.com/helloseann" aria-label="@helloseann on twitter" target="_blank" rel="noreferrer" className="m-2 h-10 p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
              <Image
                src="/assets/social/twitter.png"
                alt="twitter-logo"
                height={32}
                width={32}
                sizes="100vw"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MyApp
