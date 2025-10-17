'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

interface BlogItem {
  id: number | string;
  title: string;
  image: string;
}

interface BlogCarouselSectionProps {
  blogs: BlogItem[];
  variant?: 'grid' | 'horizontal'; // Dạng hiển thị
  title?: string;
}

export default function BlogCarouselSection({
  blogs,
  variant = 'grid',
  title,
}: BlogCarouselSectionProps) {
  const router = useRouter();

  const handleNavigate = (id: number | string) => {
    router.push(`/blog/${id}`);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {title && (
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
          {title}
        </h2>
      )}

      {variant === 'grid' ? (
        /* --- Layout dạng 4 ô vuông --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.slice(0, 8).map((blog) => (
            <div
              key={blog.id}
              onClick={() => handleNavigate(blog.id)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNavigate(blog.id);
                }
              }}
            >
              <div className="relative w-full aspect-[4/3] rounded-t-xl overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title || 'Blog Image'}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-gray-800">
                  {blog.title}
                </h3>
                <button
                  className="text-blue-600 font-bold flex items-center justify-center gap-1 hover:gap-2 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(blog.id);
                  }}
                >
                  Đọc thêm <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* --- Layout nằm ngang --- */
        <div className="overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <div className="flex gap-6 min-w-max">
            {blogs.slice(0, 12).map((blog) => (
              <div
                key={blog.id}
                onClick={() => handleNavigate(blog.id)}
                className="min-w-[260px] sm:min-w-[300px] bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleNavigate(blog.id);
                  }
                }}
              >
                <div className="relative w-full aspect-[4/3] rounded-t-xl overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title || "Blog Image"}
                    fill
                    sizes="(max-width: 768px) 80vw, 20vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 text-gray-800">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500">Chuyên mục A</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
