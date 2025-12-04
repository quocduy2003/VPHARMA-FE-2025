import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { AuthState } from "@/types/stores/store";
import { persist } from "zustand/middleware";
import { useSavePostStore } from "./useSavePost";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      authReady: false,
      user: null,
      loading: false,
      setAuthReady: (ready: boolean) => set({ authReady: ready }),
      clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        localStorage.clear();
      },
      setAccessToken: (accessToken) => set({ accessToken }),
      signUp: async (displayName, username, password, phone, companyName) => {
        try {
          set({ loading: true });
          //gọi api
          await authService.signUp(
            username,
            password,
            displayName,
            phone,
            companyName
          );
          toast.success(
            "Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập"
          );
        } catch (e) {
          console.log(e);
          toast.error("Đăng ký không thành công");
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (username, password) => {
        try {
          set({ loading: true });
          localStorage.clear();
          useSavePostStore.getState().reset();

          const { accessToken } = await authService.signIn(username, password);
          get().setAccessToken(accessToken);
          await get().fetchMe();

          useSavePostStore.getState().fetchFolders();
          toast.success("Chào mừng bạn quay lại VPharma 🎉");
        } catch (e) {
          console.log(e);
          toast.error("Đăng nhập không thành công");
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          get().clearState();
          await authService.signOut();
          toast.success("Đăng xuất thành công");
        } catch (e) {
          console.log(e);
          toast.error("Đăng xuất không thành công");
        } finally {
          set({ loading: false });
        }
      },

      fetchMe: async () => {
        try {
          set({ loading: true });
          const user = await authService.fetchMe();
          set({ user });
        } catch (e) {
          console.log(e);
          set({ user: null, accessToken: null });
          toast.error("Lỗi khi lấy dữ liệu người dùng.");
        } finally {
          set({ loading: false });
        }
      },
      refreshToken: async () => {
        try {
          set({ loading: true });
          const { user, fetchMe, setAccessToken } = get();

          const accessToken = await authService.refreshToken();

          setAccessToken(accessToken);

          if (!user && accessToken) {
            await fetchMe();
          }
        } catch (e) {
          console.log(e);
          get().clearState();
          toast.error("Phiên đăng nhập đã hết hạn. Hãy thử lại!");
        } finally {
          set({ loading: false, authReady: true });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
