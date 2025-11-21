
"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FiLoader,
  FiXCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiX,
} from "react-icons/fi";

export default function Register() {
  // --- State quản lý dữ liệu ---
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // Email không bắt buộc
  const [businessName, setBusinessName] = useState("");

  // Checkbox quy mô
  const [isIndependent, setIsIndependent] = useState(false);
  const [isChain, setIsChain] = useState(false);
  const [isClinic, setIsClinic] = useState(false);

  // Checkbox điều khoản
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Ẩn hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Trạng thái form
  const [formError, setFormError] = useState<string>("");
  const [formSuccess, setFormSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State lỗi
  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
    businessName: "",
    businessScale: "",
    terms: "",
  });

  // --- Helper Styles ---
  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border-2 px-2 py-2 text-base placeholder-gray-400 text-sm md:text-body2 lg:text-sub2
    ${hasError ? "border-red-500" : "border-gray-300"}
    outline-none focus:border-blue-500 transition-all`;

  const labelClass = "block text-black font-semibold text-sm md:text-body2 lg:text-sub2 mb-2";

  // --- Validate Logic ---
  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Vui lòng nhập họ và tên.";
        break;
      case "username":
        if (!value.trim()) error = "Vui lòng nhập tên đăng nhập.";
        else if (value.length < 5) error = "Tên đăng nhập tối thiểu 5 ký tự.";
        break;
      case "password":
        if (!value) error = "Vui lòng nhập mật khẩu.";
        else if (value.length < 6) error = "Mật khẩu tối thiểu 6 ký tự.";
        break;
      case "confirmPassword":
        if (!value) error = "Vui lòng xác nhận mật khẩu.";
        else if (value !== password) error = "Mật khẩu không khớp.";
        break;
      case "phone":
        const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (!value.trim()) error = "Vui lòng nhập số điện thoại.";
        else if (!phoneRegex.test(value)) error = "Số điện thoại không hợp lệ.";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() && !emailRegex.test(value)) {
            error = "Email sai định dạng.";
        }
        break;
      case "businessName":
        if (!value.trim()) error = "Vui lòng nhập tên nhà thuốc/doanh nghiệp.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const validateForm = () => {
    const isFullNameValid = validateField("fullName", fullName);
    const isUserValid = validateField("username", username);
    const isPassValid = validateField("password", password);
    const isConfirmValid = validateField("confirmPassword", confirmPassword);
    const isPhoneValid = validateField("phone", phone);
    const isEmailValid = validateField("email", email);
    const isBusinessValid = validateField("businessName", businessName);

    let scaleValid = true;
    if (!isIndependent && !isChain && !isClinic) {
      setErrors((prev) => ({
        ...prev,
        businessScale: "Vui lòng chọn quy mô.",
      }));
      scaleValid = false;
    } else {
      setErrors((prev) => ({ ...prev, businessScale: "" }));
    }

    let termValid = true;
    if (!agreedToTerms) {
      setErrors((prev) => ({ ...prev, terms: "Bạn chưa đồng ý điều khoản." }));
      termValid = false;
    } else {
      setErrors((prev) => ({ ...prev, terms: "" }));
    }

    return (
      isFullNameValid &&
      isUserValid &&
      isPassValid &&
      isConfirmValid &&
      isPhoneValid &&
      isEmailValid &&
      isBusinessValid &&
      scaleValid &&
      termValid
    );
  };

  // --- Submit Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormSuccess("Đăng ký thành công! Vui lòng kiểm tra email (nếu có).");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-100 to-white px-4 ">
      <div className="w-full max-w-5xl bg-white rounded-2xl px-8 shadow-xl overflow-hidden flex flex-col ">
        {/* Header */}
        <div className="pt-8 pb-4 text-center ">
          <h1 className="">Đăng Ký</h1>
          <p className="text-center text-body2  md:text-sub1 lg:text-h6 text-colordescription text-colordescription">
            Hãy hoàn tất các thông tin dưới đây để có thể bắt đầu cùng với Vpharma.
          </p>
        </div>

        {/* Body Form */}
        <div className=" pb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              
              {/* Cột Trái */}
              <div className="space-y-5">
                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() => validateField("fullName", fullName)}
                    className={inputClass(!!errors.fullName)}
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
                </div>

                <div>
                  <label htmlFor="username" className={labelClass}>
                    Tên đăng nhập <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => validateField("username", username)}
                    className={inputClass(!!errors.username)}
                  />
                   {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (!val || /^\d+$/.test(val)) setPhone(val);
                    }}
                    onBlur={() => validateField("phone", phone)}
                    className={inputClass(!!errors.phone)}
                    placeholder="0912..."
                  />
                   {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-gray-400 font-normal text-sm">(Không bắt buộc)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => validateField("email", email)}
                    className={inputClass(!!errors.email)}
                    placeholder="ten@example.com"
                  />
                   {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
              </div>

              {/* Cột Phải */}
              <div className="space-y-5">
                 {/* Password */}
                 <div>
                  <label htmlFor="password" className={labelClass}>
                    Nhập mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => validateField("password", password)}
                      className={inputClass(!!errors.password)}
                    />
                    {/* --- SỬA LỖI: Thêm aria-label --- */}
                    <button
                      type="button"
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-primary"
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className={labelClass}>
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => validateField("confirmPassword", confirmPassword)}
                      className={inputClass(!!errors.confirmPassword)}
                    />
                    {/* --- SỬA LỖI: Thêm aria-label --- */}
                    <button
                      type="button"
                      aria-label={showConfirmPassword ? "Ẩn mật khẩu xác nhận" : "Hiện mật khẩu xác nhận"}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-primary"
                    >
                      {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                </div>

                <div>
                  <label htmlFor="businessName" className={labelClass}>
                    Tên nhà thuốc/ doanh nghiệp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    onBlur={() => validateField("businessName", businessName)}
                    className={inputClass(!!errors.businessName)}
                  />
                   {errors.businessName && <span className="text-red-500 text-sm">{errors.businessName}</span>}
                </div>
                
                {/* Quy mô */}
                <div>
                  <label className={labelClass}>
                    Quy mô kinh doanh <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-row flex-wrap gap-4 mt-2">
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="w-3 h-3 lg:w-4 lg:h-4 text-primary border-gray-300 rounded focus:ring-blue-500" 
                            checked={isIndependent} onChange={(e) => setIsIndependent(e.target.checked)} />
                        <span className="ml-2 text-sm md:text-body2 lg:text-sub2 text-gray-700">Độc lập</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="w-3 h-3 lg:w-4 lg:h-4 text-primary border-gray-300 rounded focus:ring-blue-500" 
                             checked={isChain} onChange={(e) => setIsChain(e.target.checked)} />
                        <span className="ml-2 text-sm md:text-body2 lg:text-sub2 text-gray-700">Chuỗi</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="w-3 h-3 lg:w-4 lg:h-4 text-primary border-gray-300 rounded focus:ring-blue-500" 
                             checked={isClinic} onChange={(e) => setIsClinic(e.target.checked)} />
                        <span className="ml-2 text-sm md:text-body2 lg:text-sub2 text-gray-700">Phòng khám</span>
                    </label>
                  </div>
                  {errors.businessScale && <span className="text-red-500 text-sm">{errors.businessScale}</span>}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-col items-center">
              <div className="flex  mb-6">
                <div className="flex cursor-pointer items-center ">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-3 h-3 lg:w-4 lg:h-4 text-primary border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm md:text-body2 lg:text-sub2">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    Tôi đã đọc và đồng ý với{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Điều khoản sử dụng
                    </Link>
                    .
                  </label>
                  {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
                </div>
              </div>

               {/* Alerts */}
               {formError && (
                  <div className="w-full mb-4 p-3 rounded-lg bg-red-100 text-red-700 flex items-center justify-between max-w-md">
                    <div className="flex items-center">
                      <FiXCircle className="mr-2" /> {formError}
                    </div>
                    {/* --- SỬA LỖI: Thêm aria-label --- */}
                    <button type="button" aria-label="Đóng thông báo lỗi" onClick={() => setFormError("")}><FiX /></button>
                  </div>
                )}
                {formSuccess && (
                  <div className="w-full mb-4 p-3 rounded-lg bg-green-100 text-green-700 flex items-center justify-between max-w-md">
                    <div className="flex items-center">
                      <FiCheckCircle className="mr-2" /> {formSuccess}
                    </div>
                    {/* --- SỬA LỖI: Thêm aria-label --- */}
                    <button type="button" aria-label="Đóng thông báo thành công" onClick={() => setFormSuccess("")}><FiX /></button>
                  </div>
                )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[200px] rounded-full text-sub2 bg-primary hover:bg-blue-600 px-8 py-2 font-bold text-white transition-colors duration-200 flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? <FiLoader className="mr-2 animate-spin" /> : "Đăng ký"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}