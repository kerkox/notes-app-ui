"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Note, LinkPreview } from "../types";
import { NoteForm } from "./NoteForm";
import { NoteList } from "./NoteList";
import { TagList } from "./TagList";


export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const loadFromLocalStorage = useCallback(() => {
    const savedNotes = localStorage.getItem("notes");
    const savedTags = localStorage.getItem("allTags");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    if (savedTags) {
      setAllTags(JSON.parse(savedTags));
    }
  }, []);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  useEffect(() => {
    if (allTags.length > 0) {
      localStorage.setItem("allTags", JSON.stringify(allTags));
    }
  }, [allTags]);

  const fetchLinkPreviews = async (note: Note): Promise<Note> => {
    const newPreviews: LinkPreview[] = [];
    for (const link of note.links) {
      if (!note.linkPreviews.some((preview) => preview.url === link)) {
        try {
          const response = await fetch(
            `/api/og?url=${encodeURIComponent(link)}`
          );
          const data = await response.json();
          newPreviews.push({
            url: link,
            image: data.ogImage[0].url || "/placeholder.svg",
            title: data.ogTitle || link,
          });
        } catch (error) {
          console.error("Error fetching link preview:", error);
        }
      }
    }
    return {
      ...note,
      linkPreviews: [...note.linkPreviews, ...newPreviews],
    };
  };

  const addNote = async (content: string, tags: string[]) => {
    const links = extractLinks(content);
    const newNote: Note = {
      id: Date.now(),
      content,
      tags,
      links,
      linkPreviews: [],
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    updateAllTags([...allTags, ...tags]);

    // Fetch link previews after adding the note
    const updatedNote = await fetchLinkPreviews(newNote);
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (id: number) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== id);
      if (updatedNotes.length === 0) {
        localStorage.removeItem("notes");
      }
      return updatedNotes;
    });
  };

  const extractLinks = (text: string): string[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };

  useEffect(() => {
    const loadMissingLinkPreviews = async () => {
      let updatedNotes = false;
      const newNotes = await Promise.all(
        notes.map(async (note) => {
          if (note.links.length > note.linkPreviews.length) {
            updatedNotes = true;
            return await fetchLinkPreviews(note);
          }
          return note;
        })
      );

      if (updatedNotes) {
        setNotes(newNotes);
      }
    };

    loadMissingLinkPreviews();
  }, [notes]);

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const deleteTag = (tagToDelete: string) => {
    setAllTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
    setNotes((prevNotes) =>
      prevNotes.map((note) => ({
        ...note,
        tags: note.tags.filter((tag) => tag !== tagToDelete),
      }))
    );
    setActiveFilters((prevFilters) => prevFilters.filter((filter) => filter !== tagToDelete));
  };

  const filteredNotes = notes.filter(
    (note) =>
      (activeFilters.length === 0 ||
        activeFilters.every((filter) => note.tags.includes(filter))) &&
      (search
        ? note.content.toLowerCase().includes(search.toLowerCase()) ||
          note.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
        : true)
  );

  const updateAllTags = (newTags: string[]) => {
    setAllTags((prevTags) => {
      const uniqueTags = Array.from(
        new Set([...prevTags, ...newTags.map((tag) => tag.toLowerCase())])
      );
      return uniqueTags.sort();
    });
  };

    return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Aplicación de Notas</h1>
        <div className="flex gap-8">
          <div className="w-1/4">
            <TagList
              tags={allTags}
              activeFilters={activeFilters}
              onToggleFilter={toggleFilter}
              onDeleteTag={deleteTag}
            />
          </div>
          <div className="w-3/4">
            <NoteForm onAddNote={addNote} allTags={allTags} />
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Buscar notas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Buscar notas"
              />
            </div>
            <NoteList notes={filteredNotes} onDeleteNote={deleteNote} />
          </div>
        </div>
      </div>
    </div>
  );
}
