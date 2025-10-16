import { BlogHeader } from "@/components/layout/BlogHeader";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <BlogHeader />
      <main>{children}</main>
    </div>
  );
}