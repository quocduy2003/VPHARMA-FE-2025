"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Move,
  Filter,
  ArrowLeft,
  X,
  ArrowDownAZ,
  ArrowUpAZ,
  Clock,
  Calendar,
  Check,
} from "lucide-react";
import { FaRegFolderOpen } from "react-icons/fa6";

// Components & Utils
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { BlogPostCard } from "@/components/blog/BlogTableView";
import CTASection from "@/components/CTA";
import { SavedItem } from "@/types";
import { useSavedPost } from "@/context/SavedPostContext";

type SortOption = "savedAt" | "createdAt" | "nameAsc" | "nameDesc";

export default function SavedBlogPage() {
  // --- LOGIC ---
  const { savedItems, deleteItems, createFolder } = useSavedPost();

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sort State
  const [sortBy, setSortBy] = useState<SortOption>("savedAt");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // --- LOGIC ĐỆ QUY (RECURSION) ---
  // Input: ID thư mục hiện tại
  // Output: Mảng các thư mục cha theo thứ tự từ Gốc -> Ngọn
  const getBreadcrumbs = (folderId: string | null): SavedItem[] => {
    // 1. Base case (Điều kiện dừng): Nếu folderId là null (về tới Root) -> Trả về mảng rỗng
    if (!folderId) return [];
    // 2. Tìm object thư mục hiện tại trong danh sách dữ liệu
    const folder = savedItems.find((i) => i.id === folderId);
    // 3. Fallback: Nếu không tìm thấy (lỗi dữ liệu) -> Dừng
    if (!folder) return [];
    // 4. Recursive step (Bước đệ quy):
    // Gọi lại hàm với parentId của thư mục hiện tại, sau đó nối thư mục hiện tại vào cuối mảng
    return [...getBreadcrumbs(folder.parentId), folder];
  };

  const breadcrumbs = getBreadcrumbs(currentFolderId);
  const currentFolder = savedItems.find((i) => i.id === currentFolderId);

  // Tiêu đề trang
  const pageTitle = currentFolder
    ? currentFolder.name
    : "Danh sách các bài blog đã lưu";

  // --- LOGIC LỌC VÀ SẮP XẾP (MEMOIZED) ---
// useMemo giúp cache kết quả, chỉ tính toán lại khi dependency thay đổi
  const filteredItems = useMemo(() => {
    // Tạo bản sao cạn (shallow copy) để tránh mutate state gốc
    const result = savedItems.filter((item) => {
      if (searchQuery) {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return item.parentId === currentFolderId;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "savedAt":
          return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
        case "createdAt":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [savedItems, currentFolderId, searchQuery, sortBy]);

  const folders = filteredItems.filter((i) => i.type === "folder");
  const posts = filteredItems.filter((i) => i.type === "post");

  // --- [MỚI] LOGIC ĐẾM SỐ LƯỢNG ĐANG CHỌN ---
  const selectedFolderCount = folders.filter((f) =>
    selectedIds.has(f.id)
  ).length;
  const selectedPostCount = posts.filter((p) => selectedIds.has(p.id)).length;

  // --- Handlers ---

  // Hàm Toggle: Chọn hoặc Bỏ chọn một Item
  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds); // Clone Set cũ
    if (newSet.has(id)) newSet.delete(id); // Nếu đã có -> Xóa (Uncheck)
    else newSet.add(id);
    setSelectedIds(newSet); // Nếu chưa có -> Thêm (Check)
  };

 // Hàm Select All: Chọn tất cả hoặc Bỏ chọn tất cả
  const toggleSelectAll = () => {
    // Nếu đã chọn hết thì bỏ chọn, ngược lại chọn hết
    if (selectedIds.size === filteredItems.length && filteredItems.length > 0) {
      setSelectedIds(new Set()); // Clear toàn bộ
    } else {
      // Tạo Set mới từ danh sách ID hiện có
      setSelectedIds(new Set(filteredItems.map((i) => i.id)));
    }
  };

  const handleDelete = () => {
    if (!confirm("Bạn có chắc muốn xóa các mục đã chọn?")) return;
    deleteItems(selectedIds);
    setSelectedIds(new Set());
  };

  const handleCreateFolder = () => {
    const name = prompt("Nhập tên thư mục mới:");
    if (!name) return;
    createFolder(name, currentFolderId);
  };

  // Xử lý click outside
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
      <div className="bg-white">
        <section className="container pt-15">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* NÚT BACK */}
              {currentFolderId && (
                <div className="absolute top-0 left-0 z-10">
                  <button
                    onClick={() =>
                      setCurrentFolderId(
                        currentFolder ? currentFolder.parentId : null
                      )
                    }
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium text-sm md:text-base py-2"
                  >
                    <ArrowLeft size={20} /> Quay lại
                  </button>
                </div>
              )}

              {/* HEADER CONTENT */}
              <div className="text-center ">
                <h1 className="mb-3 max-w-5xl mx-auto mb-6">{pageTitle}</h1>
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
                    <button
                      onClick={() => setCurrentFolderId(null)}
                      className="hover:text-primary transition-colors"
                    >
                      Danh sách
                    </button>

                    {breadcrumbs.map((crumb) => (
                      <React.Fragment key={crumb.id}>
                        <span className="text-gray-300">/</span>
                        <button
                          onClick={() => setCurrentFolderId(crumb.id)}
                          className="hover:text-primary transition-colors"
                        >
                          {crumb.name}
                        </button>
                      </React.Fragment>
                    ))}

                    {/* Dấu gạch chéo cuối cùng nối với tiêu đề H1 */}
                    <span className="text-gray-300">/</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. CONTENT SECTION */}
        <section className="container mx-auto ">
          {/* TOOLBAR */}
          <FadeInOnScroll>
            <div className="sticky top-20 z-20 bg-white/90 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
                {/* --- TRÁI: Chọn tất cả + Actions --- */}
                <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
                  <button
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
                      Tất cả ({filteredItems.length})
                    </span>
                  </button>

                  <AnimatePresence>
                    {selectedIds.size > 0 && (
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
                        <button className="flex items-center px-3 py-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-sm font-bold whitespace-nowrap">
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
                                ${
                                  isFilterMenuOpen
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
                              setSortBy("savedAt");
                              setIsFilterMenuOpen(false);
                            }}
                            className={`flex items-center w-full px-3 py-2 text-body2 rounded-lg transition-colors m-1 ${
                              sortBy === "savedAt"
                                ? "bg-blue-50 text-primary font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <Clock size={16} className="mr-2" /> Mới lưu gần đây
                            {sortBy === "savedAt" && (
                              <Check size={14} className="ml-auto" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setSortBy("createdAt");
                              setIsFilterMenuOpen(false);
                            }}
                            className={`flex items-center w-full px-3 py-2 text-body2 rounded-lg transition-colors m-1 ${
                              sortBy === "createdAt"
                                ? "bg-blue-50 text-primary font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <Calendar size={16} className="mr-2" /> Mới đăng gần
                            đây
                            {sortBy === "createdAt" && (
                              <Check size={14} className="ml-auto" />
                            )}
                          </button>
                          <div className="h-px bg-gray-100 my-1"></div>
                          <button
                            onClick={() => {
                              setSortBy("nameAsc");
                              setIsFilterMenuOpen(false);
                            }}
                            className={`flex items-center w-full px-3 py-2 text-body2 rounded-lg transition-colors m-1 ${
                              sortBy === "nameAsc"
                                ? "bg-blue-50 text-primary font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <ArrowDownAZ size={16} className="mr-2" /> Tên (A -
                            Z)
                            {sortBy === "nameAsc" && (
                              <Check size={14} className="ml-auto" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setSortBy("nameDesc");
                              setIsFilterMenuOpen(false);
                            }}
                            className={`flex items-center w-full px-3 py-2 text-body2 rounded-lg transition-colors m-1 ${
                              sortBy === "nameDesc"
                                ? "bg-blue-50 text-primary font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <ArrowUpAZ size={16} className="mr-2" /> Tên (Z - A)
                            {sortBy === "nameDesc" && (
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
                                ${
                                  isSearchExpanded || searchQuery
                                    ? "border-primary ring-2 ring-blue-50 bg-white"
                                    : "border-transparent hover:border-gray-200 hover:bg-gray-100 cursor-pointer"
                                }
                            `}
                      onClick={() => {
                        setIsSearchExpanded(true);
                        setTimeout(() => searchInputRef.current?.focus(), 100);
                      }}
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 flex-shrink-0 transition-colors ${
                          isSearchExpanded || searchQuery
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
          </FadeInOnScroll>

          {/* FOLDERS GRID */}
          {folders.length > 0 && (
            <FadeInOnScroll>
              <div className="mb-12">
                <div className="flex items-center gap-3">
                  <h2 className="text-black text-sub1 md:text-h6 lg:text-h5 font-bold mb-4">
                    Thư mục <span>({folders.length})</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {folders.map((folder) => {
                    const count = savedItems.filter(
                      (i) => i.parentId === folder.id
                    ).length;
                    return (
                      <div
                        key={folder.id}
                        className={`group relative flex flex-row items-center px-3 py-2 rounded-xl border transition-all duration-300 cursor-pointer 
                                    ${
                                      selectedIds.has(folder.id)
                                        ? "bg-blue-50 border-blue-400 shadow-sm"
                                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                                    }
                                `}
                        onClick={(e) => {
                          if (
                            (e.target as HTMLElement).closest(
                              ".select-checkbox"
                            )
                          )
                            return;
                          setCurrentFolderId(folder.id);
                        }}
                      >
                        <div className="select-checkbox mr-4 flex-shrink-0 z-20">
                          <input
                            type="checkbox"
                            aria-label={`Chọn thư mục ${folder.name}`}
                            title={`Chọn thư mục ${folder.name}`}
                            checked={selectedIds.has(folder.id)}
                            onChange={() => toggleSelect(folder.id)}
                            className="w-5 h-5 cursor-pointer accent-primary"
                          />
                        </div>
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-lg mr-4 group-hover:bg-primary transition-colors">
                          <FaRegFolderOpen
                            size={24}
                            className="text-primary group-hover:text-white transition-colors duration-300"
                            fill="currentColor"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sub2 lg:text-sub1 font-bold text-gray-900 truncate mb-0.5 group-hover:text-primary transition-colors">
                            {folder.name}
                          </h3>
                          <p className="text-body2 text-gray-500">
                            {count} assets
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeInOnScroll>
          )}

          {/* POSTS GRID */}
          <FadeInOnScroll>
            <div>
              <div className="flex items-center gap-3 ">
                <h2 className="text-black text-sub1 md:text-h6 lg:text-h5 font-bold mb-4">
                  Bài viết <span>({posts.length})</span>
                </h2>
              </div>

              {posts.length === 0 && folders.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400 text-lg">
                    Chưa có nội dung nào trong thư mục này.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {posts.map((item) => (
                  <div key={item.id} className="relative group">
                    <div
                      className={`absolute -inset-2 z-10 rounded-2xl border-2 transition-all pointer-events-none ${
                        selectedIds.has(item.id)
                          ? "border-primary bg-primary/5 block"
                          : "border-transparent hidden"
                      }`}
                    ></div>
                    <div className="absolute top-3 left-3 z-30">
                      <input
                        type="checkbox"
                        aria-label={`Chọn bài viết ${item.name}`}
                        title={`Chọn bài viết ${item.name}`}
                        checked={selectedIds.has(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className={`w-5 h-5 cursor-pointer accent-primary shadow-sm transition-opacity duration-200 ${
                          selectedIds.has(item.id)
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </div>
                    <div className="h-full">
                      {item.data && <BlogPostCard post={item.data} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
        </section>

        {/* CTA SECTION */}
        <section className="md:container">
          <FadeInOnScroll>
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
          </FadeInOnScroll>
        </section>
      </div>
    </>
  );
}
