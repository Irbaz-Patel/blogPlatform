"use client";

import { trpc } from "@/utils/trpc";
import { ArrowLeft, Eye, EyeOff, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/app/components/ui/skeleton";
import DOMPurify from "dompurify";

export default function PostView({
  selectedPostId,
  setActiveView,
}: {
  selectedPostId: number;
  setActiveView: (view: string) => void;
}) {
  // 🟢 Fetch single post
  const { data: post, isLoading } = trpc.posts.getById.useQuery({
    id: selectedPostId,
  });
  const { data: categories = [] } = trpc.categories.getAll.useQuery();

  const categoryList = [...categories.map((c) => c.name)];

  // 🧩 Function to parse Markdown to HTML
  const parseMarkdown = (markdown: string) => {
    let html = markdown || "";

    // Headings
    html = html.replace(
      /^### (.*$)/gim,
      "<h3 class='text-lg font-semibold mt-2 mb-1 text-gray-900 dark:text-white'>$1</h3>"
    );
    html = html.replace(
      /^## (.*$)/gim,
      "<h2 class='text-xl font-bold mt-3 mb-2 text-gray-900 dark:text-white'>$1</h2>"
    );
    html = html.replace(
      /^# (.*$)/gim,
      "<h1 class='text-2xl font-bold mt-4 mb-2 text-gray-900 dark:text-white'>$1</h1>"
    );

    // Bold
    html = html.replace(
      /\*\*(.*?)\*\*/g,
      "<strong class='font-bold text-gray-900 dark:text-white'>$1</strong>"
    );

    // Italic
    html = html.replace(
      /\*(.*?)\*/g,
      "<em class='italic text-gray-800 dark:text-gray-200'>$1</em>"
    );

    // Links
    html = html.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-blue-500 dark:text-blue-400 underline hover:text-blue-600 dark:hover:text-blue-300 transition" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Inline code
    html = html.replace(
      /`(.*?)`/g,
      "<code class='bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-2 py-1 rounded text-sm font-mono border border-gray-300 dark:border-gray-600'>$1</code>"
    );

    // List items
    html = html.replace(
      /^- (.*$)/gim,
      "<li class='text-gray-700 dark:text-gray-300'>$1</li>"
    );

    // Line breaks
    html = html.replace(/\n/g, "<br />");

    // Wrap <li> elements in <ul>
    html = html.replace(
      /(<li class='text-gray-700 dark:text-gray-300'>.*<\/li>)/gim,
      "<ul class='list-disc ml-5 text-gray-700 dark:text-gray-300'>$1</ul>"
    );

    return DOMPurify.sanitize(html);
  };

  const PreviewSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700 p-6 max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <Skeleton className="h-6 w-48 bg-slate-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-20 bg-slate-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-4 w-full mb-2 bg-slate-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-3/4 mb-4 bg-slate-200 dark:bg-gray-700" />
          <div className="flex items-center space-x-4 mb-3">
            <Skeleton className="h-4 w-32 bg-slate-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-32 bg-slate-200 dark:bg-gray-700" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-20 bg-slate-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-20 bg-slate-200 dark:bg-gray-700" />
            <Skeleton className="h-6 w-20 bg-slate-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) return <PreviewSkeleton />;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
        <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
          Post Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          It might have been deleted or moved.
        </p>
        <Link
          href={"/post"}
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="mb-6">
            {/* Status Badge */}
            <div className="flex items-center space-x-3 mb-4">
              {post.published ? (
                <span className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  <Eye size={16} />
                  <span>Published</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                  <EyeOff size={16} />
                  <span>Draft</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Dates */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <span className="flex items-center space-x-1">
                <Calendar size={16} className="flex-shrink-0" />
                <span>
                  Created:{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar size={16} className="flex-shrink-0" />
                <span>
                  Updated:{" "}
                  {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </span>
            </div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex items-center space-x-3 flex-wrap mb-6">
                <Tag
                  size={16}
                  className="text-gray-400 dark:text-gray-500 flex-shrink-0"
                />
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Slug */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-1 sm:space-y-0">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-0 font-medium">
                Slug:
              </p>
              <code className="inline-block bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 px-3 py-2 rounded border border-gray-200 dark:border-gray-600 font-mono text-sm overflow-x-auto">
                {post.slug}
              </code>
            </div>
          </div>

          {/* Body Content */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: parseMarkdown(post.content || ""),
              }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
