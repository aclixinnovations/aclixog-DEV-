'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'default' | 'dark' | 'green' | 'purple' | 'orange' | 'teal';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeContextProvider');
  }
  return context;
};

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('default');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') as ThemeMode;
    if (savedTheme) {
      setThemeModeState(savedTheme);
    }
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('themeMode', mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
