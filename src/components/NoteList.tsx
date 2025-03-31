import React from 'react';
import { NoteItem } from './NoteItem';
import { useNotesContext } from '@/hooks/useNotesContext';
import { Tag } from '@/types';
export const NoteList: React.FC = () => {
  const { notes, activeFilters, search } = useNotesContext();
  const filteredNotes = notes.filter(
    (note) =>
      (activeFilters.length === 0 ||
        activeFilters.every((filter) =>
          note.tags.some((tag: Tag) => tag.name.includes(filter)),
        )) &&
      (search
        ? note.body?.toLowerCase().includes(search.toLowerCase()) ||
          note.tags.some((tag: Tag) =>
            tag.name.toLowerCase().includes(search.toLowerCase()),
          )
        : true),
  );
  return (
    <div className="flex flex-wrap gap-4 space-y-4 dark:bg-black">
      {filteredNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};
