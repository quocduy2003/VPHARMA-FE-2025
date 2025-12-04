import api from "@/lib/api/auth";

export const folderService = {
 fetchFolders: async () => {
   const response = await api.get("/folders", { withCredentials: true });
   return response.data.folders;
 }

};