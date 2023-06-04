import React from "react";

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <div className="skeleton relative h-72 w-72" key={i} />
      ))}
    </div>
  );
}

export default GallerySkeleton;
