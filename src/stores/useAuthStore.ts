import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { AuthState } from "@/types/stores/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,
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
        const {accessToken} = await authService.signIn(username, password);
        set({
          accessToken
        });
        toast.success("Chào mừng bạn quay lại VPharma!");
    } catch (e) {
      console.log(e);
      toast.error("Đăng nhập không thành công");
    } finally {
        set({ loading: false });
    }
  },
}));
