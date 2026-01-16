import { create } from 'zustand';
import { Incident, Solution } from '@/services/wasteIntelligenceApi';

export interface WorkItem {
  id: string;
  incident: Incident;
  status: 'new' | 'reviewed' | 'planned' | 'dispatched' | 'in_progress' | 'completed';
  pia: number;
  createdAt: Date;
  solutions?: Solution[];
  imagePreview?: string;
  assignedTeam?: {
    workers: string[];
    vehicle: string;
    dispatchedAt: Date;
    eta?: Date;
  };
  timeline: ActivityLog[];
}

export interface ActivityLog {
  timestamp: Date;
  action: string;
  description: string;
}

interface CommandCentreStore {
  // State
  workItems: WorkItem[];
  selectedWorkItemId: string | null;
  isUploadingImage: boolean;
  isGeneratingPlan: boolean;

  // Actions
  addWorkItem: (workItem: WorkItem) => void;
  updateWorkItem: (id: string, updates: Partial<WorkItem>) => void;
  setSelectedWorkItemId: (id: string | null) => void;
  setIsUploadingImage: (value: boolean) => void;
  setIsGeneratingPlan: (value: boolean) => void;
  
  // Computed
  getSelectedWorkItem: () => WorkItem | undefined;
  getSortedWorkItems: () => WorkItem[];
  getStats: () => {
    newCount: number;
    dispatchedCount: number;
    avgPIA: number;
    totalCount: number;
  };
}

export const useCommandCentreStore = create<CommandCentreStore>((set, get) => ({
  // Initial State
  workItems: [],
  selectedWorkItemId: null,
  isUploadingImage: false,
  isGeneratingPlan: false,

  // Actions
  addWorkItem: (workItem) => {
    set((state) => ({
      workItems: [workItem, ...state.workItems],
      selectedWorkItemId: workItem.id,
    }));
  },

  updateWorkItem: (id, updates) => {
    set((state) => ({
      workItems: state.workItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },

  setSelectedWorkItemId: (id) => {
    set({ selectedWorkItemId: id });
  },

  setIsUploadingImage: (value) => {
    set({ isUploadingImage: value });
  },

  setIsGeneratingPlan: (value) => {
    set({ isGeneratingPlan: value });
  },

  // Computed values
  getSelectedWorkItem: () => {
    const { workItems, selectedWorkItemId } = get();
    return workItems.find((item) => item.id === selectedWorkItemId);
  },

  getSortedWorkItems: () => {
    const { workItems } = get();
    return [...workItems].sort((a, b) => b.pia - a.pia);
  },

  getStats: () => {
    const { workItems } = get();
    return {
      newCount: workItems.filter((w) => w.status === 'new').length,
      dispatchedCount: workItems.filter((w) => w.status === 'dispatched').length,
      avgPIA: workItems.length > 0
        ? Math.round(workItems.reduce((sum, w) => sum + w.pia, 0) / workItems.length)
        : 0,
      totalCount: workItems.length,
    };
  },
}));
