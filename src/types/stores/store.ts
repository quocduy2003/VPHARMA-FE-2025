import { Folder, SavedPost } from "./savePost";
import { User } from "./user";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  setAccessToken: (accessToken: string | null) => void;
  clearState: () => void;
  signUp: (
    displayName: string,
    username: string,
    password: string,
    phone: string,
    companyName: string
  ) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchMe: () => Promise<void>;
  refreshToken: () => Promise<void>;
  authReady: boolean;
}

export interface SavePostState {
  folders: Folder[];
  savedPosts: SavedPost[];
  loading: boolean;

  // actions
  reset: () => void;
  fetchFolders: () => Promise<void>;
  // createFolder: (name: string) => Promise<void>;
  // savePost: (articleId: string, folderId: string | null) => Promise<void>;
  // removeSavedPost: (id: string) => Promise<void>;
}
