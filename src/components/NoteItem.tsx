import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LinkIcon } from '@heroicons/react/24/outline';
import { LinkPreview, NoteRead } from '../types';
import { useNotesContext } from '../hooks/useNotesContext';
import { extractLinks } from '../helpers/utils';

interface NoteItemProps {
  note: NoteRead;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { deleteNote, fetchLinkPreviews, removeTagFromNote } =
    useNotesContext();
  const [linkPreviews, setLinkPreviews] = useState<LinkPreview[]>(
    note.linkPreviews,
  );

  useEffect(() => {
    console.log(note);
    if (note.linkPreviews && note.linkPreviews.length != 0) {
      console.log('fetching link previews');
      fetchLinkPreviews(note.links).then((previews) => {
        setLinkPreviews(previews);
      });
    } else {
      console.log('no link previews');
      // Extract links from note.body
      const links = extractLinks(note.body);
      console.log('links', links);
      // Fetch link previews
      if (!links || links.length == 0) return;

      fetchLinkPreviews(links).then((previews) => {
        setLinkPreviews(previews);
      });
    }
  }, [fetchLinkPreviews, note]);

  return (
    <div className="min-w-[180px] max-w-[280px] overflow-hidden rounded-lg bg-white shadow-sm dark:border-white dark:bg-slate-800 dark:text-white">
      <div className="p-4">
        <h2 className="font-large text-lg font-bold text-gray-900 dark:bg-slate-800 dark:text-white">
          {note.title}
        </h2>
        <p className="text-gray-800 dark:bg-slate-800 dark:text-white">
          {note.body}
        </p>
        <div className="mt-2 flex flex-wrap dark:bg-slate-800">
          {note.tags.map((tag) => (
            <span
              key={tag.id}
              className="group relative mb-2 mr-2 flex items-center rounded-md bg-gray-200 px-2 py-1 text-sm text-gray-700 dark:bg-black dark:text-gray-400"
            >
              <span className="transition-all group-hover:max-w-[calc(100%-16px)] group-hover:truncate">
                {tag.name}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeTagFromNote(note.id, tag.id);
                }}
                className="absolute right-1 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
        {linkPreviews.map((preview) => (
          <a
            key={preview.url}
            href={preview.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block overflow-hidden rounded-md border transition-shadow duration-200 hover:shadow-md dark:bg-slate-800"
          >
            <div className="flex items-center bg-gray-50 p-2 dark:bg-black">
              <div className="relative mr-3 h-12 w-16 flex-shrink-0">
                <Image
                  src={preview.image}
                  alt={preview.title}
                  fill
                  quality={100}
                  style={{ objectFit: 'cover' }}
                  className="rounded"
                />
              </div>
              <div className="min-w-0 flex-grow dark:bg-black">
                <p className="truncate text-sm font-medium text-gray-900 dark:bg-black dark:text-white">
                  {preview.title}
                </p>
                <p className="truncate text-sm text-gray-500">{preview.url}</p>
              </div>
              <LinkIcon
                className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </a>
        ))}
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right dark:bg-slate-800 dark:text-white">
        <button
          type="button"
          className="text-sm text-red-600 hover:text-red-800"
          onClick={() => deleteNote(note)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
