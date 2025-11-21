"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, Fragment } from "react";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import PhoneInputField from "@/components/ho-tro/PhoneInputField"; // Đảm bảo đường dẫn đúng
import type { IconType } from "react-icons";
import {
  FiLoader,
  FiXCircle,
  FiCheckCircle,
  FiYoutube,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiPhone,
  FiMapPin,
  FiMail,
  FiChevronDown,
  FiCheck,
  FiX,
} from "react-icons/fi";
import FaqSection from "@/components/Faq";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { Listbox, Transition } from "@headlessui/react";

import { contactData } from "@/lib/api/contact";

const subjectOptions = [
  { id: "tuvan", name: "Tư vấn sản phẩm" },
  { id: "hotro", name: "Hỗ trợ kỹ thuật" },
  { id: "hopTac", name: "Hợp tác kinh doanh" },
];

export default function HoTro() {
  const {
    headline,
    contactForm,
    contactInformation,
    supportSoftware,
    faqSection,
  } = contactData ?? {};

  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [subject, setSubject] = useState(subjectOptions[0]);
  const [subjectError, setSubjectError] = useState("");

  const [description, setDescription] = useState("");

  const [formError, setFormError] = useState<string>("");
  const [formSuccess, setFormSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialIcons: Record<string, IconType> = {
    facebook: BiLogoFacebookCircle,
    youtube: FiYoutube,
    website: FiGlobe,
    instagram: FiInstagram,
    linkedin: FiLinkedin,
    twitter: FiTwitter,
    github: FiGithub,
  };

  // --- STANDARDIZED STYLING (From Register Page) ---
  // Đây là logic style giống hệt trang Register bạn yêu cầu
  const getInputClass = (hasError: boolean) =>
    `w-full rounded-lg border-2 px-2 py-2 text-base placeholder-gray-400 text-sm md:text-body2 lg:text-sub2 text-black
     ${hasError ? "border-red-500" : "border-gray-300"}
     outline-none focus:border-blue-500 transition-all bg-white`;

  const labelClass =
    "block text-black font-semibold text-sm md:text-body2 lg:text-sub2 mb-2";

  // --- Logic Validation ---
  const validateFullName = () => {
    const value = fullName.trim();
    if (!value) {
      setFullNameError("Vui lòng nhập họ và tên.");
      return false;
    }
    if (value.length < 3) {
      setFullNameError("Họ và tên phải từ 3 ký tự trở lên.");
      return false;
    }
    const validNameRegex = /^[A-Za-zÀ-ỹ\s'-]+$/u;
    if (!validNameRegex.test(value)) {
      setFullNameError("Họ và tên không chứa số hoặc ký tự đặc biệt.");
      return false;
    }
    setFullNameError("");
    return true;
  };

  const validatePhone = () => {
    const value = phone.replace(/\s+/g, "");
    if (!value) {
      setPhoneError("Vui lòng nhập số điện thoại.");
      return false;
    }
    const onlyNumber = /^\+[0-9]{10,15}$/;
    if (!onlyNumber.test(phone)) {
      setPhoneError("Vui lòng kiểm tra lại số điện thoại.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateEmail = () => {
    const value = email.trim();
    if (!value) {
      setEmailError("Vui lòng nhập email.");
      return false;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
      setEmailError("Email cần có định dạng ten@domain.com.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validateSubject = () => {
    if (!subject) {
      setSubjectError("Vui lòng chọn chủ đề chính.");
      return false;
    }
    setSubjectError("");
    return true;
  };

  // --- Logic Submit ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isSubjectValid = validateSubject();

    if (!isFullNameValid || !isEmailValid || !isPhoneValid || !isSubjectValid) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Demo success logic
    const isSuccess = true;

    if (isSuccess) {
      setFormSuccess(
        "Đã gửi thành công. Cảm ơn bạn đã liên hệ với VPharma. Chúng tôi sẽ phản hồi lại trong vòng 24 giờ làm việc."
      );
      setFullName("");
      setPhone("");
      setEmail("");
      setSubject(subjectOptions[0]);
      setDescription("");
    } else {
      setFormError(
        "Rất tiếc, đã có lỗi xảy ra. Bạn có thể thử lại, hoặc liên hệ trực tiếp với chúng tôi qua hotline hoặc email để được hỗ trợ."
      );
    }
    setIsSubmitting(false);
  };
 
  const iconClass ="mt-1 flex-shrink-0 text-success mr-3 md:mr-4 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7";
  return (
    <div>
      {/** Dashboard */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-10 text-center">
        <div className="container ">
          <h1 className="mt-10">{headline?.title}</h1>
          <p className="mx-auto text-colordescription text-sub2 md:text-sub1 lg:text-h6 md:mb-15 max-w-3xl">
            {headline?.description}
          </p>
        </div>
      </section>

      {/* Phần Form và Thông tin liên hệ */}
      <FadeInOnScroll>
        <section className="bg-white pb-10 px-4">
          <div className="max-w-6xl px-4 lg:px-0  mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Form Liên hệ */}
            <div>
              <h2 className="text-black mb-3 md:mb-5">{contactForm?.title}</h2>
              <p className="mb-4 md:mb-5 text-body2 md:text-sub2 lg:text-sub1 text-colordescription">
                {contactForm?.description}
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Họ và Tên */}
                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value.trimStart());
                      if (fullNameError) setFullNameError("");
                    }}
                    onBlur={validateFullName}
                    required
                    // SỬ DỤNG CLASS MỚI
                    className={getInputClass(!!fullNameError)}
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
                  <label htmlFor="phone" className={labelClass}>
                    Số điện thoại
                  </label>
                  <PhoneInputField
                    value={phone}
                    onChange={(value) => {
                      setPhone(value);
                      if (phoneError) setPhoneError("");
                    }}
                    onBlur={() => validatePhone()}
                    error={phoneError}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    onBlur={validateEmail}
                    required
                    // SỬ DỤNG CLASS MỚI
                    className={getInputClass(!!emailError)}
                    placeholder="Địa chỉ Email"
                  />
                  {emailError && (
                    <div className="mt-1 text-sm text-red-600">
                      {emailError}
                    </div>
                  )}
                </div>

                {/* Chủ đề chính (ListBox) */}
                <div>
                  <label htmlFor="subject" className={labelClass}>
                    Chủ đề chính
                  </label>
                  <Listbox value={subject} onChange={setSubject}>
                    <div className="relative">
                      <Listbox.Button
                        // SỬ DỤNG CLASS MỚI + text-left
                        className={`${getInputClass(
                          !!subjectError
                        )} text-left relative`}
                      >
                        <span className="block truncate">{subject.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <FiChevronDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto 
                                    rounded-lg bg-white py-1 text-sm md:text-body2 lg:text-sub2 shadow-lg 
                                    ring-1 ring-opacity-5 focus:outline-none"
                        >
                          {subjectOptions.map((option) => (
                            <Listbox.Option
                              key={option.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-blue-100 text-primary"
                                    : "text-gray-900"
                                }`
                              }
                              value={option}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {option.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <FiCheck
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                  {subjectError && (
                    <div className="mt-1 text-sm text-red-600">
                      {subjectError}
                    </div>
                  )}
                </div>

                {/* Mô tả chi tiết */}
                <div>
                  <label htmlFor="description" className={labelClass}>
                    Mô tả chi tiết (không bắt buộc)
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // SỬ DỤNG CLASS MỚI + resize-none
                    className={`${getInputClass(
                      false
                    )} resize-none min-h-[90px]`}
                    placeholder="Nhà thuốc của tôi có 2 chi nhánh, đang cần quản lý tồn kho..."
                  />
                </div>

                {/* Trạng thái lỗi/ thành công */}
                {formError && (
                  <div className="w-full p-4 rounded-lg bg-red-100 text-red-700 flex items-center justify-between">
                    <div className="flex items-center">
                      <FiXCircle className="mr-2 flex-shrink-0" /> {formError}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormError("")}
                      className="text-red-700 hover:text-red-900"
                      aria-label="Đóng thông báo"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
                {formSuccess && (
                  <div className="w-full p-4 rounded-lg bg-green-100 text-green-700 flex items-center justify-between">
                    <div className="flex items-center">
                      <FiCheckCircle className="mr-2 flex-shrink-0" />{" "}
                      {formSuccess}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormSuccess("")}
                      className="text-green-700 hover:text-green-900"
                      aria-label="Đóng thông báo"
                    >
                      <FiX />
                    </button>
                  </div>
                )}

                {/* Link Chính sách bảo mật */}
                <p className="!mt-4 text-sm md:text-body2 lg:text-sub2 text-gray-600">
                  Chúng tôi cam kết bảo mật thông tin của bạn. Xem chi tiết tại{" "}
                  <Link
                    href="/chinh-sach-bao-mat"
                    className="text-primary hover:underline font-medium"
                  >
                    Chính sách Bảo mật
                  </Link>
                  .
                </p>

                {/* Submit button */}
                <button
                  type="submit"
                  className=" mx-auto w-full sm:w-auto rounded-full text-base md:text-lg bg-primary px-6 py-3 font-bold text-white hover:opacity-90 transition-all"
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
              <h2 className="text-black mb-3 md:mb-5">
                {contactInformation?.title}
              </h2>
              <p className="mb-4 md:mb-5 text-body2 md:text-sub2 lg:text-sub1 text-colordescription">
                {contactInformation?.description}
              </p>

              {/* Bản đồ */}
              <div className="rounded-xl overflow-hidden mb-10 w-full h-[200px] shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.117942159811!2d106.7447473758832!3d10.80239985878438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175261b83fcf64b%3A0xb35a507b94ea8630!2zNyDEkMaw4budbmcgN2MsIEFuIFBow7osIFF14bqtbiAyLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdG5hbQ!5e0!3m2!1svi!2s!4v1695551234567!5m2!1svi!2s"
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
                <li className="flex items-start mb-10">
                  <FiPhone
                    className= {iconClass}
                  />
                  <div>
                    <a
                      href={`tel:${contactInformation?.phone}`}
                      className="hover:text-blue-500 text-body2 md:text-sub2 lg:text-sub1"
                    >
                      {contactInformation?.phone?.platform}
                    </a>
                  </div>
                </li>
                <li className="flex items-start mb-10">
                  <FiMail
                    className={iconClass}
                  />
                  <div>
                    <a
                      href={`mailto:${contactInformation?.email}`}
                      className="hover:text-blue-500 text-body2 md:text-sub2 lg:text-sub1"
                    >
                      {contactInformation?.email?.platform}
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <FiMapPin
                    className={iconClass}
                  />
                  <div>
                    <a
                      href={contactData?.contactInformation?.address?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 text-body2 md:text-sub2 lg:text-sub1"
                    >
                      {contactData?.contactInformation?.address?.platform}
                    </a>
                  </div>
                </li>
              </ul>

              {/* Social links */}
              <div className="mt-10 flex space-x-4">
                {contactInformation?.socials?.map((social, index) => {
                  const Icon = socialIcons[social.platform?.toLowerCase()];
                  return (
                    Icon && (
                      <Link
                        aria-label={social.platform}
                        key={index}
                        href={social.url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-success hover:text-blue-500 transition-colors"
                      >
                        <Icon className={iconClass} />
                      </Link>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* --- SECTION FAQ --- */}
      <FaqSection title={faqSection?.title} items={faqSection?.faqItems} />

      {/* --- SECTION PHẦN MỀM HỖ TRỢ  */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center mb-5 text-black">
            {supportSoftware?.title}
          </h2>
          <p className="mb-5 md:mb-10 lg:mb-15 text-body2 md:text-sub2 lg:text-sub1 text-colordescription text-center mx-auto max-w-3xl">
            {supportSoftware?.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {supportSoftware?.supportCards?.map((software, index) => (
              <div
                key={index}
                className=" bg-white p-4 md:p-5 lg:p-8 rounded-lg border shadow-md text-center flex flex-col items-center"
              >
                <div className="w-18 h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 relative mb-6">
                  <Image
                    src={software.icon}
                    alt={`Logo ${software.title}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-body2 md:text-sub2 lg:text-sub1 font-bold text-black mb-3 md:mb-5">
                  {software.title}
                </h3>
                <p className="text-sm md:text-body2 lg:text-sub2 mb-5 md:mb-8 flex-grow">
                  {software.description}
                </p>
                <a
                  href={software.ctaButton.link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-sm md:text-body2 lg:text-sub2 rounded-lg bg-primary hover:bg-blue-700 px-4 py-1 md:px-6 py-2 lg:px-8 lg:py-3font-bold text-white transition-colors duration-200"
                >
                  {software.ctaButton.title}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
