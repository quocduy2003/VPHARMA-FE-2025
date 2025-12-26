"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, FolderPlus, X } from "lucide-react";

interface RenameFolderModalProps {
  isOpen: boolean;
  folderId: string;
  initialName: string;
  onClose: () => void;
  onRename: (folderId: string, newName: string) => Promise<{
    success: boolean;
    message?: string;
  }>;
}

const RenameFolderModal: React.FC<RenameFolderModalProps> = ({
  isOpen,
  initialName,
  folderId,
  onClose,
  onRename,
}) => {
  const [folderName, setFolderName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset & focus khi mở modal
  useEffect(() => {
    if (isOpen) {
      setFolderName(initialName);
      setError(null);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  }, [isOpen, initialName]);

  const handleConfirm = async () => {
    if (!folderName.trim()) {
      setError("Tên thư mục không được để trống");
      return;
    }

    if (folderName.trim() === initialName.trim()) {
      setError("Tên mới phải khác tên cũ");
      return;
    }

    setError(null);

    const result = await onRename(folderId, folderName.trim());

    if (!result.success) {
      setError(result.message || "Đổi tên thư mục thất bại");
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                  <FolderPlus size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  Đổi tên thư mục
                </h3>
              </div>
              <button
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
                ref={inputRef}
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none transition"
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
                    Nhập tên mới cho thư mục.
                  </p>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                disabled={!folderName.trim()}
                className={`px-6 py-2 text-sm font-bold text-white rounded-lg transition ${
                  folderName.trim()
                    ? "bg-primary hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Lưu thay đổi
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RenameFolderModal;
