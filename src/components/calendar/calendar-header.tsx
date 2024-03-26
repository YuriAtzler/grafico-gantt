import { useGanttStore } from "../../utils";

export function CalendarHeader() {
  const { dates, headerHeight, widthColumns } = useGanttStore();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex divide-x">
      {dates.map((date, index) => (
        <div
          key={index}
          className="flex flex-col flex-shrink-0 items-center justify-center"
          style={{ width: widthColumns, height: headerHeight }}
        >
          <span>{weekDays[date.getDay()]}</span>
          <span>{date.getDate()}</span>
        </div>
      ))}
    </div>
  );
}
