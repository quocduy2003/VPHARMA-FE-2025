"use client";

import Link from "next/link";
import { BlogPost } from "@/types";
import Image from "next/image";

const styles = `
@keyframes scroll-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
.animate-scroll-up {
  animation: scroll-up 35s linear infinite;
}
`;

export function FeaturedNews({ posts }: { posts: BlogPost[] }) {
  // Nhân đôi danh sách để tạo hiệu ứng lướt vô hạn
  const duplicatedPosts = [...posts, ...posts];

  return (
    <div className="rounded-lg border border-blue-500 bg-blue-100 p-6 shadow-sm">
      <style>{styles}</style>
      <h3 className="mb-4 text-h6 font-bold text-gray-800">
        Tin tức nổi bật
      </h3>
      <div className="h-[640px] overflow-hidden">
        <div className="animate-scroll-up">
          {duplicatedPosts.map((post, index) => (
            <Link
              href={`/blog/${post.slug}/${post.slug}`}
              key={`${post.title}-${index}`}
              className="mb-3 mt-5 block border-b border-blue-500 pb-3 last:mb-0 last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <Image
                  src={post.coverImage.url}
                  alt={post.alt || "feature New"}
                  width={250}
                  height={68}
                  className="h-15 w-15 flex-shrink-0 rounded-md object-cover"
                />
                <p className="text-sub2 font-bold hover:text-primary line-clamp-2">
                  {post.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}