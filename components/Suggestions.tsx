import { api } from "lib/api";
import React, { useState } from "react";
import { Badge } from "./ui/Badge";
import type { CreateChatCompletionResponseChoicesInner } from "openai";
import SuggestionSkeleton from "./skeletons/SuggestionSkeleton";

type Props = {
  loading: boolean;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

function Suggestions({ loading, setSearchQuery }: Props) {
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    CreateChatCompletionResponseChoicesInner[] | undefined
  >(undefined);

  const { data: suggestionData, isLoading } =
    api.suggestions.getSuggestions.useQuery(undefined, {
      refetchOnWindowFocus: false, // Set to false to avoid refetching on window focus
      onSuccess: (data) => setFilteredSuggestions(data),
    });

  const handleSuggestionClick = (
    suggestion: CreateChatCompletionResponseChoicesInner
  ) => {
    setSearchQuery(suggestion.message!.content);
    setFilteredSuggestions((prevSuggestions) =>
      prevSuggestions?.filter(
        (prevSuggestion) => prevSuggestion.index !== suggestion.index
      )
    );
  };

  if (!suggestionData || isLoading) return <SuggestionSkeleton />;

  return (
    <>
      <div
        className={`${
          loading ? "hidden" : ""
        }  grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2 sm:px-0 lg:grid-cols-4`}
      >
        {filteredSuggestions?.map((suggestion) => (
          <Badge
            key={suggestion.index}
            variant={"suggestion"}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <span> {suggestion.message?.content}</span>
          </Badge>
        ))}
      </div>
    </>
  );
}

export default Suggestions;
