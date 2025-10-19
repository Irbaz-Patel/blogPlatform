"use client";

import { useState } from "react";
import {
  Save,
  Bold,
  Italic,
  List,
  Code,
  Link2,
  X,
  Heading,
} from "lucide-react";
import { Spinner } from "@/app/components/ui/spinner";
import DOMPurify from "dompurify";

interface PostFormProps {
  categories: any[];
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  formErrors: Record<string, string[]>;
  editingPost?: any;
}

export const PostForm = ({
  categories,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isSubmitting,
  formErrors,
  editingPost,
}: PostFormProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);

  const toggleCategory = (catId: number) => {
    setFormData({
      ...formData,
      categories: formData.categories.includes(catId)
        ? formData.categories.filter((c: number) => c !== catId)
        : [...formData.categories, catId],
    });
  };

  // Markdown helper insertion
  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.getElementById(
      "content-textarea"
    ) as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content || "";
    const selectedText = text.substring(start, end) || "text";

    const newText =
      text.substring(0, start) +
      before +
      selectedText +
      after +
      text.substring(end);
    setFormData({ ...formData, content: newText });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const markdownHelpers = [
    { icon: Bold, label: "Bold", before: "**", after: "**" },
    { icon: Italic, label: "Italic", before: "*", after: "*" },
    { icon: List, label: "List", before: "- ", after: "" },
    { icon: Heading, label: "Heading", before: "## ", after: "" },
    { icon: Link2, label: "Link", before: "[", after: "](url)" },
    { icon: Code, label: "Inline Code", before: "`", after: "`" },
  ];
  const parseMarkdown = (markdown: string) => {
    const html = markdown
      // Headings (###, ##, #)
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

      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Links
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" class="text-blue-500 underline" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      // Inline code
      .replace(
        /`(.*?)`/g,
        "<code class='bg-gray-100 dark:bg-gray-800 dark:text-red-400 px-1 py-0.5 rounded'>$1</code>"
      )
      // List items
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      // Line breaks
      .replace(/\n/g, "<br />");

    // Wrap <li> elements in <ul>
    return DOMPurify.sanitize(
      html.replace(/(<li>.*<\/li>)/gim, "<ul class='list-disc ml-5'>$1</ul>")
    );
  };

  return (
    <div className="p-6 space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Enter post title"
        />
        {formErrors?.title && (
          <p className="text-sm text-red-500 mt-1">{formErrors.title[0]}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Slug
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="post-url-slug"
        />
        {formErrors?.slug && (
          <p className="text-sm text-red-500 mt-1">{formErrors.slug[0]}</p>
        )}
      </div>

      {/* Content (Markdown) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content (Markdown)
          </label>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded transition"
          >
            {showPreview ? "Edit" : "Preview"}
          </button>
        </div>

        {!showPreview && (
          <>
            {/* Markdown Toolbar */}
            <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-t-lg">
              {markdownHelpers.map(({ icon: Icon, label, before, after }) => (
                <button
                  key={label}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => insertMarkdown(before, after)}
                  title={label}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>

            {/* Markdown Editor */}
            <textarea
              id="content-textarea"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              onFocus={() => setContentFocused(true)}
              onBlur={() => setContentFocused(false)}
              rows={8}
              className={`w-full border ${
                contentFocused
                  ? "border-blue-500 ring-2 ring-blue-500"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-b-lg px-4 py-2 focus:outline-none transition font-mono text-sm`}
              placeholder="Write your post content using Markdown..."
            />

            {/* Markdown Tips */}
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <p className="font-semibold text-blue-900 dark:text-blue-200">
                Markdown Tips:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Bold:</strong>{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    **text**
                  </code>
                </li>
                <li>
                  <strong>Italic:</strong>{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    *text*
                  </code>
                </li>
                <li>
                  <strong>Heading:</strong>{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    ## text
                  </code>
                </li>
                <li>
                  <strong>Link:</strong>{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    [text](url)
                  </code>
                </li>
                <li>
                  <strong>List:</strong>{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    Start line with -
                  </code>
                </li>
                <li>
                  <strong>Inline Code:</strong>
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    `your inline code here`
                  </code>
                </li>
              </ul>
            </div>
          </>
        )}

        {showPreview && (
          <div className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 min-h-56 bg-white dark:bg-gray-700 text-gray-900 dark:text-white prose prose-sm dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: parseMarkdown(formData.content || ""),
              }}
            />
          </div>
        )}

        {formErrors?.content && (
          <p className="text-sm text-red-500 mt-1">{formErrors.content[0]}</p>
        )}
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Categories
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                formData.categories.includes(cat.id)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {formErrors?.categories && (
          <p className="text-sm text-red-500 mt-1">
            {formErrors.categories[0]}
          </p>
        )}
      </div>

      {/* Publish */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) =>
            setFormData({ ...formData, published: e.target.checked })
          }
          className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
        <label
          htmlFor="published"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Publish immediately
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              {editingPost ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <Save size={18} />
              <span>{editingPost ? "Update Post" : "Create Post"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
