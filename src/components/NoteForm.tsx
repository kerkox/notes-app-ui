import React, { useState } from 'react';
import { PlusIcon } from "@heroicons/react/24/outline";
import { TagInput } from './TagInput';

interface NoteFormProps {
  onAddNote: (content: string, tags: string[]) => void;
  allTags: string[];
}

export const NoteForm: React.FC<NoteFormProps> = ({ onAddNote, allTags }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddNote = () => {
    if (content.trim() === "") return;
    onAddNote(content, tags);
    setContent("");
    setTags([]);
  };

  const addTag = (tag: string) => {
    const lowercaseTag = tag.toLowerCase().trim();
    if (lowercaseTag && !tags.includes(lowercaseTag)) {
      setTags((prevTags) => [...prevTags, lowercaseTag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mb-8 bg-white shadow-sm rounded-lg">
      <div className="p-4">
        <textarea
          className="w-full p-2 border rounded-md"
          rows={3}
          placeholder="Ingresa tu nota..."
          value={content}
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
      <div className="bg-gray-50 px-4 py-3 text-right">
        <button
          type="button"
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            content.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleAddNote}
          disabled={content.trim() === ""}
        >
          <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          Agregar Nota
        </button>
      </div>
    </div>
  );
};