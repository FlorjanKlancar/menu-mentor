import {
  BookmarkIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "components/ui/Badge";
import React from "react";

function ReceiptListSkeleton({ numberOfCards }: { numberOfCards: number }) {
  return (
    <div className="h-full">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {[...Array(numberOfCards)].map((i) => (
          <li
            key={i}
            className="divide-gray-200 bg-white col-span-1 flex flex-col divide-y rounded-lg text-center shadow-xl"
          >
            <div className="mx-auto flex flex-1 flex-col p-8">
              <div className="skeleton mx-auto h-32 w-32 rounded-full" />

              <div className="skeleton mx-auto mt-6 h-5 w-24" />
              <div className="skeleton mx-auto mt-2 h-10 w-48" />

              <div>
                <Badge className="mt-3">
                  <BookmarkIcon className="mr-1 h-5 w-5 text-secondary" />
                  <div className="skeleton h-4 w-16" />
                </Badge>
              </div>
            </div>
            <div>
              <div className="divide-gray-200 -mt-px flex divide-x">
                <div className="flex w-0 flex-1">
                  <button className="text-gray-900 hover:bg-slate-200 relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold">
                    <TrashIcon
                      className="text-red-500 h-5 w-5"
                      aria-hidden="true"
                    />
                    <div className="skeleton h-4 w-12" />
                  </button>
                </div>
                <button className="text-gray-900 hover:bg-slate-200 relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold">
                  <ChevronRightIcon
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  <div className="skeleton h-4 w-12" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReceiptListSkeleton;
