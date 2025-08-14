export const Spinner = () => {
  return (
    <div className="flex space-x-1">
      <div
        className="w-2 h-6  rounded animate-pulse"
        style={{ animationDelay: "-0.3s" }}
      ></div>
      <div
        className="w-2 h-6  rounded animate-pulse"
        style={{ animationDelay: "-0.15s" }}
      ></div>
      <div className="w-2 h-6  rounded animate-pulse"></div>
    </div>
  );
};
