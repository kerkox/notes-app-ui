import React from 'react';
import { Note } from '../types';
import { NoteItem } from './NoteItem';

interface NoteListProps {
  notes: Note[];
  onDeleteNote: (id: number) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onDeleteNote }) => {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDelete={onDeleteNote} />
      ))}
    </div>
  );
};