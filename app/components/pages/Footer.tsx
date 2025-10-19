import { BookOpen, Facebook, Github, Linkedin, Twitter } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300 py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-6 mb-12 sm:mb-16">
          {/* Brand Section */}
          <div className="sm:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                BlogAdmin
              </span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
              The modern blog management platform designed for creators,
              writers, and content teams.
            </p>
            <div className="flex gap-4">
              {[
                { name: "Twitter", Icon: Twitter, url: "#" },
                { name: "LinkedIn", Icon: Linkedin, url: "#" },
                { name: "GitHub", Icon: Github, url: "#" },
                { name: "Facebook", Icon: Facebook, url: "#" },
              ].map(({ name, Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all hover:shadow-lg hover:shadow-blue-500/50 group"
                  title={name}
                >
                  <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm sm:text-base">
              Product
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm sm:text-base">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  API Docs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm sm:text-base">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 sm:pt-12">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-xs sm:text-sm text-gray-500">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p>© 2025 BlogAdmin. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
