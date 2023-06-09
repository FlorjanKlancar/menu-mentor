import { api } from "lib/api";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/Badge";
import type { CreateChatCompletionResponseChoicesInner } from "openai";
import SuggestionSkeleton from "./skeletons/SuggestionSkeleton";

type Props = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

function Suggestions({ setSearchQuery }: Props) {
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    CreateChatCompletionResponseChoicesInner[] | undefined
  >(undefined);

  const { data: suggestionData, isLoading } =
    api.suggestions.getSuggestions.useQuery(undefined, {
      refetchOnMount: false,
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

  useEffect(() => {
    setFilteredSuggestions(suggestionData);
  }, []);

  if (!suggestionData || isLoading) return <SuggestionSkeleton />;

  return (
    <>
      <div
        className={`  flex max-w-4xl flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0`}
      >
        {filteredSuggestions?.map((suggestion) => (
          <div key={suggestion.index}>
            <Badge
              key={suggestion.index}
              variant={"suggestion"}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full"
            >
              <span> {suggestion.message?.content}</span>
            </Badge>
          </div>
        ))}
      </div>
    </>
  );
}

export default Suggestions;
