import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { TagInput } from './TagInput';
import { useNotesContext } from '@/hooks/useNotesContext';

interface NoteFormProps {
  onAddedNote: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onAddedNote }) => {
  const [title, setTitle] = useState('');
  const [body, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { addNote, tags: allTags } = useNotesContext();

  const handleAddNote = () => {
    if (body.trim() === '') return;
    addNote(title, body, tags);
    setContent('');
    setTags([]);
    onAddedNote();
  };

  const addTag = (tag: string) => {
    const TagTrim = tag.trim();
    if (
      TagTrim &&
      !tags
        .map((tagItem) => tagItem.toLowerCase())
        .includes(TagTrim.toLowerCase())
    ) {
      setTags((prevTags) => [...prevTags, TagTrim]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mb-8 rounded-lg bg-white shadow-sm dark:bg-slate-800 dark:text-white">
      <div className="p-4">
        <input
          type="text"
          className="mb-4 w-full rounded-md border p-2 dark:bg-black"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Título de la nota"
        />
        <textarea
          className="w-full rounded-md border p-2"
          rows={3}
          placeholder="Ingresa tu nota..."
          value={body}
          onChange={(e) => setContent(e.target.value)}
          aria-label="Contenido de la nota"
        />
        <TagInput
          tags={tags}
          allTags={allTags}
          onAddTag={addTag}
          onRemoveTag={removeTag}
        />
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right dark:bg-slate-800 dark:text-white">
        <button
          type="button"
          className={`inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            body.trim() === '' ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={handleAddNote}
          disabled={body.trim() === ''}
        >
          <PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          Agregar Nota
        </button>
      </div>
    </div>
  );
};
