import { ScrollSyncPane } from "react-scroll-sync";
import { CalendarRow } from ".";
import { TaskComponentProps } from "../../utils/interfaces/global";
import { useGanttStore } from "../../utils/store";
import { differenceInDays, endOfWeek, startOfWeek } from "date-fns";

interface CalendarBodyProps {
  componentTask?: (props: TaskComponentProps) => JSX.Element;
}

export function CalendarBody({ componentTask }: CalendarBodyProps) {
  const { tasks, dates, widthColumns, heightRows, calendarStart, viewMode } =
    useGanttStore();

  const today = new Date();

  const weekRanger = () => {
    // Calcula o início da semana atual
    const start = startOfWeek(calendarStart);

    // Calcula a diferença de dias entre o início da semana e a data atual
    const daysElapsed = differenceInDays(today, start);

    // Calcula a largura de uma coluna
    const columnWidth = widthColumns / 7;

    return daysElapsed * columnWidth;
  };

  const todayPosition = () => {
    const diffToday = today.getTime() - calendarStart.getTime();

    switch (viewMode) {
      case "hour":
        return (diffToday / (1000 * 60 * 60)) * widthColumns;
      case "day":
        return (diffToday / (1000 * 60 * 60 * 24)) * widthColumns;
      case "week":
        return weekRanger();
      case "month":
        return (diffToday / (1000 * 60 * 60 * 24)) * widthColumns;
      case "year":
        return (diffToday / (1000 * 60 * 60 * 24)) * widthColumns;
    }
  };

  return (
    <ScrollSyncPane>
      <div
        onWheel={(event) => {
          if (event.ctrlKey) {
            if (event.deltaY < 0) {
              useGanttStore.setState((state) => ({
                widthColumns:
                  state.widthColumns + 10 < 300
                    ? state.widthColumns + 10
                    : state.widthColumns,
                heightRows:
                  state.heightRows + 10 < 300
                    ? state.heightRows + 10
                    : state.heightRows,
              }));
            } else {
              useGanttStore.setState((state) => ({
                widthColumns:
                  state.widthColumns - 10 > 50
                    ? state.widthColumns - 10
                    : state.widthColumns,
                heightRows:
                  state.heightRows - 10 > 50
                    ? state.widthColumns - 10
                    : state.widthColumns,
              }));
            }
          }
        }}
        id="body-calendar-id"
        className="relative flex w-max flex-col overflow-y-auto overflow-x-hidden"
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
