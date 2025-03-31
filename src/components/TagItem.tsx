import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Tag } from '../types';

interface TagItemProps {
  tag: Tag;
  isActive: boolean;
  onToggle: (tagName: string) => void;
  onDelete: (tag: Tag) => void;
}

export const TagItem: React.FC<TagItemProps> = ({
  tag,
  isActive,
  onToggle,
  onDelete,
}) => {
  return (
    <li className="group mb-2 flex items-center justify-between rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
      <button
        className={`text-sm ${
          isActive
            ? 'font-bold text-indigo-600'
            : 'text-gray-600 dark:text-gray-400'
        }`}
        onClick={() => onToggle(tag.name)}
      >
        {tag.name}
      </button>
      <button
        onClick={() => onDelete(tag)}
        className="rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-600 dark:hover:text-red-400" />
      </button>
    </li>
  );
};
