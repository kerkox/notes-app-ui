import React from 'react';
import { Tag } from '../types';
import { TagItem } from './TagItem';

interface TagListProps {
  tags: Tag[];
  activeFilters: string[];
  onToggleFilter: (tag: string) => void;
  onDeleteTag: (tag: Tag) => void;
}

export const TagList: React.FC<TagListProps> = ({
  tags,
  activeFilters,
  onToggleFilter,
  onDeleteTag,
}) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800">
      <h2 className="mb-4 text-lg font-semibold">Etiquetas</h2>
      <ul>
        {tags.map((tag) => (
          <TagItem
            key={tag.id}
            tag={tag}
            isActive={activeFilters.includes(tag.name)}
            onToggle={onToggleFilter}
            onDelete={onDeleteTag}
          />
        ))}
      </ul>
    </div>
  );
};
