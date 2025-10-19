"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";
import { PostList } from "@/app/components/post/PostList";
import { PostForm } from "@/app/components/post/PostForm";
import { CategoryForm } from "@/app/components/categories/CategoryForm";
import { CategoryList } from "@/app/components/categories/CategoryList";
import { Plus } from "lucide-react";
import { categorySchema, postSchema } from "@/server/db/blogSchemas";

export default function BlogAdminDashboard() {
  const [activeTab, setActiveTab] = useState("posts");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    slug: "",
    published: false,
    categories: [] as number[],
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
    slug: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [filterCategory, setFilterCategory] = useState("all");

  // Fetch posts & categories
  const {
    data: posts = [],
    isLoading: postsLoading,
    refetch: refetchPosts,
  } = trpc.posts.getAll.useQuery();
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    refetch: refetchCategories,
  } = trpc.categories.getAll.useQuery();

  // Posts mutations
  const createPost = trpc.posts.create.useMutation({
    onSuccess: () => {
      refetchPosts();
      toast.success("Post created successfully!");
    },
  });
  const updatePost = trpc.posts.update.useMutation({
    onSuccess: () => {
      refetchPosts();
      toast.success("Post updated successfully!");
    },
  });
  const deletePost = trpc.posts.delete.useMutation({
    onSuccess: () => {
      refetchPosts();
      toast.success("Post deleted successfully!");
    },
  });

  // Categories mutations
  const createCategory = trpc.categories.create.useMutation({
    onSuccess: () => {
      refetchCategories();
      toast.success("Category created successfully!");
    },
  });
  const updateCategory = trpc.categories.update.useMutation({
    onSuccess: () => {
      refetchCategories();
      toast.success("Category updated successfully!");
    },
  });
  const deleteCategory = trpc.categories.delete.useMutation({
    onSuccess: () => {
      refetchCategories();
      toast.success("Category deleted successfully!");
    },
  });

  // Handle Post submit
  const handlePostSubmit = async () => {
    // Validate form data first
    const validation = postSchema.safeParse(formData);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      setFormErrors(errors); // Show validation errors in UI
      return; // Stop submission if invalid
    }

    try {
      setIsSubmitting(true); // Start loading spinner

      if (editingPost) {
        await updatePost.mutateAsync({
          id: editingPost.id,
          ...validation.data, // use validated data
        });
        toast.success("Post updated successfully!");
      } else {
        await createPost.mutateAsync(validation.data); // use validated data
        toast.success("Post created successfully!");
      }

      // Reset form after success
      setShowPostModal(false);
      setEditingPost(null);
      setFormData({
        title: "",
        content: "",
        slug: "",
        published: false,
        categories: [],
      });
      setFormErrors({}); // Clear previous errors
    } catch (error: any) {
      // Optional: handle API errors
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false); // Stop spinner
    }
  };

  // Handle Category submit
  const [categoryErrors, setCategoryErrors] = useState<
    Record<string, string[]>
  >({});

  const handleCategorySubmit = async () => {
    // Validate category data first
    const validation = categorySchema.safeParse(categoryFormData);

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      setCategoryErrors(errors); // show validation errors in UI
      return;
    }

    try {
      setIsSubmitting(true);

      if (editingCategory) {
        await updateCategory.mutateAsync({
          id: editingCategory.id,
          ...validation.data,
        });
        toast.success("Category updated successfully!");
      } else {
        await createCategory.mutateAsync(validation.data);
        toast.success("Category created successfully!");
      }

      // Reset after success
      setShowCategoryModal(false);
      setEditingCategory(null);
      setCategoryFormData({ name: "", description: "", slug: "" });
      setCategoryErrors({}); // clear old errors
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts =
    filterCategory === "all"
      ? posts
      : posts.filter((p: any) =>
          p.categories?.includes(parseInt(filterCategory))
        );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors overflow-x-hidden">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Blog Admin Dashboard
          </h1>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex overflow-x-auto space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm transition-colors">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 min-w-[120px] py-2 px-4 rounded-md font-medium transition text-sm sm:text-base ${
              activeTab === "posts"
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
              activeTab === "categories"
                ? "bg-blue-500 text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Categories
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Blog Posts
                </h2>

                {/* Category filter */}
                {categoriesLoading ? (
                  <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
                ) : (
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full sm:w-auto border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <button
                onClick={() => setShowPostModal(true)}
                className="flex items-center justify-center sm:justify-start space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto transition"
              >
                <Plus size={20} />
                <span>New Post</span>
              </button>
            </div>

            <PostList
              posts={filteredPosts}
              categories={categories}
              loading={postsLoading}
              onEdit={(post) => {
                setEditingPost(post);
                setFormData(post);
                setShowPostModal(true);
              }}
              onDelete={(id) => deletePost.mutateAsync(id)}
            />
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Categories
              </h2>
              <button
                onClick={() => setShowCategoryModal(true)}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                <Plus size={20} />
                <span>New Category</span>
              </button>
            </div>

            <CategoryList
              categories={categories}
              posts={posts}
              loading={categoriesLoading}
              onEdit={(cat) => {
                setEditingCategory(cat);
                setCategoryFormData(cat);
                setShowCategoryModal(true);
              }}
              onDelete={(id) => deleteCategory.mutateAsync(id)}
            />
          </div>
        )}
      </main>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-colors">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors">
            <PostForm
              categories={categories}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handlePostSubmit}
              onCancel={() => {
                setShowPostModal(false);
                setFormData({
                  title: "",
                  content: "",
                  slug: "",
                  published: false,
                  categories: [],
                });
                setFormErrors({});
              }}
              isSubmitting={isSubmitting}
              formErrors={formErrors}
              editingPost={editingPost}
            />
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-colors">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full transition-colors">
            <CategoryForm
              categoryFormData={categoryFormData}
              setCategoryFormData={setCategoryFormData}
              onSubmit={handleCategorySubmit}
              onCancel={() => {
                setShowCategoryModal(false);
                setCategoryFormData({ name: "", description: "", slug: "" });
                setCategoryErrors({});
              }}
              isSubmitting={isSubmitting}
              categoryErrors={categoryErrors}
              editingCategory={editingCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
}
