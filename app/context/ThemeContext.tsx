// context/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ColorValue, OpaqueColorValue } from 'react-native';

export type Theme = {
  background: ColorValue | undefined;
  text: ColorValue | undefined;
  primary: ColorValue | undefined;
  cardBackground: ColorValue | undefined;
  icon: string | OpaqueColorValue | undefined;
  subText: ColorValue | undefined;
  isDarkMode: boolean;
  
  colors: {
    card: any;
    primary: string | OpaqueColorValue | undefined;
    background: string;
    text: string;
    border: string;
  };
  toggleDarkMode: () => void;
};

export const ThemeContext = createContext<Theme | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme: Theme = {
    isDarkMode,
    colors: isDarkMode
      ? {
        background: '#121212',
        text: '#ffffff',
        border: '#333333',
        card: '#1e1e1e',
        primary: '#bb86fc',
      }
      : {
        background: '#ffffff',
        text: '#000000',
        border: '#e0e0e0',
        card: '#f5f5f5',
        primary: '#6200ee',
      },
    toggleDarkMode: () => setIsDarkMode(prev => !prev),
    background: undefined,
    text: undefined,
    primary: undefined,
    cardBackground: undefined,
    icon: undefined,
    subText: undefined
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
