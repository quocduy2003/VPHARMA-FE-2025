
// import Link from 'next/link';
// import { FiYoutube, FiPhone, FiMapPin, FiMail, FiGlobe, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
// import { BiLogoFacebookCircle } from 'react-icons/bi';
// import Image from 'next/image';
// import { footerData } from '@/lib/api/footer';
// import { IconType } from 'react-icons';


// export function Footer() {
//   const socialIcons: Record<string, IconType> = {
//     facebook: BiLogoFacebookCircle,
//     youtube: FiYoutube,
//     website: FiGlobe,
//     instagram: FiInstagram,
//     linkedin: FiLinkedin,
//     twitter: FiTwitter,
//   };
//   const { logo, socials, footerMenu, phone, email, location } = footerData || {};
//   console.log('Footer data:', footerData);
//   return (
//     <footer className="bg-ink text-sm text-white rounded-t-4xl">
//       <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-6">
//         {/* Cột 1: Thông tin công ty */}
//         <div className="col-span-2">
//           <Link href="/" className="flex items-center gap-2">
//             <Image src={logo?.url || "/Vpharma-AMIT.png"} alt={logo?.alt || "Vpharma-AMIT"} width={200}    // chọn số tùy ý, ví dụ 120px
//               height={68} className="h-17" />
//           </Link>
//           <p className="mt-4 text-sub2 text-white/80">
//             {footerData?.description || "Giải pháp phần mềm giúp nhà thuốc tăng 30% doanh thu và đạt 99,9% độ chính xác trong 120 ngày — tối ưu hiệu quả, tập trung chăm sóc khách hàng."}</p>
//           <div className="mt-6 flex gap-4">
//             {socials?.map((social, index) => {
//               const Icon = socialIcons[social.title?.toLowerCase()];
//               return (
//                 Icon && (
//                   <Link
//                     aria-label={social.title}
//                     key={index}
//                     href={social.link ?? "#"}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="h-7 w-7 hover:text-primary"
//                   >
//                     <Icon size={27} />
//                   </Link>
//                 )
//               );
//             })}
//           </div>
//           <ul className="mt-8 space-y-4 text-sub2 text-white/80">
//             <li className="flex items-start gap-3">
//               <FiPhone className="mt-1 flex-shrink-0 text-success" />
//               <Link
//                 href={`tel:${(phone.link || "(+84) 911 000 038").replace(/[^\d+]/g, "")}`}
//                 aria-label={`Gọi số ${phone.title || "(+84) 911 000 038"}`}
//                 className="hover:text-white"
//               >
//                 {phone.title || "(+84) 911 000 038"}
//               </Link>
//             </li>

//             <li className="flex items-start gap-3">
//               <FiMail className="mt-1 flex-shrink-0 text-success" />
//               <Link
//                 href={`mailto:${email?.link || "contact@amitgroup.asia"}`}
//                 aria-label={`Gửi email tới ${email?.title || "contact@amitgroup.asia"}`}
//                 className="hover:text-white"
//               >
//                 {email?.title || "contact@amitgroup.asia"}
//               </Link>
//             </li>
//             <li className="flex items-start gap-3">
//               <FiMapPin className="mt-1 flex-shrink-0 text-success" />
//               <Link
//                 href={location?.link || "https://maps.app.goo.gl/xnSXqtouAAk2yewr7"}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label={`Xem bản đồ: ${location?.title || "Vị trí công ty"}`}
//                 className="hover:text-white"
//               >
//                 {location?.title || "Số 7, Đường 7C, Khu đô thị An Phú An Khánh, Phường Bình Trưng, TP. Hồ Chí Minh"}
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Các cột link */}
//         {footerMenu?.map((menu, index) => {
//           const menus = menu.menus ?? []; // nếu null/undefined thì thành mảng rỗng

//           return (
//             <div key={index}>
//               <h4 className="mb-4 font-semibold text-success text-h6">{menu.title}</h4>
//               <ul className="space-y-3 text-sub2 text-white/80">
//                 {menus.length > 0 ? (
//                   menus.map((menu) => (
//                     <li key={menu.id}>
//                       <Link
//                         href={menu.link || "#"}
//                         target={menu.target || "_self"}
//                         className="hover:text-white"
//                       >
//                         {menu.title}
//                       </Link>
//                     </li>
//                   ))
//                 ) : (
//                   <li>
//                     <span className="text-sub2 text-white/80 italic">Không có mục nào</span>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           );
//         })}
//       </div>
//     </footer>
//   );
// }


// import Link from 'next/link';
// import { FiYoutube, FiPhone, FiMapPin, FiMail, FiGlobe, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';
// import { BiLogoFacebookCircle } from 'react-icons/bi';
// import Image from 'next/image';
// import { footerData } from '@/lib/api/footer';
// import { IconType } from 'react-icons';


// export function Footer() {
//   const socialIcons: Record<string, IconType> = {
//     facebook: BiLogoFacebookCircle,
//     youtube: FiYoutube,
//     website: FiGlobe,
//     instagram: FiInstagram,
//     linkedin: FiLinkedin,
//     twitter: FiTwitter,
//   };
//   const { logo, socials, footerMenu, phone, email, location } = footerData || {};

//   // Tách riêng component để tái sử dụng
//   const renderSocials = () => (
//     <>
//       {socials?.map((social, index) => {
//         const Icon = socialIcons[social.title?.toLowerCase()];
//         return (
//           Icon && (
//             <Link
//               aria-label={social.title}
//               key={index}
//               href={social.link ?? "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="h-7 w-7 hover:text-primary"
//             >
//               <Icon size={27} />
//             </Link>
//           )
//         );
//       })}
//     </>
//   );

//   // Tách riêng component để tái sử dụng
//   const renderContactInfo = () => (
//     <>
//       <li className="flex items-start gap-3">
//         <FiPhone className="mt-1 flex-shrink-0 text-success" />
//         <Link
//           href={`tel:${(phone.link || "(+84) 911 000 038").replace(/[^\d+]/g, "")}`}
//           aria-label={`Gọi số ${phone.title || "(+84) 911 000 038"}`}
//           className="hover:text-white"
//         >
//           {phone.title || "(+84) 911 000 038"}
//         </Link>
//       </li>
//       <li className="flex items-start gap-3">
//         <FiMapPin className="mt-1 flex-shrink-0 text-success" />
//         <Link
//           href={location?.link || "https://maps.app.goo.gl/xnSXqtouAAk2yewr7"}
//           target="_blank"
//           rel="noopener noreferrer"
//           aria-label={`Xem bản đồ: ${location?.title || "Vị trí công ty"}`}
//           className="hover:text-white"
//         >
//           {location?.title || "Số 7, Đường 7C, Khu đô thị An Phú An Khánh, Phường Bình Trưng, TP. Hồ Chí Minh"}
//         </Link>
//       </li>
//       <li className="flex items-start gap-3">
//         <FiMail className="mt-1 flex-shrink-0 text-success" />
//         <Link
//           href={`mailto:${email?.link || "contact@amitgroup.asia"}`}
//           aria-label={`Gửi email tới ${email?.title || "contact@amitgroup.asia"}`}
//           className="hover:text-white"
//         >
//           {email?.title || "contact@amitgroup.asia"}
//         </Link>
//       </li>
//     </>
//   );

//   return (
//     <footer className="bg-ink text-sm text-white rounded-t-4xl">
//       {/* Giữ breakpoint 'md' (768px) cho layout 6 cột */}
//       <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-6">
        
//         {/* Cột 1: Thông tin (Logo, Desc, và Contact/Socials CHO TABLET+) */}
//         {/* Dùng 'md:col-span-2' */}
//         <div className="md:col-span-2">
//           <Link href="/" className="flex items-center gap-2 w-fit mx-auto md:mx-0 md:w-auto">
//             <Image src={logo?.url || "/Vpharma-AMIT.png"} alt={logo?.alt || "Vpharma-AMIT"} width={200}
//               height={68} className="h-17" />
//           </Link>
//           <p className="mt-4 text-sub2 text-white/80 text-center md:text-left">
//             {footerData?.description || "Giải pháp phần mềm giúp nhà thuốc tăng 30% doanh thu và đạt 99,9% độ chính xác trong 120 ngày — tối ưu hiệu quả, tập trung chăm sóc khách hàng."}
//           </p>
          
//           {/* Socials cho TABLET+ (Ẩn trên mobile < 768px) */}
//           <div className="hidden md:flex mt-6 gap-4">
//             {renderSocials()}
//           </div>
          
//           {/* Contact Info cho TABLET+ (Ẩn trên mobile < 768px) */}
//           <ul className="hidden md:block mt-8 space-y-4 text-sub2 text-white/80">
//             {renderContactInfo()}
//           </ul>
//         </div>

//         {/* Contact Info cho MOBILE (Chỉ hiện < 768px) */}
//         <ul className="space-y-4 text-sub2 text-white/80 md:hidden">
//             {renderContactInfo()}
//         </ul>

//         {/* Wrapper cho các cột link, chiếm 4 cột trên 'md' */}
//         <div className="md:col-span-4">
//           {/* Grid lồng nhau:
//               - Mobile (< 768px): 1 cột (mặc định)
//               - Tablet (md: 768px+): 2 cột (layout 2x2)
//               - Desktop (xl: 1280px+): 4 cột (layout 1x4)
//           */}
//           <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
//             {footerMenu?.map((menu, index) => {
//               const menus = menu.menus ?? [];
//               return (
//                 <div key={index} className="text-center md:text-left">
//                   <h4 className="mb-4 font-semibold text-success text-h6">{menu.title}</h4>
//                   <ul className="space-y-3 text-sub2 text-white/80 inline-block text-left mx-auto md:mx-0">
//                     {menus.length > 0 ? (
//                       menus.map((menu) => (
//                         <li key={menu.id}>
//                           <Link
//                             href={menu.link || "#"}
//                             target={menu.target || "_self"}
//                             className="hover:text-white"
//                           >
//                             {menu.title}
//                           </Link>
//                         </li>
//                       ))
//                     ) : (
//                       <li>
//                         <span className="text-sub2 text-white/80 italic">Không có mục nào</span>
//                       </li>
//                     )}
//                   </ul>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Socials cho MOBILE (Chỉ hiện < 768px) */}
//         <div className="flex justify-center gap-4 md:hidden">
//             {renderSocials()}
//         </div>
//       </div>

//       {/* Khối Copyright */}
//       <div className="container mx-auto mt-8 py-6 border-t border-white/20 text-center">
//         <p className="text-xs text-white/60">
//           Copyright © {new Date().getFullYear()} AMIT GROUP. All Rights Reserved | Designed by AMIT GROUP
//         </p>
//       </div>
//     </footer>
//   );
// }

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

  // Tách riêng component để tái sử dụng
  const renderSocials = () => (
    <>
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
    </>
  );

  // Tách riêng component để tái sử dụng
  const renderContactInfo = () => (
    <>
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
    </>
  );

  return (
    <footer className="bg-ink text-sm text-white rounded-t-4xl">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-6">
        
        {/* Cột 1: Thông tin (Logo, Desc, và Contact/Socials CHO TABLET+) */}
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 w-fit mx-auto md:mx-0 md:w-auto">
            <Image src={logo?.url || "/Vpharma-AMIT.png"} alt={logo?.alt || "Vpharma-AMIT"} width={200}
              height={68} className="h-17" />
          </Link>
          
          {/* SỬA 1: Thêm 'hidden md:block' để ẩn description trên mobile */}
          <p className="mt-4 text-sub2 text-white/80 text-center md:text-left hidden md:block">
            {footerData?.description || "Giải pháp phần mềm giúp nhà thuốc tăng 30% doanh thu và đạt 99,9% độ chính xác trong 120 ngày — tối ưu hiệu quả, tập trung chăm sóc khách hàng."}
          </p>
          
          {/* Socials cho TABLET+ (Ẩn trên mobile < 768px) */}
          <div className="hidden md:flex mt-6 gap-4">
            {renderSocials()}
          </div>
          
          {/* Contact Info cho TABLET+ (Ẩn trên mobile < 768px) */}
          <ul className="hidden md:block mt-8 space-y-4 text-sub2 text-white/80">
            {renderContactInfo()}
          </ul>
        </div>

        {/* Contact Info cho MOBILE (Chỉ hiện < 768px) */}
        {/* SỬA 3: Thêm 'w-fit mx-auto' để canh giữa khối contact info */}
        <ul className="space-y-4 text-sub2 text-white/80 md:hidden w-fit mx-auto">
            {renderContactInfo()}
        </ul>

        {/* Wrapper cho các cột link, chiếm 4 cột trên 'md' */}
        <div className="md:col-span-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
            {footerMenu?.map((menu, index) => {
              const menus = menu.menus ?? [];
              return (
                // 'text-center' có sẵn đã canh giữa tiêu đề
                <div key={index} className="text-center md:text-left">
                  <h4 className="mb-4 font-semibold text-success text-h6">{menu.title}</h4>
                  
                  {/* SỬA 2: Đổi 'text-left' thành 'text-center' và thêm 'md:text-left' */}
                  <ul className="space-y-3 text-sub2 text-white/80 inline-block text-center mx-auto md:mx-0 md:text-left">
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
        </div>

        {/* Socials cho MOBILE (Chỉ hiện < 768px) */}
        <div className="flex justify-center gap-4 md:hidden">
            {renderSocials()}
        </div>
      </div>

      {/* Khối Copyright */}
      <div className="container mx-auto mt-8 py-6 border-t border-white/20 text-center">
        <p className="text-xs text-white/60">
          Copyright © {new Date().getFullYear()} AMIT GROUP. All Rights Reserved | Designed by AMIT GROUP
        </p>
      </div>
    </footer>
  );
}