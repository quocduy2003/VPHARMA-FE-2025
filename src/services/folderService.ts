import api from "@/lib/api/auth";


export const folderService = {
  fetchFolders: async () => {
    const response = await api.get("/folders");
    return response.data.folders;
  },
  fetchFolderTree: async () => {
    const response = await api.get(`/folders/tree`);
    return response.data;
  },
  fetchFolderById: async (folderId: string | null, sortKey?: string) => {
    const response = await api.get(`/folders/${folderId}`, {
      params: { sortKey }
    });
    return response.data.children; // trả về mảng folder con
  },
  fetchAllFolders: async () => {
    const response = await api.get("/folders/all");
    return response.data.folders;
  },
  createFolder: async (name: string, parentId: string) => {
    const response = await api.post("/folders", { name, parentId });
    return response.data.folder;
  },
  deleteFolders: async (folderIds: string[]) => {
    const response = await api.delete("/folders", { data: { folderIds } });
    return response.data.folder;
  },
  moveFolders: async (folderIds: string[], targetParentId: string | null) => {
    console.log("folderService.moveFolders called with folderIds:", folderIds, "targetParentId:", targetParentId);
    const response = await api.put("/folders/move", { folderIds, targetParentId });
    return response.data;
  },
  renameFolder: async (folderId: string, newName: string) => {
    const response = await api.put(`/folders/${folderId}`, { newName });
    return response.data;
  }



};