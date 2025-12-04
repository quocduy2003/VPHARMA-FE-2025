export interface Folder {
    id: string;
    name: string;
    userId: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
}


export interface SavedPost {
    id: string;
    articleId: string;
    folderId: string | null;
}

