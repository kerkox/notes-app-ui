import React from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { ThemeProviderProps } from 'next-themes/dist/types';

interface LocalThemeProviderProps extends ThemeProviderProps {
  children: ReactNode;
  [key: string]: unknown;
}

const ThemeProvider = ({ children, ...props }: LocalThemeProviderProps) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
};

export default ThemeProvider;
