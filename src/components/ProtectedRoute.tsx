"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState} from "react";
import { useFolderStore } from "@/stores/useFolderStore";
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { accessToken, user, fetchMe, refreshToken } = useAuthStore();
    const { fetchFolderTree, folderTree } = useFolderStore();

    const [starting, setStarting] = useState(false);
    const [loading, setLoading] = useState(true);
    const init = async () => {
        try {
            console.log("ProtectedRoute init start:", { accessToken, user, folderTree });
            if (!accessToken) {

                await refreshToken();
            }

            if (accessToken && !folderTree) {

                await fetchFolderTree();
            }
            console.log("ProtectedRoute init:", { accessToken, user, folderTree });

            if (accessToken && !user) {
                await fetchMe();
                await fetchFolderTree();
            }
            console.log("ProtectedRoute after fetchMe:", { accessToken, user, folderTree });
            setStarting(false);
        } catch (err) {
            console.error("ProtectedRoute init error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading || starting) {
        return <div className="h-screen flex justify-center items-center">Loading...</div>;
    }


    if (!accessToken) {
        router.replace("/signin");
        return null;
    }



    return <>{children}</>;
}
