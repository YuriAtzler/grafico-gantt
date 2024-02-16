import { useEffect } from "react";
import { ScrollSync } from "react-scroll-sync";
import { StartTask, Task, ViewMode } from "../utils/interfaces/global";
import { useTasksStore } from "../utils/store";
import { Calendar } from "./calendar";
import { Table } from "./table";

interface GanttProps {
  tasks: StartTask[];
  viewMode: ViewMode;
  componentTask?: ({ task }: { task: Task }) => JSX.Element;
}

export function Gantt({ tasks, viewMode, componentTask }: GanttProps) {
  const { startCalendar } = useTasksStore();

  useEffect(() => {
    startCalendar(tasks, viewMode, 100, 100, 100);
  }, []);

  return (
    <ScrollSync>
      <div className="w-[90%] flex h-[90%] bg-white rounded-md shadow-md">
        <Table />
        <Calendar componentTask={componentTask} />
      </div>
    </ScrollSync>
  );
}
