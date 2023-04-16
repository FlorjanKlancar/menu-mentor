import { useUser } from "@clerk/nextjs";
import ChatBubble from "components/ChatBubble";
import TextPrompt from "components/TextPrompt";
import { useEffect, useRef, useState } from "react";
import { type MessageType } from "types/MessageType";

export default function Home() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [botResponse, setBotResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const chatRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!botResponse.length) return;

    const cleanup = transformMessage(botResponse);

    return cleanup;
  }, [botResponse]);

  const transformMessage = (chunkValue: string) => {
    if (!messages.length) return;

    const getLastMessage = messages.pop();

    if (!getLastMessage) return;

    getLastMessage.isLoading = false;
    getLastMessage.message = chunkValue;

    setMessages([...messages, getLastMessage]);
  };

  const scrollToChat = () => {
    if (chatRef.current !== null) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!user) return <div></div>;

  const generateAIResponse = async (prompt: string) => {
    try {
      setMessages([
        ...messages,
        {
          messageOwner:
            user.fullName ??
            user.primaryEmailAddress?.emailAddress ??
            "Username",
          message: prompt,
          isLoading: false,
        },
        { messageOwner: "Chat Bot", message: "", isLoading: true },
      ]);

      setLoading(true);
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      scrollToChat();

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = response.body;
      if (!data) {
        return;
      }
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();

        done = doneReading;
        const chunkValue = decoder.decode(value);

        setBotResponse((prev) => prev + chunkValue);
      }

      setBotResponse("");
      setLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        setBotResponse(e.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col space-y-8">
      <h2 className="flex items-center py-8 text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:py-4 sm:text-4xl sm:tracking-tight">
        Chat with a Nutrition Specialist &#127791;
      </h2>

      <TextPrompt
        messages={messages}
        setMessages={setMessages}
        generateAIResponse={generateAIResponse}
        loading={loading}
      />

      <div className="min-h-[calc(100vh-500px)]">
        {messages.map((message, i) => (
          <ChatBubble {...message} key={i} />
        ))}
      </div>
      <div ref={chatRef} />
    </div>
  );
}
