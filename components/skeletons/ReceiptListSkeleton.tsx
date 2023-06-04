import {
  BookmarkIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "components/ui/Badge";
import React from "react";

function ReceiptListSkeleton({ numberOfCards }: { numberOfCards: number }) {
  return (
    <>
      {[...Array(numberOfCards)].map((_, i) => (
        <li
          key={i}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-xl"
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
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-slate-200">
                  <TrashIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                  <div className="skeleton h-4 w-12" />
                </button>
              </div>
              <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-slate-200">
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
    </>
  );
}

export default ReceiptListSkeleton;
