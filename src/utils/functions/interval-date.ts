import { ViewMode } from "../interfaces/global";
import {
  eachHourOfInterval,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  eachWeekOfInterval,
} from "date-fns";

export function intervalDate(start: Date, end: Date, viewMode: ViewMode) {
  switch (viewMode) {
    case "hour":
      return eachHourOfInterval({ start, end });
    case "day":
      return eachDayOfInterval({ start, end });
    case "week":
      return eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });
    case "month":
      return eachMonthOfInterval({ start, end });
    case "year":
      return eachYearOfInterval({ start, end });
  }
}
