import api from "@/lib/api/auth";

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
};
