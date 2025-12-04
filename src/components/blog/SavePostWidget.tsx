"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiBookmark, FiFolder, FiX, FiCheck, FiPlus, FiLoader } from "react-icons/fi";
import { BlogCard } from "@/types";
import { useSavedPost } from "@/context/SavedPostContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/CTAButton";
import { useSavePostStore } from "@/stores/useSavePost";

export function SavePostWidget({ post }: { post: BlogCard }) {
  const router = useRouter();
  const { user } = useAuthStore();
  
  const { savedItems, savePost, createFolder } = useSavedPost();
  const { folders } = useSavePostStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");


  // const folders = savedItems.filter((item) => item.type === "folder");
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    if (!user) {
      router.push("/signin");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(true);
    }, 600);
  };


  const handleSave = () => {
    savePost(post, selectedFolderId);
    setIsOpen(false);
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    createFolder(newFolderName, null);
    setNewFolderName("");
    setIsCreating(false);
  };


  return (
    <div className="mt-6 p-4 relative">
      <div className="flex items-center justify-center">
        <Button
          onClick={handleOpen}
          disabled={isSubmitting}
          variant="primary"
          size="ssm"
          className="relative flex items-center justify-center gap-2 rounded-md"
        >
          {isSubmitting && (
            <FiLoader className="animate-spin absolute" />
          )}

          <span className={isSubmitting ? "invisible" : ""}>
            Lưu bài viết
          </span>
        </Button>
      </div>

      {/* PORTAL MODAL */}
      {/* {mounted &&
        isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md max-h-[70vh] overflow-hidden rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">

              <div className="flex items-center justify-between border-b px-6 py-4">
                <h3 className="text-lg font-bold text-gray-800">Lưu vào bộ sưu tập</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <FiX size={20} />
                </button>
              </div>


              <div className="max-h-[50vh] overflow-y-auto px-2 py-2">
                <div className="space-y-1">

                  {!isCreating ? (
                    <button
                      onClick={() => setIsCreating(true)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-primary hover:bg-blue-50 rounded-lg transition-colors border border-dashed border-transparent hover:border-blue-200"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <FiPlus size={20} />
                      </div>
                      <span className="font-semibold">Tạo thư mục mới</span>
                    </button>
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-blue-100 mb-2">
                      <div className="text-xs font-semibold text-gray-500 mb-2 uppercase">
                        Nhập tên thư mục
                      </div>
                      <div className="flex gap-2">
                        <input
                          autoFocus
                          type="text"
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          placeholder="Ví dụ: Marketing Tips..."
                          className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
                        />
                        <button
                          onClick={handleCreateFolder}
                          className="px-3 py-2 bg-primary text-white text-sm rounded-md hover:bg-blue-700"
                        >
                          Tạo
                        </button>
                        <button
                          onClick={() => setIsCreating(false)}
                          className="px-3 py-2 bg-white border text-gray-600 text-sm rounded-md hover:bg-gray-100"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="h-px bg-gray-100 my-2 mx-4"></div>

                  <button
                    onClick={() => setSelectedFolderId(null)}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${selectedFolderId === null
                      ? "bg-blue-50 text-primary border border-blue-100"
                      : "hover:bg-gray-50 text-gray-700 border border-transparent"
                      }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${selectedFolderId === null
                        ? "bg-white text-primary shadow-sm"
                        : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      <FiBookmark size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Lưu trữ chung</div>
                      <div className="text-xs opacity-70">Không vào thư mục nào</div>
                    </div>
                    {selectedFolderId === null && <FiCheck className="text-primary" />}
                  </button>

                  {folders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedFolderId(folder.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${selectedFolderId === folder.id
                        ? "bg-blue-50 text-primary border border-blue-100"
                        : "hover:bg-gray-50 text-gray-700 border border-transparent"
                        }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${selectedFolderId === folder.id
                          ? "bg-white text-primary shadow-sm"
                          : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        <FiFolder size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium truncate">{folder.name}</div>
                        <div className="text-xs opacity-70">Thư mục</div>
                      </div>
                      {selectedFolderId === folder.id && <FiCheck className="text-primary" />}
                    </button>
                  ))}
                </div>
              </div>


              <div className="flex items-center justify-end gap-3 border-t bg-gray-50 px-6 py-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all"
                >
                  Lưu ngay
                </button>
              </div>
            </div>
          </div>,
          document.body
        )} */}
    </div>
  );
}
