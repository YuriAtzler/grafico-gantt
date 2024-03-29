import { create } from "zustand";
import { Task, ViewMode } from "../interfaces/global";

export class GanttClass {
  headerHeight = 50;
  widthColumns = 50;
  heightRows = 50;
  viewMode: ViewMode = "day";
  tasks: Task[] = [];
  calendarStart = new Date();
  calendarEnd = new Date();
  dates: Date[] = [];
}

export const useGanttStore = create(() => new GanttClass());
