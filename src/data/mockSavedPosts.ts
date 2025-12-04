// src/data/mockSavedPosts.ts
import { SavedItem } from "@/types"; 
import { mockAllPosts } from "./mockBlogData"; // Tận dụng data bài viết đã có

// 1. Tạo danh sách Folder mẫu
const folders: SavedItem[] = [
  {
    id: 'folder-1',
    type: 'folder',
    name: 'Tài liệu học tập',
    parentId: null,
    createdAt: new Date().toISOString(),
    savedAt: new Date().toISOString(),
  },
  {
    id: 'folder-2',
    type: 'folder',
    name: 'Tin tức hay',
    parentId: null,
    createdAt: new Date().toISOString(),
    savedAt: new Date().toISOString(),
  },
  {
    id: 'folder-sub-1',
    type: 'folder',
    name: 'ReactJS',
    parentId: 'folder-1', // Thư mục con của folder-1
    createdAt: new Date().toISOString(),
    savedAt: new Date().toISOString(),
  },
];

// 2. Tạo danh sách Bài viết đã lưu (Lấy từ mockAllPosts để dữ liệu đồng bộ)
const posts: SavedItem[] = mockAllPosts.slice(0, 5).map((post, index) => ({
    id: `saved-post-${index}`,
    type: 'post',
    name: post.title,
    parentId: null, // Mặc định lưu ở ngoài (Root)
    createdAt: post.createdAt,
    savedAt: new Date().toISOString(),
    data: post // Nhúng toàn bộ thông tin bài viết vào
}));

// 3. Xuất dữ liệu tổng hợp (Folders + Posts)
export const initialData: SavedItem[] = [...folders, ...posts];