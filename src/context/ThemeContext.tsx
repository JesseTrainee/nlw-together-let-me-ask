import React, { createContext,ReactNode, useState, useEffect } from 'react'


type ThemeContextProviderProps = {
    children: ReactNode;
}

type ThemeContextType = {
    theme: string;
    toggleThemeMode: () => Promise<void>;
  }

export const ThemeContext = createContext({} as ThemeContextType)
export const ThemeProvider = (props: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.querySelector('body')?.classList.add('dark')
      setTheme('dark')
    } else {
      document.querySelector('body')?.classList.remove('dark')
      setTheme('light')
    }
  }, [])

  async function toggleThemeMode() {
    if (
      !localStorage.getItem('theme') ||
      localStorage.getItem('theme') === 'light'
    ) {
      localStorage.theme = 'dark'
      document.querySelector('body')?.classList.add('dark')
      setTheme('dark')
    } else {
      localStorage.theme = 'light'
      document.querySelector('body')?.classList.remove('dark')
      setTheme('light')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleThemeMode }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

