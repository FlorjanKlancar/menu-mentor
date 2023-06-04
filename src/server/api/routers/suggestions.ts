import { TRPCError } from "@trpc/server";
import { type ChatGPTMessage, openaiApi } from "lib/OpenAIStream";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const suggestionsRouter = createTRPCRouter({
  getSuggestions: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId) return;

    const receipts = await prisma.receipts.findMany({
      where: { userId: ctx.auth.userId },
    });

    if (!receipts) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User has no receipts",
      });
    }

    const receiptTexts = receipts
      .map((receipt) => receipt.title)
      .filter((title) => title !== null);

    const messages: ChatGPTMessage[] = [];

    if (!receiptTexts.length) {
      messages.push({
        role: "user",
        content: `Generate a random dish of the day which you think I would like.`,
      });
    } else {
      for (const receiptText of receiptTexts) {
        messages.push({
          role: "user",
          content: `Here are my previous receipts: ${receiptText}. Please suggest a new dish title based on my history.`,
        });
      }
    }

    messages.push(
      {
        role: "user",
        content: `Write me a new dish title`,
      },
      { role: "system", content: "New suggested dish: " }
    );

    const response = await openaiApi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 30,
      n: 3,
      stop: "\n",
    });

    return response.data.choices;
  }),
});
