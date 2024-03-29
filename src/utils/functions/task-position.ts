import { StartTask, Task } from "../interfaces/global";

export function taskPosition(
  calendarStart: Date,
  tasks: StartTask[],
  pixelPerGrid: number,
  heightRows: number
) {
  const newTasks: Task[] = [];

  tasks.forEach((task) => {
    const diffStart = task.start.getTime() - calendarStart.getTime();
    const taskDuration = task.end.getTime() - task.start.getTime();

    const width = (taskDuration / (1000 * 60 * 60 * 24)) * pixelPerGrid;
    const x = (diffStart / (1000 * 60 * 60 * 24)) * pixelPerGrid;

    newTasks.push({
      ...task,
      x,
      y: heightRows / 8,
      width,
      height: heightRows * 0.8,
    });
  });

  return newTasks;
}
