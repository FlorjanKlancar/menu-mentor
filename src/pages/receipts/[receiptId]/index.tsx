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
import ReceiptSkeleton from "components/skeletons/ReceiptSkeleton";
import ImageGallery from "components/ImageGallery";

function SpecificReceiptPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [receiptTitle, setReceiptTitle] = useState("");
  const utils = api.useContext();
  const updateReceipt = api.receipt.updateReceipt.useMutation();
  const generateImage = api.receipt.generateReceiptImage.useMutation();

  const { receiptId } = router.query;

  const { data: receipt, isLoading } = api.receipt.getReceiptById.useQuery(
    {
      receiptId: receiptId?.toString() ?? "",
    },
    {
      enabled: !!receiptId,
      onSuccess: (receipt) => {
        setReceiptTitle(receipt?.title ?? "");
      },
    }
  );
  const { data: dataImages, isLoading: isLoadingImages } =
    api.receipt.getReceiptImages.useQuery(
      {
        receiptId: receiptId?.toString() ?? "",
      },
      {
        enabled: !!receiptId,
      }
    );

  if (!receipt || isLoading || isLoadingImages) return <ReceiptSkeleton />;

  const updateReceiptHandler = async () => {
    setOpen(false);

    try {
      updateReceipt.mutate(
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

  const generateImageHandler = () => {
    try {
      generateImage.mutate({
        receiptId: receipt.id,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const invalidateImagesQuery = async () =>
    await utils.receipt.getReceiptImages.invalidate();

  if (generateImage.isSuccess) {
    invalidateImagesQuery();
  }
  return (
    <>
      <Head>
        <title>Receipts - Menu Mentor</title>
      </Head>
      <FooterLayout
        headerTitle={receipt.title ?? formatDescription(receipt.receipt)!}
        sideActionButton={
          <div className="flex w-full flex-col space-y-2 sm:justify-end md:flex-row md:space-x-3 md:space-y-0">
            {!dataImages?.length ? (
              <button
                className={`${
                  !generateImage.isLoading
                    ? "btn-outline btn-primary"
                    : "btn-disabled loading"
                }  btn`}
                onClick={generateImageHandler}
              >
                {generateImage.isLoading ? "Generating" : "Generate AI Images"}
              </button>
            ) : null}
            <button
              className="btn-secondary btn w-full md:w-44"
              onClick={() => setOpen(true)}
            >
              Edit Title <PencilSquareIcon className="ml-1 h-5 w-5" />
            </button>
          </div>
        }
      >
        <div className="sm:h-screen">
          <div className="grid grid-cols-1 items-center justify-items-center gap-12 p-3 sm:grid-cols-2 sm:gap-8">
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
                  <div className="mt-5 text-sm leading-6 text-black">
                    {parse(receipt.receipt)}
                  </div>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="relative h-10 w-10">
                    <Image
                      src={"/avatar.jpg"}
                      alt="Avatar"
                      fill
                      className="rounded-full bg-gray-50"
                      sizes="(max-width: 640px) 100vw, 12rem"
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

            <ImageGallery
              receiptId={receipt.id}
              isGenerating={generateImage.isLoading}
            />
          </div>
        </div>

        <Modal
          modalTitle="Edit Receipt Name"
          modalButton={
            <button
              className="mt-3 inline-flex w-full justify-center rounded-md bg-green-200 px-3 py-2 text-sm font-semibold text-green-900 shadow-sm ring-1 ring-inset ring-green-300 hover:bg-green-50 sm:mt-0 sm:w-auto"
              type="submit"
              onClick={updateReceiptHandler}
            >
              Save
            </button>
          }
          open={open}
          setOpen={setOpen}
          modalIcon={<PencilSquareIcon className="ml-1 h-5 w-5 text-primary" />}
        >
          <div className="px-6 pt-2">
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
