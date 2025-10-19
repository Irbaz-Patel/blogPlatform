"use client";
import Navbar from "./components/pages/Navbar";
import Header from "./components/pages/Header";
import Features from "./components/pages/Features";
import Footer from "./components/pages/Footer";
import LatestPosts from "./components/pages/LatestPosts";
import { trpc } from "@/utils/trpc";
import CTA from "./components/pages/Cta";
export default function HomePage() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  const { data: posts = [] } = trpc.posts.getAll.useQuery();

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      <Navbar scrollToSection={scrollToSection} />
      <Header />
      <Features />
      {/* <LatestPosts/> */}
      {posts.length > 0 && <LatestPosts />}
      <CTA />
      <Footer />
    </div>
  );
}
