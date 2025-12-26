import { CTASection } from "@/types/common";

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogCard {
  id: string;
  title: string;
  description: string;
  alt: string;
  coverImage: {
    url: string;
  };
  category: BlogCategory;
  slug: string;
  createdAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  alt: string;
  coverImage: {
    url: string;
  };
  content: string;
  author: {
    id: number;
    name: string;
    avatar: {
      alt: string;
      url: string;
    };
    email: string;
  };
  blog_category: BlogCategory;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface BlogCardData {
  posts: BlogCard;
  total?: number;
}

export interface BlogData {
  title: string;
  description: string;
  mainBlog: BlogPost;
  featuredNews: BlogPost[];
  ctaSection: CTASection;
}

// Type for Table of Contents item
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface SavedArticle {
  id: string;
  slug: string;
  folderId: string | null;
}

export interface FolderTree {
  id: string;
  name: string;
  parentId: string | null;
  articles: SavedArticle[];
  children: FolderTree[];
}

export interface SavedItem {
  id: string; // ID riêng của item (folder hoặc bài viết đã lưu)
  type: "folder" | "post";
  name: string; // Tên folder hoặc Tiêu đề bài viết
  parentId: string | null; // ID thư mục cha (null nếu ở thư mục gốc)
  createdAt: string;
  savedAt: string;
  data?: BlogCard; // Chứa dữ liệu bài viết nếu type là 'post'
}
