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
import { startCalendar, useGanttStore } from "../utils";

interface GanttProps {
  tasks: StartTask[];
  viewMode: ViewMode;
  showTable?: boolean;
  componentTask?: ({ task }: TaskComponentProps) => JSX.Element;
  componentTable?: ({ tasks, heightRows }: TableComponentProps) => JSX.Element;
  headerHeight?: number;
  widthColumns?: number;
  heightRows?: number;
}

export function Gantt({
  tasks,
  viewMode,
  showTable = true,
  componentTask,
  componentTable,
  headerHeight,
  widthColumns,
  heightRows,
}: GanttProps) {
  useEffect(() => {
    startCalendar(tasks, viewMode);
  }, [tasks]);

  useEffect(() => {
    if (headerHeight) useGanttStore.setState({ headerHeight });
    if (widthColumns) useGanttStore.setState({ widthColumns });
    if (heightRows) useGanttStore.setState({ heightRows });
  }, [headerHeight, widthColumns, heightRows]);

  return (
    <ScrollSync>
      <div className="w-[90%] flex h-[90%] bg-white rounded-md shadow-md">
        {showTable && <Table componentTable={componentTable} />}
        <Calendar componentTask={componentTask} />
      </div>
    </ScrollSync>
  );
}
