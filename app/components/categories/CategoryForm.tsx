"use client";

import { useState } from "react";
import { Save, Bold, Italic, List, Code, Link2, Heading } from "lucide-react";
import { Spinner } from "@/app/components/ui/spinner";
import DOMPurify from "dompurify";

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
}

interface CategoryFormProps {
  categoryFormData: CategoryFormData;
  setCategoryFormData: (data: CategoryFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  categoryErrors: Record<string, string[]>;
  editingCategory?: CategoryFormData;
}

export const CategoryForm = ({
  categoryFormData,
  setCategoryFormData,
  onSubmit,
  onCancel,
  isSubmitting,
  categoryErrors,
  editingCategory,
}: CategoryFormProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);

  // Insert markdown symbols around selected text
  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.getElementById(
      "description-textarea"
    ) as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = categoryFormData.description || "";
    const selectedText = text.substring(start, end) || "text";

    const newText =
      text.substring(0, start) +
      before +
      selectedText +
      after +
      text.substring(end);

    setCategoryFormData({ ...categoryFormData, description: newText });

    // Restore focus and selection
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
    { icon: Heading, label: "Heading", before: "## ", after: "" }, // <-- added Heading
    { icon: Link2, label: "Link", before: "[", after: "](url)" },
  ];

  const parseMarkdown = (markdown: string) => {
    const html = markdown
      // Headings
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
        '<a href="$2" class="text-blue-500 underline">$1</a>'
      )
      // Line breaks
      .replace(/\n/g, "<br />");

    return DOMPurify.sanitize(html);
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          value={categoryFormData.name}
          onChange={(e) =>
            setCategoryFormData({ ...categoryFormData, name: e.target.value })
          }
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Category name"
        />
        {categoryErrors?.name && (
          <p className="text-sm text-red-500 mt-1">{categoryErrors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Slug
        </label>
        <input
          type="text"
          value={categoryFormData.slug}
          onChange={(e) =>
            setCategoryFormData({ ...categoryFormData, slug: e.target.value })
          }
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="category-slug"
        />
        {categoryErrors?.slug && (
          <p className="text-sm text-red-500 mt-1">{categoryErrors.slug[0]}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description (Markdown)
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
              id="description-textarea"
              value={categoryFormData.description}
              onChange={(e) =>
                setCategoryFormData({
                  ...categoryFormData,
                  description: e.target.value,
                })
              }
              onFocus={() => setDescriptionFocused(true)}
              onBlur={() => setDescriptionFocused(false)}
              rows={6}
              className={`w-full border ${
                descriptionFocused
                  ? "border-blue-500 ring-2 ring-blue-500"
                  : "border-gray-300 dark:border-gray-600"
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-b-lg px-4 py-2 focus:outline-none transition font-mono text-sm`}
              placeholder="Enter description in Markdown format..."
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
                  <strong>Link:</strong>{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    [text](url)
                  </code>
                </li>
                <li>
                  <strong>Heading:</strong>{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    ##test
                  </code>
                </li>
                <li>
                  <strong>List:</strong> Start line with{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                    -
                  </code>
                </li>
              </ul>
            </div>
          </>
        )}

        {showPreview && (
          <div className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg px-4 py-2 min-h-48 prose prose-sm dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: parseMarkdown(categoryFormData.description),
              }}
            />
          </div>
        )}

        {categoryErrors?.description && (
          <p className="text-sm text-red-500 mt-1">
            {categoryErrors.description[0]}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              {editingCategory ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <Save size={18} />
              <span>
                {editingCategory ? "Update Category" : "Create Category"}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
