import { useState } from "react";
import { Gantt } from "./components";
import {
  ComponentTableExample,
  ComponentTaskExample,
} from "./components-example";
import { StartTask } from "./utils/interfaces/global";

export function App() {
  const [tasks, setTasks] = useState<StartTask[]>([
    {
      id: "1",
      name: "Task 1",
      start: new Date("2022-09-01T00:00:00"),
      end: new Date("2022-09-03T00:00:00"),
      dependencies: [],
    },
    {
      id: "2",
      name: "Task 2",
      start: new Date("2022-09-02T00:00:00"),
      end: new Date("2022-09-05T00:00:00"),
      dependencies: ["1"],
    },
    {
      id: "3",
      name: "Task 3",
      start: new Date("2022-09-04T00:00:00"),
      end: new Date("2022-09-07T00:00:00"),
      dependencies: ["2"],
    },
    {
      id: "4",
      name: "Task 4",
      start: new Date("2022-09-06T00:00:00"),
      end: new Date("2022-09-08T00:00:00"),
      dependencies: ["3"],
    },
    {
      id: "5",
      name: "Task 5",
      start: new Date("2022-09-07T00:00:00"),
      end: new Date("2022-09-10T00:00:00"),
      dependencies: ["4"],
    },
    {
      id: "6",
      name: "Task 6",
      start: new Date("2022-09-09T00:00:00"),
      end: new Date("2022-09-12T00:00:00"),
      dependencies: ["5"],
    },
    {
      id: "7",
      name: "Task 7",
      start: new Date("2022-09-11T00:00:00"),
      end: new Date("2022-09-14T00:00:00"),
      dependencies: ["6"],
    },
    {
      id: "8",
      name: "Task 8",
      start: new Date("2022-09-13T00:00:00"),
      end: new Date("2022-09-15T00:00:00"),
      dependencies: ["7"],
    },
  ]);
  const [name, setName] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [dependencies, setDependencies] = useState<string[]>([]);

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

  console.log(tasks);

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-200 flex flex-col items-center justify-center">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="inicio"
          value={start}
          onChange={(event) => setStart(event.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="fim"
          value={end}
          onChange={(event) => setEnd(event.target.value)}
        />
        <select onChange={(event) => setDependencies([event.target.value])}>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
        <button onClick={handleCreateTask}>Criar</button>
      </div>
      <Gantt
        tasks={tasks}
        viewMode="day"
        componentTask={(props) => <ComponentTaskExample {...props} />}
        componentTable={(props) => <ComponentTableExample {...props} />}
      />
    </div>
  );
}
