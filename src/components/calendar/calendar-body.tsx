import { ScrollSyncPane } from "react-scroll-sync";
import { CalendarRow } from ".";
import { TaskComponentProps } from "../../utils/interfaces/global";
import { useTasksStore } from "../../utils/store";

interface CalendarBodyProps {
  componentTask?: (props: TaskComponentProps) => JSX.Element;
}

export function CalendarBody({ componentTask }: CalendarBodyProps) {
  const { tasks, dates, widthColumns, heightRows, calendarStart } =
    useTasksStore();

  const today = new Date();

  const todayPosition = () => {
    const diffToday = today.getTime() - calendarStart.getTime();

    return (diffToday / (1000 * 60 * 60 * 24)) * 100;
  };

  return (
    <ScrollSyncPane>
      <div
        id="body-calendar-id"
        className="relative w-max flex flex-col overflow-y-auto overflow-x-visible"
      >
        {tasks.map((task, index) => (
          <CalendarRow
            key={index}
            columnWidth={widthColumns}
            dates={dates}
            index={index}
            rowHeight={heightRows}
            task={task}
            componentTask={componentTask}
          />
        ))}
        <div
          className="absolute bg-green-500"
          style={{
            left: todayPosition(),
            width: 2,
            height: heightRows * tasks.length,
          }}
        />
      </div>
    </ScrollSyncPane>
  );
}
