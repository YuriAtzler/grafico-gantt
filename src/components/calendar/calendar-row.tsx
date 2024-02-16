import clsx from "clsx";
import type { Task, TaskComponentProps } from "../../utils/interfaces/global";
import { TaskComponent } from "../task";

interface RowProps {
  rowHeight: number;
  columnWidth: number;
  dates: Date[];
  index: number;
  task: Task;
  componentTask?: (props: TaskComponentProps) => JSX.Element;
}

export function CalendarRow({
  columnWidth,
  dates,
  index,
  rowHeight,
  task,
  componentTask,
}: RowProps) {
  const weekEndsColor = (day: number, index: number) => {
    if ((day === 0 || day === 6) && index % 2 === 0) return "bg-red-100";
    else if (day === 0 || day === 6) return "bg-red-50";
  };

  return (
    <div
      className={clsx(
        "flex relative flex-shrink-0 divide-x",
        index % 2 === 0 ? "bg-gray-100" : "bg-white"
      )}
      style={{ height: rowHeight, width: columnWidth * dates.length }}
    >
      {dates.map((date, indexGrid) => (
        <div
          key={indexGrid}
          className={clsx(
            "flex flex-shrink-0 items-center justify-center",
            weekEndsColor(date.getDay(), index)
          )}
          style={{ width: columnWidth, height: rowHeight }}
        />
      ))}
      <TaskComponent task={task} componentTask={componentTask} />
    </div>
  );
}
