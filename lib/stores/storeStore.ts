/**
 * Store data management with Zustand
 * Handles lottery store data and selection
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { LotteryStore } from '../types';

interface StoreState {
  // Store data
  stores: LotteryStore[];
  setStores: (stores: LotteryStore[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Selection
  selectedStore: LotteryStore | null;
  setSelectedStore: (store: LotteryStore | null) => void;
  clearSelectedStore: () => void;

  // Fetch stores
  fetchStores: () => Promise<void>;
}

export const useStoreStore = create<StoreState>()(
  devtools(
    (set, get) => ({
      // Store data
      stores: [],
      setStores: (stores) => set({ stores }),
      isLoading: true,
      setIsLoading: (loading) => set({ isLoading: loading }),
      error: null,
      setError: (error) => set({ error }),

      // Selection
      selectedStore: null,
      setSelectedStore: (store) => set({ selectedStore: store }),
      clearSelectedStore: () => set({ selectedStore: null }),

      // Fetch stores from API/static file
      fetchStores: async () => {
        if (get().stores.length > 0) return; // Already loaded

        set({ isLoading: true, error: null });

        try {
          const response = await fetch('/data/stores.json');
          if (!response.ok) {
            throw new Error('Failed to fetch stores');
          }
          const data = await response.json();
          set({ stores: data, isLoading: false });
        } catch (error) {
          console.error('Error fetching stores:', error);
          set({
            error: error instanceof Error ? error.message : 'Failed to load stores',
            isLoading: false,
          });
        }
      },
    }),
    { name: 'StoreStore' }
  )
);

// Selector for filtered stores (with memoization hint)
export const selectFilteredStores = (state: StoreState, searchTerm: string) => {
  if (!searchTerm) return state.stores;

  const term = searchTerm.toLowerCase();
  return state.stores.filter(
    (store) =>
      store.name.toLowerCase().includes(term) ||
      store.address.toLowerCase().includes(term)
  );
};
