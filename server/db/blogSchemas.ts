import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters long.")
    .max(100, "Category name is too long."),
  description: z
    .string({
      required_error: "Description is required.",
    })
    .min(1, "Description is required.") // Show error if empty
    .max(500, "Description is too long."),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters.")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and dashes."
    ),
});

export const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  content: z.string().min(10, "Content must be at least 10 characters."),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters.")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and dashes."
    ),
  published: z.boolean(),
  categories: z
    .array(z.number())
    .min(1, "Please select at least one category."),
});

export type CategorySchema = z.infer<typeof categorySchema>;
export type PostSchema = z.infer<typeof postSchema>;
