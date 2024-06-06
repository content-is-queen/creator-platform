import clsx from "clsx";

const Bar = ({ dark }) => (
  <span
    className={clsx(
      "animate-pulse h-2 min-w-40 rounded inline-block",
      dark ? "bg-queen-black" : "bg-queen-white"
    )}
  ></span>
);

const LoadingPlaceholder = ({ dark }) => (
  <div className="flex flex-col gap-2">
    <Bar dark={dark} />
    <Bar dark={dark} />
  </div>
);

export default LoadingPlaceholder;

LoadingPlaceholder.Bar = Bar;
