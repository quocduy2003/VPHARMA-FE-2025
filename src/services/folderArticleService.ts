import api from "@/lib/api/auth";

export const folderArticleService = {
    addArticle: async (articleId: string, folderId: string) => {
        const response = await api.post(`/folders/${folderId}/${articleId}`);
        return response.data;
    },
    fetchFolderArticles: async ({ folderId, page, pageSize, sortKey, search }: { folderId: string; page?: number; pageSize?: number; sortKey?: string, search?: string }) => {
        if (!folderId) {
        return {
            items: [],
            total: 0,
            page: page ?? 1,
            pageSize: pageSize ?? 10,
        };
    }
        const response = await api.get(`/folders/${folderId}/articles`,{
            params: {
                page,
                pageSize,
                sortKey,
                search
            }
        });
        return response.data;
    },
    deleteArticles: async (articleIds: string[]) => {
        const response = await api.delete("/folders/articles", { data: { articleIds } });
        return response.data;
    },
    moveArticles: async (articleIds: string[], targetFolderId: string | null) => {
        const response = await api.put("/folders/articles/move", { articleIds, targetFolderId });
        return response.data;
    },
    

}