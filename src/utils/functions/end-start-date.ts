import { ViewMode } from "../interfaces/global";

export function endStartDate(
  startDates: number[],
  endDates: number[],
  viewMode: ViewMode
) {
  const today = new Date();

  let startDate = startDates[0];
  let endDate = endDates[0];
  startDate = Math.min(...startDates);
  endDate = Math.max(...endDates);

  if (endDate < today.getTime()) endDate = today.getTime();

  let dateStartAux = new Date(startDate);
  let dateEndAux = new Date(endDate);

  switch (viewMode) {
    case "day":
      dateStartAux = new Date(startDate);
      dateStartAux.setDate(dateStartAux.getDate() - 2);
      dateEndAux = new Date(endDate);
      dateEndAux.setDate(dateEndAux.getDate() + 2);
      break;
    case "week":
      dateStartAux = new Date(startDate);
      dateStartAux.setDate(dateStartAux.getDate() - 14);
      dateEndAux = new Date(endDate);
      dateEndAux.setDate(dateEndAux.getDate() + 14);
      break;
    case "month":
      dateStartAux = new Date(startDate);
      dateStartAux.setMonth(dateStartAux.getMonth() - 62);
      dateEndAux = new Date(endDate);
      dateEndAux.setMonth(dateEndAux.getMonth() + 62);
      break;
    case "year":
      dateStartAux = new Date(startDate);
      dateStartAux.setFullYear(dateStartAux.getFullYear() - 2);
      dateEndAux = new Date(endDate);
      dateEndAux.setFullYear(dateEndAux.getFullYear() + 2);
      break;
  }

  startDate = dateStartAux.getTime();
  endDate = dateEndAux.getTime();

  return { startDate: new Date(startDate), endDate: new Date(endDate) };
}
