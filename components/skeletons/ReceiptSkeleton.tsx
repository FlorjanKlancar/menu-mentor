import React from "react";

function ReceiptSkeleton() {
  return (
    <div className="sm:h-screen">
      <div className="grid grid-cols-1 items-center justify-items-center gap-12 p-3 sm:grid-cols-2 sm:gap-8">
        <div className="w-full space-y-16">
          <article className="flex max-w-2xl flex-col items-start justify-between">
            <div className="flex items-center gap-x-4">
              <div className="skeleton h-5 w-24" />
              <div className="skeleton h-6 w-16 rounded-full" />
            </div>
            <div className="skeleton mt-3 h-8 w-48" />

            <div className="skeleton mt-5 h-72 w-full" />
            <div className="relative mt-8 flex items-center gap-x-4">
              <div className="skeleton relative h-10 w-10 rounded-full" />
              <div className="flex flex-col space-y-3">
                <div className="skeleton h-4 w-36" />
                <div className="skeleton h-3 w-24" />
              </div>
            </div>
          </article>
        </div>

        <div className="skeleton relative h-32 w-32 rounded-full" />
      </div>
    </div>
  );
}

export default ReceiptSkeleton;
