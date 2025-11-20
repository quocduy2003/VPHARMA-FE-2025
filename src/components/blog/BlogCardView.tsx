import Link from "next/link";
import Image from "next/image";
import { BlogCard } from "@/types";

export function BlogPostLine({ post }: { post: BlogCard }) {
  return (
    <Link
      href={`/blog/${post.category.slug}/${post.slug}`}
      className="group flex gap-4 items-start p-2 rounded-lg hover:bg-gray-50 transition"
    >
      {/* Ảnh nhỏ nằm bên trái */}
      <div className="w-32 h-20 rounded overflow-hidden flex-shrink-0">
        <Image
          src={post.coverImage.url}
          alt={post.alt || post.title}
          width={160}
          height={100}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Nội dung bên phải */}
      <div className="flex flex-col flex-1">
        <p className="mb-1 text-body2 font-semibold capitalize text-primary">
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

        <h3 className="text-sub1 text-black group-hover:text-primary line-clamp-1">
          {post.title}
        </h3>

        <p className="text-body2 text-colordescription line-clamp-1">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
