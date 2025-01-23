export type Period = 'morning' | 'afternoon';

export interface GoalComponents {
  [key: `goal${number}`]: string[];
}

export interface EnvironmentSetup {
  workspace: boolean;
  materials: boolean;
  notifications: boolean;
}

export interface TaskItem {
  task: string;
  startWith: string;
}

export interface TaskInitiation {
  morning: TaskItem[];
  afternoon: TaskItem[];
}

export interface EndOfDay {
  tasksCompleted: number;
  totalTasks: number;
  energyLevel: number;
  notes: string;
}

export interface FormData {
  date: string;
  topGoals: string[];
  goalComponents: {
    [key: string]: string[];
  };
  deprioritizedTasks: Array<{
    text: string;
    sourceGoalIndex?: number;
  }>;
  environmentSetup: EnvironmentSetup;
  taskInitiation: TaskInitiation;
  championshipGoal: string;
  learningOpportunities: string[];
  endOfDay: EndOfDay;
} 