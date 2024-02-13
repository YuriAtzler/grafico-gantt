import { create } from "zustand";
import { StartTask, Task, ViewMode } from "../interfaces/global";
import { intervalDate } from "..";
import { endStartDate } from "../functions/end-start-date";
import { taskPosition } from "../functions";

interface TasksStoreProps {
  headerHeight: number;
  widthColumns: number;
  heightRows: number;
  viewMode: ViewMode;
  calendarStart: Date;
  calendarEnd: Date;
  tasks: Task[];
  dates: Date[];
  setDates: (dates: Date[]) => void;
  setHeaderHeight: (headerHeight: number) => void;
  setWidthColumns: (widthColumns: number) => void;
  setHeightRows: (heightRows: number) => void;
  startCalendar: (
    tasks: StartTask[],
    viewMode: ViewMode,
    headerHeight: number,
    widthColumns: number,
    heightRows: number
  ) => void;
  updateTasks: (tasks: Task[]) => void;
  updateCalendarDates: () => void;
}

export const useTasksStore = create<TasksStoreProps>((set) => ({
  headerHeight: 50,
  widthColumns: 100,
  heightRows: 100,
  viewMode: "day",
  tasks: [],
  calendarStart: new Date(),
  calendarEnd: new Date(),
  dates: [],
  setDates: (dates) => set({ dates }),
  setHeaderHeight: (headerHeight) => set({ headerHeight }),
  setWidthColumns: (widthColumns) => set({ widthColumns }),
  setHeightRows: (heightRows) => set({ heightRows }),
  startCalendar: (tasks, viewMode, headerHeight, widthColumns, heightRows) =>
    set(() => {
      const startDates = tasks.map(
        (task) =>
          new Date(
            task.start.getFullYear(),
            task.start.getMonth(),
            task.start.getDate()
          ).getTime(),
        0
      );
      const endDates = tasks.map(
        (task) =>
          new Date(
            task.end.getFullYear(),
            task.end.getMonth(),
            task.end.getDate()
          ).getTime(),
        0
      );

      const { startDate, endDate } = endStartDate(
        startDates,
        endDates,
        viewMode
      );

      console.log(startDate, endDate, viewMode);

      const dates = intervalDate(startDate, endDate, viewMode);

      const tasksFormated: Task[] = taskPosition(
        startDate,
        tasks,
        widthColumns,
        heightRows
      );

      return {
        calendarStart: startDate,
        calendarEnd: endDate,
        viewMode,
        headerHeight,
        widthColumns,
        heightRows,
        dates,
        tasks: tasksFormated,
      };
    }),
  updateTasks: (tasks) =>
    set((state) => {
      const { calendarStart } = state;
      const millisecondsPerDay = 24 * 60 * 60 * 1000;

      const newTasks: Task[] = [];

      tasks.forEach((task) => {
        const millisecondsFromCalendarStart =
          (task.x / 100) * millisecondsPerDay;
        const startDate =
          calendarStart.getTime() + millisecondsFromCalendarStart;
        const endDate = startDate + (task.width / 100) * millisecondsPerDay;

        newTasks.push({
          ...task,
          start: new Date(startDate),
          end: new Date(endDate),
        });
      });

      return {
        tasks: newTasks,
      };
    }),
  updateCalendarDates: () => {
    const {
      startCalendar,
      tasks,
      viewMode,
      headerHeight,
      heightRows,
      widthColumns,
    } = useTasksStore.getState();
    startCalendar(tasks, viewMode, headerHeight, widthColumns, heightRows);
  },
}));
