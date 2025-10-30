
import Link from 'next/link';
import { FiFacebook, FiYoutube, FiInstagram, FiLinkedin, FiPhone, FiMapPin, FiMail, FiGlobe } from 'react-icons/fi';
import Image from 'next/image';


export function Footer() {
  return (
    <footer className="bg-ink text-sm text-white rounded-t-4xl">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-6">
        {/* Cột 1: Thông tin công ty */}
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Vpharma-AMIT.png" alt="V-Pharma Logo" className="h-17" />
          </Link>
          <p className="mt-4 text-sub2 text-white/80">
            Giải pháp phần mềm giúp nhà thuốc tăng 30% doanh thu và đạt 99,9% độ chính xác trong 120 ngày — tối ưu hiệu quả, tập trung chăm sóc khách hàng.</p>
          <div className="mt-6 flex gap-4">
            <Link href="https://www.facebook.com/amitgroup.vn" target="_blank" aria-label="Facebook"><FiFacebook className="h-7 w-7 hover:text-primary" /></Link>
            <Link href="https://www.youtube.com/@AmitGROUPmkt" target="_blank" aria-label="YouTube"><FiYoutube className="h-7 w-7 hover:text-primary" /></Link>
            <Link href="https://amitgroup.asia/" target="_blank" aria-label="Website"><FiGlobe className="h-7 w-7 hover:text-primary" /></Link>
          </div>
          <ul className="mt-8 space-y-4 text-sub2 text-white/90">
            <li className="flex items-start gap-3">
              <FiPhone className="mt-1 flex-shrink-0 text-success" />
              <span>(+84) 911 000 038</span>
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="mt-1 flex-shrink-0 text-success" />
              <span>contact@amitgroup.asia</span>
            </li>
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-1 flex-shrink-0 text-success" />
              <span>Số 7, Đường 7C, KDT An Phú An Khánh, Phường Bình Trưng, TP. HCM</span>
            </li>
          </ul>
        </div>

        {/* Các cột link */}
        <div>
          <h4 className="mb-4 font-semibold text-success text-h6">Giải pháp</h4>
          <ul className="space-y-3 text-sub2 text-white/80">
            <li><Link href="/giai-phap/tong-quan" className="hover:text-white">Nhà thuốc/Quầy thuốc</Link></li>
            <li><Link href="/giai-phap/chuoi-nha-thuoc" className="hover:text-white">Chuỗi nhà thuốc</Link></li>
            <li><Link href="/giai-phap/phong-kham-co-nha-thuoc" className="hover:text-white">Phòng khám có nhà thuốc</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-success text-h6">Hỗ trợ</h4>
          <ul className="space-y-3 text-sub2 text-white/80">
            <li><Link href="#" className="hover:text-white">Hướng dẫn sử dụng</Link></li>
            <li><Link href="/blog/blog-home" className="hover:text-white">Blog</Link></li>
            <li><Link href="#" className="hover:text-white">Tư vấn giải pháp</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-success text-h6">Hợp tác</h4>
          <ul className="space-y-3 text-sub2 text-white/80">
            <li><Link href="#" className="hover:text-white">Đối tác kinh doanh</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-success text-h6">Về V-Pharma</h4>
          <ul className="space-y-3 text-sub2 text-white/80">
            <li><Link href="/about-us" className="hover:text-white">Giới thiệu</Link></li>
            <li><Link href="/khach-hang" className="hover:text-white">Khách hàng</Link></li>
            <li><Link href="#" className="hover:text-white">Điều khoản bảo mật</Link></li>
            <li><Link href="#" className="hover:text-white">Chính sách sử dụng</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
