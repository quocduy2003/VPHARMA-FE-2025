import { BlogHeader } from "@/components/layout/BlogHeader";
import React, { Suspense } from "react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense>
        <BlogHeader />
      </Suspense>

      <Suspense>
        {children}
      </Suspense>
    </div>
  );
}