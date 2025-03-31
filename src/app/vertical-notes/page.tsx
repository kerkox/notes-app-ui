'use client';
import React from 'react';
import {
  Note,
  NotePage,
  NotePageContent,
  NotesContainer,
  NoteTagsLeftSideBar,
} from './page.style';

export const VerticalNotes = () => {
  return (
    <NotePage className="bg-white dark:bg-slate-800">
      <NoteTagsLeftSideBar>
        <h2>Tags</h2>
      </NoteTagsLeftSideBar>
      <NotePageContent>
        <input
          type="text"
          className="mt-10 rounded-xl p-2"
          placeholder="Search notes"
        />
        <NotesContainer>
          <Note>NOTE 1</Note>
          <Note>NOTE 2</Note>
          <Note>NOTE 3</Note>
        </NotesContainer>
      </NotePageContent>
    </NotePage>
  );
};

export default VerticalNotes;
