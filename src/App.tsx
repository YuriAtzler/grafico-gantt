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
  ]);
  const [name, setName] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [headerHeight, setHeaderHeight] = useState<number>(50);
  const [widthColumns, setWidthColumns] = useState<number>(50);
  const [heightRows, setHeightRows] = useState<number>(50);

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

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-200 flex flex-col items-center justify-center">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="headerHeight"
          value={headerHeight}
          onChange={(event) => setHeaderHeight(Number(event.target.value))}
        />
        <input
          type="text"
          placeholder="widthColumns"
          value={widthColumns}
          onChange={(event) => setWidthColumns(Number(event.target.value))}
        />
        <input
          type="text"
          placeholder="heightRows"
          value={heightRows}
          onChange={(event) => setHeightRows(Number(event.target.value))}
        />
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
        showTable={false}
        tasks={tasks}
        viewMode="day"
        headerHeight={headerHeight}
        widthColumns={widthColumns}
        heightRows={heightRows}
        componentTask={(props) => <ComponentTaskExample {...props} />}
        componentTable={(props) => <ComponentTableExample {...props} />}
      />
    </div>
  );
}
