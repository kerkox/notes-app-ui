import { useContext } from 'react';
import { NotesContext, NotesContextType } from '../context/NotesContext';

export const useNotesContext = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
};
