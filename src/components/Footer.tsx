"use client";

import Link from 'next/link';
import { FiYoutube, FiPhone, FiMapPin, FiMail, FiGlobe, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
import { BiLogoFacebookCircle } from 'react-icons/bi';
import Image from 'next/image';
import { footerData } from '@/lib/api/footer';
import { IconType } from 'react-icons';


export function Footer() {
  const socialIcons: Record<string, IconType> = {
    facebook: BiLogoFacebookCircle,
    youtube: FiYoutube,
    website: FiGlobe,
    instagram: FiInstagram,
    linkedin: FiLinkedin,
    twitter: FiTwitter,
  };
  const { logo, socials, footerMenu, phone, email, location } = footerData || {};
  console.log('Footer data:', footerData);
  return (
    <footer className="bg-ink text-sm text-white rounded-t-4xl">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-6">
        {/* Cột 1: Thông tin công ty */}
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo?.url || "/Vpharma-AMIT.png"} alt={logo?.alt || "Vpharma-AMIT"} width={200}    // chọn số tùy ý, ví dụ 120px
              height={68} className="h-17" />
          </Link>
          <p className="mt-4 text-sub2 text-white/80">
            {footerData?.description || "Giải pháp phần mềm giúp nhà thuốc tăng 30% doanh thu và đạt 99,9% độ chính xác trong 120 ngày — tối ưu hiệu quả, tập trung chăm sóc khách hàng."}</p>
          <div className="mt-6 flex gap-4">
            {socials?.map((social, index) => {
              const Icon = socialIcons[social.title?.toLowerCase()];
              return (
                Icon && (
                  <Link
                    aria-label={social.title}
                    key={index}
                    href={social.link ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-7 w-7 hover:text-primary"
                  >
                    <Icon size={27} />
                  </Link>
                )
              );
            })}
          </div>
          <ul className="mt-8 space-y-4 text-sub2 text-white/80">
            <li className="flex items-start gap-3">
              <FiPhone className="mt-1 flex-shrink-0 text-success" />
              <Link
                href={`tel:${(phone.link || "(+84) 911 000 038").replace(/[^\d+]/g, "")}`}
                aria-label={`Gọi số ${phone.title || "(+84) 911 000 038"}`}
                className="hover:text-white"
              >
                {phone.title || "(+84) 911 000 038"}
              </Link>
            </li>

            <li className="flex items-start gap-3">
              <FiMail className="mt-1 flex-shrink-0 text-success" />
              <Link
                href={`mailto:${email?.link || "contact@amitgroup.asia"}`}
                aria-label={`Gửi email tới ${email?.title || "contact@amitgroup.asia"}`}
                className="hover:text-white"
              >
                {email?.title || "contact@amitgroup.asia"}
              </Link>
            </li>
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-1 flex-shrink-0 text-success" />
              <Link
                href={location?.link || "https://maps.app.goo.gl/xnSXqtouAAk2yewr7"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Xem bản đồ: ${location?.title || "Vị trí công ty"}`}
                className="hover:text-white"
              >
                {location?.title || "Số 7, Đường 7C, Khu đô thị An Phú An Khánh, Phường Bình Trưng, TP. Hồ Chí Minh"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Các cột link */}
        {footerMenu?.map((menu, index) => {
          const menus = menu.menus ?? []; // nếu null/undefined thì thành mảng rỗng

          return (
            <div key={index}>
              <h4 className="mb-4 font-semibold text-success text-h6">{menu.title}</h4>
              <ul className="space-y-3 text-sub2 text-white/80">
                {menus.length > 0 ? (
                  menus.map((menu) => (
                    <li key={menu.id}>
                      <Link
                        href={menu.link || "#"}
                        target={menu.target || "_self"}
                        className="hover:text-white"
                      >
                        {menu.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="text-sub2 text-white/80 italic">Không có mục nào</span>
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </footer>
  );
}
