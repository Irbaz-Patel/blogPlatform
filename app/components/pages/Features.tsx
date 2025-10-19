import { BookOpen, Edit3, Eye, Layout, Shield, Zap } from "lucide-react";
import React from "react";

function Features() {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-white dark:bg-gray-900 transition-colors"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
            Everything You Need
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built with modern tools and best practices to make blog management
            effortless and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Edit3,
              title: "Easy Editor",
              text: "Intuitive interface for creating and editing posts with real-time preview.",
            },
            {
              icon: Layout,
              title: "Categories",
              text: "Organize your content with custom categories for better navigation.",
            },
            {
              icon: Eye,
              title: "Draft & Publish",
              text: "Work on drafts privately and publish when ready with one click.",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              text: "Built with React for blazing fast performance and smooth interactions.",
            },
            {
              icon: Shield,
              title: "Secure",
              text: "Your content is safe with modern security practices and data protection.",
            },
            {
              icon: BookOpen,
              title: "SEO Ready",
              text: "Optimized for search engines with clean URLs and metadata support.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-600 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 sm:mt-20 md:mt-28 py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl sm:rounded-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { stat: "10K+", label: "Active Users" },
              { stat: "500K+", label: "Posts Created" },
              { stat: "99.9%", label: "Uptime" },
              { stat: "24/7", label: "Support" },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat}
                </div>
                <div className="text-sm sm:text-base text-blue-100 dark:text-blue-200">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
