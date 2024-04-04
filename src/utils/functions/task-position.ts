import { useGanttStore } from "..";
import { StartTask, Task, ViewMode } from "../interfaces/global";

export function taskPosition(
  calendarStart: Date,
  startTasks: StartTask[],
  pixelPerGrid: number,
  viewMode: ViewMode
) {
  const { heightRows } = useGanttStore.getState();
  const newTasks: Task[] = [];

  startTasks.forEach((startTask) => {
    const diffStart = startTask.start.getTime() - calendarStart.getTime();
    const taskDuration = startTask.end.getTime() - startTask.start.getTime();

    let width = 0;
    let x = 0;

    switch (viewMode) {
      case "hour":
        width = (taskDuration / (1000 * 60 * 60)) * pixelPerGrid;
        x = (diffStart / (1000 * 60 * 60)) * pixelPerGrid;
        break;
      case "day":
        width = (taskDuration / (1000 * 60 * 60 * 24)) * pixelPerGrid;
        x = (diffStart / (1000 * 60 * 60 * 24)) * pixelPerGrid;
        break;
      case "week":
        width = (taskDuration / (1000 * 60 * 60 * 24 * 7)) * pixelPerGrid;
        x = (diffStart / (1000 * 60 * 60 * 24 * 7)) * pixelPerGrid;
        break;
      case "month":
        width = (taskDuration / (1000 * 60 * 60 * 24 * 30)) * pixelPerGrid;
        x = (diffStart / (1000 * 60 * 60 * 24 * 30)) * pixelPerGrid;
        break;
      case "year":
        width = (taskDuration / (1000 * 60 * 60 * 24 * 365)) * pixelPerGrid;
        x = (diffStart / (1000 * 60 * 60 * 24 * 365)) * pixelPerGrid;
        break;
    }

    newTasks.push({
      ...startTask,
      x,
      y: heightRows / 8,
      width,
      height: heightRows * 0.8,
    });
  });

  return newTasks;
}
