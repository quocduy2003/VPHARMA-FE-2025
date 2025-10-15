"use client";
import Link from "next/link";
import { useState } from "react";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import PhoneInputField from "@/components/ho-tro/PhoneInputField";
import { FiLoader, FiXCircle, FiCheckCircle } from "react-icons/fi";

import {
  FiFacebook,
  FiYoutube,
  FiGlobe,
  FiPhone,
  FiMapPin,
  FiMail,
  FiChevronDown,
} from "react-icons/fi";

export default function HoTro() {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trimStart(); // loại bỏ ký tự space ở đầu nhưng giữ lại ở giữa tên
    setFullName(value);
    // Có thể thêm kiểm tra trường này trống hay định dạng đặc biệt để set fullNameError
    if (!value.trim()) {
      setFullNameError("Vui lòng nhập họ và tên.");
      return;
    }

    // Kiểm tra độ dài tối thiểu (ví dụ: từ 3 ký tự)
    if (value.length < 3) {
      setFullNameError("Họ và tên phải từ 3 ký tự trở lên.");
      return;
    }

    // Kiểm tra không chứa số hoặc ký tự đặc biệt
    const validNameRegex = /^[A-Za-zÀ-ỹ\s'-]+$/u;
    if (!validNameRegex.test(value)) {
      setFullNameError("Họ và tên không chứa số hoặc ký tự đặc biệt.");
      return;
    }
    setFullNameError("");
  };

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const handlePhoneChange = (value: string) => {
    setPhone(value);
    // Nếu muốn validate realtime:
    const onlyNumber = /^[0-9]{9,12}$/;
    if (!onlyNumber.test(value.replace(/\s+/g, ""))) {
      setPhoneError("Vui lòng kiểm tra lại số điện thoại.");
    } else {
      setPhoneError("");
    }
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    //kiểm tra định dạng email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(e.target.value)) {
      setEmailError("Email cần có định dạng ten@domain.com.");
    } else {
      setEmailError("");
    }
  };

  const [subject, setSubject] = useState("");
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
    // Nếu cần validate thì bổ sung tại đây.
  };

  const [description, setDescription] = useState("");
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    // Nếu muốn validate, hãy bổ sung logic tại đây.
  };

  const [formError, setFormError] = useState<string>("");

  const [formSuccess, setFormSuccess] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // xử lý gửi dữ liệu...

    setIsSubmitting(false);
  };
  return (
    <div>
      {/** Dashboard */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-20 text-center">
        <div className="container mx-auto px-4 lg:px-80">
          <h1 className="text-h1 font-bold text-black">Liên Hệ Hỗ Trợ</h1>
          <p className="mx-auto mt-4 max-w-3x">
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
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-gray-500 font-medium text-sm mb-2"
                  >
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={handleFullNameChange}
                    required
                    className={`w-full rounded-lg border-2 px-4 py-3 text-base placeholder-gray-400 
        ${fullNameError ? "border-red-500" : "border-gray-300"}
        outline-none focus:border-blue-500 transition-all`}
                    placeholder="Họ và Tên"
                  />
                  {fullNameError && (
                    <div className="mt-1 text-sm text-red-600">
                      {fullNameError}
                    </div>
                  )}
                </div>

                {/* Số điện thoại */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-500 font-medium text-sm mb-2"
                  >
                    Số điện thoại
                  </label>
                  <PhoneInputField
                    value={phone}
                    onChange={handlePhoneChange}
                    error={phoneError}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-500 font-medium text-sm mb-2"
                  >
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className={`w-full rounded-lg border-2 px-4 py-3 text-base placeholder-gray-400 
                    ${emailError ? "border-red-500" : "border-gray-300"}
                    outline-none focus:border-blue-500 transition-all`}
                    placeholder="Địa chỉ Email"
                  />
                  {emailError && (
                    <div className="mt-1 text-sm text-red-600">
                      {emailError}
                    </div>
                  )}
                </div>

                {/* Chủ đề chính */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-500 font-medium text-sm mb-2"
                  >
                    Chủ đề chính
                  </label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    required
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base outline-none focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="" disabled hidden>
                      Chủ đề chính
                    </option>
                    <option value="tuvan">Tư vấn sản phẩm</option>
                    <option value="hotro">Hỗ trợ kỹ thuật</option>
                    <option value="hopTac">Hợp tác kinh doanh</option>
                  </select>
                </div>

                {/* Mô tả chi tiết */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-500 font-medium text-sm mb-2"
                  >
                    Mô tả chi tiết (không bắt buộc)
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={handleDescriptionChange}
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base outline-none resize-none focus:border-blue-500 transition-all min-h-[90px]"
                    placeholder="Mô tả chi tiết"
                  />
                </div>

                {/* Trạng thái lỗi/ thành công */}
                {formError && (
                  <div className="w-full p-4 rounded bg-red-100 text-red-600 mb-4 flex items-center">
                    <FiXCircle className="mr-2" /> {formError}
                  </div>
                )}
                {formSuccess && (
                  <div className="w-full p-4 rounded bg-green-100 text-green-600 mb-4 flex items-center">
                    <FiCheckCircle className="mr-2" /> {formSuccess}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full md:w-auto mt-6 rounded-lg bg-blue-500 hover:bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-200 flex items-center justify-center disabled:bg-blue-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <FiLoader className="mr-2 animate-spin" />
                  ) : null}
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
