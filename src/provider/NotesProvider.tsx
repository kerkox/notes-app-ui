'use client';
import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { NotesContext, NotesContextType } from '../context/NotesContext';
import { LinkPreview, NoteCreate, NoteRead, Tag } from '../types';
import {
  useGetNotesQuery,
  useGetTagsQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateTagsMutation,
  useRemoveTagFromNoteMutation,
  useDeleteTagMutation,
} from '../services/notesApi';
import { extractLinks } from '../helpers/utils';
import AlertMessage from '../components/common/AlertMessage';

export const NotesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { data: notes = [] } = useGetNotesQuery();
  const { data: tags = [] } = useGetTagsQuery();
  const [addNoteMutation] = useAddNoteMutation();
  const [deleteNoteMutation] = useDeleteNoteMutation();
  const [deleteTagMutation] = useDeleteTagMutation();
  const [updateTagsMutation] = useUpdateTagsMutation();
  const [removeTagFromNoteMutation] = useRemoveTagFromNoteMutation();

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) =>
      // prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      prev.includes(tag) ? [] : [tag],
    );
  };

  const updateAllTags = useCallback(
    async (newTags: string[]) => {
      const uniqueTags = Array.from(
        new Set([
          ...tags.map((tag) => tag.name),
          ...newTags.map((tag) => tag.toLowerCase()),
        ]),
      ).sort();
      try {
        await updateTagsMutation(uniqueTags).unwrap();
      } catch (error) {
        console.error('Error updating tags:', error);
        setAlertMessage(
          'Error al actualizar las etiquetas. Por favor, inténtalo de nuevo.',
        );
      }
    },
    [tags, updateTagsMutation],
  );

  const deleteTag = useCallback(
    async (tag: Tag) => {
      try {
        await deleteTagMutation(tag.id).unwrap();
      } catch (error) {
        console.error('Error deleting tag:', error);
        setAlertMessage(
          'Error al eliminar la etiqueta. Por favor, inténtalo de nuevo.',
        );
      }
    },
    [deleteTagMutation],
  );

  const fetchLinkPreviews = useCallback(
    async (links: string[]): Promise<LinkPreview[]> => {
      const newPreviews: LinkPreview[] = [];
      const promises = links.map(async (link) => {
        try {
          const response = await fetch(
            `/api/og?url=${encodeURIComponent(link)}`,
          );
          const data = await response.json();
          newPreviews.push({
            url: link,
            image: data.ogImage[0].url || '/placeholder.svg',
            title: data.ogTitle || link,
          });
        } catch (error) {
          console.error('Error fetching link preview:', error);
          // Opcional: podrías setear un mensaje de alerta para link previews específicos
        }
      });
      await Promise.all(promises);
      return newPreviews;
    },
    [],
  );

  const addNote = useCallback(
    async (title: string, content: string, addTags: string[]) => {
      const links = extractLinks(content);
      const linkPreviews: LinkPreview[] = [];
      if (links.length > 0) {
        const previews = await fetchLinkPreviews(links);
        linkPreviews.push(...previews);
      }
      const newNote: Partial<NoteCreate> = {
        title,
        body: content,
        tags: addTags,
        links,
        linkPreviews,
      };

      try {
        await addNoteMutation(newNote).unwrap();
      } catch (error) {
        console.error('Error adding note:', error);
        setAlertMessage(
          'Error al agregar la nota. Por favor, inténtalo de nuevo.',
        );
      }
    },
    [addNoteMutation, fetchLinkPreviews],
  );

  const deleteNote = useCallback(
    async (note: NoteRead) => {
      try {
        await deleteNoteMutation(note.id).unwrap();
      } catch (error) {
        console.error('Error deleting note:', error);
        setAlertMessage(
          'Error al eliminar la nota. Por favor, inténtalo de nuevo.',
        );
      }
    },
    [deleteNoteMutation],
  );

  const addTag = useCallback(
    (tag: string) => {
      return updateAllTags([tag]);
    },
    [updateAllTags],
  );

  const removeTagFromNote = useCallback(
    async (noteId: number, tagId: number) => {
      try {
        await removeTagFromNoteMutation({ noteId, tagId }).unwrap();
      } catch (error) {
        console.error('Error removing tag from note:', error);
        setAlertMessage(
          'Error al eliminar la etiqueta de la nota. Por favor, inténtalo de nuevo.',
        );
      }
    },
    [removeTagFromNoteMutation],
  );

  const notesContextValue: NotesContextType = useMemo(
    () => ({
      notes,
      addNote,
      deleteNote,
      tags,
      search,
      setSearch,
      activeFilters,
      toggleFilter,
      deleteTag,
      addTag,
      fetchLinkPreviews,
      removeTagFromNote,
    }),
    [
      notes,
      addNote,
      deleteNote,
      tags,
      search,
      activeFilters,
      deleteTag,
      addTag,
      fetchLinkPreviews,
      removeTagFromNote,
    ],
  );

  return (
    <NotesContext.Provider value={notesContextValue}>
      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
