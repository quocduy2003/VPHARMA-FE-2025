
import { Folder, SavedArticle, FolderChildren, ActionResult } from "./savePost";
import { User } from "./user";
import { BlogCardData } from "@/types";
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
  updateMe: (data: Partial<User>) => void;
  changePassword: (payload: {
    oldPass: string;
    newPass: string;
  }) => Promise<void>;

}
export interface UserState {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  fetchUserById: (userId: string) => Promise<User | null>;
}

export interface FolderState {
  folders: Folder[];
  folderTree: Folder [];
  folderChildren: Folder[] ;
  loading: boolean;

  // actions
  reset: () => void;
  fetchFolders: () => Promise<void>;
  fetchFolderTree: () => Promise<void>;
  fetchFolderById: (folderId: string , sortKey?: string) => Promise<FolderChildren[]>;
  fetchAllFolders: () => Promise<Folder[]>;
  createFolder: (name: string, parentId: string) => Promise<ActionResult>;
  deleteFolders: (folderIds: string[]) => Promise<void>;
  moveFolders: (params: {folderIds: string[], targetParentId: string | null}) => Promise<void>;
  renameFolder: (folderId: string, newName: string) => Promise<ActionResult>;
}
export interface FolderArticleState {
  savedArticles: SavedArticle[];
  loading: boolean;
  // actions
  fetchFolderArticles: (params: { folderId: string; page?: number; pageSize?: number; sortKey?: string, search?: string }) => Promise<BlogCardData>;
  addArticle: (articleId: string, folderId: string) => Promise<void>;
  deleteArticles: (articleIds: string[]) => Promise<void>;
  moveArticles: (params: {articleIds: string[], targetFolderId: string | null}) => Promise<void>;
  // removeSavedPost: (id: string) => Promise<void>;
}