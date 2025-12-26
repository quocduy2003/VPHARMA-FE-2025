
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, FolderPlus, X } from "lucide-react";

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => Promise<{
    success: boolean;
    message?: string;
  }>;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [newFolderName, setNewFolderName] = useState("");
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);



  // Reset input và focus mỗi khi mở modal
  useEffect(() => {
    if (isOpen) {
      setNewFolderName("");
      setTimeout(() => {
        folderInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  const handleConfirm = async () => {
    if (!newFolderName.trim()) {
      setError("Tên thư mục không được để trống");
      return;
    }
    setError(null);

    const result = await onCreate(newFolderName);

    if (!result.success) {
      setError(result.message || "Tạo thư mục thất bại");
      return;
    }
    onClose();
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleConfirm();
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                  <FolderPlus size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Tạo thư mục mới
                </h3>
              </div>
              <button
                type="button"
                title="Đóng"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên thư mục
              </label>
              <input
                ref={folderInputRef}
                type="text"
                placeholder="Ví dụ: Tài liệu học tập..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none transition-all text-gray-800"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <AnimatePresence>
                {error ? (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-2 flex items-center gap-1.5 text-red-500"
                  >
                    <AlertCircle size={14} />
                    <span className="text-xs font-medium">{error}</span>
                  </motion.div>
                ) : (
                  <p className="mt-2 text-xs text-gray-500">
                    Thư mục mới sẽ được tạo tại vị trí hiện tại.
                  </p>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 transition"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!newFolderName.trim()}
                className={`px-6 py-2 rounded-lg text-sm font-bold text-white shadow-md transition-all ${newFolderName.trim()
                  ? "bg-primary hover:bg-blue-700 active:scale-95"
                  : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Tạo ngay
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateFolderModal;