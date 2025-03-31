import React, { useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Tag } from '../types';

interface TagInputProps {
  tags: string[];
  allTags: Tag[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  allTags,
  onAddTag,
  onRemoveTag,
}) => {
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setShowTagSuggestions(true);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddTag(tagInput);
      setTagInput('');
    } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
      onRemoveTag(tags[tags.length - 1]);
    }
  };

  const filteredTagSuggestions = allTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(tagInput.toLowerCase()) &&
      !tags.includes(tag.name),
  );

  return (
    <div className="relative mt-2">
      <div className="mb-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
          >
            {tag}
            <button
              type="button"
              className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:outline-none"
              onClick={() => onRemoveTag(tag)}
            >
              <span className="sr-only">Eliminar etiqueta {tag}</span>
              <XMarkIcon className="h-3 w-3" aria-hidden="true" />
            </button>
          </span>
        ))}
      </div>
      <input
        ref={tagInputRef}
        type="text"
        className="w-full rounded-md border p-2 dark:bg-black"
        placeholder="Agregar etiquetas..."
        value={tagInput}
        onChange={handleTagInputChange}
        onKeyDown={handleTagInputKeyDown}
        onFocus={() => setShowTagSuggestions(true)}
        onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
        aria-label="Agregar etiquetas"
      />
      {showTagSuggestions && filteredTagSuggestions.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black sm:text-sm">
          {filteredTagSuggestions.map((tag) => (
            <div
              key={tag.id}
              className="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-800"
              onMouseDown={() => {
                onAddTag(tag.name);
                setTagInput('');
              }}
            >
              <span className="block truncate">{tag.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
