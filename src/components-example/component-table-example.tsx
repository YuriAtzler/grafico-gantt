import { ScrollSyncPane } from "react-scroll-sync";
import { TableComponentProps } from "../utils/interfaces/global";

export function ComponentTableExample({
  tasks,
  heightRows,
  headerHeight,
}: TableComponentProps) {
  return (
    <div className="w-[600px] overflow-hidden">
      <div
        className="h-[100px] flex justify-center items-center bg-blue-200"
        style={{ height: headerHeight }}
      >
        Header
      </div>
      <ScrollSyncPane>
        <div
          className="flex w-full flex-col overflow-y-auto  no-scrollbar"
          style={{ minHeight: `calc(100% - ${heightRows}px)` }}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{ minHeight: heightRows }}
              className="w-full border border-white  bg-blue-400 px-2 py-1 text-white"
            >
              {task.name}
            </div>
          ))}
        </div>
      </ScrollSyncPane>
    </div>
  );
}
