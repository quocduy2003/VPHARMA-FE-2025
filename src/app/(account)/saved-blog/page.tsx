"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateFolderModal from "@/components/account/CreateFolderModal";
import Pagination from "@/components/blog/BlogPagination";
import MoveFolderModal from "@/components/account/MoveFolderModal";
import RenameFolderModal from "@/components/account/RenameFolderModal";
import {
  Search, CheckSquare, Square,
  Plus, Trash2, Move, Filter,
  ArrowLeft, X, ArrowDownAZ, ArrowUpAZ,
  Clock, Calendar, Check,
} from "lucide-react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";


// Components & Utils

import { BlogPostCard } from "@/components/blog/BlogTableView";
import CTASection from "@/components/CTA";

import { BlogCard } from "@/types";
import { transformBlogListData } from "@/lib/transformers/blog";
import { useFolderStore } from "@/stores/useFolderStore";
import { useFolderArticleStore } from "@/stores/useFolderArticleStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { FolderChildren, Folder } from "@/types/stores/savePost";
import { SkeletonLoader } from "@/components/animations/BlogSkeleton";
import FolderGrid from "@/components/account/FolderGrid";
import DeleteConfirmModal from "@/components/account/DeleteFolderModal";
import { toast } from "sonner";
type SortOption = "LATEST_SAVED" | "LATEST_PUBLISH" | "TITLE_ASC" | "TITLE_DESC";

interface BreadcrumbItem {
  id: string;
  name: string;
}

export default function SavedBlogPage() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Stores
  const { accessToken } = useAuthStore();
  const { folders, fetchFolderById, fetchAllFolders, createFolder, deleteFolders, moveFolders, renameFolder } = useFolderStore();
  const { fetchFolderArticles, deleteArticles, moveArticles } = useFolderArticleStore();
  const [folderChildren, setFolderChildren] = useState<FolderChildren[] | null>(null);
  const [displayChildren, setDisplayChildren] = useState<FolderChildren[] | null>(null);
  const [postsInFolder, setPostsInFolder] = useState<BlogCard[]>([]);
  const [allFolders, setAllFolders] = useState<Folder[]>([]);


  // UI State
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(
    folders?.find(f => f.parentId === null)?.id || null
  );
  const [selectedFolderIds, setSelectedFolderIds] = useState<Set<string>>(new Set());
  const [selectedPostIds, setSelectedPostIds] = useState<Set<string>>(new Set());

  const [isLoading, setIsLoading] = useState(false);
  const [breadcrumbPath, setBreadcrumbPath] = useState<BreadcrumbItem[]>([]);
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  //Sate phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  //Open popup create folder
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  //Delete confirm modal
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Move folder modal
  const [isMoveFolderOpen, setIsMoveFolderOpen] = useState(false);
  const [defaultTargetFolderId, setDefaultTargetFolderId] = useState<string | null>(null);

  // Rename folder modal
  const [renamingFolder, setRenamingFolder] = useState<FolderChildren | null>(null);
  const [isRenameFolderOpen, setIsRenameFolderOpen] = useState(false);



  // Sort State
  const [sortBy, setSortBy] = useState<SortOption>("LATEST_SAVED");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);


  // Fetch folder children khi currentFolderId thay đổi
  useEffect(() => {
    const loadFolders = async () => {
      try {
        setIsLoading(true);
        setFolderChildren(null);
        if (!currentFolderId) return;
        const children = await fetchFolderById(currentFolderId);
        setFolderChildren(children);
        setSelectedFolderIds(new Set());
        setSelectedPostIds(new Set());
        console.log("Fetched children:", children);
      } catch (error) {
        console.error("Lỗi tải thư mục:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    loadFolders();
  }, [currentFolderId, accessToken, fetchFolderById]);


  // Hàm mở thư mục và cập nhật URL
  const updateUrl = (folderId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (folderId) {
      params.set('folder', folderId);
    } else {
      params.delete('folder');
    }
    router.push(`${pathname}?${params.toString()}`);
    setCurrentFolderId(folderId);
  };


  // Sắp xếp folderChildren khi sortOption hoặc folderChildren thay đổi
  useEffect(() => {
    if (!folderChildren) return;

    const sorted = [...folderChildren];

    switch (sortBy) {
      case "TITLE_ASC":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "TITLE_DESC":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "LATEST_PUBLISH":
      case "LATEST_SAVED": // createdAt mới nhất
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    setDisplayChildren(sorted);
  }, [sortBy, folderChildren]);



  const rootFolderId = useMemo(() => {
    return folders?.find((f) => f.parentId === null)?.id || null;
  }, [folders]);

  // Cập nhật currentFolderId khi URL thay đổi
  useEffect(() => {
    const folderParam = searchParams.get('folder');

    if (folderParam) {
      setCurrentFolderId(folderParam);
    } else {
      setCurrentFolderId(rootFolderId);
    }
  }, [searchParams, rootFolderId]);

  // const folders = filteredItems.filter((i) => i.type === "folder");
  // const posts = filteredItems.filter((i) => i.type === "post");

  // --- [MỚI] LOGIC ĐẾM SỐ LƯỢNG ĐANG CHỌN ---
  const selectedFolderCount = useMemo(() => {
    if (!displayChildren) return 0;
    return displayChildren.filter((f) => selectedFolderIds.has(f.id)).length;
  }, [displayChildren, selectedFolderIds]);

  const selectedPostCount = useMemo(() => {
    return postsInFolder.filter((p) => selectedPostIds.has(p.id)).length;
  }, [postsInFolder, selectedPostIds]);
  // Lấy bài viết trong folder để hiển thị
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await fetchFolderArticles({
          folderId: currentFolderId || "",
          page: currentPage,
          pageSize: postsPerPage,
          sortKey: sortBy,
        });

        setTotalPostsCount(posts.total || 0);
        const transformedPosts = transformBlogListData(posts);
        console.log("Fetched articles:", transformedPosts);
        setPostsInFolder(transformedPosts);
      } catch (error) {
        console.error("Lỗi tải bài viết trong thư mục:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    loadPosts();
  }, [currentFolderId, accessToken, fetchFolderArticles, currentPage, sortBy]);



  // Hàm xử lý breadcrumb 
  const handleEnterFolder = (folder: { id: string; name: string }) => {

    setBreadcrumbPath((prev) => [...prev, { id: folder.id, name: folder.name }]);
    updateUrl(folder.id);
  };
  const handleBreadcrumbClick = (folderId: string, index: number) => {

    setBreadcrumbPath((prev) => prev.slice(0, index + 1));
    updateUrl(folderId);
  };
  const currentFolder = folders?.find((i) => i.id === currentFolderId);
  const pageTitle = breadcrumbPath.length > 0
    ? breadcrumbPath[breadcrumbPath.length - 1].name
    : (currentFolder ? currentFolder.name : "Danh sách các bài blog đã lưu");
  const buildBreadcrumbPath = (folderId: string, allFolders: FolderChildren[]) => {
    const path: BreadcrumbItem[] = [];
    let currentId: string | null = folderId;

    while (currentId) {
      const folder = allFolders.find(f => f.id === currentId);
      if (!folder) break;
      path.unshift({ id: folder.id, name: folder.name }); // Thêm vào đầu
      currentId = folder.parentId; // Leo lên cha
    }

    return path;
  };
  useEffect(() => {
    const loadFoldersAndBreadcrumb = async () => {
      try {

        setIsLoading(true);

        // 1. Fetch tất cả folder
        const allFolders = await fetchAllFolders();

        // 2. Nếu có currentFolderId -> build breadcrumb
        if (currentFolderId) {
          const newBreadcrumb = buildBreadcrumbPath(currentFolderId, allFolders);
          setBreadcrumbPath(newBreadcrumb);
        } else {
          setBreadcrumbPath([]);
        }

      } catch (error) {
        console.error("Error loading folders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFoldersAndBreadcrumb();

  }, [currentFolderId, fetchAllFolders]);
  // --- Handlers ---

  // Hàm Toggle: Chọn hoặc Bỏ chọn một Item
  const toggleFolderSelect = (id: string) => {
    setSelectedFolderIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const togglePostSelect = (id: string) => {
    setSelectedPostIds(prev => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };


  // Hàm Select All: Chọn tất cả hoặc Bỏ chọn tất cả
  // const toggleSelectAll = () => {
  //   // Nếu đã chọn hết thì bỏ chọn, ngược lại chọn hết
  //   if (selectedIds.size === filteredItems.length && filteredItems.length > 0) {
  //     setSelectedIds(new Set()); // Clear toàn bộ
  //   } else {
  //     // Tạo Set mới từ danh sách ID hiện có
  //     setSelectedIds(new Set(filteredItems.map((i) => i.id)));
  //   }
  // };

  // hàm xử lý thêm, xóa, duy chuyển

  const handleDelete = () => {
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    const previousPosts = [...postsInFolder];
    const previousChildren = folderChildren ? [...folderChildren] : null;
    const previousTotalPosts = totalPostsCount;
    try {
      setIsLoading(true);
      setPostsInFolder(prev => prev.filter(p => !selectedPostIds.has(p.id)));
      if (folderChildren) {
        setFolderChildren(prev => prev!.filter(f => !selectedFolderIds.has(f.id)));
      }

      const folderIds = Array.from(selectedFolderIds);
      const articleIds = Array.from(selectedPostIds);
      if (folderIds.length > 0) {
        await deleteFolders(folderIds);
      }

      // Xóa article (nếu có)
      if (articleIds.length > 0) {
        console.log("Deleting articles with IDs:", articleIds);
        await deleteArticles(articleIds);
      }

      // reset state sau khi xoá thành công
      setSelectedFolderIds(new Set());
      setSelectedPostIds(new Set());
      setIsDeleteConfirmOpen(false);

      // reload folder
      if (currentFolderId) {
        const children = await fetchFolderById(currentFolderId);
        setFolderChildren(children);
      }
      const newTotalPages = Math.ceil((totalPostsCount - articleIds.length) / postsPerPage);
      const newTotalPostsCount = totalPostsCount - articleIds.length;
      setTotalPostsCount(newTotalPostsCount);
      if (currentPage > newTotalPages) {
        setCurrentPage(Math.max(newTotalPages, 1));
      }

    } catch (error) {
      console.error("Delete failed:", error);
      setPostsInFolder(previousPosts);
      setFolderChildren(previousChildren);
      setTotalPostsCount(previousTotalPosts);
    } finally {
      setIsLoading(false);
    }
  };



  const handleCreateFolder = () => {
    setIsCreateFolderOpen(true);
  };

  const handleConfirmCreateFolder = async (
    folderName: string
  ): Promise<{ success: boolean; message?: string }> => {


    try {
      if (!currentFolderId) {
        return { success: false, message: "No folder selected" };
      }

      const result = await createFolder(folderName, currentFolderId);

      if (!result.success) {
        return result;
      }

      const children = await fetchFolderById(currentFolderId);
      setFolderChildren(children);

      return { success: true };;
    } finally {

    }
  };
  const handleMoveFolder = async () => {
    setIsLoading(true);

    // ✅ mặc định target = folder hiện tại (folder cha)
    setDefaultTargetFolderId(currentFolderId);

    setIsMoveFolderOpen(true);

    const allFolders = await fetchAllFolders();
    setAllFolders(allFolders);

    setIsLoading(false);
  };


  // --- Hàm xử lý move folder/post ---
  const handleMoveItems = async (targetFolderId: string | null) => {
    if (selectedFolderIds.size === 0 && selectedPostIds.size === 0) return;

    if (targetFolderId === currentFolderId) {
      toast.error("Thư mục đã ở trong thư mục này");
      return;
    }

    const folderIds = Array.from(selectedFolderIds);
    const articleIds = Array.from(selectedPostIds);

    try {
      setIsLoading(true);

      // ✅ 1. Optimistic UI: remove items khỏi UI trước
      if (articleIds.length > 0) {
        setPostsInFolder(prev => prev.filter(p => !articleIds.includes(p.id)));
        setTotalPostsCount(prev => Math.max(prev - articleIds.length, 0));
      }

      if (folderIds.length > 0 && folderChildren) {
        setFolderChildren(prev => prev!.filter(f => !folderIds.includes(f.id)));
      }

      // ✅ 2. Call API
      if (folderIds.length > 0) {
        await moveFolders({
          folderIds,
          targetParentId: targetFolderId,
        });
      }

      if (articleIds.length > 0) {
        await moveArticles({
          articleIds,
          targetFolderId,
        });
      }

      // ✅ 3. Reset selection
      clearSelections();

      // ✅ 4. Đóng modal
      setIsMoveFolderOpen(false);

    } catch (error) {
      toast.error("Di chuyển thất bại, vui lòng thử lại");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRenameFolder = (folder: FolderChildren) => {
    setRenamingFolder(folder);
    setIsRenameFolderOpen(true);
  };

  const handleConfirmRename = async (folderId: string, newName: string): Promise<{ success: boolean; message?: string }> => {
    try {

      const result = await renameFolder(folderId, newName);

      if (!result.success) {
        return result;
      }

      // Cập nhật lại danh sách folder con
      if (currentFolderId) {
        const children = await fetchFolderById(currentFolderId);
        setFolderChildren(children);
      }

      return { success: true };
    } finally {

    }
  };

  // --- Hàm reset selection ---
  const clearSelections = () => {
    setSelectedFolderIds(new Set());
    setSelectedPostIds(new Set());
  };




  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isSearchExpanded &&
        !searchQuery &&
        !target.closest(".search-container")
      ) {
        setIsSearchExpanded(false);
      }
      if (isFilterMenuOpen && !target.closest(".filter-container")) {
        setIsFilterMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchExpanded, searchQuery, isFilterMenuOpen]);

  // --- RENDER UI ---

  return (
    <>
      {/* 1. HERO SECTION */}
      <div className="bg-white container">
        {isLoading ? (

          <SkeletonLoader />
        ) : (
          <>
            <section className="">
              <div>
                <div className="relative py-10 px-4 md:px-0">
                  {/* NÚT BACK */}
                  {/* NÚT BACK – chỉ hiện khi KHÔNG ở root */}
                  {currentFolderId && currentFolderId !== rootFolderId && (
                    <div className="absolute top-0 left-0 z-10">
                      <button
                        onClick={() => updateUrl(null)}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium text-sm md:text-base py-2"
                      >
                        <ArrowLeft size={20} /> Quay lại
                      </button>
                    </div>
                  )}


                  {/* HEADER CONTENT */}
                  <div className="text-center ">
                    <h1 className="max-w-5xl mx-auto mb-6">{pageTitle}</h1>
                    {/* TRƯỜNG HỢP 1: Ở trang ngoài cùng -> Hiện Description */}
                    {!currentFolderId && (
                      <p className="mx-auto max-w-lg text-sub2 md:text-sub1 lg:text-h6 text-colordescription md:max-w-xl lg:max-w-2xl">
                        Nơi lưu trữ những kiến thức, bài viết và thông tin hữu ích
                        dành riêng cho bạn.
                      </p>
                    )}

                    {/* TRƯỜNG HỢP 2: Đã vào trong Folder -> Hiện Breadcrumbs */}
                    {currentFolderId && (
                      <div className="flex items-center justify-center flex-wrap gap-2 text-body2 md:text-sub2 lg:text-sub1 font-medium text-gray-500">

                        {/* Nút về Gốc */}


                        {/* Render từ mảng State breadcrumbPath */}
                        {breadcrumbPath.map((crumb, index) => {
                          const isLast = index === breadcrumbPath.length - 1;
                          return (
                            <React.Fragment key={crumb.id}>
                              <button
                                onClick={() => handleBreadcrumbClick(crumb.id, index)}
                                disabled={isLast}
                                className={`transition-colors ${isLast
                                  ? "text-gray-900 font-bold cursor-default"
                                  : "hover:text-primary"
                                  }`}
                              >
                                {crumb.name}
                              </button>
                              {/* Dấu gạch chéo ngăn cách (trừ phần tử cuối) */}
                              {!isLast && <span className="text-gray-300">/</span>}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. CONTENT SECTION */}
            <section className="  mx-auto ">
              {/* TOOLBAR */}

              <div className="sticky top-20 z-20 bg-white/90 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
                  {/* --- TRÁI: Chọn tất cả + Actions --- */}
                  <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
                    {/* <button
                      onClick={toggleSelectAll}
                      className=" flex items-center gap-2 text-gray-600 hover:text-primary transition font-medium whitespace-nowrap"
                    >
                      {selectedIds.size > 0 &&
                        selectedIds.size === filteredItems.length ? (
                        <CheckSquare className="text-primary" />
                      ) : (
                        <Square />
                      )}
                      <span className="text-body2">
                        Tất cả 
                      </span>
                    </button> */}

                    <AnimatePresence>
                      {(selectedFolderIds.size > 0 || selectedPostIds.size > 0) && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="flex items-center gap-3 overflow-hidden"
                        >
                          {/* [MỚI] HIỂN THỊ SỐ LƯỢNG ĐANG CHỌN */}
                          <div className="h-5 w-px bg-gray-300 mx-1"></div>

                          <div className="flex items-center text-gray-500 whitespace-nowrap">
                            <span className="hidden sm:inline mr-1">
                              Đã chọn:
                            </span>
                            {selectedFolderCount > 0 && (
                              <span className="font-bold text-gray-900 mr-1">
                                {selectedFolderCount} thư mục
                              </span>
                            )}
                            {selectedFolderCount > 0 && selectedPostCount > 0 && (
                              <span className="mr-1">,</span>
                            )}
                            {selectedPostCount > 0 && (
                              <span className="font-bold text-gray-900">
                                {selectedPostCount} bài viết
                              </span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <button
                            onClick={handleDelete}
                            className="flex items-center px-3 py-1.5 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition text-sm font-bold whitespace-nowrap"
                          >
                            <Trash2 size={16} className="mr-1.5" /> Xóa
                          </button>
                          <button
                            onClick={handleMoveFolder}
                            className="flex items-center px-3 py-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-sm font-bold whitespace-nowrap"
                          >
                            <Move size={16} className="mr-1.5" /> Di chuyển
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* --- PHẢI: Filter + New Folder + Search --- */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end relative">
                    {/* 1. FILTER BUTTON */}
                    <div className="relative filter-container">
                      <button
                        onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200
                                ${isFilterMenuOpen
                            ? "bg-primary text-white border-primary shadow-md"
                            : "bg-gray-50 text-gray-600 border-transparent hover:border-gray-200 hover:bg-gray-100"
                          }
                            `}
                        title="Sắp xếp"
                      >
                        <Filter size={18} />
                      </button>

                      <AnimatePresence>
                        {isFilterMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden p-1"
                          >
                            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                              Sắp xếp theo
                            </div>

                            <button
                              onClick={() => {
                                setSortBy("LATEST_SAVED");
                                setIsFilterMenuOpen(false);
                              }}
                              className={`flex items-center w-full px-3 py-2 text-body2 rounded-lg transition-colors m-1 ${sortBy === "LATEST_SAVED"
                                ? "bg-blue-50 text-primary font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                              <Clock size={16} className="mr-2" /> Mới lưu gần đây
                              {sortBy === "LATEST_SAVED" && (
                                <Check size={14} className="ml-auto" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setSortBy("LATEST_PUBLISH");
                                setIsFilterMenuOpen(false);
                              }}
                              className={`flex items-center w-full px-3 py-2 text-body2 rounded-lg transition-colors m-1 ${sortBy === "LATEST_PUBLISH"
                                ? "bg-blue-50 text-primary font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                              <Calendar size={16} className="mr-2" /> Mới đăng gần
                              đây
                              {sortBy === "LATEST_PUBLISH" && (
                                <Check size={14} className="ml-auto" />
                              )}
                            </button>
                            <div className="h-px bg-gray-100 my-1"></div>
                            <button
                              onClick={() => {
                                setSortBy("TITLE_ASC");
                                setIsFilterMenuOpen(false);
                              }}
                              className={`flex items-center w-full px-3 py-2 text-body2 rounded-lg transition-colors m-1 ${sortBy === "TITLE_ASC"
                                ? "bg-blue-50 text-primary font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                              <ArrowDownAZ size={16} className="mr-2" /> Tên (A -
                              Z)
                              {sortBy === "TITLE_ASC" && (
                                <Check size={14} className="ml-auto" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setSortBy("TITLE_DESC");
                                setIsFilterMenuOpen(false);
                              }}
                              className={`flex items-center w-full px-3 py-2 text-body2 rounded-lg transition-colors m-1 ${sortBy === "TITLE_DESC"
                                ? "bg-blue-50 text-primary font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                              <ArrowUpAZ size={16} className="mr-2" /> Tên (Z - A)
                              {sortBy === "TITLE_DESC" && (
                                <Check size={14} className="ml-auto" />
                              )}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 2. CREATE FOLDER */}
                    <button
                      onClick={handleCreateFolder}
                      className="flex items-center justify-center w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-primary rounded-lg transition-colors border border-transparent hover:border-gray-200"
                      title="Tạo thư mục mới"
                    >
                      <Plus size={20} />
                    </button>

                    {/* 3. SEARCH */}
                    <div className="search-container relative flex justify-end">
                      <motion.div
                        initial={false}
                        animate={{
                          width: isSearchExpanded || searchQuery ? 260 : 40,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className={`flex items-center h-10 bg-gray-50 border rounded-lg overflow-hidden
                                ${isSearchExpanded || searchQuery
                            ? "border-primary ring-2 ring-blue-50 bg-white"
                            : "border-transparent hover:border-gray-200 hover:bg-gray-100 cursor-pointer"
                          }
                            `}
                        onClick={() => {
                          setIsSearchExpanded(true);
                          setTimeout(() => searchInputRef.current?.focus({ preventScroll: true }), 100);
                        }}
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 flex-shrink-0 transition-colors ${isSearchExpanded || searchQuery
                            ? "text-primary"
                            : "text-gray-600"
                            }`}
                        >
                          <Search size={18} />
                        </div>
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Tìm kiếm..."
                          className="w-full bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 pr-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <AnimatePresence>
                          {(isSearchExpanded || searchQuery) && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery("");
                                if (!searchQuery) setIsSearchExpanded(false);
                              }}
                              className="absolute right-2 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50"
                            >
                              <X size={14} />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOLDERS GRID */}
              {displayChildren && (
                <FolderGrid
                  folders={displayChildren}
                  onOpenRenameFolder={handleRenameFolder}
                  selectedIds={selectedFolderIds}
                  onToggleSelect={toggleFolderSelect}
                  onOpenFolder={(id) => {
                    const targetFolder = displayChildren?.find((f) => f.id === id);
                    if (targetFolder) {
                      handleEnterFolder({ id: targetFolder.id, name: targetFolder.name });
                    }
                  }}
                />
              )}

              {/* POSTS GRID */}

              <div>
                <div className="flex items-center gap-3 ">
                  <h2 className="text-black text-sub1 md:text-h6 lg:text-h5 font-bold mb-4">
                    Bài viết <span>({totalPostsCount})</span>
                  </h2>
                </div>

                {postsInFolder.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-lg">
                      Chưa có nội dung nào trong thư mục này.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {postsInFolder.map((item) => (
                        <div key={item.id} className="relative group">
                          <div
                            className={`absolute -inset-2 z-10 rounded-2xl border-2 transition-all pointer-events-none ${selectedPostIds.has(item.id)
                              ? "border-primary bg-primary/5 block"
                              : "border-transparent hidden"
                              }`}
                          ></div>
                          <div className="absolute top-3 left-3 z-30">
                            <input
                              type="checkbox"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Chọn bài viết ${item.title}`}
                              title={`Chọn bài viết ${item.title}`}
                              checked={selectedPostIds.has(item.id)}
                              onChange={() => togglePostSelect(item.id)}
                              className={`w-5 h-5 cursor-pointer accent-primary shadow-sm transition-opacity duration-200 ${selectedPostIds.has(item.id)
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                                }`}
                            />
                          </div>
                          <div className="h-full">
                            {item && <BlogPostCard post={item} />}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-12">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalPostsCount / postsPerPage)}
                        onPageChange={(page) => setCurrentPage(page)}
                        isLoading={isLoading}
                      />
                    </div>
                  </>
                )}
              </div>
            </section>

            <DeleteConfirmModal
              isOpen={isDeleteConfirmOpen}
              selectedFolderCount={selectedFolderIds.size}
              selectedPostCount={selectedPostIds.size}
              onCancel={() => setIsDeleteConfirmOpen(false)}
              onConfirm={confirmDelete}
            />
            <CreateFolderModal
              isOpen={isCreateFolderOpen}
              onClose={() => setIsCreateFolderOpen(false)}
              onCreate={handleConfirmCreateFolder}
            />
            <MoveFolderModal
              isOpen={isMoveFolderOpen}
              onClose={() => setIsMoveFolderOpen(false)}
              folders={allFolders}
              selectedIds={selectedFolderIds}
              defaultTargetFolderId={defaultTargetFolderId}
              onMove={handleMoveItems}
            />

            <RenameFolderModal
              isOpen={isRenameFolderOpen}
              initialName={renamingFolder?.name || ""}
              onClose={() => setIsRenameFolderOpen(false)}
              folderId={renamingFolder?.id || ""}
              onRename={handleConfirmRename}
            />


            {/* CTA SECTION */}
            <section className="md:container">

              <CTASection
                ctaSection={{
                  title: "Bạn chưa tìm thấy bài viết ưng ý?",
                  description:
                    "Khám phá thêm hàng trăm bài viết hữu ích khác tại trang chủ Blog của chúng tôi.",
                  ctaButton: {
                    title: "Khám phá ngay",
                    link: "/blog/blog-home",
                  },
                }}
              />
            </section>
          </>
        )}
      </div>
    </>
  );
}

