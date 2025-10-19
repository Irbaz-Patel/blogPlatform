import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function CTA() {
  return (
    <section
      id="cta"
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors"
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl transition-colors">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white text-center">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
            Start managing your blog content like a pro today. No credit card
            required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href={"/new-post"}>
              <button className="group cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base sm:text-lg font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/50 transition-all hover:shadow-xl hover:shadow-blue-300 dark:hover:shadow-blue-900/70 active:scale-95 flex items-center justify-center gap-2">
                Open Dashboard
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 font-semibold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
