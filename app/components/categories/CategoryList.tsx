"use client";

import { Edit2, Trash2 } from "lucide-react";
import DOMPurify from "dompurify";
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
import { CategorySkeleton } from "./CategorySkeleton";

interface CategoryListProps {
  categories: any[];
  posts: any[];
  loading: boolean;
  onEdit: (category: any) => void;
  onDelete: (id: number) => void;
}

// Simple markdown → HTML converter (same as in your form)
const parseMarkdown = (markdown: string) => {
  const html = markdown
    ?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    ?.replace(/\*(.*?)\*/g, "<em>$1</em>")
    ?.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    ?.replace(
      /`(.*?)`/g,
      "<code class='bg-gray-100 px-1 py-0.5 rounded'>$1</code>"
    )
    ?.replace(/^- (.*$)/gim, "<li>$1</li>")
    ?.replace(/\n/g, "<br />");

  // Wrap list items inside <ul>
  return DOMPurify.sanitize(
    html.replace(/(<li>.*<\/li>)/gim, "<ul class='list-disc ml-5'>$1</ul>")
  );
};

export const CategoryList = ({
  categories,
  posts,
  loading,
  onEdit,
  onDelete,
}: CategoryListProps) => {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CategorySkeleton />
        <CategorySkeleton />
        <CategorySkeleton />
      </div>
    );
  }

  if (categories.length === 0) {
    return <p className="text-gray-500 text-center">No categories found.</p>;
  }

  return (
    // <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    //   {categories.map((category) => (
    //     <div
    //       key={category.id}
    //       className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition"
    //     >
    //       {/* Header */}
    //       <div className="flex justify-between items-start mb-3">
    //         <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
    //         <div className="flex space-x-1">
    //           <button
    //             onClick={() => onEdit(category)}
    //             className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
    //           >
    //             <Edit2 size={16} />
    //           </button>
    //           <AlertDialog>
    //             <AlertDialogTrigger asChild>
    //               <button className="p-1.5 text-red-600 hover:bg-red-50 rounded transition">
    //                 <Trash2 size={16} />
    //               </button>
    //             </AlertDialogTrigger>
    //             <AlertDialogContent>
    //               <AlertDialogHeader>
    //                 <AlertDialogTitle>Delete Category?</AlertDialogTitle>
    //                 <AlertDialogDescription>
    //                   This action cannot be undone. This will permanently delete
    //                   this category and remove it from all posts.
    //                 </AlertDialogDescription>
    //               </AlertDialogHeader>
    //               <AlertDialogFooter>
    //                 <AlertDialogCancel>Cancel</AlertDialogCancel>
    //                 <AlertDialogAction
    //                   onClick={() => onDelete(category.id)}
    //                   className="bg-red-600 text-white hover:bg-red-700"
    //                 >
    //                   Delete
    //                 </AlertDialogAction>
    //               </AlertDialogFooter>
    //             </AlertDialogContent>
    //           </AlertDialog>
    //         </div>
    //       </div>

    //       {/* Description with Markdown rendering */}
    //       {category.description ? (
    //         <div
    //           className="text-gray-700 text-sm mb-2 prose prose-sm max-w-none"
    //           dangerouslySetInnerHTML={{
    //             __html: parseMarkdown(category.description),
    //           }}
    //         />
    //       ) : (
    //         <p className="text-gray-400 text-sm italic mb-2">
    //           No description provided.
    //         </p>
    //       )}

    //       <p className="text-xs text-gray-400">Slug: {category.slug}</p>

    //       <div className="mt-3 pt-3 border-t">
    //         <span className="text-sm text-gray-500">
    //           {posts.filter((p) => p.categories.includes(category.id)).length}{" "}
    //           posts
    //         </span>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-gray-900/50 transition"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {category.name}
            </h3>
            <div className="flex space-x-1">
              <button
                onClick={() => onEdit(category)}
                className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition"
              >
                <Edit2 size={16} />
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition">
                    <Trash2 size={16} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-gray-900 dark:text-white">
                      Delete Category?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                      This action cannot be undone. This will permanently delete
                      this category and remove it from all posts.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(category.id)}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Description with Markdown rendering */}
          {category.description ? (
            <div
              className="text-gray-700 dark:text-gray-300 text-sm mb-2 prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: parseMarkdown(category.description),
              }}
            />
          ) : (
            <p className="text-gray-400 dark:text-gray-500 text-sm italic mb-2">
              No description provided.
            </p>
          )}

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Slug: {category.slug}
          </p>

          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {posts.filter((p) => p.categories.includes(category.id)).length}{" "}
              posts
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
