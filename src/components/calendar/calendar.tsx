import { Body, Header } from ".";

export function Calendar() {
  return (
    <div className="relative w-full h-full flex flex-col bg-white rounded-md shadow-md overflow-y-hidden overflow-x-auto">
      <Header />
      <Body />
    </div>
  );
}
