import { SolutionsSubHeader } from '@/components/layout/SolutionsSubHeader'

export default function GiaiPhapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SolutionsSubHeader />
      <main>{children}</main>
    </div>
  );
}
