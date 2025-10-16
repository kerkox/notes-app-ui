import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NoteCreate, NoteRead, Tag } from '../types';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['Notes', 'Tags'],
  endpoints: (builder) => ({
    searchNoteByTag: builder.query<NoteRead[], string>({
      query: (tag) => `notes?tag=${encodeURIComponent(tag)}`,
      providesTags: ['Notes'],
    }),
    searchTag: builder.query<Tag[], string>({
      query: (search) => `tags?search=${encodeURIComponent(search)}`,
      providesTags: ['Tags'],
    }),
    getNotes: builder.query<NoteRead[], { search?: string }>({
      query: ({ search }) =>
        search ? `notes?search=${encodeURIComponent(search)}` : 'notes',
      providesTags: ['Notes'],
    }),
    getTags: builder.query<Tag[], void>({
      query: () => 'tags',
      providesTags: ['Tags'],
    }),
    addNote: builder.mutation<NoteCreate, Partial<NoteCreate>>({
      query: (note) => ({
        url: 'notes',
        method: 'POST',
        body: note,
      }),
      invalidatesTags: ['Notes', 'Tags'],
    }),
    deleteNote: builder.mutation<void, number>({
      query: (id) => ({
        url: `notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notes'],
    }),
    deleteTag: builder.mutation<void, number>({
      query: (id) => ({
        url: `tags/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tags', 'Notes'],
    }),
    removeTagFromNote: builder.mutation<
      void,
      { noteId: number; tagId: number }
    >({
      query: ({ noteId, tagId }) => ({
        url: `notes/${noteId}/tags/${tagId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notes'],
    }),
    getLinkPreview: builder.query<
      { title: string; description: string; image: string },
      string
    >({
      query: (url) => `og?url=${encodeURIComponent(url)}`,
    }),
    updateTags: builder.mutation<string[], string[]>({
      query: (tags) => ({
        url: '/tags',
        method: 'PUT',
        body: tags,
      }),
      invalidatesTags: ['Tags'],
    }),
    updateNote: builder.mutation<void, Partial<NoteCreate>>({
      query: (note) => ({
        url: `notes/${note.id}`,
        method: 'PUT',
        body: note,
      }),
      invalidatesTags: ['Notes', 'Tags'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetTagsQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useGetLinkPreviewQuery,
  useUpdateTagsMutation,
  useRemoveTagFromNoteMutation,
  useDeleteTagMutation,
  useSearchTagQuery,
  useSearchNoteByTagQuery,
  useLazyGetLinkPreviewQuery,
  useLazySearchTagQuery,
  useLazySearchNoteByTagQuery,
  useUpdateNoteMutation,
  useLazyGetNotesQuery,
  useLazyGetTagsQuery,
} = notesApi;
