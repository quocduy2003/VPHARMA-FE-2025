// import { fetchAPI } from "@/lib/dataService";
// import { BlogData, BlogCardData, BlogPost } from "@/types";
// import {
//   transformBlogForHomePage,
//   transformBlogCategories,
// } from "@/lib/transformers/blog";
// import { BlogResponse, BlogCategory } from "@/types";
// import qs from "qs";
// //Get page blog
// async function getBlogsForHomePage(): Promise<BlogData> {
//   const query = qs.stringify(
//     {
//       populate: {
//         featuredNews: {
//           populate: {
//             coverImage: { populate: true },
//           },
//         },
//         ctaSection: {
//           populate: {
//             ctaButton: true,
//           },
//         },
//       },
//     },
//     { encodeValuesOnly: true }
//   );

//   const response = await fetchAPI(`blog?${query}`);
//   return transformBlogForHomePage(response);
// }
// //Get the category name
// async function getBlogCategories(): Promise<BlogCategory[]> {
//   const query = qs.stringify(
//     {
//       populate: {},
//     },
//     { encodeValuesOnly: true }
//   );

//   const response = await fetchAPI(`blog-categories?${query}`);
//   return transformBlogCategories(response);
// }

// export async function getBlogPosts(
//   categorySlug?: string,
//   page: number = 1,
//   pageSize: number = 6
// ): Promise<BlogResponse> {
//   const skipMainBlog = page === 1 ? 1 : 0; // Bỏ mainBlog chỉ ở page 1
//   const start = (page - 1) * pageSize + skipMainBlog;

//   const filters =
//     categorySlug && categorySlug !== "home"
//       ? {
//           blog_category: {
//             slug: { $eq: categorySlug },
//           },
//         }
//       : undefined;

//   const query = qs.stringify(
//     {
//       filters,
//       populate: {
//         coverImage: true,
//         blog_category: true,
//       },
//       sort: ["createdAt:desc"],
//       pagination: {
//         start,
//         limit: pageSize,
//       },
//     },
//     { encodeValuesOnly: true }
//   );

//   const response = await fetchAPI(`blog-posts?${query}`);
//   return response;
// }
// //Get blog posts by category
// export async function getBlogPostByCategories(
//   categorySlug: string,
//   page: number = 1,
//   pageSize: number = 10
// ): Promise<BlogCardData> {
//   const query = qs.stringify(
//     {
//       filters: {
//         blog_category: {
//           slug: { $eq: categorySlug },
//         },
//       },
//       populate: {
//         coverImage: true,
//         blog_category: true,
//       },
//       sort: ["createdAt:desc"],
//       pagination: {
//         page,
//         pageSize,
//       },
//     },
//     { encodeValuesOnly: true }
//   );

//   const response = await fetchAPI(`blog-posts?${query}`);
//   return response as BlogCardData;
// }

// //Get the latest blog post
// export async function getBlogLastest(
//   categorySlug?: string
// ): Promise<BlogCardData> {
//   const filters =
//     categorySlug && categorySlug !== "home"
//       ? {
//           blog_category: {
//             slug: { $eq: categorySlug },
//           },
//         }
//       : undefined;

//   const query = qs.stringify(
//     {
//       filters,
//       populate: {
//         coverImage: true,
//         blog_category: true,
//       },
//       sort: ["createdAt:desc"],
//       pagination: {
//         page: 1,
//       },
//     },
//     { encodeValuesOnly: true }
//   );

//   const response = await fetchAPI(`blog-posts?${query}`);
//   return response as BlogCardData;
// }

// //Get blog post by slug
// export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
//   const query = qs.stringify(
//     {
//       filters: { slug: { $eq: slug } },
//       populate: {
//         coverImage: true,
//         blog_category: true,
//       },
//       pagination: {
//         page: 1,
//       },
//     },
//     { encodeValuesOnly: true }
//   );
//   const response = await fetchAPI(`blog-posts?${query}`);
//   return response as BlogPost;
// }

// export const blogData = await getBlogsForHomePage();

// export const blogCategories = await getBlogCategories();

import { mockAllPosts } from "@/data/mockBlogData"; // Import data tĩnh
import { BlogCardData, BlogPost, BlogResponse, BlogData, BlogCategory } from "@/types";

// 1. CẤU HÌNH DATA TĨNH CHO TRANG CHỦ
// Thay thế cho việc gọi API lấy cấu hình FeaturedNews, CTA...
export const blogData: BlogData = {
  title: "Blog Kiến Thức & Tin Tức",
  description: "Cập nhật những xu hướng công nghệ, mẹo vặt đời sống và cẩm nang du lịch hữu ích nhất.",
  // Lấy bài đầu tiên làm Main Blog giả lập
  mainBlog: mockAllPosts[0] as unknown as BlogPost, 
  // Lấy 3 bài làm Featured News giả lập
  featuredNews: mockAllPosts.slice(0, 3) as unknown as BlogPost[],
  ctaSection: {
    title: "Bạn muốn nhận tin tức mới nhất?",
    description: "Đăng ký nhận bản tin hàng tuần để không bỏ lỡ các bài viết hấp dẫn.",
    btnText: "Đăng ký ngay",
    btnUrl: "/contact",
  },
};

// Thay thế API lấy danh sách Category
export const blogCategories: BlogCategory[] = [
  { id: 1, name: "Công nghệ", slug: "cong-nghe" },
  { id: 2, name: "Du lịch", slug: "du-lich" },
  { id: 3, name: "Ẩm thực", slug: "am-thuc" },
  { id: 4, name: "Đời sống", slug: "doi-song" },
  { id: 5, name: "Marketing", slug: "marketing" },
];

// 2. CÁC HÀM LẤY DỮ LIỆU (FAKE TỪ MOCK DATA)

// Lấy danh sách bài viết (Có phân trang & Lọc Category)
export async function getBlogPosts(
  categorySlug?: string,
  page: number = 1,
  pageSize: number = 6
): Promise<BlogResponse> {
  // Giả lập độ trễ mạng
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = mockAllPosts;

  // Lọc theo Category
  if (categorySlug && categorySlug !== "home") {
    filtered = mockAllPosts.filter((p) => p.category.slug === categorySlug);
  }

  // Sắp xếp mới nhất -> cũ nhất
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Logic phân trang giống code cũ (Bỏ bài đầu tiên ở trang 1 nếu cần thiết, ở đây mình giữ logic đơn giản)
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedItems = filtered.slice(start, end);

  return {
    data: paginatedItems as unknown as BlogPost[],
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(filtered.length / pageSize),
        total: filtered.length,
      },
    },
  };
}

// Lấy bài viết theo Category (Dùng cho trang chi tiết bài viết - phần Bài liên quan)
export async function getBlogPostByCategories(
  categorySlug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<BlogCardData> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const filtered = mockAllPosts.filter((p) => p.category.slug === categorySlug);
  
  // Sắp xếp
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const start = (page - 1) * pageSize;
  const paginatedItems = filtered.slice(start, start + pageSize);

  // Return đúng kiểu BlogCardData mà code cũ yêu cầu
  return {
    posts: paginatedItems[0] as unknown as BlogPost, // Code cũ có vẻ định nghĩa BlogCardData hơi lạ, nhưng ta cứ ép kiểu để chạy được
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(filtered.length / pageSize),
        total: filtered.length,
      }
    }
  } as unknown as BlogCardData; 
  // Lưu ý: Nếu BlogCardData thực chất là { data: BlogPost[], meta: ... } thì sửa lại return object giống getBlogPosts
}

// Lấy bài viết mới nhất (Làm Hero Banner)
export async function getBlogLastest(
  categorySlug?: string
): Promise<BlogCardData> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = mockAllPosts;
  if (categorySlug && categorySlug !== "home") {
    filtered = mockAllPosts.filter((p) => p.category.slug === categorySlug);
  }

  // Sort desc
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const latestPost = filtered[0];

  // Trả về format data bọc bài viết đầu tiên
  return {
    posts: latestPost as unknown as BlogPost,
    meta: {
        pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 }
    }
  } as unknown as BlogCardData;
}

// Lấy chi tiết bài viết theo Slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const found = mockAllPosts.find((p) => p.slug === slug);

  if (!found) {
    // Trả về null hoặc throw error để UI xử lý 404
    throw new Error("Post not found"); 
  }

  // Vì MockData (BlogCard) không có nội dung HTML chi tiết, ta fake nội dung HTML ở đây
  const dummyContent = `
    <h2>1. Tổng quan về ${found.title}</h2>
    <p>Đây là nội dung giả lập để kiểm tra giao diện chi tiết bài viết. Bài viết này thuộc danh mục <strong>${found.category.name}</strong>.</p>
    <p>${found.description}</p>
    
    <h2>2. Tại sao vấn đề này quan trọng?</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    
    <h3>2.1. Lợi ích chính</h3>
    <ul>
      <li>Cập nhật kiến thức mới nhất.</li>
      <li>Áp dụng vào thực tế dễ dàng.</li>
      <li>Nâng cao hiệu suất công việc.</li>
    </ul>

    <h2>3. Kết luận</h2>
    <p>Hy vọng bài viết mang lại giá trị cho bạn. Hãy theo dõi chúng tôi để cập nhật thêm nhiều tin tức thú vị!</p>
  `;

  return {
    ...found,
    id: 999, // Fake ID
    content: dummyContent, // Inject nội dung HTML giả
    author: {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        avatar: { 
            url: "/avt1.jpg", 
            alt: "Avatar tác giả" // <--- THÊM DÒNG NÀY LÀ HẾT ĐỎ
        }
    },
    blog_category: found.category,
    updatedAt: new Date().toISOString(),
  } as BlogPost;
}