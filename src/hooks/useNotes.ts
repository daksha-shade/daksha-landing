import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
  aiGenerated?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateNoteData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  aiGenerated?: boolean;
}

interface UpdateNoteData {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
  isFavorite?: boolean;
}

interface NotesFilters {
  search?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useNotes(filters: NotesFilters = {}) {
  const { search, category, limit = 50, offset = 0 } = filters;
  
  // Build query parameters
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (category && category !== 'All') params.append('category', category);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  
  const { data, error, isLoading } = useSWR(
    `/api/notes?${params.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  const notes: Note[] = data?.notes || [];

  return {
    notes,
    isLoading,
    error,
    mutate: () => mutate(`/api/notes?${params.toString()}`),
  };
}

export function useNotesActions() {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const createNote = async (noteData: CreateNoteData): Promise<Note | null> => {
    setIsCreating(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      const result = await response.json();
      
      // Invalidate all notes queries
      mutate((key) => typeof key === 'string' && key.startsWith('/api/notes'));
      
      return result.note;
    } catch (error) {
      console.error('Error creating note:', error);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  const updateNote = async (noteId: string, updateData: UpdateNoteData): Promise<Note | null> => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      const result = await response.json();
      
      // Invalidate all notes queries
      mutate((key) => typeof key === 'string' && key.startsWith('/api/notes'));
      
      return result.note;
    } catch (error) {
      console.error('Error updating note:', error);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteNote = async (noteId: string): Promise<boolean> => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      // Invalidate all notes queries
      mutate((key) => typeof key === 'string' && key.startsWith('/api/notes'));
      
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleFavorite = async (noteId: string, currentFavorite: boolean): Promise<boolean> => {
    return updateNote(noteId, { isFavorite: !currentFavorite }) !== null;
  };

  return {
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    isCreating,
    isUpdating,
    isDeleting,
  };
}