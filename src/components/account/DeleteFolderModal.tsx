"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    selectedFolderCount: number;
    selectedPostCount: number;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmModal({
    isOpen,
    selectedFolderCount,
    selectedPostCount,
    onCancel,
    onConfirm,
}: DeleteConfirmModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
                    >
                        <div className="p-6 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
                                <AlertTriangle className="h-8 w-8 text-red-600" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Xác nhận xóa?
                            </h3>

                            <p className="text-sm text-gray-500">
                                Bạn có chắc chắn muốn xóa{" "}
                                <span className="font-bold text-gray-800">
                                    {selectedFolderCount}{" "}
                                    {selectedFolderCount === 1
                                        ? "thư mục"
                                        : "thư mục"}
                                </span>{" "}
                                và{" "}
                                <span className="font-bold text-gray-800">
                                    {selectedPostCount}{" "}
                                    {selectedPostCount === 1
                                        ? "bài viết"
                                        : "bài viết"}
                                </span>{" "}
                                 đã chọn không?
                                <br />
                                Hành động này không thể hoàn tác.
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition shadow-sm"
                            >
                                Không, giữ lại
                            </button>

                            <button
                                type="button"
                                onClick={onConfirm}
                                className="w-full px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-md transition active:scale-95"
                            >
                                Có, xóa ngay
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
