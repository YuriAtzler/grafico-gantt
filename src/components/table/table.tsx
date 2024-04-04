import { ScrollSyncPane } from "react-scroll-sync";
import { TableComponentProps } from "../../utils/interfaces/global";
import { useGanttStore } from "../../utils";
import { clsx } from "clsx";

interface TableProps {
  componentTable?: (props: TableComponentProps) => JSX.Element;
}

export function Table({ componentTable }: TableProps) {
  const { heightRows, tasks, headerHeight } = useGanttStore();

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
    <ScrollSyncPane>
      {componentTable ? (
        componentTable({ tasks, heightRows, headerHeight })
      ) : (
        <div className="w-[300px] overflow-hidden">
          <div
            className="flex w-full items-center justify-center bg-blue-500"
            style={{ height: headerHeight }}
          >
            <span className="text-white">Tasks</span>
          </div>
          <ScrollSyncPane>
            <div
              className="no-scrollbar flex w-full flex-col  overflow-y-auto"
              style={{ height: `calc(100% - ${heightRows}px)` }}
            >
              {tasks.map((task, index) => (
                <div
                  onClick={() => scrollToItem(task.id)}
                  key={index}
                  className={clsx(
                    "flex flex-shrink-0 items-center justify-center hover:bg-gray-100",
                    index % 2 === 0 ? "bg-gray-50" : "bg-white",
                  )}
                  style={{ height: heightRows }}
                >
                  {task.name}
                </div>
              ))}
            </div>
          </ScrollSyncPane>
        </div>
      )}
    </ScrollSyncPane>
  );
}
