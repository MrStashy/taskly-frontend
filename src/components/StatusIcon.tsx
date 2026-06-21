type StatusIcon = {
  status: string;
};

export default function StatusIcon({ status }: StatusIcon) {
  if (status === "In Progress") {
    return (
      <span className="px-8 py-2 rounded-full bg-blue-200 text-blue-700 flex gap-2">
        {status}
      </span>
    );
  }

  if (status === "To do") {
    return (
      <span className="px-8 py-2 rounded-full bg-yellow-200 text-yellow-700 flex gap-2">
        {status}
      </span>
    );
  }

  if (status === "Complete") {
    return (
      <span className="px-8 py-2 rounded-full bg-green-200 text-green-700 flex gap-2">
        <svg
          fill="none" // Standardizing to none for icon paths
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="icon flat-line size-6" // Using className
        >
          <polyline
            id="primary"
            points="21 5 12 14 8 10"
            style={{
              fill: "none",
              stroke: "currentColor", // Changed to currentColor
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          />
          <path
            id="primary-2"
            d="M20.94,11A8.26,8.26,0,0,1,21,12a9,9,0,1,1-9-9,8.83,8.83,0,0,1,4,1"
            style={{
              fill: "none",
              stroke: "currentColor", // Changed to currentColor
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
            }}
          />
        </svg>
        {status}
      </span>
    );
  }
}
