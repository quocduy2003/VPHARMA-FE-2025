import { User } from "./user";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  signUp: (
    displayName: string,
    username: string,
    password: string,
    phone: string,
    companyName: string
  ) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
}
