import { CalendarBody, CalendarHeader } from ".";
import { TaskComponentProps } from "../../utils/interfaces/global";

interface CalendarProps {
  componentTask?: (props: TaskComponentProps) => JSX.Element;
}

export function Calendar({ componentTask }: CalendarProps) {
  return (
    <div className="relative w-full h-full flex flex-col bg-white rounded-md shadow-md overflow-y-hidden overflow-x-auto">
      <CalendarHeader />
      <CalendarBody componentTask={componentTask} />
    </div>
  );
}
