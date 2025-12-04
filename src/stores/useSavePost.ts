import { create } from "zustand";
import { toast } from "sonner";
import { SavePostState } from "@/types/stores/store";
import { persist } from "zustand/middleware";
import { folderService } from "@/services/savePostService";


export const useSavePostStore = create<SavePostState>()(
    persist(
        (set, get) => ({
            folders: [],
            savedPosts: [],
            loading: false,
            reset: () =>{
                set({folders: [], savedPosts: []});
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

        }),
        {
            name: "savePost-storage",
            partialize: (state) => ({folders: state.folders}),
        }
    )
);