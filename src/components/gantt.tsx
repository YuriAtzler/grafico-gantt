import { useEffect } from "react";
import { StartTask } from "../utils/interfaces/global";
import { useTasksStore } from "../utils/store";
import { Calendar } from "./calendar";
import { Table } from "./table";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";

export function Gantt() {
  const { startCalendar } = useTasksStore();

  const tasks: StartTask[] = [
    {
      id: "1",
      name: "Task 1",
      start: new Date(2024, 0, 1, 12),
      end: new Date(2024, 0, 5, 12),
    },
    {
      id: "2",
      name: "Task 2",
      start: new Date(2024, 0, 1, 0),
      end: new Date(2024, 0, 3, 0),
    },
    {
      id: "3",
      name: "Task 3",
      start: new Date(2024, 0, 11, 0),
      end: new Date(2024, 0, 15, 0),
    },
    {
      id: "4",
      name: "Task 4",
      start: new Date(2024, 0, 20, 0),
      end: new Date(2024, 0, 25, 0),
    },
    {
      id: "5",
      name: "Task 5",
      start: new Date(2024, 0, 30, 0),
      end: new Date(2024, 1, 5, 0),
    },
    {
      id: "6",
      name: "Task 6",
      start: new Date(2024, 1, 5, 0),
      end: new Date(2024, 1, 10, 0),
    },
    {
      id: "7",
      name: "Task 7",
      start: new Date(2024, 1, 10, 0),
      end: new Date(2024, 1, 15, 0),
    },
    {
      id: "8",
      name: "Task 8",
      start: new Date(2024, 1, 15, 0),
      end: new Date(2024, 1, 20, 0),
    },
    {
      id: "9",
      name: "Task 9",
      start: new Date(2024, 1, 20, 0),
      end: new Date(2024, 1, 25, 0),
    },
    {
      id: "10",
      name: "Task 10",
      start: new Date(2024, 1, 25, 0),
      end: new Date(2024, 2, 1, 0),
    },
    {
      id: "11",
      name: "Task 11",
      start: new Date(2024, 2, 1, 0),
      end: new Date(2024, 2, 5, 0),
    },
    {
      id: "12",
      name: "Task 12",
      start: new Date(2024, 2, 5, 0),
      end: new Date(2024, 2, 10, 0),
    },
    {
      id: "13",
      name: "Task 13",
      start: new Date(2024, 2, 10, 0),
      end: new Date(2024, 2, 15, 0),
    },
    {
      id: "14",
      name: "Task 14",
      start: new Date(2024, 2, 15, 0),
      end: new Date(2024, 2, 20, 0),
    },
  ];

  useEffect(() => {
    startCalendar(tasks, "day", 100, 100, 100);
  }, []);

  return (
    <ScrollSync>
      <div className="w-[90%] flex h-[90%] bg-white rounded-md shadow-md">
        <Table />
        <Calendar />
      </div>
    </ScrollSync>
  );
}
