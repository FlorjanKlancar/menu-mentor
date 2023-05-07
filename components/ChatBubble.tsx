import React from "react";
import BotTypingSpinner from "./BotTypingSpinner";
import parse from "html-react-parser";
import Avatar from "./ui/Avatar";
import type { MessageType } from "types/MessageType";
import {
  CheckIcon,
  HandThumbDownIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { api } from "lib/api";
import toast from "react-hot-toast";
import { Badge } from "./ui/Badge";

interface Props extends MessageType {
  generateAIResponse: (prompt: string) => void;
  isGenerating: boolean;
}

function ChatBubble({
  message,
  messageOwner,
  isLoading,
  time,
  generateAIResponse,
  isGenerating,
}: Props) {
  const receiptMutation = api.receipt.saveReceipt.useMutation();

  const isReceipt = message.includes("<li>");

  const saveReceiptHandler = async () => {
    toast.success("Successfully saved!");

    await receiptMutation.mutate({ receipt: message });
  };

  const rerollReceiptHandler = async () => {
    await generateAIResponse(
      "I don&apos;t like the previous receipt. Make another one."
    );
  };

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
        <div className="chat-bubble bg-secondary/80">
          {!isLoading ? parse(message) : <BotTypingSpinner />}
        </div>

        <div className="chat-footer mt-2">
          {!receiptMutation.isSuccess ? (
            messageOwner === "Chat Bot" && isReceipt && !isGenerating ? (
              <div className="flex flex-col space-y-2 text-sm sm:flex-row sm:space-x-2 sm:space-y-0">
                <Badge
                  variant={"success"}
                  className="cursor-pointer"
                  onClick={saveReceiptHandler}
                >
                  <HeartIcon className="mr-1 h-4 w-4" />
                  Save for later
                </Badge>

                <Badge
                  variant={"alert"}
                  className="cursor-pointer"
                  onClick={rerollReceiptHandler}
                >
                  <HandThumbDownIcon className="mr-1 h-4 w-4" />I don&apos;t
                  like it
                </Badge>
              </div>
            ) : null
          ) : (
            <Badge variant={"greenOutline"}>
              Saved <CheckIcon className="ml-0.5 h-3.5 w-3.5" />
            </Badge>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatBubble;
