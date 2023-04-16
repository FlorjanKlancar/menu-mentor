import { useUser } from "@clerk/nextjs";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import { type MessageType } from "types/MessageType";

type Props = {
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  generateAIResponse: (prompt: string) => void;
  loading: boolean;
};

function TextPrompt({
  messages,
  setMessages,
  generateAIResponse,
  loading,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();

  if (!user) return <div></div>;

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!searchQuery.length) return;

    setSearchQuery("");
    setMessages([
      ...messages,
      {
        messageOwner:
          user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Username",
        message: searchQuery,
        isLoading: false,
      },
      { messageOwner: "Chat Bot", message: "", isLoading: true },
    ]);

    generateAIResponse(searchQuery);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="glass flex flex-col space-y-5 rounded-lg border-b border-gray-200 px-4 py-5 sm:px-6"
    >
      <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Ask your assistant for the menu
        </h3>
      </div>
      <textarea
        className="textarea-primary textarea w-full "
        placeholder="Write me an all rounded meal plan for Friday including chicken and lettuce."
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      ></textarea>
      <div className="mt-2 flex-shrink-0">
        <button
          type="submit"
          disabled={loading}
          className={`${
            !loading ? "btn-primary" : "btn-disabled loading"
          } btn w-full`}
        >
          Generate Response
        </button>
      </div>
    </form>
  );
}

export default TextPrompt;
