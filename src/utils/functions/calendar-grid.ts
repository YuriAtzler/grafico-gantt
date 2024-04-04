import { ViewMode } from "..";

export const calendarGrid = (viewMode: ViewMode) => {
  switch (viewMode) {
    case "hour":
      return { widthColumns: 40, heightRows: 40 };
    case "day":
      return { widthColumns: 60, heightRows: 40 };
    case "week":
      return { widthColumns: 80, heightRows: 40 };
    case "month":
      return { widthColumns: 100, heightRows: 40 };
    case "year":
      return { widthColumns: 150, heightRows: 40 };
  }
};
