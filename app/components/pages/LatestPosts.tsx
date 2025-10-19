"use client";

import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import DOMPurify from "dompurify";

export default function LatestPosts() {
  // ✅ Fetch posts using tRPC
  const { data: posts } = trpc.posts.getAll.useQuery();

  // Sort by createdAt and show only latest 3
  const latestPosts = (posts ?? [])
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  if (!latestPosts?.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No blog posts found.
      </div>
    );
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
    <section
      id="blogpost"
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
            Latest Blog Posts
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Discover insights and tips about blog management
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {latestPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-600 hover:-translate-y-1"
            >
              <div className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {post.title}
                </h3>

                {/* <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {post.excerpt || post.content.slice(0, 100) + "..."}
                </p> */}
                <p
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(post.content.substring(0, 150)),
                  }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <Link
                  href={`/post/${post.id}`}
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm group/btn"
                >
                  Read More
                  <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/post">
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all hover:scale-105">
              View All Blog Posts
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
