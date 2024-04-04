import { useEffect, useState } from "react";
import { Gantt } from "./components";
// import {
//   ComponentTableExample,
//   ComponentTaskExample,
// } from "./components-example";
import { StartTask, ViewMode } from "./utils/interfaces/global";
import clsx from "clsx";

export function App() {
  const [tasks, setTasks] = useState<StartTask[]>([
    {
      id: "1",
      name: "Task 1",
      start: new Date("2024-03-30T00:00:00"),
      end: new Date("2024-04-02T00:00:00"),
      dependencies: [],
    },
    {
      id: "2",
      name: "Task 2",
      start: new Date("2024-04-02T00:00:00"),
      end: new Date("2024-04-05T00:00:00"),
      dependencies: ["1"],
    },
  ]);
  const [name, setName] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [headerHeight, setHeaderHeight] = useState<number>(100);
  const [widthColumns, setWidthColumns] = useState<number>(100);
  const [heightRows, setHeightRows] = useState<number>(100);
  const [showTable, setShowTable] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<ViewMode>("hour");

  const handleCreateTask = () => {
    if (name && start && end) {
      setTasks([
        ...tasks,
        {
          id: (tasks.length + 1).toString(),
          name,
          start: new Date(start),
          end: new Date(end),
          dependencies,
        },
      ]);
      setName("");
      setStart("");
      setEnd("");
    }
  };

  useEffect(() => {
    switch (viewMode) {
      case "week":
        setWidthColumns(100);
        setHeightRows(100);
        setHeaderHeight(100);
        break;
    }
  }, [viewMode]);

  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-2 bg-gray-200">
      <div className="flex items-center justify-center gap-4">
        <span
          onClick={() => setViewMode("hour")}
          className={clsx(
            "cursor-pointer rounded px-2 py-1 shadow hover:opacity-80",
            viewMode === "hour" ? "bg-blue-500 text-white" : "bg-white",
          )}
        >
          Hour
        </span>
        <span
          onClick={() => setViewMode("day")}
          className={clsx(
            "cursor-pointer rounded px-2 py-1 shadow hover:opacity-80",
            viewMode === "day" ? "bg-blue-500 text-white" : "bg-white",
          )}
        >
          Day
        </span>
        <span
          onClick={() => setViewMode("week")}
          className={clsx(
            "cursor-pointer rounded px-2 py-1 shadow hover:opacity-80",
            viewMode === "week" ? "bg-blue-500 text-white" : "bg-white",
          )}
        >
          Week
        </span>
        <span
          onClick={() => setViewMode("month")}
          className={clsx(
            "cursor-pointer rounded px-2 py-1 shadow hover:opacity-80",
            viewMode === "month" ? "bg-blue-500 text-white" : "bg-white",
          )}
        >
          Month
        </span>
        <span
          onClick={() => setViewMode("year")}
          className={clsx(
            "cursor-pointer rounded px-2 py-1 shadow hover:opacity-80",
            viewMode === "year" ? "bg-blue-500 text-white" : "bg-white",
          )}
        >
          Year
        </span>
      </div>
      <Gantt showTable={showTable} tasks={tasks} viewMode={viewMode} />
    </div>
  );
}
