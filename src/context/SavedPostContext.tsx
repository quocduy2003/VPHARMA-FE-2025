"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { SavedItem, BlogCard } from "@/types";
import { initialData } from "@/data/mockSavedPosts"; // Import dữ liệu mẫu ban đầu

interface SavedPostContextType {
  savedItems: SavedItem[];
  savePost: (post: BlogCard, folderId: string | null) => void;
  createFolder: (name: string, parentId: string | null) => void;
  deleteItems: (ids: Set<string>) => void; // Thêm hàm xóa để đồng bộ trang quản lý
  moveItems: (ids: Set<string>, targetFolderId: string | null) => void; // Thêm hàm di chuyển
}

const SavedPostContext = createContext<SavedPostContextType | undefined>(undefined);

export function SavedPostProvider({ children }: { children: React.ReactNode }) {
  // Khởi tạo state bằng dữ liệu mẫu
  const [savedItems, setSavedItems] = useState<SavedItem[]>(initialData);

  // Hàm lưu bài viết
  const savePost = (post: BlogCard, folderId: string | null) => {
    // Check trùng: Cùng 1 bài (slug) trong cùng 1 folder
    const isExist = savedItems.some(
      (item) => 
        item.type === "post" && 
        item.data?.slug === post.slug && 
        item.parentId === folderId
    );
    
    if (isExist) {
      alert("Bài viết này đã có trong thư mục!");
      return;
    }

    const newItem: SavedItem = {
      id: `saved-${Date.now()}`,
      type: "post",
      name: post.title,
      parentId: folderId,
      createdAt: post.createdAt,
      savedAt: new Date().toISOString(),
      data: post,
    };

    setSavedItems((prev) => [newItem, ...prev]);
    alert("Đã lưu thành công!");
  };

  // Hàm tạo folder
  const createFolder = (name: string, parentId: string | null) => {
    const newFolder: SavedItem = {
      id: `folder-${Date.now()}`,
      type: "folder",
      name,
      parentId,
      createdAt: new Date().toISOString(),
      savedAt: new Date().toISOString(),
    };
    setSavedItems((prev) => [newFolder, ...prev]);
  };

  // Hàm xóa (dùng cho trang quản lý)
  const deleteItems = (ids: Set<string>) => {
    setSavedItems(prev => prev.filter(i => !ids.has(i.id)));
  };

  // Hàm di chuyển (dùng cho trang quản lý)
  const moveItems = (ids: Set<string>, targetFolderId: string | null) => {
     setSavedItems(prev => prev.map(item => {
        if(ids.has(item.id)) {
            return { ...item, parentId: targetFolderId };
        }
        return item;
     }));
  };

  return (
    <SavedPostContext.Provider value={{ savedItems, savePost, createFolder, deleteItems, moveItems }}>
      {children}
    </SavedPostContext.Provider>
  );
}

export const useSavedPost = () => {
  const context = useContext(SavedPostContext);
  if (!context) throw new Error("useSavedPost must be used within a SavedPostProvider");
  return context;
};