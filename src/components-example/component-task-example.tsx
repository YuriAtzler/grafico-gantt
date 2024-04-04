import { TaskComponentProps } from "../utils/interfaces/global";

export function ComponentTaskExample({ task }: TaskComponentProps) {
  return (
    <div className="flex flex-col h-full w-full bg-blue-400 rounded-md shadow-md px-2 py-1 text-white">
      <span>{task.name}</span>
      <span>{task.start.toLocaleString()}</span>
      <span>{task.end.toLocaleString()}</span>
    </div>
  );
}
