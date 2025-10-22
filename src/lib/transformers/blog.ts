import { createImageUrl } from "@/lib/utils/imageUtils";
import {
  BlogData,
  BlogPost,
  BlogResponse,
  BlogCategory,
  BlogCardData,
} from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function transformBlogForHomePage(response: any): BlogData {
  const { data } = response;
  return {
    title: data?.title || "Tin tức nổi bật",
    description:
      data?.description ||
      "Cập nhật xu hướng và kiến thức mới nhất về chuyển đổi số trong ngành dược.",
    mainBlog:
      data?.mainBlogPosts?.map((post: BlogPost) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        coverImage: {
          url: createImageUrl(post.coverImage.url),
          alt: post.title || "Blog Image",
        },
      })) || [],
    featuredNews:
      data?.featuredNews?.map((post: any) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        coverImage: {
          url: createImageUrl(post.coverImage.url),
          alt: post.title || "Blog Image",
        },
      })) || [],
  };
}

export function transformBlogListData(response: any): BlogCardData[] {
  const { data } = response;
  return (
    data?.map((item: any) => ({
      posts: {
        title: item?.title,
        description: item?.description,
        alt: item?.alt,
        coverImage: {
          url: createImageUrl(
            item?.coverImage?.url
          ),
        },
        category: {
          name:
            item?.blog_category?.name ||
            "Chưa có danh mục",
          slug:
            item?.blog_category?.slug ||
            "uncategorized",
        },
        slug: item?.slug,
        createdAt: item?.createdAt,
      },
    })) || []
  );
}

export function transformBlogCardData(response: any): BlogCardData {
  const post = response.data?.[0];
  return {
    posts: {
      title: post?.title,
      description: post?.description,
      alt: post?.alt,
      coverImage: {
        url: createImageUrl(post?.coverImage?.url),
      },
      category: {
        id: post?.blog_category?.id || 0,
        name: post?.blog_category?.name || "a",
        slug: post?.blog_category?.slug || "a",
      },
      slug: post?.slug,
      createdAt: post?.createdAt,
    },
  };
}
export function transformBlogPostData(response: any): BlogPost {
  const post = response.data?.[0];
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    alt: post.alt,
    coverImage: {
      url: createImageUrl(post.coverImage.url),
    },
    content: post.content,
    blog_category: {
      id: post.blog_category?.id || 0,
      name: post.blog_category?.name || "a",
      slug: post.blog_category?.slug || "a",
    },
    slug: post.slug,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    author: post.author,

  };
}
export function transformBlogCategories(response: any): BlogCategory[] {
  const { data } = response;
  return (
    data?.map((item: any) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
    })) || []
  );
}
