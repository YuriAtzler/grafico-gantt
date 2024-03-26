import { useGanttStore } from ".";
import { intervalDate } from "..";
import { taskPosition } from "../functions";
import { endStartDate } from "../functions/end-start-date";
import { StartTask, Task, ViewMode } from "../interfaces/global";

/** @description Função responsável por iniciar o calendário */
export const startCalendar = (
  tasks: StartTask[],
  viewMode: ViewMode,
  widthColumns: number,
  heightRows: number
) => {
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

  const { startDate, endDate } = endStartDate(startDates, endDates, viewMode);

  const dates = intervalDate(startDate, endDate, viewMode);

  const tasksFormated: Task[] = taskPosition(
    startDate,
    tasks,
    widthColumns,
    heightRows
  );

  useGanttStore.setState({
    calendarStart: startDate,
    calendarEnd: endDate,
    viewMode,
    widthColumns,
    heightRows,
    dates,
    tasks: tasksFormated,
  });
};

/** @description Função responsável por atualizar as datas */
export const updateTasks = (tasks: Task[]) => {
  const { calendarStart } = useGanttStore.getState();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  const newTasks: Task[] = [];

  tasks.forEach((task) => {
    const millisecondsFromCalendarStart = (task.x / 100) * millisecondsPerDay;
    const startDate = calendarStart.getTime() + millisecondsFromCalendarStart;
    const endDate = startDate + (task.width / 100) * millisecondsPerDay;

    newTasks.push({
      ...task,
      start: new Date(startDate),
      end: new Date(endDate),
    });
  });

  useGanttStore.setState({
    tasks: newTasks,
  });
};

/** @description Função responsável por atualizar as datas do calendário */
export const updateCalendarDates = () => {
  const { tasks, viewMode, widthColumns, heightRows } =
    useGanttStore.getState();
  startCalendar(tasks, viewMode, widthColumns, heightRows);
};
