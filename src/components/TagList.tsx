import React from 'react';

interface TagListProps {
  tags: string[];
  activeFilters: string[];
  onToggleFilter: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
}

export const TagList: React.FC<TagListProps> = ({ tags, activeFilters, onToggleFilter, onDeleteTag }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Etiquetas</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag} className="flex items-center justify-between mb-2">
            <button
              className={`text-sm ${
                activeFilters.includes(tag) ? 'font-bold text-indigo-600' : 'text-gray-600'
              }`}
              onClick={() => onToggleFilter(tag)}
            >
              {tag}
            </button>
            <button
              className="text-xs text-red-600 hover:text-red-800"
              onClick={() => onDeleteTag(tag)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};