"use client";

import { Edit2, Trash2, Tag, Calendar, Eye, EyeOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/components/ui/alert-dialog";
import { PostSkeleton } from "./PostSkeleton";
import DOMPurify from "dompurify";

export const PostList = ({
  posts,
  categories,
  loading,
  onEdit,
  onDelete,
}: PostListProps) => {
  if (loading) {
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  }

  if (posts.length === 0) {
    return <p className="text-gray-500 text-center">No posts found.</p>;
  }

  const parseMarkdown = (markdown: string) => {
    const html = markdown
      .replace(
        /^### (.*$)/gim,
        "<h3 class='text-lg font-semibold mt-2 mb-1'>$1</h3>"
      )
      .replace(
        /^## (.*$)/gim,
        "<h2 class='text-xl font-bold mt-3 mb-2'>$1</h2>"
      )
      .replace(
        /^# (.*$)/gim,
        "<h1 class='text-2xl font-bold mt-4 mb-2'>$1</h1>"
      )
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      .replace(
        /`(.*?)`/g,
        "<code class='bg-gray-100 dark:bg-gray-800 dark:text-red-400 px-1 py-0.5 rounded'>$1</code>"
      )
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      .replace(/\n/g, "<br />");

    return DOMPurify.sanitize(
      html.replace(/(<li>.*<\/li>)/gim, "<ul class='list-disc ml-5'>$1</ul>")
    );
  };

  return (
    <div className="grid gap-4 sm:gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-md dark:hover:shadow-gray-900/50 transition"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
            {/* Left Section */}
            <div className="flex-1">
              {/* Title + Status */}
              <div className="flex flex-col xs:flex-row xs:items-center xs:space-x-3 mb-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white break-words">
                  {post.title}
                </h3>
                {post.published ? (
                  <span className="flex items-center space-x-1 text-green-600 dark:text-green-400 text-sm mt-1 xs:mt-0">
                    <Eye size={16} />
                    <span>Published</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm mt-1 xs:mt-0">
                    <EyeOff size={16} />
                    <span>Draft</span>
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-3 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(post.content.substring(0, 150)),
                }}
              />

              {/* Dates */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-0">
                <span className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>
                    Created:{" "}
                    {new Date(post.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </span>
                <span>
                  Updated:{" "}
                  {new Date(post.updatedAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Tag size={14} className="text-gray-400 dark:text-gray-500" />
                {post.categories?.map((catId) => {
                  const cat = categories.find((c) => c.id === catId);
                  return cat ? (
                    <span
                      key={catId}
                      className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded"
                    >
                      {cat.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>

            {/* Right Section (Buttons) */}
            <div className="flex items-center justify-end space-x-2 sm:ml-4">
              <button
                onClick={() => onEdit(post)}
                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition"
              >
                <Edit2 size={18} />
              </button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition">
                    <Trash2 size={18} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-gray-900 dark:text-white">
                      Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                      This action cannot be undone. This will permanently delete
                      this blog post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(post.id)}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
