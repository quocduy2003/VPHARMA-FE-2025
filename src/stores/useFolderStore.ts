import { create } from "zustand";
import { toast } from "sonner";
import { FolderState } from "@/types/stores/store";
import { persist } from "zustand/middleware";
import { folderService } from "@/services/folderService";
import { AxiosError } from "axios";


export const useFolderStore = create<FolderState>()(
    persist(
        (set, get) => ({
            folders: [],
            folderTree: [],
            folderChildren: [],
            loading: false,
            reset: () => {
                set({ folders: [] });
            },
            fetchFolders: async () => {
                try {
                    set({ loading: true });
                    const folders = await folderService.fetchFolders();
                    set({ folders, loading: false });
                } catch (error) {
                    set({ loading: false });
                    console.error("Error fetching folders:", error);
                }
            },
            fetchFolderTree: async () => {
                try {
                    set({ loading: true });
                    const folderTree = await folderService.fetchFolderTree();

                    set({ folderTree: folderTree });
                } catch (error) {
                    set({ loading: false });
                    console.error("Error fetching folder tree:", error);
                } finally {
                    set({ loading: false });
                }
            },
            fetchAllFolders: async () => {
                try {
                    set({ loading: true });
                    const folders = await folderService.fetchAllFolders();
                    return folders;
                } catch (error) {
                    set({ loading: false });
                    console.error("Error fetching all folders:", error);
                }
            },
            fetchFolderById: async (folderId: string | null) => {
                try {
                    set({ loading: true });
                    const children = await folderService.fetchFolderById(folderId);
                    set({ folderChildren: children });
                    return children;
                } catch (error) {
                    console.error("Error fetching folder children:", error);
                } finally {
                    set({ loading: false });
                }
            },


            createFolder: async (name: string, parentId: string) => {
                try {
                    set({ loading: true });
                    await folderService.createFolder(name, parentId);
                    await get().fetchFolders();
                    set({ loading: false });
                    toast.success("Tạo thư mục thành công");
                    return { success: true, message: "Tạo thư mục thành công" };
                } catch (error) {
                    if (error instanceof AxiosError) {
                        return {
                            success: false,
                            message:
                                error?.response?.data?.message ||
                                "Tên thư mục đã tồn tại hoặc không hợp lệ",
                        };
                    } else {
                        toast.error("Lỗi hệ thống.");
                        return { success: false, message: "Lỗi hệ thống." };
                    }
                } finally {
                    set({ loading: false });
                }
            },
            deleteFolders: async (folderIds: string[]) => {
                try {
                    set({ loading: true });
                    await folderService.deleteFolders(folderIds);
                    await get().fetchFolders();
                    set({ loading: false });
                    toast.success("Xóa thư mục thành công");
                } catch (error) {
                    console.error("Error deleting folder:", error);
                    toast.error("Xóa thư mục không thành công");
                } finally {
                    set({ loading: false });
                }
            },
            moveFolders: async ({ folderIds, targetParentId }: { folderIds: string[], targetParentId: string | null }) => {
                try {
                    set({ loading: true });
                    await folderService.moveFolders(folderIds, targetParentId);
                    await get().fetchFolders();
                    set({ loading: false });
                    toast.success("Di chuyển thư mục thành công");
                } catch (error) {
                    console.error("Error moving folders:", error);
                    toast.error("Di chuyển thư mục không thành công");
                } finally {
                    set({ loading: false });
                }
            },
            renameFolder: async (folderId: string, newName: string) => {
                try {
                    console.log("Renaming folder:", folderId, newName);
                    set({ loading: true });
                    await folderService.renameFolder(folderId, newName);
                    set({ loading: false });

                    return { success: true, message: "Đổi tên thư mục thành công" };
                } catch (error) {
                    if (error instanceof AxiosError) {
                        return {
                            success: false,
                            message:
                                error?.response?.data?.message ||
                                "Tên thư mục đã tồn tại hoặc không hợp lệđàasfe",
                        };
                    } else {
                        toast.error("Lỗi hệ thống.");
                        return { success: false, message: "Lỗi hệ thống." };
                    }
                } finally {
                    set({ loading: false });
                }
            },
        }),

        {
            name: "saveFolder-storage",
            partialize: (state) => ({ folders: state.folderTree }),
        }
    )
);