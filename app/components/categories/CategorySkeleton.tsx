import { Skeleton } from "@/app/components/ui/skeleton";

export const CategorySkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex justify-between items-start mb-3">
      <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700" />
      <div className="flex space-x-1">
        <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
    <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-700" />
    <Skeleton className="h-4 w-24 mb-4 bg-gray-200 dark:bg-gray-700" />
    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
      <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);
