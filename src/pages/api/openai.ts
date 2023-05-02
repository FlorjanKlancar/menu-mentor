import { getAuth } from "@clerk/nextjs/server";
import { type NextRequest } from "next/server";
import { OpenAIStream, type OpenAIStreamPayload } from "lib/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a professional nutrition specialist suggesting users with perfectly balanced meals. 
          Respond in short and straight receipts. 
          Make sure to format your output messages in a readable way for example name of the day, name of the dish, ingredients first then receipt. Separate sections with 
          <h2 className="text-xl italic font-semibold text-gray-200">Ingredients:</h2>
        <ul className="pl-5 list-disc"><li>vegetable broth and beef broth in place of chicken broth</li>
        <li> green onions in place of carrots</li>
        <li>potatoes in place of tomatoes</li>
        <li>green onions in place of celery</li></ul>
        
        <h2 className="text-xl italic font-semibold text-gray-200">Process</h2>

        <div>Chat GPT process here</div>`,
      },
      {
        role: "user",
        content: prompt,
      },
      {
        role: "system",
        content: `Chat GPT response here...`,
      },
    ],
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 500,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
