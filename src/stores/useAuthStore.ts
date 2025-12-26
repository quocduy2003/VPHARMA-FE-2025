import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { AuthState } from "@/types/stores/store";
import { persist } from "zustand/middleware";
import { useFolderStore } from "./useFolderStore";
import { ChangePasswordPayload, User } from "@/types/stores/user";
import { AxiosError } from "axios";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,
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
          useFolderStore.getState().reset();

          const { accessToken } = await authService.signIn(username, password);
          get().setAccessToken(accessToken);
          await get().fetchMe();

          useFolderStore.getState().fetchFolders();
          useFolderStore.getState().fetchFolderTree();
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
          if (accessToken) {
            useFolderStore.getState().fetchFolders();
          }

          if (!user && accessToken) {
            await fetchMe();
          }
        } catch (e) {
          console.log(e);
          get().clearState();
          toast.error("Phiên đăng nhập đã hết hạn. Hãy thử lại!");
        } finally {
          set({ loading: false});
        }
      },
      updateMe: async (data: Partial<User>) => {
        try {
          set({ loading: true });
          // Gọi API
          const res = await authService.updateProfile(data);

          // CẬP NHẬT NGAY user state để UI hiển thị thông tin mới
          set((state) => ({
            user: { ...state.user, ...res }
          }));

          toast.success("Cập nhật thông tin thành công!");
        } catch (error) {
          console.error(error);
          if (error instanceof AxiosError) {
            const message = error.response?.data?.message || "Đổi mật khẩu thất bại";
            toast.error(message);
          } else {
            toast.error("Lỗi hệ thống.");
          }
        } finally {
          set({ loading: false });
        }
      },
      changePassword: async (data: ChangePasswordPayload) => { // ✅ Đã thay any
        try {
          set({ loading: true });
          await authService.changePassword(data);

          toast.success("Đổi mật khẩu thành công. Vui lòng đăng nhập lại!");
          get().clearState();

        } catch (error) { // ⚠️ Xử lý lỗi chuẩn
          console.error(error);
          if (error instanceof AxiosError) {
            const message = error.response?.data?.message || "Đổi mật khẩu thất bại";
            toast.error(message);
          } else {
            toast.error("Lỗi hệ thống.");
          }
        } finally {
          set({ loading: false });
        }
      }
    }),
{
  name: "auth-storage",
    partialize: (state) => ({ user: state.user }),
    }
  )
);
