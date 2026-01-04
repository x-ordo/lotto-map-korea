/**
 * App-level state management with Zustand
 * Handles UI state: active tab, sidebar, user location
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { LotteryStore, LuckAnalysis, CommunityPost } from '../types';

// Tab types
export type TabType = 'PILGRIMAGE' | 'LAB' | 'WALL' | 'DATA';

// App state interface
interface AppState {
  // Navigation
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;

  // Sidebar
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // User location
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;

  // Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Oracle
  dailyOracle: LuckAnalysis | null;
  setDailyOracle: (oracle: LuckAnalysis | null) => void;
  continuity: number;
  setContinuity: (days: number) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Navigation
        activeTab: 'PILGRIMAGE',
        setActiveTab: (tab) => set({ activeTab: tab }),

        // Sidebar
        isSidebarOpen: true,
        toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
        setSidebarOpen: (open) => set({ isSidebarOpen: open }),

        // User location
        userLocation: null,
        setUserLocation: (location) => set({ userLocation: location }),

        // Search
        searchTerm: '',
        setSearchTerm: (term) => set({ searchTerm: term }),

        // Oracle
        dailyOracle: null,
        setDailyOracle: (oracle) => set({ dailyOracle: oracle }),
        continuity: 3,
        setContinuity: (days) => set({ continuity: days }),
      }),
      {
        name: 'lottoshrine-app-storage',
        partialize: (state) => ({
          // Only persist these fields
          continuity: state.continuity,
        }),
      }
    ),
    { name: 'AppStore' }
  )
);
