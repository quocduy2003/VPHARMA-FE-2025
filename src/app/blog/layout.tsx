import { BlogHeader } from "@/components/layout/BlogHeader";
import React, { Suspense } from "react";
import { LoadingSkeleton } from "@/components/animations/BlogLoading";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<LoadingSkeleton />}>
        <BlogHeader />
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        {children}
      </Suspense>
    </div>
  );
}