/**
 * Community data management with Zustand
 * Handles community posts
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { CommunityPost } from '../types';

interface CommunityState {
  // Posts
  posts: CommunityPost[];
  setPosts: (posts: CommunityPost[]) => void;
  addPost: (post: CommunityPost) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Fetch posts
  fetchPosts: () => Promise<void>;
}

export const useCommunityStore = create<CommunityState>()(
  devtools(
    (set, get) => ({
      // Posts
      posts: [],
      setPosts: (posts) => set({ posts }),
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      error: null,
      setError: (error) => set({ error }),

      // Fetch posts from API
      fetchPosts: async () => {
        if (get().posts.length > 0) return; // Already loaded

        set({ isLoading: true, error: null });

        try {
          const response = await fetch('/api/community');
          if (!response.ok) {
            throw new Error('Failed to fetch posts');
          }
          const data = await response.json();
          set({ posts: Array.isArray(data) ? data : [], isLoading: false });
        } catch (error) {
          console.error('Error fetching posts:', error);
          set({
            error: error instanceof Error ? error.message : 'Failed to load posts',
            isLoading: false,
            posts: [],
          });
        }
      },
    }),
    { name: 'CommunityStore' }
  )
);
