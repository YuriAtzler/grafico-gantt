import type { DraggableData, DraggableEvent } from "react-draggable";
import { Rnd } from "react-rnd";
import { Task } from "../../utils/interfaces/global";
import { updateTasks, useGanttStore } from "../../utils";

interface TaskComponentProps {
  task: Task;
  componentTask?: ({ task }: { task: Task }) => JSX.Element;
}

export function TaskComponent({ task, componentTask }: TaskComponentProps) {
  const { tasks } = useGanttStore();

  const onResizeOrDragStop = (_event: DraggableEvent, data: DraggableData) => {
    const newX = data.x - task.x;

    const newTasks = tasks.map((t) => {
      if (t.dependencies?.includes(task.id)) return { ...t, x: t.x + newX };
      if (t.id === task.id) return { ...t, x: data.x, y: data.y };
      return t;
    });

    updateTasks(newTasks);
  };

  const onResizeStop = () => {
    updateTasks(tasks);
  };

  const onResize = (
    _event: MouseEvent | TouchEvent,
    dir: string,
    ref: HTMLElement,
    _delta: { width: number; height: number },
    position: { x: number; y: number },
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
      dragGrid={[10, 10]}
      resizeGrid={[10, 10]}
      enableResizing={{ bottom: false, top: false, right: true, left: true }}
      position={{ x: task.x, y: task.y }}
      size={{ width: task.width, height: task.height }}
      onDragStop={onResizeOrDragStop}
      onResize={onResize}
      onResizeStop={onResizeStop}
    >
      {componentTask ? (
        componentTask({ task })
      ) : (
        <div className="flex h-full flex-col items-center justify-center rounded bg-blue-400 text-white shadow">
          <span>{task.name}</span>
        </div>
      )}
    </Rnd>
  );
}
