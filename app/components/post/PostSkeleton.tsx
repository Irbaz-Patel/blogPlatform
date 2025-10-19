import { Skeleton } from "@/app/components/ui/skeleton";

export const PostSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-7">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <Skeleton className="h-6 w-48 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-3/4 mb-4 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center space-x-4 mb-3">
          <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div className="flex space-x-2 ml-4">
        <Skeleton className="h-10 w-10 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 w-10 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  </div>
);
