import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { categories } from "@/server/db/schema";

export const categoriesRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(categories);
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        slug: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const [newCat] = await db.insert(categories).values(input).returning();
      return newCat;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string().optional(),
        slug: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await db
        .update(categories)
        .set({
          name: input.name,
          description: input.description,
          slug: input.slug,
        })
        .where(eq(categories.id, input.id));
      return { success: true };
    }),

  delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    await db.delete(categories).where(eq(categories.id, input));
    return { success: true };
  }),
});
