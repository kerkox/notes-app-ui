'use client';
import { useState } from 'react';
import { NoteForm } from './NoteForm';
import { NoteList } from './NoteList';
import { useNotesContext } from '../hooks/useNotesContext';
import { Button } from '@mui/material';
import { PlusIcon } from '@heroicons/react/24/outline';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Notes() {
  const [showAddNote, setShowAddNote] = useState(false);

  const { search, searchNotes } = useNotesContext();

  const toggleShowAddNote = () => setShowAddNote(!showAddNote);

  return (
    <div
      style={{ border: '1px solid red ' }}
      className="min-h-screen bg-gray-100 px-4 py-8 dark:bg-black dark:text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl dark:bg-black">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:bg-black dark:text-white">
          Notes App
        </h1>
        <div className="flex gap-8 dark:bg-black">
          <div className="w-3/4 dark:bg-black">
            <Button
              className="mb-4"
              variant="contained"
              onClick={toggleShowAddNote}
            >
              <>
                {showAddNote ? (
                  <>
                    <CancelIcon aria-hidden="true" />
                    {'Cancel'}
                  </>
                ) : (
                  <>
                    <PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    {'Add Note'}
                  </>
                )}
              </>
            </Button>
            {showAddNote && <NoteForm onAddedNote={toggleShowAddNote} />}
            <div className="mb-4 dark:bg-slate-800">
              <input
                type="text"
                className="w-full rounded-md border p-2"
                placeholder="Buscar notas..."
                value={search}
                onChange={(e) => searchNotes(e.target.value)}
                aria-label="Buscar notas"
              />
            </div>
            <NoteList />
          </div>
        </div>
      </div>
    </div>
  );
}
