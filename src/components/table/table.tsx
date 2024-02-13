import { useEffect } from "react";
import { useTasksStore } from "../../utils/store";
import { ScrollSyncPane } from "react-scroll-sync";

export function Table() {
  const { heightRows, tasks } = useTasksStore();

  const scrollToItem = (id: string) => {
    const item = document.getElementById(id);
    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  return (
    <div className="w-1/3 overflow-y-hidden">
      <div
        className="w-full flex items-center justify-center"
        style={{ height: heightRows }}
      >
        header
      </div>
      <ScrollSyncPane>
        <div
          className="flex w-full flex-col overflow-y-auto  no-scrollbar"
          style={{ height: `calc(100% - ${heightRows}px)` }}
        >
          {tasks.map((task, index) => (
            <div
              onClick={() => scrollToItem(task.id)}
              key={index}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ height: heightRows }}
            >
              {task.name}
            </div>
          ))}
        </div>
      </ScrollSyncPane>
    </div>
  );
}
