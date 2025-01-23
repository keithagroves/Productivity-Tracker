// src/types/task.ts
export interface Task {
    id: number;
    title: string;
    description: string;
    impact: number;
    effort: number;
    completed: boolean;
    createdAt: Date;
    completedAt: Date | null;
    isHighPriority: boolean;
  }
  
  export interface TaskInput {
    title: string;
    description: string;
    impact: number;
    effort: number;
  }
  
  // src/types/metrics.ts
  export interface CompletionData {
    date: string;
    completed: number;
    highPriority: number;
  }
  
  export interface QuadrantInfo {
    label: string;
    description: string;
    color: string;
  }