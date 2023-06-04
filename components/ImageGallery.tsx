import { api } from "lib/api";
import Image from "next/image";
import React from "react";
import GallerySkeleton from "./skeletons/GallerySkeleton";

type Props = {
  receiptId: string;
  isGenerating: boolean;
};

function ImageGallery({ receiptId, isGenerating }: Props) {
  const { data, isLoading } = api.receipt.getReceiptImages.useQuery({
    receiptId,
  });

  if (!data || isLoading || isGenerating) return <GallerySkeleton />;
  return (
    <>
      {data.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          {data.map((image) => (
            <div
              className="relative h-52 w-52 sm:h-32 sm:w-32 md:h-44 md:w-44 lg:h-52 lg:w-52 xl:h-72 xl:w-72"
              key={image.imageUrl}
            >
              <Image
                className="rounded-lg"
                fill
                src={image.imageUrl}
                alt={"Dish Image"}
                sizes="(max-width: 640px) 100vw, 12rem"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative h-32 w-32">
            <Image
              className="rounded-full"
              fill
              src={`https://api.dicebear.com/6.x/icons/jpg?seed=${receiptId}`}
              alt={"Icon Image"}
              sizes="(max-width: 640px) 100vw, 12rem"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ImageGallery;
