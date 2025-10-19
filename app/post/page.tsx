"use client";

import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { Calendar, Search, Tag } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useState, useMemo } from "react";

export default function AllPostsPage() {
  // ✅ Fetch all posts
  const { data: posts = [], isLoading } = trpc.posts.getAll.useQuery();
  const { data: categories = [] } = trpc.categories.getAll.useQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All"
  );

  const categoryList = ["All", ...categories.map((c) => c.name)];

  // ✅ Filter logic (search + category)
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => post.published) // ✅ only show published
      .filter((post) => {
        const matchesCategory =
          selectedCategory === "All" || !selectedCategory
            ? true
            : post.categories?.some((catId: number) => {
                const cat = categories.find((c) => c.id === catId);
                return cat?.name === selectedCategory;
              });

        const matchesSearch =
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      });
  }, [posts, searchQuery, selectedCategory, categories]);

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-slate-200 dark:border-gray-700 p-6 space-y-4">
      <Skeleton className="h-6 w-3/4 bg-slate-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-full bg-slate-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-2/3 bg-slate-200 dark:bg-gray-700" />
      <Skeleton className="h-4 w-40 bg-slate-200 dark:bg-gray-700" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              All Blog Posts
            </h1>
            <p className="text-slate-600 dark:text-gray-400 mt-1">
              Browse all posts from our community
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search + Filter */}
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white dark:bg-gray-800 border-slate-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-slate-400 dark:focus:border-gray-600 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-slate-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
              Filter by category:
            </span>
            {categoryList.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category ? null : category
                  )
                }
                className={
                  selectedCategory === category
                    ? "bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                    : "hover:bg-slate-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300 border-slate-200 dark:border-gray-700"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-gray-400 text-lg">
              No posts found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-gray-700 dark:bg-gray-800 hover:border-slate-300 dark:hover:border-gray-600 group overflow-hidden cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-slate-600 dark:text-gray-400">
                      {post.excerpt || post.content.slice(0, 100) + "..."}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between text-sm text-slate-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
