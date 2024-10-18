import React, { useRef, useState } from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline";

interface TagInputProps {
  tags: string[];
  allTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, allTags, onAddTag, onRemoveTag }) => {
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setShowTagSuggestions(true);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddTag(tagInput);
      setTagInput("");
    } else if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      onRemoveTag(tags[tags.length - 1]);
    }
  };

  const filteredTagSuggestions = allTags.filter(
    (tag) => tag.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(tag)
  );

  return (
    <div className="relative mt-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {tag}
            <button
              type="button"
              className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
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
        className="w-full p-2 border rounded-md"
        placeholder="Agregar etiquetas..."
        value={tagInput}
        onChange={handleTagInputChange}
        onKeyDown={handleTagInputKeyDown}
        onFocus={() => setShowTagSuggestions(true)}
        onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
        aria-label="Agregar etiquetas"
      />
      {showTagSuggestions && filteredTagSuggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {filteredTagSuggestions.map((tag) => (
            <div
              key={tag}
              className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
              onMouseDown={() => {
                onAddTag(tag);
                setTagInput("");
              }}
            >
              <span className="block truncate">{tag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};