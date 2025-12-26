
export interface User {
  id: string;
  username: string;
  email?: string;
  phone: string;
  displayName: string;
  companyName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ChangePasswordPayload {
  oldPass: string;
  newPass: string;
}
