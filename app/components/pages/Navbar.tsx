"use client";
import { trpc } from "@/utils/trpc";
import { BookOpen, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = ({ scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };
  const { data: posts = [] } = trpc.posts.getAll.useQuery();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BlogAdmin
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick("header")}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium transition text-sm"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("features")}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium transition text-sm"
            >
              Features
            </button>
            {posts.length > 0 && (
              <Link href={"post"}>
                <button
                  onClick={() => handleNavClick("blogposts")}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium transition text-sm"
                >
                  Blogs
                </button>
              </Link>
            )}
            <button
              onClick={() => handleNavClick("cta")}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium transition text-sm"
            >
              CTA
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-6 py-2.5 font-semibold cursor-pointer text-sm transition-all hover:shadow-lg hover:shadow-blue-200 active:scale-95">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4">
            <button
              onClick={() => handleNavClick("header")}
              className="block w-full text-left cursor-pointer px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("features")}
              className="block w-full text-left cursor-pointer px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition"
            >
              Features
            </button>
            {posts.length > 0 && (
              <Link href={"post"}>
                <button
                  onClick={() => handleNavClick("blogposts")}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer font-medium transition text-sm"
                >
                  Blogs
                </button>
              </Link>
            )}
            <button
              onClick={() => handleNavClick("cta")}
              className="block w-full text-left cursor-pointer px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition"
            >
              CTA
            </button>
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 cursor-pointer hover:from-blue-700 hover:to-blue-800 text-white rounded-lg px-4 py-2.5 font-semibold text-sm transition-all">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
