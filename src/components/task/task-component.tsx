import type { DraggableData, DraggableEvent } from "react-draggable";
import { Rnd } from "react-rnd";
import { Task } from "../../utils/interfaces/global";
import { updateCalendarDates, updateTasks, useGanttStore } from "../../utils";

interface TaskComponentProps {
  task: Task;
  componentTask?: ({ task }: { task: Task }) => JSX.Element;
}

export function TaskComponent({ task, componentTask }: TaskComponentProps) {
  const { tasks } = useGanttStore();

  const onDrag = (_event: DraggableEvent, data: DraggableData) => {
    const newX = data.x - task.x;

    const newTasks = tasks.map((t) => {
      if (t.dependencies?.includes(task.id)) return { ...t, x: t.x + newX };
      if (t.id === task.id) return { ...t, x: data.x, y: data.y };
      return t;
    });

    useGanttStore.setState({ tasks: newTasks });
  };

  const onResizeOrDragStop = () => {
    updateTasks(tasks);
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

    useGanttStore.setState({ tasks: newTasks });
  };

  return (
    <Rnd
      id={task.id}
      className="absolute"
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
      {componentTask ? (
        componentTask({ task })
      ) : (
        <div className="flex flex-col">
          <span className="w-full truncate">{task.start.toLocaleString()}</span>
          <span className="w-full truncate">{task.end.toLocaleString()}</span>
          <span className="w-full truncate">{task.id}</span>
        </div>
      )}
    </Rnd>
  );
}
