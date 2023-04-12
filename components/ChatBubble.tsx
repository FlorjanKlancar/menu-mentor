import React from "react";
import BotTypingSpinner from "./BotTypingSpinner";
import parse from "html-react-parser";
import { useUser } from "@clerk/nextjs";

type Props = {
  message: string;
  messageOwner: string;
  isLoading: boolean;
};

function ChatBubble({ message, messageOwner, isLoading }: Props) {
  const { user } = useUser();

  if (!user) return <div></div>;

  return (
    <div
      className={`chat ${
        messageOwner !== "Chat Bot" ? "chat-start" : "chat-end"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={
              messageOwner !== "Chat Bot" ? user.profileImageUrl : "avatar.jpg"
            }
          />
        </div>
      </div>
      <div className="chat-header">
        {messageOwner}
        <time className="ml-2 text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble bg-secondary">
        {!isLoading ? parse(message) : <BotTypingSpinner />}
      </div>
      <div className="chat-footer mt-1 text-xs opacity-50">Delivered</div>
    </div>
  );
}

export default ChatBubble;
