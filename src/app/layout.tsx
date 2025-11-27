// // src/app/layout.tsx
// import './globals.css';
// import type { Metadata } from 'next';
// import { Header } from '@/components/Header';
// import { Footer } from '@/components/Footer';
// import ScrollToTopButton from "@/components/ScrollToTopButton";

// export const metadata: Metadata = {
//   title: 'Vpharma',
// };

// export default function RootLayout({
//   children,
// }: {
//   readonly children: React.ReactNode;
// }) {
//   return (
//     <html lang="vi">
//       <body>
//         <Header />
//         <main className="flex-1">{children}</main>
//         <ScrollToTopButton />
//         <Footer />

//       </body>
//     </html>
//   );
// }

// src/app/layout.tsx
import './globals.css';
import { SavedPostProvider } from "@/context/SavedPostContext";
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: 'Vpharma',
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <SavedPostProvider>
          <Header />
        <main className="flex-1">{children}</main>
        <ScrollToTopButton />
        <Footer />
        </SavedPostProvider>
        

      </body>
    </html>
  );
}
