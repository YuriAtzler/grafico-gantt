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
  const { heightRows: stateheightRows } = useGanttStore();

  useEffect(() => {
    startCalendar(tasks, viewMode);
  }, [tasks, viewMode]);

  useEffect(() => {
    // if (headerHeight) useGanttStore.setState({ headerHeight });
    // if (widthColumns) useGanttStore.setState({ widthColumns });
    // if (heightRows) useGanttStore.setState({ heightRows });
  }, [headerHeight, widthColumns, heightRows]);

  useEffect(() => {
    useGanttStore.setState((state) => ({
      tasks: state.tasks.map((t) => ({
        ...t,
        height: stateheightRows * 0.8,
        y: stateheightRows / 8,
      })),
    }));
  }, [stateheightRows]);

  return (
    <ScrollSync>
      <div className="flex h-[90%] w-[90%] rounded-md bg-white shadow-md">
        {showTable && <Table componentTable={componentTable} />}
        <Calendar componentTask={componentTask} />
      </div>
    </ScrollSync>
  );
}
