"use client";

import PostView from "@/app/components/PostView";
import { useParams } from "next/navigation";

export default function PostPage() {
  const params = useParams();
  const postId = Number(params.id); // ✅ get the dynamic ID from the URL

  return <PostView selectedPostId={postId} setActiveView={() => {}} />;
}
