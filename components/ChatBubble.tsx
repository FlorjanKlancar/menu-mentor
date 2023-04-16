import React from "react";
import BotTypingSpinner from "./BotTypingSpinner";
import parse from "html-react-parser";
import Avatar from "./Avatar";

type Props = {
  message: string;
  messageOwner: string;
  isLoading: boolean;
};

function ChatBubble({ message, messageOwner, isLoading }: Props) {
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
          <time className="ml-2 text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble bg-secondary">
          {!isLoading ? parse(message) : <BotTypingSpinner />}
        </div>
        <div className="chat-footer mt-1 text-xs opacity-50">Delivered</div>
      </div>
    </>
  );
}

export default ChatBubble;
