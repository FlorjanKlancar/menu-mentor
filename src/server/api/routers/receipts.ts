import { TRPCError } from "@trpc/server";
import { openaiApi } from "lib/OpenAIStream";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const receiptsRouter = createTRPCRouter({
  getAllReceipts: protectedProcedure.query(async ({ ctx }) => {
    const receipts = await prisma.receipts.findMany({
      where: { userId: ctx.auth.userId },
    });

    return receipts;
  }),

  getReceiptById: protectedProcedure
    .input(z.object({ receiptId: z.string() }))
    .query(async ({ input }) => {
      if (!input.receiptId) return;

      const receipts = await prisma.receipts.findFirst({
        where: { id: input.receiptId },
      });

      if (!receipts) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Receipt with that ID not found",
        });
      }

      return receipts;
    }),

  saveReceipt: protectedProcedure
    .input(z.object({ receipt: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const pattern = /Type:\s*(\w+)/;
      const match = input.receipt.match(pattern);

      const receipt = await prisma.receipts.create({
        data: {
          receipt: input.receipt,
          type: match ? match[1] : null,
          userId: ctx.auth.userId,
        },
      });

      return receipt;
    }),

  removeReceipt: protectedProcedure
    .input(z.object({ receiptId: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.receipts.delete({ where: { id: input.receiptId } });
    }),

  updateReceipt: protectedProcedure
    .input(
      z.object({
        receiptId: z.string(),
        receiptTitle: z.string(),
        receiptDescription: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.receipts.update({
        where: { id: input.receiptId },
        data: { receipt: input.receiptDescription, title: input.receiptTitle },
      });
    }),

  generateReceiptImage: protectedProcedure
    .input(
      z.object({
        receiptId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const getReceiptInfo = await prisma.receipts.findFirst({
        where: { id: input.receiptId },
      });

      if (!getReceiptInfo) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Receipt with that ID not found",
        });
      }

      // Remove HTML tags
      const cleanString = getReceiptInfo.receipt
        .replace(/<.*?>/g, "")
        .replace(/\s+/g, " ")
        .trim();

      try {
        const response = await openaiApi.createImage({
          prompt:
            "Generate tasty and visually appealing meal ideas from a list of ingredients: " +
            cleanString.substring(0, 900),
          n: 4,
          size: "512x512",
        });

        const receiptsImagesData = response.data.data.map((choice) => ({
          receiptId: getReceiptInfo.id,
          imageUrl: choice.url!,
        }));

        try {
          await prisma.receiptsImages.createMany({
            data: receiptsImagesData,
            skipDuplicates: true,
          });
        } catch (e) {
          console.log(e);
        }

        return response.data;
      } catch (e) {
        console.error(e);
      }
    }),

  getReceiptImages: protectedProcedure
    .input(z.object({ receiptId: z.string() }))
    .query(async ({ input }) => {
      if (!input.receiptId) return;

      const images = await prisma.receiptsImages.findMany({
        where: { receiptId: input.receiptId },
      });

      if (!images) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Receipt images with that ID not found",
        });
      }

      return images;
    }),
});
