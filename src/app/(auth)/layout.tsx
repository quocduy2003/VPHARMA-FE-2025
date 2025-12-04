"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { redirect, useRouter } from "next/navigation";



export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuthStore();
    const router = useRouter();

    // if (!user){
    //     redirect("/signin");
    // }else{
    //     redirect("/profile");
    // }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {children}
        </div>
    );
}