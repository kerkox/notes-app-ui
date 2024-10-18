import React from 'react';
import Image from "next/image";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Note } from '../types';


interface NoteItemProps {
  note: Note;
  onDelete: (id: number) => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="p-4">
        <p className="text-gray-800">{note.content}</p>
        <div className="mt-2 flex flex-wrap">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="mr-2 mb-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        {note.linkPreviews.map((preview) => (
          <a
            key={preview.url}
            href={preview.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 border rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center p-2 bg-gray-50">
              <div className="flex-shrink-0 w-16 h-16 mr-3 relative">
                <Image
                  src={preview.image}
                  alt=""
                  fill
                  sizes="32px"
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {preview.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {preview.url}
                </p>
              </div>
              <LinkIcon
                className="flex-shrink-0 h-5 w-5 text-gray-400 ml-2"
                aria-hidden="true"
              />
            </div>
          </a>
        ))}
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right">
        <button
          type="button"
          className="text-sm text-red-600 hover:text-red-800"
          onClick={() => onDelete(note.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};