'use client';

import { FC, ReactNode } from 'react';
import PrimarySearchAppBar from '../app-bar/PrimarySearchAppBar';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <main>
        <PrimarySearchAppBar />
        {children}
      </main>
    </>
  );
};
