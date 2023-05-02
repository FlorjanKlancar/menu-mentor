import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import AvatarImageSkeleton from "../skeletons/AvatarImageSkeleton";

type Props = {
  messageOwner: string;
};

function Avatar({ messageOwner }: Props) {
  const { user } = useUser();

  if (!user) return <AvatarImageSkeleton />;

  return (
    <div className="relative w-10 rounded-full">
      <Image
        src={messageOwner !== "Chat Bot" ? user.profileImageUrl : "/avatar.jpg"}
        alt="User Img"
        fill
      />
    </div>
  );
}

export default Avatar;
