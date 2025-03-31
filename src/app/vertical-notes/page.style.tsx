import styled from 'styled-components';

export const Note = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem 0;
  background: var(--geist-background);
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`;

export const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const NoteTagsLeftSideBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
  height: 100vh;
  border: 1px solid red;
`;

export const Tag = styled.div`
  padding: 0.5rem;
  background: var(--geist-background);
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
`;

export const NotePage = styled.div`
  display: flex;
  gap: 1rem;
`;

export const NotePageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
`;
