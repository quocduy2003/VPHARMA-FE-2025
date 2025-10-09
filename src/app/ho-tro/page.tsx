"use client";
import Link from "next/link";
import { useState } from "react";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import {
  FiFacebook,
  FiYoutube,
  FiGlobe,
  FiPhone,
  FiMapPin,
  FiMail,
  FiChevronDown,
} from "react-icons/fi";

export default function ChuoiNhaThuoc() {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+84",
    flag: "🇻🇳",
    name: "Vietnam",
  });
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const countries = [
    { code: "+84", flag: "🇻🇳", name: "Vietnam" },
    { code: "+1", flag: "🇺🇸", name: "United States" },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+86", flag: "🇨🇳", name: "China" },
    { code: "+81", flag: "🇯🇵", name: "Japan" },
    { code: "+82", flag: "🇰🇷", name: "South Korea" },
    { code: "+65", flag: "🇸🇬", name: "Singapore" },
    { code: "+60", flag: "🇲🇾", name: "Malaysia" },
    { code: "+66", flag: "🇹🇭", name: "Thailand" },
    { code: "+62", flag: "🇮🇩", name: "Indonesia" },
    { code: "+63", flag: "🇵🇭", name: "Philippines" },
    { code: "+91", flag: "🇮🇳", name: "India" },
  ];

  return (
    <div>
      {/** Dashboard */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-20 text-center">
        <div className="container mx-auto px-4 lg:px-80">
          <h1 className="text-h1 font-bold text-ink">Liên Hệ Hỗ Trợ</h1>
          <p className="mx-auto mt-4 max-w-3xl text-h5">
            Giải pháp toàn diện cho quản lý nhà thuốc, từ tồn kho đến bán hàng,
            với công nghệ hiện đại và dễ sử dụng.
          </p>
        </div>
      </section>

      <FadeInOnScroll>
        <section className="bg-white pb-20">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Form Liên hệ */}
            <div>
              <h2 className="mb-3 text-2xl font-semibold">Get In Touch</h2>
              <p className="mb-7 text-gray-600">
                love to hear from you. Please fill out this form.
              </p>
              <form className="space-y-6">
                {/* Họ và Tên */}
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    required
                    className="peer w-full rounded-lg border border-gray-300 px-4 py-3 pt-6 pb-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-transparent"
                    placeholder="Họ và Tên"
                  />
                  <label
                    htmlFor="fullName"
                    className="absolute left-4 top-2 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-blue-500"
                  >
                    Họ và Tên
                  </label>
                </div>

                {/* Số điện thoại */}
                <div className="relative">
                  <div className="flex">
                    {/* Country Code Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setIsCountryDropdownOpen(!isCountryDropdownOpen)
                        }
                        className="flex items-center justify-center w-20 h-12 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 focus:outline-none"
                      >
                        <span className="text-lg mr-1">
                          {selectedCountry.flag}
                        </span>
                        <FiChevronDown size={14} className="text-gray-500" />
                      </button>

                      {/* Dropdown */}
                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 z-10 w-64 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country);
                                setIsCountryDropdownOpen(false);
                              }}
                              className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-left"
                            >
                              <span className="text-lg mr-3">
                                {country.flag}
                              </span>
                              <span className="text-sm font-medium mr-2">
                                {country.code}
                              </span>
                              <span className="text-sm text-gray-600">
                                {country.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div className="flex-1 relative">
                      <input
                        type="tel"
                        id="phoneNumber"
                        className="peer w-full rounded-r-lg border border-gray-300 px-4 py-3 pt-6 pb-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-transparent"
                        placeholder="Số điện thoại"
                      />
                      <label
                        htmlFor="phoneNumber"
                        className="absolute left-4 top-2 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-blue-500"
                      >
                        Số điện thoại
                      </label>
                      {/* Country code display */}
                      <span className="absolute left-4 top-8 text-sm text-gray-400">
                        {selectedCountry.code}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    className="peer w-full rounded-lg border border-gray-300 px-4 py-3 pt-6 pb-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-transparent"
                    placeholder="Địa chỉ Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-2 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-blue-500"
                  >
                    Địa chỉ Email
                  </label>
                </div>

                {/* Row 3: Chủ đề chính */}
                <div className="relative">
                  <select
                    id="subject"
                    className="peer w-full rounded-lg border border-gray-300 px-4 py-3 pt-6 pb-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled hidden></option>
                    <option value="consulting">Tư vấn sản phẩm</option>
                    <option value="support">Hỗ trợ kỹ thuật</option>
                    <option value="partnership">Hợp tác kinh doanh</option>
                    <option value="other">Khác</option>
                  </select>
                  <label
                    htmlFor="subject"
                    className="absolute left-4 top-2 text-xs font-medium text-gray-600 transition-all peer-[:not(:focus):invalid]:top-3.5 peer-[:not(:focus):invalid]:text-base peer-[:not(:focus):invalid]:text-gray-400"
                  >
                    Chủ đề chính
                  </label>
                  <FiChevronDown
                    className="absolute right-4 top-4 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>

                {/* Mô tả chi tiết */}
                <div className="relative">
                  <textarea
                    id="description"
                    rows={4}
                    className="peer w-full rounded-lg border border-gray-300 px-4 py-3 pt-6 pb-2 resize-none outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-transparent"
                    placeholder="Mô tả chi tiết (không bắt buộc)"
                  />
                  <label
                    htmlFor="description"
                    className="absolute left-4 top-2 text-xs font-medium text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-blue-500"
                  >
                    Mô tả chi tiết (không bắt buộc)
                  </label>
                  <div className="absolute left-4 top-8 text-sm text-gray-400 peer-focus:hidden peer-[:not(:placeholder-shown)]:hidden">
                    Nhà thuốc của tôi có 2 chi nhánh, đang cần quản lý tồn kho,
                    hạn sử dụng và kết nối với hệ thống bán hàng online...
                  </div>
                </div>

                {/* Chính sách bảo mật */}
                <div className="text-sm text-gray-600">
                  <span>
                    Chúng tôi cam kết bảo mật thông tin của bạn. Xem chi tiết
                    tại{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-blue-500 hover:underline"
                    >
                      Chính sách Bảo mật
                    </Link>
                    .
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full md:w-auto mt-6 rounded-lg bg-blue-500 hover:bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-200"
                >
                  Gửi yêu cầu
                </button>
              </form>
            </div>

            {/* Thông tin liên hệ + bản đồ */}
            <div>
              <h2 className="mb-3 text-2xl font-semibold">Liên Hệ Trực Tiếp</h2>
              <p className="mb-7 text-gray-600">
                Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
              </p>

              {/* Bản đồ */}
              <div className="rounded-xl overflow-hidden mb-6 w-full h-[200px] shadow-md">
                <iframe
                  src="https://maps.google.com/maps?q=C%C3%B4ng%20Ty%20C%E1%BB%95%20Ph%E1%BA%A7n%20Amit%20Group&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Contact info */}
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FiPhone
                    className="mr-4 mt-1 flex-shrink-0 text-blue-500"
                    size={20}
                  />
                  <div>
                    <div className="font-medium">0911 000 038</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <FiMail
                    className="mr-4 mt-1 flex-shrink-0 text-blue-500"
                    size={20}
                  />
                  <div>
                    <a
                      href="mailto:contact@amitgroup.asia"
                      className="hover:text-blue-500"
                    >
                      contact@amitgroup.asia
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <FiMapPin
                    className="mr-4 mt-1 flex-shrink-0 text-blue-500"
                    size={20}
                  />
                  <div>
                    <span>
                      Số 7, Đường 7C, Khu đô thị An Phú An Khánh, Phường Bình
                      Trưng, Thành phố Hồ Chí Minh
                    </span>
                  </div>
                </li>
              </ul>

              {/* Social links */}
              <div className="mt-8 flex space-x-4">
                <a
                  href="https://facebook.com/amitgroup.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <FiFacebook size={22} />
                </a>
                <a
                  href="https://www.youtube.com/@AmitGROUPmkt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <FiYoutube size={22} />
                </a>
                <a
                  href="https://www.amitgroup.asia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <FiGlobe size={22} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>
    </div>
  );
}
