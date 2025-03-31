'use client';
import React, { useState } from 'react';
import { Menu, Search, Settings, Grid, RefreshCw } from 'lucide-react';
import styles from './gridNotes.module.css';

const KeepClone = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tags = [
    { id: 1, name: 'Notas', icon: '📝' },
    { id: 2, name: 'Recordatorios', icon: '⏰' },
    { id: 3, name: 'Animales', icon: '🐾' },
    { id: 4, name: 'Apache', icon: '🚀' },
    { id: 5, name: 'Café', icon: '☕' },
  ];

  const notes = [
    {
      id: 1,
      title: 'Crianza de madres en diferentes épocas',
      content: 'Contenido de la nota...',
      tags: ['animales', 'crianza'],
      color: 'bg-teal-600',
      height: 'h-48',
    },
    {
      id: 2,
      title: 'Escaleras infinitas china',
      content:
        'Escaleras infinitas en china con múltiples niveles y una arquitectura impresionante...',
      tags: ['china', 'escaleras'],
      color: 'bg-amber-700',
      height: 'h-64',
    },
    {
      id: 3,
      title: 'Herramientas de desarrollo',
      content: 'Lista de herramientas útiles para el desarrollo web',
      tags: ['dev', 'tools'],
      color: 'bg-blue-600',
      height: 'h-40',
    },
    {
      id: 4,
      title: 'Recetas saludables',
      content: 'Colección de recetas saludables para la semana',
      tags: ['cocina', 'salud'],
      color: 'bg-green-600',
      height: 'h-56',
    },
    // Más notas de ejemplo
  ];

  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-slate-800">
      {/* Top Navigation */}
      <header className="fixed z-10 flex h-16 w-full items-center border-b bg-white px-4 dark:bg-slate-800">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-full p-2 hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="mx-4 flex flex-1 items-center">
          <span className="text-xl">Keep</span>
        </div>

        <div className="max-w-3xl flex-1 dark:bg-slate-800">
          <div className="flex items-center rounded-lg bg-gray-100 px-4 py-2">
            <Search className="mr-2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="ml-4 flex items-center gap-2 dark:bg-slate-800">
          <button className="rounded-full p-2 hover:bg-gray-100">
            <RefreshCw className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Grid className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 pt-16 dark:bg-slate-800">
        {/* Sidebar */}
        <aside
          className={`fixed h-full w-64 bg-white transition-all duration-300 dark:bg-slate-800 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
        >
          <div className="h-full overflow-y-auto">
            {tags.map((tag) => (
              <button
                key={tag.id}
                className="flex w-full items-center gap-4 rounded-r-full px-6 py-3 text-left hover:bg-gray-100 dark:hover:bg-slate-600"
              >
                <span>{tag.icon}</span>
                <span>{tag.name}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Notes Grid */}
        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          }`}
        >
          <div className="mx-auto max-w-6xl">
            {/* Contenedor de columnas con masonry layout */}
            <div className={`${styles.gridContainer} mx-auto columns-[240px]`}>
              {/* <div className={`mx-auto columns-[240px]`}> */}
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`${note.color} ${note.height} ${styles.itemNote} mb-4 inline-block w-[240px] break-inside-avoid rounded-lg p-4 text-white shadow-sm transition-all transition-shadow duration-300 hover:shadow-md`}
                  // className={`${note.color} ${note.height} mb-4 inline-block w-[240px] break-inside-avoid rounded-lg p-4 text-white shadow-sm transition-shadow hover:shadow-md`}
                >
                  <h3 className="mb-2 font-medium">{note.title}</h3>
                  <p className="mb-4 text-sm">{note.content}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-black/20 px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KeepClone;
