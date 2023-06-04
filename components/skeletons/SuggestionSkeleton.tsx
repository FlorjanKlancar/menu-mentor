import React from "react";

function SuggestionSkeleton() {
  return (
    <div
      className={`grid grid-cols-1 gap-2 sm:grid-cols-2 sm:px-0 lg:grid-cols-4`}
    >
      {[...Array(3)].map((_, i) => (
        <div className="skeleton h-6 w-48 rounded-lg" key={i} />
      ))}
    </div>
  );
}

export default SuggestionSkeleton;
