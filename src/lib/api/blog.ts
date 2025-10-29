import { fetchAPI } from "@/lib/dataService";
import { BlogData, BlogCardData, BlogPost } from "@/types";
import {
  transformBlogForHomePage,
  transformBlogCategories,
} from "@/lib/transformers/blog";
import { BlogResponse, BlogCategory } from "@/types";
import qs from "qs";

export async function getBlogsForHomePage(): Promise<BlogData> {
  const query = qs.stringify(
    {
      populate: {
        featuredNews: {
          populate: {
            coverImage: { populate: true },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetchAPI(`blog?${query}`);
  return transformBlogForHomePage(response);
}

async function getBlogCategories(): Promise<BlogCategory[]> {
  const query = qs.stringify(
    {
      populate: {},
    },
    { encodeValuesOnly: true }
  );

  const response = await fetchAPI(`blog-categories?${query}`);
  return transformBlogCategories(response);
}

export async function getBlogPosts(
  categorySlug?: string,
  page: number = 1,
  pageSize: number = 6
): Promise<BlogResponse> {
  const skipMainBlog = page === 1 ? 1 : 0; // Bỏ mainBlog chỉ ở page 1
  const start = (page - 1) * pageSize + skipMainBlog;

  const filters =
    categorySlug && categorySlug !== "home"
      ? {
          blog_category: {
            slug: { $eq: categorySlug },
          },
        }
      : undefined;

  const query = qs.stringify(
    {
      filters,
      populate: {
        coverImage: true,
        blog_category: true,
      },
      sort: ["createdAt:desc"],
      pagination: {
        start,
        limit: pageSize,
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetchAPI(`blog-posts?${query}`);
  return response;
}

export async function getBlogLastest(
  categorySlug?: string
): Promise<BlogCardData> {
  console.log("Fetching latest blog for category:", categorySlug);
  const filters =
    categorySlug && categorySlug !== "home"
      ? {
          blog_category: {
            slug: { $eq: categorySlug },
          },
        }
      : undefined;

  const query = qs.stringify(
    {
      filters,
      populate: {
        coverImage: true,
        blog_category: true,
      },
      sort: ["createdAt:desc"],
      pagination: {
        page: 1,
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetchAPI(`blog-posts?${query}`);
  return response as BlogCardData;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: {
        coverImage: true,
        blog_category: true,
      },
      pagination: {
        page: 1,
      },
    },
    { encodeValuesOnly: true }
  );
  const response = await fetchAPI(`blog-posts?${query}`);
  return response as BlogPost;
}

export const blogData = await getBlogsForHomePage();

export const blogCategories = await getBlogCategories();
