import clsx from "clsx";
import type { DraggableData, DraggableEvent } from "react-draggable";
import { Rnd } from "react-rnd";
import { Task } from "../../utils/interfaces/global";
import { useTasksStore } from "../../utils/store";

interface RowProps {
  rowHeight: number;
  columnWidth: number;
  dates: Date[];
  index: number;
  task: Task;
}

export function Row({ columnWidth, dates, index, rowHeight, task }: RowProps) {
  const { tasks, updateTasks, updateCalendarDates } = useTasksStore();

  const weekEndsColor = (day: number, index: number) => {
    if ((day === 0 || day === 6) && index % 2 === 0) return "bg-red-100";
    else if (day === 0 || day === 6) return "bg-red-50";
  };

  const onDrag = (_event: DraggableEvent, data: DraggableData) => {
    const newX = data.x - task.x;

    const newTasks = tasks.map((t) => {
      if (t.dependencies?.includes(task.id)) return { ...t, x: t.x + newX };
      if (t.id === task.id) return { ...t, x: data.x, y: data.y };
      return t;
    });

    updateTasks(newTasks);
  };

  const onResizeOrDragStop = () => {
    updateCalendarDates();
  };

  const onResize = (
    _event: MouseEvent | TouchEvent,
    dir: string,
    ref: HTMLElement,
    _delta: { width: number; height: number },
    position: { x: number; y: number }
  ) => {
    const newTasks = tasks.map((t) => {
      if (t.dependencies?.includes(task.id)) {
        return {
          ...t,
          x:
            dir === "left"
              ? t.x - ref.offsetWidth + task.width
              : t.x + ref.offsetWidth - task.width,
        };
      }
      if (t.id === task.id) {
        return {
          ...t,
          x: position.x,
          y: position.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        };
      }
      return t;
    });

    updateTasks(newTasks);
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
      <Rnd
        id={task.id}
        className="bg-red-500 absolute"
        bounds={"parent"}
        dragAxis="x"
        enableResizing={{ bottom: false, top: false, right: true, left: true }}
        position={{ x: task.x, y: task.y }}
        size={{ width: task.width, height: task.height }}
        onDrag={onDrag}
        onDragStop={onResizeOrDragStop}
        onResize={onResize}
        onResizeStop={onResizeOrDragStop}
      >
        <div className="flex flex-col">
          <span className="w-full truncate">{task.start.toLocaleString()}</span>
          <span className="w-full truncate">{task.end.toLocaleString()}</span>
          <span className="w-full truncate">{task.id}</span>
        </div>
      </Rnd>
    </div>
  );
}
