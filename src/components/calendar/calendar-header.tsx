import { format, getWeek } from "date-fns";
import { useGanttStore } from "../../utils";
import clsx from "clsx";

export function CalendarHeader() {
  const { dates, headerHeight, widthColumns, viewMode } = useGanttStore();
  const today = new Date();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthAbreviation = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  console.log(dates.map((item) => getWeek(item)));

  const datesFilter = (filterDate: Date, type: "month" | "day" | "year") => {
    switch (type) {
      case "day":
        return dates.filter((date) => date.getDate() === filterDate.getDate());
      case "month":
        return dates.filter(
          (date) => date.getMonth() === filterDate.getMonth(),
        );
      case "year":
        return dates.filter(
          (date) => date.getFullYear() === filterDate.getFullYear(),
        );
    }
  };

  const yearGroup = () => {
    const obj: Record<string, Date> = {};
    const arr: Date[] = [];

    dates.forEach((d) => {
      const key = d.toISOString().slice(0, 4); //formato YYYY-MM
      if (!obj[key]) obj[key] = d;
    });

    Object.keys(obj).forEach((chave) => {
      arr.push(obj[chave]);
    });

    return arr;
  };

  const monthGroup = () => {
    const obj: Record<string, Date> = {};
    const arr: Date[] = [];

    dates.forEach((d) => {
      const key = d.toISOString().slice(0, 7); //formato YYYY-MM
      if (!obj[key]) obj[key] = d;
    });

    Object.keys(obj).forEach((chave) => {
      arr.push(obj[chave]);
    });

    return arr;
  };

  const daysGroup = () => {
    const obj: Record<string, Date> = {};
    const arr: Date[] = [];

    dates.forEach((d) => {
      const key = d.toISOString().slice(0, 10); //formato YYYY-MM-DD

      if (!obj[key]) obj[key] = d;
    });

    Object.keys(obj).forEach((chave) => {
      const date = new Date(chave);
      date.setDate(date.getDate() + 1);
      arr.push(date);
    });

    arr.pop();

    return arr;
  };

  switch (viewMode) {
    case "hour":
      return (
        <div className="flex w-min shadow">
          {daysGroup().map((day, index) => (
            <div
              key={`${day.getDate()}-${index}`}
              className={clsx(
                "flex flex-col divide-y text-sm",
                index % 2 === 0 ? "bg-white" : "bg-gray-50",
              )}
            >
              <div
                className="flex w-auto items-center justify-center"
                style={{
                  minHeight: headerHeight * 0.5,
                }}
              >
                <span>{day.toLocaleDateString()}</span>
              </div>
              <div className="flex divide-x">
                {datesFilter(day, "day").map((hour, index) => (
                  <div
                    className="flex items-center justify-center"
                    key={`${hour.getHours()}-${index}`}
                    style={{
                      minWidth: widthColumns,
                      minHeight: headerHeight * 0.5,
                    }}
                  >
                    {hour.getHours()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "day":
      return (
        <div className="flex shadow">
          {monthGroup().map((month, index) => (
            <div
              key={`${month.toLocaleDateString()}-${index}`}
              className={clsx(
                "flex flex-col divide-y text-sm",
                index % 2 === 0 ? "bg-white" : "bg-gray-50",
              )}
            >
              <div
                className="flex w-auto items-center justify-center"
                style={{ height: headerHeight * 0.4 }}
              >
                <span>{monthAbreviation[month.getMonth()]}</span>
              </div>
              <div className="flex divide-x">
                {datesFilter(month, "month").map((day, index) => (
                  <div
                    className="flex items-center justify-center"
                    key={`${day.getDate()}-${index}`}
                    style={{
                      minWidth: widthColumns,
                      minHeight: headerHeight * 0.6,
                    }}
                  >
                    {day.getDate()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "week":
      return (
        <div className="flex shadow">
          {monthGroup().map((month, index) => (
            <div
              key={`${month.toLocaleDateString()}-${index}`}
              className={clsx(
                "flex flex-col divide-y text-sm",
                index % 2 === 0 ? "bg-white" : "bg-gray-50",
              )}
            >
              <div
                className="flex w-auto items-center justify-center"
                style={{ height: headerHeight * 0.4 }}
              >
                <span>{monthAbreviation[month.getMonth()]}</span>
              </div>
              <div className="flex divide-x">
                {datesFilter(month, "month").map((week, index) => (
                  <div
                    className="flex items-center justify-center"
                    key={`${getWeek(week)}-${index}`}
                    style={{
                      minWidth: widthColumns,
                      minHeight: headerHeight * 0.6,
                    }}
                  >
                    <span className="text-xs text-gray-400">
                      {week.getDate()}-{week.getDate() + 6}
                    </span>
                    -{getWeek(week)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "month":
      return (
        <div className="flex shadow">
          {yearGroup().map((year, index) => (
            <div
              key={`${year.toLocaleDateString()}-${index}`}
              className={clsx(
                "flex flex-col divide-y text-sm",
                index % 2 === 0 ? "bg-white" : "bg-gray-50",
              )}
            >
              <div
                className="flex w-auto items-center justify-center"
                style={{ height: headerHeight * 0.4 }}
              >
                <span>{year.getFullYear()}</span>
              </div>
              <div className="flex divide-x">
                {datesFilter(year, "year").map((month, index) => (
                  <div
                    className="flex items-center justify-center"
                    key={`${getWeek(month)}-${index}`}
                    style={{
                      minWidth: widthColumns,
                      minHeight: headerHeight * 0.6,
                    }}
                  >
                    {month.getMonth() + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "year":
  }
}
