import React from "react";
import { FaRegFolderOpen, FaPencil } from "react-icons/fa6"; // [1] Thêm FaPencil
import { FolderChildren } from "@/types/stores/savePost";


interface FolderGridProps {
    folders: FolderChildren[];
    selectedIds: Set<string>;
    onOpenRenameFolder: (folder: FolderChildren) => void;
    onToggleSelect: (id: string) => void;
    onOpenFolder: (id: string, name?: string) => void;
    onEditFolder?: (folder: FolderChildren) => void; // [Optional] Thêm hàm này để xử lý logic sửa
}

const FolderGrid: React.FC<FolderGridProps> = ({
    folders,
    selectedIds,
    onOpenRenameFolder,
    onToggleSelect,
    onOpenFolder,
    onEditFolder,
}) => {
    if (!folders || folders.length === 0) return null;

    return (

        <div className="mb-12">
            <div className="flex items-center gap-3">
                <h2 className="text-black text-sub1 md:text-h6 lg:text-h5 font-bold mb-4">
                    Thư mục <span>({folders.length})</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {folders.map((folder) => {

                    return (
                        <div
                            key={folder.id}
                            // Class 'group' và 'relative' ở đây rất quan trọng để hiệu ứng hover hoạt động
                            className="group relative w-full flex flex-row items-center px-3 py-2 rounded-xl border border-gray-200 transition-all duration-300 cursor-pointer"
                            onClick={(e) => {
                                if ((e.target as HTMLElement).closest(".select-checkbox"))
                                    return;
                                // Nếu click vào nút edit thì không mở folder
                                if ((e.target as HTMLElement).closest(".edit-btn"))
                                    return;

                                onOpenFolder(folder.id);
                            }}
                        >
                            {/* --- [2] BUTTON EDIT (Cây bút) --- */}
                            <button
                                className="edit-btn absolute top-2 right-2 p-1.5 rounded-full text-gray-400 hover:text-primary hover:bg-blue-100/50 
                             opacity-0 group-hover:opacity-100 transition-all duration-200 z-30"
                                onClick={(e) => {
                                    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra card (không mở folder)
                                    onOpenRenameFolder(folder);
                                }}
                                title="Đổi tên thư mục"
                            >
                                <FaPencil size={12} />
                            </button>
                            {/* ---------------------------------- */}
                            <div
                                className="select-checkbox mr-2 flex-shrink-0 flex items-center justify-center p-3 -ml-3 cursor-pointer transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation(); // Ngăn chặn mở folder khi bấm vào vùng đệm
                                    onToggleSelect(folder.id); // Kích hoạt chọn
                                }}
                            >
                                <input
                                    type="checkbox"
                                    aria-label={`Chọn thư mục ${folder.name}`}
                                    checked={selectedIds.has(folder.id)}
                                    readOnly // Để React không báo lỗi thiếu onChange, vì ta đã xử lý ở onClick của div cha rồi
                                    className="w-5 h-5 cursor-pointer accent-primary pointer-events-none" // pointer-events-none để click xuyên qua input tới div cha
                                />
                            </div>
                            {/* <div className="select-checkbox mr-4 flex-shrink-0 z-20">
                                <input
                                    type="checkbox"
                                    aria-label={`Chọn thư mục ${folder.name}`}
                                    title={`Chọn thư mục ${folder.name}`}
                                    checked={selectedIds.has(folder.id)}
                                    onChange={() => onToggleSelect(folder.id)}
                                    className="w-5 h-5 cursor-pointer accent-primary"
                                />
                            </div> */}
                            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-lg mr-4 group-hover:bg-primary transition-colors cursor-pointer">
                                <FaRegFolderOpen
                                    size={24}
                                    className="text-primary group-hover:text-white transition-colors duration-300"
                                    fill="currentColor"
                                />
                            </div>
                            <div className="flex-1 min-w-0 pr-6"> {/* Thêm pr-6 để text không đè lên icon edit */}
                                <p className="font-bold text-gray-900 truncate mb-0.5 group-hover:text-primary transition-colors cursor-pointer">
                                    {folder.name}
                                </p>
                                <p className="text-body2 text-gray-500"> assets</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FolderGrid;