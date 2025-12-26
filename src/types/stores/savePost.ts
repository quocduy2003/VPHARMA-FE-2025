export interface Folder {
    id: string;
    name: string;
    userId: string;
    parentId: string ;
    children?: Folder[];
    articles?: SavedArticle[];
    createdAt: string;
    updatedAt: string;
}

export interface FolderChildren {
    id: string;
    name: string;
    parentId: string;
    createdAt: string;
    updatedAt: string;
}
export interface SavedArticle {
    id: string;
    slug: string;
    folderId: string;
    createdAt: string;
    updatedAt: string;
}
export interface ActionResult {
    success: boolean;
    message?: string;
}

