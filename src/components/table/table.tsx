import { ScrollSyncPane } from "react-scroll-sync";
import { TableComponentProps } from "../../utils/interfaces/global";
import { useTasksStore } from "../../utils/store";

interface TableProps {
  componentTable?: (props: TableComponentProps) => JSX.Element;
}

export function Table({ componentTable }: TableProps) {
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
    <ScrollSyncPane>
      {componentTable ? (
        componentTable({ tasks, heightRows })
      ) : (
        <div className="overflow-hidden">
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
      )}
    </ScrollSyncPane>
  );
}
