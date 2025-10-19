import { router } from "../trpc";
import { categoriesRouter } from "./categories";
import { postsRouter } from "./posts";

export const appRouter = router({
  posts: postsRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
