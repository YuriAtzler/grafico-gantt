import { useGanttStore } from ".";
import { intervalDate } from "..";
import { calendarGrid, taskPosition } from "../functions";
import { endStartDate } from "../functions/end-start-date";
import { StartTask, Task, ViewMode } from "../interfaces/global";

/** @description Função responsável por iniciar o calendário */
export const startCalendar = (tasks: StartTask[], viewMode: ViewMode) => {
  useGanttStore.setState(() => ({ ...calendarGrid(viewMode) }));
  const { widthColumns } = useGanttStore.getState();

  const startDates = tasks.map(
    (task) =>
      new Date(
        task.start.getFullYear(),
        task.start.getMonth(),
        task.start.getDate(),
      ).getTime(),
    0,
  );
  const endDates = tasks.map(
    (task) =>
      new Date(
        task.end.getFullYear(),
        task.end.getMonth(),
        task.end.getDate(),
      ).getTime(),
    0,
  );

  const { startDate, endDate } = endStartDate(startDates, endDates, viewMode);

  console.log(startDate, endDate);

  const dates = intervalDate(startDate, endDate, viewMode);

  const tasksFormated: Task[] = taskPosition(
    startDate,
    tasks,
    widthColumns,
    viewMode,
  );

  useGanttStore.setState({
    calendarStart: startDate,
    calendarEnd: endDate,
    viewMode,
    dates,
    tasks: tasksFormated,
  });
};
/** @description Função responsável por atualizar as datas */
export const updateTasks = (tasks: Task[]) => {
  const { calendarStart, viewMode } = useGanttStore.getState();

  let timePerSquare = 0; // tempo por quadrado (em milissegundos)

  switch (viewMode) {
    case "hour":
      timePerSquare = 1000 * 60 * 60; // 1 hora por quadrado
      break;
    case "day":
      timePerSquare = 1000 * 60 * 60 * 24; // 1 dia por quadrado
      break;
    case "week":
      timePerSquare = 1000 * 60 * 60 * 24 * 7; // 7 dias (1 semana) por quadrado
      break;
    case "month":
      timePerSquare = 1000 * 60 * 60 * 24 * 30; // Aproximadamente 30 dias (1 mês) por quadrado
      break;
    case "year":
      timePerSquare = 1000 * 60 * 60 * 24 * 365; // Aproximadamente 365 dias (1 ano) por quadrado
      break;
  }

  const newTasks: Task[] = [];
  tasks.forEach((task) => {
    const timeFromCalendarStart = (task.x / 10) * timePerSquare;
    const startDate = new Date(calendarStart.getTime() + timeFromCalendarStart);
    const endDate = new Date(
      startDate.getTime() + (task.width / 10) * timePerSquare,
    );

    newTasks.push({
      ...task,
      start: startDate,
      end: endDate,
    });
  });

  useGanttStore.setState({
    tasks: newTasks,
  });

  updateCalendarDates({ tasks: newTasks, viewMode });
};

/** @description Função responsável por atualizar as datas do calendário */
export const updateCalendarDates = ({
  tasks,
  viewMode,
}: {
  tasks: Task[];
  viewMode: ViewMode;
}) => {
  startCalendar(tasks, viewMode);
};
