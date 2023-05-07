import FooterLayout from "components/layout/FooterLayout";
import dayjs from "dayjs";
import { api } from "lib/api";
import { formatDescription } from "lib/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Modal from "components/ui/Modal";
import { toast } from "react-hot-toast";

function SpecificReceiptPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [receiptTitle, setReceiptTitle] = useState("");
  const utils = api.useContext();

  const { receiptId } = router.query;

  if (!receiptId) return;

  const { data: receipt, isLoading } = api.receipt.getReceiptById.useQuery(
    {
      receiptId: receiptId.toString(),
    },
    {
      enabled: !!receiptId,
      onSuccess: (receipt) => {
        setReceiptTitle(receipt?.title ?? "");
      },
    }
  );
  const updateReceipt = api.receipt.updateReceipt.useMutation();

  if (!receipt || isLoading) return <div>loading</div>;

  const updateReceiptHandler = async () => {
    setOpen(false);

    try {
      await updateReceipt.mutate(
        {
          receiptId: receipt.id,
          receiptTitle,
          receiptDescription: receipt.receipt,
        },
        {
          onSuccess() {
            utils.receipt.invalidate();
            toast.success("Successfully updated the receipt!");
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

  return (
    <>
      <Head>
        <title>Receipts - Menu Mentor</title>
      </Head>

      <FooterLayout
        headerTitle={receipt.title ?? formatDescription(receipt.receipt)!}
        sideActionButton={
          <button className="btn-secondary btn" onClick={() => setOpen(true)}>
            Edit Title <PencilSquareIcon className="ml-1 h-5 w-5" />
          </button>
        }
      >
        <div className="h-screen">
          <div className="grid grid-cols-2 items-center justify-items-center p-3">
            <div className="space-y-16">
              <article className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={dayjs(receipt.createdAt).format("dd.mm.yy")}
                    className="text-gray-500"
                  >
                    {dayjs(receipt.createdAt).format("MMMM DD, YYYY")}
                  </time>
                  {receipt.type ? (
                    <div className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      {receipt.type}
                    </div>
                  ) : null}
                </div>
                <div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                    {receipt.title ?? formatDescription(receipt.receipt)!}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-black">
                    {parse(receipt.receipt)}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="relative h-10 w-10">
                    <Image
                      src={"/avatar.jpg"}
                      alt="Avatar"
                      fill
                      className="rounded-full bg-gray-50"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      Nutrition Specialist
                    </p>
                    <p className="text-gray-600">Powered by OpenAPI</p>
                  </div>
                </div>
              </article>
            </div>

            <div className="relative h-32 w-32">
              <Image
                className="rounded-full"
                fill
                src={`https://api.dicebear.com/6.x/icons/jpg?seed=${receipt.id}`}
                alt={"Icon Image"}
              />
            </div>
          </div>
        </div>

        <Modal
          modalTitle="Edit Receipt Name"
          modalButton={
            <button
              type="button"
              className="ml-1 mt-3 inline-flex w-full justify-center rounded-md bg-green-200 px-3 py-2 text-sm font-semibold text-green-900 shadow-sm ring-1 ring-inset ring-green-300 hover:bg-green-50 sm:mt-0 sm:w-auto"
              onClick={updateReceiptHandler}
            >
              Save
            </button>
          }
          open={open}
          setOpen={setOpen}
          modalIcon={<PencilSquareIcon className="ml-1 h-5 w-5 text-primary" />}
        >
          <div className="pt-2">
            <input
              type="text"
              placeholder="Receipt Title"
              value={receiptTitle}
              onChange={(e) => setReceiptTitle(e.target.value)}
              className="input-bordered input-primary input w-full max-w-sm"
            />
          </div>
        </Modal>
      </FooterLayout>
    </>
  );
}

export default SpecificReceiptPage;
