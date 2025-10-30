import Link from "next/link";
import { BlogCard } from "@/types";
import Image from "next/image";


export function BlogPostCard({ post }: { post: BlogCard }) {

  return (
    <Link
      href={`/blog/${post.category.slug}/${post.slug}`}
      className="group block"
    >
      <div className="overflow-hidden rounded-lg">
        <Image
          src={post.coverImage.url}
          alt={post.alt || post.title}
          width={400}
          height={192}
          className="h-48  w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-2">
        <p className="mb-2 text-body2 font-semibold uppercase text-primary">
          {post.category.name}
          <span className="ml-4 text-body2 font-normal text-colordescription">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              : ""}
          </span>
        </p>
        <h3 className="mb-2 text-sub1 text-black group-hover:text-primary line-clamp-2">
          {post.title}
        </h3>
        <p className="text-body2 line-clamp-2">{post.description}</p>
      </div>
    </Link>
  );
}