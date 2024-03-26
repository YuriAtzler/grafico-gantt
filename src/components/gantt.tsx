import { useEffect } from "react";
import { ScrollSync } from "react-scroll-sync";
import {
  StartTask,
  TableComponentProps,
  TaskComponentProps,
  ViewMode,
} from "../utils/interfaces/global";
import { Calendar } from "./calendar";
import { Table } from "./table";
import { startCalendar } from "../utils";

interface GanttProps {
  tasks: StartTask[];
  viewMode: ViewMode;
  showTable?: boolean;
  componentTask?: ({ task }: TaskComponentProps) => JSX.Element;
  componentTable?: ({ tasks, heightRows }: TableComponentProps) => JSX.Element;
}

export function Gantt({
  tasks,
  viewMode,
  showTable = true,
  componentTask,
  componentTable,
}: GanttProps) {
  useEffect(() => {
    startCalendar(tasks, viewMode, 100, 100);
  }, [tasks]);

  return (
    <ScrollSync>
      <div className="w-[90%] flex h-[90%] bg-white rounded-md shadow-md">
        {showTable && <Table componentTable={componentTable} />}
        <Calendar componentTask={componentTask} />
      </div>
    </ScrollSync>
  );
}
