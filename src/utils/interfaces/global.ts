export type ViewMode = "hour" | "day" | "week" | "month" | "year";

export interface StartTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  dependencies?: string[];
}

export interface Task extends StartTask {
  x: number;
  y: number;
  width: number;
  height: number;
  dependencies?: string[];
}

// TaskComponentPropsxw
export interface TaskComponentProps {
  task: Task;
}
