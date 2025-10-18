export interface BlogPost {
  id: number;
  title: string;
  description: string;
  coverImage: {
    id: number;
    name: string;
    alt: string;
    caption: string;
    url: string;
  }[];
  content: string;
  author: {
    id: number;
    name: string;
    avatar: {
      id: number;
      name: string;
      url: string;
    };
    email: string;
  };
  blog_category: {
    id: number;
    name: string;
    slug: string;
  };
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
