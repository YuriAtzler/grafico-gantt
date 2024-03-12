import { ScrollSyncPane } from "react-scroll-sync";
import { TableComponentProps } from "../utils/interfaces/global";

export function ComponentTableExample({
  tasks,
  heightRows,
}: TableComponentProps) {
  return (
    <div className="w-[800px] overflow-hidden">
      <div className="h-[100px] flex justify-center items-center bg-blue-200">
        Header
      </div>
      <ScrollSyncPane>
        <div
          className="flex w-full flex-col overflow-y-auto  no-scrollbar"
          style={{ height: `calc(100% - ${heightRows}px)` }}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              className="w-full border border-white min-h-[100px] bg-blue-400 px-2 py-1 text-white"
            >
              {task.name}
            </div>
          ))}
        </div>
      </ScrollSyncPane>
    </div>
  );
}
