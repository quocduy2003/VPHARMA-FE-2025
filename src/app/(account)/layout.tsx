import AccountNavFab from "@/components/account/AccountNavFab";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative">
      {/* Vùng nội dung chính - Căn giữa */}
      <main >
        {children}
      </main>

      {/* Nút điều hướng nổi - Góc dưới trái */}
      <AccountNavFab />
    </div>
  );
}