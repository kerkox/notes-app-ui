'use client';

import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { NotesProvider } from '../../provider/NotesProvider';
import ThemeProvider from '../../theme/themeProvider';

interface ClientProvidersProps {
  children: ReactNode;
}

export const ClientProviders: FC<ClientProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark" suppressHydrationWarning>
        <NotesProvider>
          {children}
        </NotesProvider>
      </ThemeProvider>
    </Provider>
  );
}; 