import { create } from "zustand";
import { toast } from "sonner";
import { FolderArticleState } from "@/types/stores/store";
import { persist } from "zustand/middleware";
import { folderArticleService } from "@/services/folderArticleService";


export const useFolderArticleStore = create<FolderArticleState>()(
    persist(
        (set, get) => ({
            savedArticles: [],
            loading: false,
            // actions

            fetchFolderArticles: async ({ folderId, page, pageSize, sortKey ,search}: { folderId: string; page?: number; pageSize?: number; sortKey?: string, search?: string }) => {
                try {
                    set({ loading: true });
                    const articles = await folderArticleService.fetchFolderArticles({ folderId, page, pageSize, sortKey, search });
                    set({ savedArticles: articles, loading: false });
                    console.log("Fetched folder articles ssssssss:", articles);
                    return articles;
                } catch (error) {
                    set({ loading: false });
                    console.error("Error fetching folder articles:", error);
                } finally {
                    set({ loading: false });
                }
            },

            addArticle: async (articleId: string, folderId: string) => {
                try {
                    set({ loading: true });
                    await folderArticleService.addArticle(articleId, folderId);

                    toast.success("Bài viết đã được lưu thành công");
                } catch (error) {
                    console.error("Error saving post:", error);
                    toast.error("Lưu bài viết không thành công");
                } finally {
                    set({ loading: false });
                }
            },

            deleteArticles: async (articleIds: string[]) => {
                try {
                    set({ loading: true });
                    await folderArticleService.deleteArticles(articleIds);

                    toast.success("Bài viết đã được xóa thành công");
                } catch (error) {
                    console.error("Error deleting articles:", error);
                    toast.error("Xóa bài viết không thành công");
                } finally {
                    set({ loading: false });
                }
            },
            moveArticles: async ({articleIds, targetFolderId}: {articleIds: string[], targetFolderId: string | null}) => {
                try {
                    set({ loading: true });
                  
                    await folderArticleService.moveArticles(articleIds, targetFolderId);

                }
                catch (error) {
                    console.error("Error moving articles:", error);
                    toast.error("Di chuyển bài viết không thành công");
                }
                finally {
                    set({ loading: false });
                }
            },
        }),
        {
            name: "savePost-storage",
            partialize: () => ({}),
        })
);