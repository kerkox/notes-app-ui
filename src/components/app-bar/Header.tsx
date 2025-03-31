import Image from 'next/image';
import React from 'react';

export const Header = () => {
  return (
    <>
      <header className="fixed left-0 top-0 flex h-16 w-full justify-around gap-4 bg-white dark:bg-slate-800">
        <Image className="flex-auto" src="" alt="Logo" /> {/* Logo */}
        <span className="flex-auto">Title</span>
        <nav className="flex-auto" /> {/* Navigation */}
        <div className="flex flex-auto p-2">
          Search Text:
          <input type="text" />
        </div>
        <div className="flex-auto">User</div>
      </header>
      <div className="h-16">space needed</div>
    </>
  );
};
