export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}
[];

export interface BlogCard {
  title: string;
  description: string;
  alt: string;
  coverImage: {
    url: string;
  };
  category: BlogCategory;
  slug: string;
  createdAt?: string;
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

}

export interface BlogData {
  title: string;
  description: string;
  mainBlog: BlogPost;
  featuredNews: BlogPost[];
}
