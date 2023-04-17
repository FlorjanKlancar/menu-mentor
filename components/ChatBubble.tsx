import React from "react";
import BotTypingSpinner from "./BotTypingSpinner";
import parse from "html-react-parser";
import Avatar from "./Avatar";
import type { MessageType } from "types/MessageType";
import { HandThumbDownIcon, HeartIcon } from "@heroicons/react/24/outline";

function ChatBubble({ message, messageOwner, isLoading, time }: MessageType) {
  const isReceipt = message.includes("<li>");

  console.log("msg", message, isReceipt);

  return (
    <>
      <div
        className={`chat ${
          messageOwner !== "Chat Bot" ? "chat-start" : "chat-end"
        }`}
      >
        <div className="chat-image avatar">
          <Avatar messageOwner={messageOwner} />
        </div>
        <div className="chat-header">
          {messageOwner}
          <time className="ml-2 text-xs opacity-50">{time}</time>
        </div>
        <div className="chat-bubble bg-secondary">
          {!isLoading ? parse(message) : <BotTypingSpinner />}
        </div>
        {messageOwner === "Chat Bot" && isReceipt ? (
          <div className="chat-footer mt-2 flex flex-col space-y-2 text-sm sm:flex-row sm:space-x-2 sm:space-y-0">
            <div className="badge-outline badge w-32 cursor-pointer border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              <HeartIcon className="mr-1 h-4 w-4" />
              Save for later
            </div>
            <div className="badge-outline badge w-32 cursor-pointer border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <HandThumbDownIcon className="mr-1 h-4 w-4" />I don't like it
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default ChatBubble;
