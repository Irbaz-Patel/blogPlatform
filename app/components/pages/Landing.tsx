import {
  BookOpen,
  Edit3,
  Eye,
  Zap,
  Shield,
  Layout,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block mb-4 sm:mb-6 px-4 py-2 bg-blue-100/80 backdrop-blur-sm text-blue-700 rounded-full font-semibold text-xs sm:text-sm border border-blue-200">
            ✨ Modern Blog Management
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-gray-900">
            Manage Your Blog
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              With Ease
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            A powerful, intuitive dashboard for creating, editing, and
            publishing posts. Organize content with categories and manage
            everything in one place.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link href={"/new-post"}>
              <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base sm:text-lg font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:shadow-blue-300 active:scale-95 flex items-center justify-center gap-2">
                Launch Dashboard
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-xl transition-all active:scale-95">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
              Everything You Need
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
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
                className="group bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                  <Icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                  {title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto">
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
                <div className="text-sm sm:text-base text-blue-100">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                features: [
                  "Up to 5 posts",
                  "Basic categories",
                  "Email support",
                ],
              },
              {
                name: "Pro",
                price: "$9",
                features: [
                  "Unlimited posts",
                  "Advanced analytics",
                  "Priority support",
                  "Custom domains",
                ],
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Everything in Pro",
                  "Team collaboration",
                  "API access",
                  "Dedicated support",
                ],
              },
            ].map(({ name, price, features, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl p-6 sm:p-8 transition-all ${
                  highlight
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl scale-105"
                    : "bg-white border border-gray-200 hover:shadow-lg"
                }`}
              >
                <h3
                  className={`text-xl sm:text-2xl font-bold mb-2 ${
                    highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {name}
                </h3>
                <div
                  className={`text-3xl sm:text-4xl font-bold mb-1 ${
                    highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {price}
                  {price !== "Custom" && (
                    <span
                      className={`text-lg ${
                        highlight ? "text-blue-100" : "text-gray-600"
                      }`}
                    >
                      /mo
                    </span>
                  )}
                </div>
                <ul className="mt-6 space-y-3 sm:space-y-4">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full mt-6 sm:mt-8 py-3 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                    highlight
                      ? "bg-white text-blue-600 hover:bg-blue-50 active:scale-95"
                      : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 text-center">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
              Start managing your blog content like a pro today. No credit card
              required.
            </p>
            <div className="flex justify-center">
              <Link href={"/new-post"}>
                <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base sm:text-lg font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:shadow-blue-300 active:scale-95 flex items-center gap-2">
                  Open Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-900 text-gray-300 py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 mb-8 sm:mb-12">
            <div className="sm:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">
                  BlogAdmin
                </span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Modern blog management made simple and accessible for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">
                Product
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm sm:text-base">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 BlogAdmin. All rights reserved.</p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "GitHub"].map((item) => (
                <a key={item} href="#" className="hover:text-white transition">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
