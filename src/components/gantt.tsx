import { useEffect } from "react";
import { ScrollSync } from "react-scroll-sync";
import {
  StartTask,
  TableComponentProps,
  TaskComponentProps,
  ViewMode,
} from "../utils/interfaces/global";
import { useTasksStore } from "../utils/store";
import { Calendar } from "./calendar";
import { Table } from "./table";

interface GanttProps {
  tasks: StartTask[];
  viewMode: ViewMode;
  componentTask?: ({ task }: TaskComponentProps) => JSX.Element;
  componentTable?: ({ tasks, heightRows }: TableComponentProps) => JSX.Element;
}

export function Gantt({
  tasks,
  viewMode,
  componentTask,
  componentTable,
}: GanttProps) {
  const { startCalendar } = useTasksStore();

  useEffect(() => {
    startCalendar(tasks, viewMode, 100, 100, 100);
  }, [tasks]);

  return (
    <ScrollSync>
      <div className="w-[90%] flex h-[90%] bg-white rounded-md shadow-md">
        <Table componentTable={componentTable} />
        <Calendar componentTask={componentTask} />
      </div>
    </ScrollSync>
  );
}
