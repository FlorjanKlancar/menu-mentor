import { api } from "lib/api";
import React, { useState } from "react";
import dayjs from "dayjs";
import {
  ChevronRightIcon,
  ExclamationTriangleIcon,
  SunIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Badge } from "components/ui/Badge";
import Modal from "components/ui/Modal";
import { type Receipts } from "@prisma/client";
import { toast } from "react-hot-toast";
import Image from "next/image";
import ReceiptListSkeleton from "components/skeletons/ReceiptListSkeleton";
import NoReceipts from "components/placeholders/NoReceipts";
import { formatDescription } from "lib/utils";

function ReceiptsGrid() {
  const [open, setOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipts>();

  const {
    data: receipts,
    isLoading,
    isError,
    error,
  } = api.receipt.getAllReceipts.useQuery();

  const utils = api.useContext();

  const removeReceiptMutation = api.receipt.removeReceipt.useMutation();

  const removeHandler = async (receiptId: string) => {
    setOpen(false);

    try {
      await removeReceiptMutation.mutate(
        { receiptId },
        {
          onSuccess() {
            utils.receipt.invalidate();
            toast.success("Successfully removed receipt!");
          },
          onError(e) {
            toast.error(e.message);
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  if (error || isError) return <div>smt went wrong</div>;
  if (isLoading || !receipts) return <ReceiptListSkeleton numberOfCards={8} />;

  return (
    <>
      {!receipts.length ? (
        <NoReceipts />
      ) : (
        receipts.map((receipt) => (
          <li
            key={receipt.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-xl"
          >
            <div className="flex flex-1 flex-col p-8">
              <div className="relative mx-auto h-32 w-32 flex-shrink-0">
                <Image
                  className="rounded-full"
                  fill
                  src={`https://api.dicebear.com/6.x/icons/jpg?seed=${receipt.id}`}
                  alt={"Icon Image"}
                  sizes="(max-width: 640px) 100vw, 12rem"
                />
              </div>
              <div className="h-12">
                {receipt.title ? (
                  <h3 className="mt-6 text-sm font-medium text-gray-900">
                    {receipt.title}
                  </h3>
                ) : null}
              </div>
              {formatDescription(receipt.receipt)}
              <div>
                <Badge className="my-2" variant={"default"}>
                  <SunIcon className="mr-1 h-5 w-5" />
                  {receipt.type}
                </Badge>
              </div>
              <p className=" text-sm text-slate-400">
                {dayjs(receipt.createdAt).format("DD. MM. YYYY")}
              </p>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <button
                    onClick={() => {
                      setSelectedReceipt(receipt);
                      setOpen(true);
                    }}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-slate-200"
                  >
                    <TrashIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                    Remove
                  </button>
                </div>
                <Link
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-slate-200"
                  href={`/receipts/${receipt.id}`}
                >
                  <ChevronRightIcon
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  Open
                </Link>
              </div>
            </div>
          </li>
        ))
      )}
      <Modal
        modalTitle={"Delete the selected receipt?"}
        modalIcon={<ModalIcon />}
        modalButton={
          <button
            type="button"
            onClick={() => removeHandler(selectedReceipt!.id)}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-red-200 px-3 py-2 text-sm font-semibold text-red-900 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50 sm:mt-0 sm:w-auto"
          >
            Delete
          </button>
        }
        open={open}
        setOpen={setOpen}
      >
        {selectedReceipt && (
          <div className="text-sm text-gray-500">
            <p>
              Do you really want to remove the following receipt? <br />
              <span className="text-sm font-semibold text-primary underline decoration-primary underline-offset-4">
                {formatDescription(selectedReceipt.receipt)}
              </span>
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ReceiptsGrid;

const ModalIcon = () => {
  return (
    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
      <ExclamationTriangleIcon
        className="h-6 w-6 text-red-600"
        aria-hidden="true"
      />
    </div>
  );
};
