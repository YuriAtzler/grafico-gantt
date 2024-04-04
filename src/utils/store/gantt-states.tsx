import { create } from "zustand";
import { Task, ViewMode } from "../interfaces/global";

export class GanttClass {
  headerHeight = 60;
  widthColumns = 50;
  heightRows = 40;
  viewMode: ViewMode = "day";
  tasks: Task[] = [];
  calendarStart = new Date();
  calendarEnd = new Date();
  dates: Date[] = [];
}

export const useGanttStore = create(() => new GanttClass());
