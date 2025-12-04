"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState, useCallback } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { accessToken, user, fetchMe, refreshToken } = useAuthStore();

    const [starting, setStarting] = useState(false);
    const [loading, setLoading] = useState(true);
    const init = useCallback(async () => {
        try {
            if (!accessToken) {
                await refreshToken();
            }

            if (accessToken && !user) {
                await fetchMe();
            }
            setStarting(false);
        } catch (err) {
            console.error("ProtectedRoute init error:", err);
        } finally {
            setLoading(false);
        }
    }, [accessToken, user, fetchMe, refreshToken]);

    useEffect(() => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading || starting) {
        return <div className="h-screen flex justify-center items-center">Loading...</div>;
    }


    if (!accessToken) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa', accessToken)
        router.replace("/signin");
        return null;
    }



    return <>{children}</>;
}
