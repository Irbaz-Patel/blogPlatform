import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header
      id="header"
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto text-center relative z-10 pt-16">
        <div className="inline-block mb-4 sm:mb-6 px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 backdrop-blur-sm text-blue-700 dark:text-blue-300 rounded-full font-semibold text-xs sm:text-sm border border-blue-200 dark:border-blue-800">
          ✨ Modern Blog Management
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900 dark:text-white">
          Manage Your Blog
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            With Ease
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
          A powerful, intuitive dashboard for creating, editing, and publishing
          posts. Organize content with categories and manage everything in one
          place.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Link href={"/new-post"}>
            <button className="group cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base sm:text-lg font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/50 transition-all hover:shadow-xl hover:shadow-blue-300 dark:hover:shadow-blue-900/70 active:scale-95 flex items-center justify-center gap-2">
              Launch Dashboard
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <button className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 font-semibold text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-xl transition-all active:scale-95">
            Learn More
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
