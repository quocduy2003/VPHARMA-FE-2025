import { HeaderMenuItem, CtaButton } from "@/types";


const mainNavLinks: HeaderMenuItem[] = [
  { id: 1, link: "/giai-phap/tong-quan", title: "Giải Pháp", level: 1, parent: null, target: "_self", children: [] },
  { id: 2, link: "/bang-gia", title: "Bảng Giá", level: 1, parent: null, target: "_self", children: [] },
  { id: 3, link: "/khach-hang", title: "Khách Hàng", level: 1, parent: null, target: "_self", children: [] },
  { id: 4, link: "/doi-tac-kinh-doanh", title: "Đối Tác", level: 1, parent: null, target: "_self", children: [] },
  { id: 5, link: "/ho-tro", title: "Hỗ Trợ", level: 1, parent: null, target: "_self", children: [] },
  { id: 6, link: "/about-us", title: "Về V-Pharma", level: 1, parent: null, target: "_self", children: [] },
  { id: 7, link: "/blog/blog-home", title: "Blog", level: 1, parent: null, target: "_self", children: [] },
];

const ctaButtons: CtaButton[] = [
  { title: "Đăng nhập", link: "/login" },
  { title: "Đăng ký dùng thử", link: "/register" },
];


export { mainNavLinks, ctaButtons };