import { createContext } from 'react';
import { NoteRead, Tag, LinkPreview } from '../types';

export type NotesContextType = {
  notes: NoteRead[];
  addNote: (title: string, content: string, tags: string[]) => void;
  deleteNote: (note: NoteRead) => void;
  tags: Tag[];
  addTag: (tag: string) => void;
  deleteTag: (tag: Tag) => void;
  search: string;
  setSearch: (search: string) => void;
  activeFilters: string[];
  toggleFilter: (tag: string) => void;
  fetchLinkPreviews: (links: string[]) => Promise<LinkPreview[]>;
  removeTagFromNote: (noteId: number, tagId: number) => Promise<void>;
};

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined,
);
