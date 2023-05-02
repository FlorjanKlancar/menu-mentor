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
  saveReceipt: protectedProcedure
    .input(z.object({ receipt: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const receipt = await prisma.receipts.create({
        data: {
          receipt: input.receipt,
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
});
