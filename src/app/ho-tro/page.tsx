"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, Fragment } from "react";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import PhoneInputField from "@/components/ho-tro/PhoneInputField";
import {
  FiLoader,
  FiXCircle,
  FiCheckCircle,
  FiFacebook,
  FiYoutube,
  FiGlobe,
  FiPhone,
  FiMapPin,
  FiMail,
  FiChevronDown, // Sẽ dùng cho Listbox
  FiCheck,
  FiPlus,
  FiMinus,
  FiX,
} from "react-icons/fi";
import FaqSection, { type Faq } from "@/components/Faq";
import { Listbox, Transition } from "@headlessui/react";

// Dữ liệu cho phần mềm hỗ trợ 
const supportSoftwareData = [
  {
    name: "TeamViewer",
    description:
      "Giải pháp điều khiển máy tính từ xa phổ biến, an toàn và bảo mật.",
    link: "https://www.teamviewer.com/",
    logo: "/logoTeamviewer.png",
  },
  {
    name: "UltraViewer",
    description:
      "Phần mềm điều khiển từ xa được thiết kế gọn nhẹ và dễ sử dụng.",
    link: "https://ultraviewer.net/",
    logo: "/logoUltraview.png", 
  },
  {
    name: "AnyDesk",
    description:
      "Phần mềm truy cập từ xa nhanh, nhẹ và an toàn cho mọi nền tảng.",
    link: "https://anydesk.com/",
    logo: "/logoAnyDesk.png", 
  },
];

// dữ liệu FAQ
const hoTroFaqData: Faq[] = [
  {
    question: "Phần mềm V-Pharma có dễ sử dụng không?",
    answer:
      "Tuyệt đối! V-Pharma được thiết kế với giao diện thân thiện, trực quan, phù hợp với cả những người không rành về công nghệ. Đội ngũ của chúng tôi sẽ đào tạo 1-1 cho đến khi bạn và nhân viên thành thạo.",
  },
  {
    question: "Chi phí sử dụng phần mềm là bao nhiêu?",
    answer:
      "Chi phí rất hợp lý và linh hoạt theo quy mô của nhà thuốc. Vui lòng liên hệ để nhận báo giá chi tiết.",
  },
  {
    question: "Tôi có cần cài đặt phần mềm phức tạp không?",
    answer:
      "Không, V-Pharma là giải pháp dựa trên nền tảng web, bạn có thể truy cập từ bất kỳ đâu mà không cần cài đặt phức tạp.",
  },
  {
    question: "Dữ liệu của tôi có được bảo mật không?",
    answer:
      "An toàn dữ liệu là ưu tiên hàng đầu của chúng tôi. Hệ thống sử dụng các biện pháp bảo mật tiên tiến và sao lưu dữ liệu thường xuyên.",
  },
  {
    question: "Tôi có cần cài đặt phần mềm phức tạp không?",
    answer:
      "Không, V-Pharma là giải pháp dựa trên nền tảng web, bạn có thể truy cập từ bất kỳ đâu mà không cần cài đặt phức tạp.",
  },
  {
    question: "Dữ liệu của tôi có được bảo mật không?",
    answer:
      "An toàn dữ liệu là ưu tiên hàng đầu của chúng tôi. Hệ thống sử dụng các biện pháp bảo mật tiên tiến và sao lưu dữ liệu thường xuyên.",
  },
  
];

// Dữ liệu cho Listbox "Chủ đề chính"
const subjectOptions = [
  { id: "tuvan", name: "Tư vấn sản phẩm" },
  { id: "hotro", name: "Hỗ trợ kỹ thuật" },
  { id: "hopTac", name: "Hợp tác kinh doanh" },
];

export default function HoTro() {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Sửa state của subject để lưu object (hoặc id)
  const [subject, setSubject] = useState(subjectOptions[0]); // Có thể set mặc định
  const [subjectError, setSubjectError] = useState("");

  const [description, setDescription] = useState("");

  const [formError, setFormError] = useState<string>("");
  const [formSuccess, setFormSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Logic Validation (onBlur) ---

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
    const value = phone.replace(/\s+/g, ""); // Xóa khoảng trắng
    if (!value) {
      setPhoneError("Vui lòng nhập số điện thoại.");
      return false;
    }
    // Giả sử mã quốc gia có thể từ 1-3 số, sđt từ 9-12 số
    // PhoneInput trả về bao gồm mã quốc gia, vd: +84911000038
    const onlyNumber = /^\+[0-9]{10,15}$/; // Regex đơn giản cho SĐT quốc tế
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

    // Validate tất cả các trường
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isSubjectValid = validateSubject();

    if (!isFullNameValid || !isEmailValid || !isPhoneValid || !isSubjectValid) {
      return; // Dừng nếu có lỗi
    }

    setIsSubmitting(true);

    // --- Giả lập gọi API ---
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Giả lập trường hợp thành công
    const isSuccess = true; // (Thay đổi giá trị này để test lỗi)

    if (isSuccess) {
      setFormSuccess(
        "Đã gửi thành công. Cảm ơn bạn đã liên hệ với VPharma. Chúng tôi sẽ phản hồi lại trong vòng 24 giờ làm việc."
      );
      // Reset form
      setFullName("");
      setPhone("");
      setEmail("");
      setSubject(subjectOptions[0]);
      setDescription("");
    } else {
      // Giả lập trường hợp lỗi
      setFormError(
        "Rất tiếc, đã có lỗi xảy ra. Bạn có thể thử lại, hoặc liên hệ trực tiếp với chúng tôi qua hotline hoặc email để được hỗ trợ."
      );
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      {/** Dashboard */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-10 text-center">
        <div className="container ">
          <h1 className="text-h1 font-bold text-black mt-10 mb-8">Liên Hệ Hỗ Trợ</h1>
          <p className="mx-auto text-h6 mb-15 max-w-3xl">
            Giải pháp toàn diện cho quản lý nhà thuốc, từ tồn kho đến bán hàng,
            với công nghệ hiện đại và dễ sử dụng.
          </p>
        </div>
      </section>

      {/* Phần Form và Thông tin liên hệ */}
      <FadeInOnScroll>
        <section className="bg-white pb-10">
          <div className="max-w-6xl mx-auto  grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Form Liên hệ */}
            <div>
              <h2 className="text-black font-bold mb-8">Liên hệ với chúng tôi</h2>
              <p className="mb-8 text-sub1">
                Chúng tôi rất mong nhận được phản hồi từ bạn. Vui lòng điền vào mẫu này.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Họ và Tên */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-colordescription font-bold text-sub2 mb-2"
                  >
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value.trimStart());
                      if (fullNameError) setFullNameError(""); // Xóa lỗi khi người dùng bắt đầu gõ
                    }}
                    onBlur={validateFullName} // Validate khi rời khỏi ô
                    required
                    className={`w-full rounded-lg border-2 px-4 py-3 text-base placeholder-gray-400 text-sub2
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
                    className="block text-colordescription font-bold text-sub2 mb-2"
                  >
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
                  <label
                    htmlFor="email"
                    className="block text-colordescription font-bold text-sub2 mb-2"
                  >
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(""); // Xóa lỗi khi gõ
                    }}
                    onBlur={validateEmail} // Validate khi rời khỏi ô
                    required
                    className={`w-full rounded-lg border-2 px-4 py-3 text-base placeholder-gray-400 text-sub2
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
                    className="block text-colordescription font-bold text-sub2 mb-2"
                  >
                    Chủ đề chính
                  </label>
                  <Listbox value={subject} onChange={setSubject}>
                    <div className="relative">
                      <Listbox.Button
                        className={`relative w-full cursor-default rounded-lg border-2 bg-white 
                                    px-4 py-3 text-left text-base text-sub2
                                    ${
                                      subjectError
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }
                                    focus:outline-none focus:border-blue-500`}
                      >
                        <span className="text-sub2">{subject.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
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
                                                    rounded-lg bg-white py-1 text-sub2 shadow-lg 
                                                    ring-1 ring-opacity-5 
                                                    focus:outline-none"
                        >
                          {subjectOptions.map((option) => (
                            <Listbox.Option
                              key={option.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-blue-100 text-primary" // Style khi hover
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
                                  {selected ? ( // Hiển thị dấu check nếu được chọn
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
                  <label
                    htmlFor="description"
                    className="block text-colordescription font-bold text-sub2 mb-2"
                  >
                    Mô tả chi tiết (không bắt buộc)
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // ĐỒNG BỘ STYLE: px-4 py-3
                    className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base  text-sub2
                               outline-none resize-none focus:border-blue-500 transition-all min-h-[90px]"
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
                      onClick={() => setFormSuccess("")}
                      className="text-green-700 hover:text-green-900"
                      aria-label="Đóng thông báo"
                    >
                      <FiX />
                    </button>
                  </div>
                )}

                {/* Link Chính sách bảo mật */}
                <p className="!mt-4 text-sub2 text-gray-600">
                  Chúng tôi cam kết bảo mật thông tin của bạn. Xem chi tiết tại{" "}
                  <Link
                    href="/chinh-sach-bao-mat" // Cập nhật đường dẫn nếu cần
                    className="text-primary hover:underline font-medium"
                  >
                    Chính sách Bảo mật
                  </Link>
                  .
                </p>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full md:w-auto !mt-6 rounded-full text-sub2 bg-primary hover:bg-blue-600 px-8 py-3 font-bold text-white transition-colors duration-200 flex items-center justify-center disabled:bg-blue-300"
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
              <h2 className="text-black font-bold mb-8">Liên Hệ Trực Tiếp</h2>
              <p className="mb-8 text-sub1">
                Kết nối ngay với chúng tôi qua hotline, email, hoặc đến trực tiếp văn phòng tại địa chỉ bên dưới.
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
                    className="mr-4 mt-1 flex-shrink-0 text-success "
                    size={27}
                  />
                  <div>
                    {/* Thêm tel: link */}
                    <a
                      href="tel:0911000038"
                      className="font-medium hover:text-blue-500 text-sub1"
                    >
                      0911 000 038
                    </a>
                  </div>
                </li>
                <li className="flex items-start mb-10">
                  <FiMail
                    className="mr-4 mt-1 flex-shrink-0 text-success"
                    size={27}
                  />
                  <div>
                    <a
                      href="mailto:contact@amitgroup.asia"
                      className="hover:text-blue-500 text-sub1"
                    >
                      contact@amitgroup.asia
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <FiMapPin
                    className="mr-4 mt-1 flex-shrink-0 text-success"
                    size={27}
                  />
                  <div>
                    {/* Thêm link Google Maps */}
                    <a
                      href="https://maps.app.goo.gl/xnSXqtouAAk2yewr7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 text-sub1"
                    >
                      Số 7, Đường 7C, Khu đô thị An Phú An Khánh, Phường Bình
                      Trưng, Thành phố Hồ Chí Minh
                    </a>
                  </div>
                </li>
              </ul>

              {/* Social links */}
              <div className="mt-8 flex space-x-4">
                <a
                  href="https://facebook.com/amitgroup.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-success hover:text-blue-500 transition-colors "
                >
                  <FiFacebook size={27} />
                </a>
                <a
                  href="https://www.youtube.com/@AmitGROUPmkt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-success hover:text-blue-500 transition-colors"
                >
                  <FiYoutube size={27} />
                </a>
                <a
                  href="https://www.amitgroup.asia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-success hover:text-blue-500 transition-colors"
                >
                  <FiGlobe size={27} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* --- SECTION FAQ --- */}
      <FaqSection title="Câu Hỏi Thường Gặp" items={hoTroFaqData} />

      {/* --- SECTION PHẦN MỀM HỖ TRỢ  */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center mb-8">Phần Mềm Hỗ Trợ</h2>
          <p className="text-center text-h6 text-colordescription max-w-3xl mx-auto mb-15">
            Để quá trình hỗ trợ diễn ra nhanh chóng, vui lòng cài đặt một trong
            các phần mềm dưới đây nếu được kỹ thuật viên yêu cầu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {supportSoftwareData.map((software) => (
              <div
                key={software.name}
                className="bg-white p-8 rounded-lg border shadow-md text-center flex flex-col items-center"
              >
                <div className="w-24 h-24 relative mb-6">
                  <Image
                    src={software.logo}
                    alt={`Logo ${software.name}`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <h3 className="text-sub1 font-bold text-black mb-5">
                  {software.name}
                </h3>
                <p className="text-sub2 mb-10 flex-grow">
                  {software.description}
                </p>
                <a
                  href={software.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-sub2 rounded-lg bg-primary hover:bg-blue-700 px-8 py-3 font-bold text-white transition-colors duration-200"
                >
                  Tải về
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
