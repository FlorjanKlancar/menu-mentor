import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import { type MessageType } from "types/MessageType";
import Suggestions from "./Suggestions";

type Props = {
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[]>>;
  generateAIResponse: (prompt: string) => void;
  loading: boolean;
};

function TextPrompt({ generateAIResponse, loading }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!searchQuery.length) return;

    setSearchQuery("");

    generateAIResponse(searchQuery);
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="glass flex flex-col space-y-2 rounded-lg px-4 py-3 sm:space-y-5 sm:px-6"
      >
        <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
          <h3 className="text-sm font-semibold leading-6 text-gray-900 sm:text-base">
            Ask your assistant for the menu
          </h3>
        </div>

        <Suggestions loading={loading} setSearchQuery={setSearchQuery} />

        <div className="flex items-center space-x-2 sm:flex-col sm:space-x-0">
          <textarea
            className="textarea-primary textarea w-full"
            placeholder="Write me an all rounded meal plan for Friday including chicken and lettuce."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          ></textarea>
          <div className="mt-2 hidden w-full flex-shrink-0 sm:flex">
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
          <div className="flex sm:hidden">
            <button
              disabled={loading}
              className="btn rounded-full border border-primary bg-slate-200 p-3 hover:border-primary hover:bg-primary/30"
            >
              <PaperAirplaneIcon className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default TextPrompt;
