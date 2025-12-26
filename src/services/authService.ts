import api from "@/lib/api/auth";
import { ChangePasswordPayload, User } from "@/types/stores/user";


export const authService = {
  signUp: async (
    username: string,
    password: string,
    displayName: string,
    phone: string,
    companyName: string
  ) => {
    const response = await api.post(
      "/auth/signup",
      {
        username,
        password,
        displayName,
        phone,
        companyName,
      },
      { withCredentials: true }
    );
    return response.data;
  },

  signIn: async (username: string, password: string) => {
    const response = await api.post(
      "/auth/signin",
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  },

  signOut: async () => {
    return await api.post("/auth/signout", {}, { withCredentials: true });
  },

  fetchMe: async () => {
    const response = await api.get("/users/me", { withCredentials: true });
    return response.data.user;
  },

  refreshToken: async () => {
    const response = await api.post("/auth/refresh", { withCredentials: true });
    return response.data.accessToken;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await api.patch(
      "/users/me",
      data,
      { withCredentials: true }
    );
    return response.data.user;
  },

  changePassword: async (data: ChangePasswordPayload) => {
  const response = await api.patch(
    "/users/me/password",
    data,
    { withCredentials: true }
  );
  return response.data;
},


};
