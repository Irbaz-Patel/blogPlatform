import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { db } from "@/server/db";
import { posts, postCategories } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const postsRouter = router({
  // ✅ CREATE
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        slug: z.string(),
        published: z.boolean(),
        categories: z.array(z.number()).default([]),
      })
    )
    .mutation(async ({ input }) => {
      const [post] = await db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          slug: input.slug,
          published: input.published,
        })
        .returning();

      // link categories
      if (input.categories.length > 0) {
        await db.insert(postCategories).values(
          input.categories.map((catId) => ({
            postId: post.id,
            categoryId: catId,
          }))
        );
      }

      return post;
    }),

  // ✅ READ (get all posts with categories)
  getAll: publicProcedure.query(async () => {
    const allPosts = await db.select().from(posts);
    const allRelations = await db.select().from(postCategories);

    const postsWithCats = allPosts.map((post) => ({
      ...post,
      categories: allRelations
        .filter((r) => r.postId === post.id)
        .map((r) => r.categoryId),
    }));

    return postsWithCats;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const [post] = await db
        .select()
        .from(posts)
        .where(eq(posts.id, input.id));
      return post;
    }),

  // ✅ UPDATE
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        slug: z.string(),
        published: z.boolean(),
        categories: z.array(z.number()).default([]),
      })
    )
    .mutation(async ({ input }) => {
      const { id, categories: catIds, ...data } = input;

      // update post
      await db
        .update(posts)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(posts.id, id));

      // update categories (delete + reinsert)
      await db.delete(postCategories).where(eq(postCategories.postId, id));
      if (catIds.length > 0) {
        await db.insert(postCategories).values(
          catIds.map((catId) => ({
            postId: id,
            categoryId: catId,
          }))
        );
      }

      return { success: true };
    }),

  // ✅ DELETE
  delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    await db.delete(postCategories).where(eq(postCategories.postId, input));
    await db.delete(posts).where(eq(posts.id, input));
    return { success: true };
  }),
});
