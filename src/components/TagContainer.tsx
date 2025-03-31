'use client';
import React from 'react';
import { useNotesContext } from '../hooks/useNotesContext';
import { TagList } from './TagList';

export const TagContainer = () => {
  const { tags, activeFilters, toggleFilter, deleteTag } = useNotesContext();
  return (
    <>
      <TagList
        tags={tags}
        activeFilters={activeFilters}
        onToggleFilter={toggleFilter}
        onDeleteTag={deleteTag}
      />
    </>
  );
};
