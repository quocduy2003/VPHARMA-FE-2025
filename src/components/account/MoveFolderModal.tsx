"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useMemo, useEffect } from "react";
import { Folder } from "@/types/stores/savePost";
import { X, Move, ChevronRight, CornerLeftUp, Check } from "lucide-react";
import { FaFolder } from "react-icons/fa";

interface MoveFolderModalProps {
  isOpen: boolean;
  folders: Folder[];
  selectedIds: Set<string>; // ID của các folder/post đang được chọn để di chuyển
  defaultTargetFolderId?: string | null;
  onMove: (targetFolderId: string | null) => void;
  onClose: () => void;

}

export default function MoveFolderModal({
  isOpen,
  folders,
  selectedIds,
  onMove,
  onClose,
  defaultTargetFolderId,
}: MoveFolderModalProps) {
  const [pickerParentId, setPickerParentId] = useState<string | null>(null);


  useEffect(() => {
    if (isOpen) {
      setPickerParentId(defaultTargetFolderId ?? null);
    }
  }, [isOpen, defaultTargetFolderId]);
  // 1. Breadcrumbs logic
  const pickerBreadcrumbs = useMemo(() => {
    const crumbs: Folder[] = [];
    let currentId = pickerParentId;
    while (currentId) {
      const folder = folders.find((f) => f.id === currentId);
      if (!folder) break;
      crumbs.unshift(folder);
      currentId = folder.parentId;
    }
    return crumbs;
  }, [pickerParentId, folders]);

  // 2. Lọc danh sách thư mục hiển thị (Ẩn các thư mục đang được chọn di chuyển)
  const subFolders = useMemo(() => {
    return folders.filter((f) =>
      f.parentId === pickerParentId &&
      !selectedIds.has(f.id) // Không hiển thị chính nó trong danh sách đích
    );
  }, [folders, pickerParentId, selectedIds]);

  // 3. Kiểm tra xem vị trí hiện tại có hợp lệ để bấm "Xác nhận" không
  // Ví dụ: Không được di chuyển vào folder cha hiện tại của chính nó (vì nó đã ở đó rồi)
  const canMoveHere = useMemo(() => {
    // Nếu bạn muốn chặn bấm xác nhận khi folder đã ở sẵn trong parent này
    // (Logic này tùy thuộc vào việc selectedIds của bạn chứa folder hay post)
    return true;
  }, [pickerParentId, selectedIds]);

  const handleConfirmMove = () => {
    onMove(pickerParentId); // pickerParentId có thể là null (thư mục gốc)
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Move size={20} className="text-primary" /> Di chuyển tới
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-700">Chọn thư mục đích</label>
                {pickerParentId && (
                  <button
                    type="button"
                    onClick={() => {
                      const parent = folders.find((i) => i.id === pickerParentId);
                      setPickerParentId(parent ? parent.parentId : null);
                    }}
                    className="text-xs flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <CornerLeftUp size={14} className="mr-1" /> Lên một cấp
                  </button>
                )}
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                {/* Breadcrumb */}
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs flex items-center flex-wrap gap-1">

                  {pickerBreadcrumbs.map((crumb) => (
                    <React.Fragment key={crumb.id}>
                      <ChevronRight size={12} className="text-gray-400" />
                      <button
                        onClick={() => setPickerParentId(crumb.id)}
                        className="hover:text-primary text-gray-500 last:text-primary last:font-bold"
                      >
                        {crumb.name}
                      </button>
                    </React.Fragment>
                  ))}
                </div>

                {/* List */}
                <div className="max-h-60 overflow-y-auto p-2">
                  {subFolders.length === 0 ? (
                    <div className="py-8 text-center">
                      <FaFolder className="mx-auto text-gray-200 size-10 mb-2" />
                      <p className="text-xs text-gray-400 italic">Không có thư mục con</p>
                    </div>
                  ) : (
                    subFolders.map((folder) => (
                      <button
                        key={folder.id}
                        onClick={() => setPickerParentId(folder.id)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-blue-50 transition group"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FaFolder className="text-blue-400 group-hover:text-blue-600 shrink-0" />
                          <span className="text-sm text-gray-700 font-medium truncate">{folder.name}</span>
                        </div>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-400" />
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-700 flex items-center gap-1">
                  <span className="font-bold underline">Vị trí mới:</span>
                  {pickerParentId ? pickerBreadcrumbs.map(c => c.name).join(' / ') : "Danh sách gốc"}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 transition"
              >
                Hủy
              </button>
              <button
                disabled={!canMoveHere}
                onClick={handleConfirmMove}
                className="px-6 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-blue-200"
              >
                <Check size={18} /> Di chuyển đến đây
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}