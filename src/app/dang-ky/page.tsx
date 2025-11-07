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
import { Button } from "@/components/ui/CTAButton";

export default function Register() {
  // --- State cho các trường input ---
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");

  // --- State cho checkbox quy mô ---
  const [isIndependent, setIsIndependent] = useState(false);
  const [isChain, setIsChain] = useState(false);
  const [isClinic, setIsClinic] = useState(false);

  // --- State cho checkbox điều khoản ---
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // --- State cho ẩn/hiện mật khẩu ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- State cho lỗi/thành công của form ---
  const [formError, setFormError] = useState<string>("");
  const [formSuccess, setFormSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- State cho lỗi của từng trường ---
  const [fullNameError, setFullNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [businessScaleError, setBusinessScaleError] = useState("");
  const [termsError, setTermsError] = useState("");

  // --- Logic Validation (onBlur) ---
  // Mượn từ trang HoTro
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

  // Mượn từ trang HoTro
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

  // Mới: Validation cho Tên đăng nhập
  const validateUsername = () => {
    const value = username.trim();
    if (!value) {
      setUsernameError("Vui lòng nhập tên đăng nhập.");
      return false;
    }
    if (value.length < 5) {
      setUsernameError("Tên đăng nhập phải từ 5 ký tự trở lên.");
      return false;
    }
    const validUsernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!validUsernameRegex.test(value)) {
      setUsernameError("Tên đăng nhập chỉ chứa chữ, số và dấu gạch dưới.");
      return false;
    }
    setUsernameError("");
    return true;
  };

  // Mới: Validation cho Mật khẩu
  const validatePassword = () => {
    const value = password; // Không trim mật khẩu
    if (!value) {
      setPasswordError("Vui lòng nhập mật khẩu.");
      return false;
    }
    if (value.length < 8) {
      setPasswordError("Mật khẩu phải từ 8 ký tự trở lên.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Mới: Validation cho Xác nhận Mật khẩu
  const validateConfirmPassword = () => {
    const value = confirmPassword;
    if (!value) {
      setConfirmPasswordError("Vui lòng xác nhận mật khẩu.");
      return false;
    }
    if (value !== password) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  // Mới: Validation cho SĐT (Input thường)
  const validatePhone = () => {
    const value = phone.replace(/\s+/g, "");
    if (!value) {
      setPhoneError("Vui lòng nhập số điện thoại.");
      return false;
    }
    // Regex SĐT Việt Nam cơ bản (10 số, bắt đầu bằng 0)
    const vietnamPhoneRegex = /^0[0-9]{9}$/;
    if (!vietnamPhoneRegex.test(value)) {
      setPhoneError("Số điện thoại không hợp lệ (cần 10 số, bắt đầu bằng 0).");
      return false;
    }
    setPhoneError("");
    return true;
  };

  // Mới: Validation cho Tên nhà thuốc
  const validateBusinessName = () => {
    const value = businessName.trim();
    if (!value) {
      setBusinessNameError("Vui lòng nhập tên nhà thuốc/doanh nghiệp.");
      return false;
    }
    setBusinessNameError("");
    return true;
  };

  // Mới: Validation cho Quy mô
  const validateBusinessScale = () => {
    if (!isIndependent && !isChain && !isClinic) {
      setBusinessScaleError("Vui lòng chọn ít nhất một quy mô kinh doanh.");
      return false;
    }
    setBusinessScaleError("");
    return true;
  };

  // Mới: Validation cho Điều khoản
  const validateTerms = () => {
    if (!agreedToTerms) {
      setTermsError("Bạn cần đồng ý với điều khoản sử dụng.");
      return false;
    }
    setTermsError("");
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
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isBusinessNameValid = validateBusinessName();
    const isBusinessScaleValid = validateBusinessScale();
    const isTermsValid = validateTerms();

    if (
      !isFullNameValid ||
      !isEmailValid ||
      !isPhoneValid ||
      !isUsernameValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !isBusinessNameValid ||
      !isBusinessScaleValid ||
      !isTermsValid
    ) {
      return; // Dừng nếu có lỗi
    }

    setIsSubmitting(true);

    // --- Giả lập gọi API (giống trang HoTro) ---
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Giả lập trường hợp thành công
    const isSuccess = true; // (Thay đổi giá trị này để test lỗi)

    if (isSuccess) {
      setFormSuccess(
        "Đăng ký thành công. Chào mừng bạn đến với V-Pharma! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất."
      );
      // Reset form
      setFullName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      setEmail("");
      setBusinessName("");
      setIsIndependent(false);
      setIsChain(false);
      setIsClinic(false);
      setAgreedToTerms(false);
    } else {
      // Giả lập trường hợp lỗi
      setFormError(
        "Rất tiếc, đã có lỗi xảy ra. Bạn có thể thử lại, hoặc liên hệ trực tiếp với chúng tôi qua hotline để được hỗ trợ."
      );
    }
    setIsSubmitting(false);
  };

  // --- STYLING ---
  // Mượn class input từ trang HoTro
  const inputClass = (hasError: boolean): string =>
    `w-full rounded-lg border-2 px-4 py-3 text-base placeholder-gray-400 text-sub2
    ${hasError ? "border-red-500" : "border-gray-300"}
    outline-none focus:border-blue-500 transition-all`;

  // Mượn class label từ trang HoTro
  const labelClass = "block text-black font-bold text-sub2 mb-2";

  return (
    // Sử dụng layout nền gradient giống trang HoTro
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-blue-100 to-white py-20 ">
      {/* Đặt form trong một card trắng có bóng, giới hạn chiều rộng */}
      <div className="w-full max-w-4xl rounded-xl bg-white p-8 shadow-xl md:p-10">
        <h1 className="text-center ">
          Đăng Ký
        </h1>
        <p className=" text-center text-h6 text-colordescription">
          Hãy hoàn tất tất cả thông tin dưới đây để có thể bắt đầu cùng với
          V-Pharma.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Họ và Tên */}
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Họ và Tên <span className="text-red-500">*</span>
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
              className={inputClass(!!fullNameError)}
              placeholder="Nguyễn Văn A"
            />
            {fullNameError && (
              <div className="mt-1 text-sm text-red-600">{fullNameError}</div>
            )}
          </div>

          {/* Tên đăng nhập */}
          <div>
            <label htmlFor="username" className={labelClass}>
              Tên đăng nhập <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.trim());
                if (usernameError) setUsernameError("");
              }}
              onBlur={validateUsername}
              required
              className={inputClass(!!usernameError)}
              placeholder="tendangnhap_cua_ban"
            />
            {usernameError && (
              <div className="mt-1 text-sm text-red-600">{usernameError}</div>
            )}
          </div>

          {/* Nhập mật khẩu */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Nhập mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                onBlur={validatePassword}
                required
                className={inputClass(!!passwordError)}
                placeholder="Mật khẩu (ít nhất 8 ký tự)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {passwordError && (
              <div className="mt-1 text-sm text-red-600">{passwordError}</div>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Xác nhận mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError) setConfirmPasswordError("");
                }}
                onBlur={validateConfirmPassword}
                required
                className={inputClass(!!confirmPasswordError)}
                placeholder="Nhập lại mật khẩu của bạn"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
                aria-label={
                  showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                }
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {confirmPasswordError && (
              <div className="mt-1 text-sm text-red-600">
                {confirmPasswordError}
              </div>
            )}
          </div>

          {/* Số điện thoại (theo yêu cầu là input thường) */}
          <div>
            <label htmlFor="phone" className={labelClass}>
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value.trim());
                if (phoneError) setPhoneError("");
              }}
              onBlur={validatePhone}
              required
              className={inputClass(!!phoneError)}
              placeholder="0912345678"
            />
            {phoneError && (
              <div className="mt-1 text-sm text-red-600">{phoneError}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.trim());
                if (emailError) setEmailError("");
              }}
              onBlur={validateEmail}
              required
              className={inputClass(!!emailError)}
              placeholder="ten@domain.com"
            />
            {emailError && (
              <div className="mt-1 text-sm text-red-600">{emailError}</div>
            )}
          </div>

          {/* Tên nhà thuốc/ doanh nghiệp */}
          <div>
            <label htmlFor="businessName" className={labelClass}>
              Tên nhà thuốc/ doanh nghiệp{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value.trimStart());
                if (businessNameError) setBusinessNameError("");
              }}
              onBlur={validateBusinessName}
              required
              className={inputClass(!!businessNameError)}
              placeholder="Nhà thuốc V-Pharma"
            />
            {businessNameError && (
              <div className="mt-1 text-sm text-red-600">
                {businessNameError}
              </div>
            )}
          </div>

          {/* Quy mô kinh doanh */}
          <div>
            <label className={labelClass}>
              Quy mô kinh doanh <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col space-y-2 pt-1 sm:flex-row sm:space-y-0 sm:space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isIndependent}
                  onChange={(e) => {
                    setIsIndependent(e.target.checked);
                    if (businessScaleError) setBusinessScaleError("");
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-500"
                />
                <span className="ml-2 text-sub2 text-gray-800">
                  Nhà thuốc độc lập
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChain}
                  onChange={(e) => {
                    setIsChain(e.target.checked);
                    if (businessScaleError) setBusinessScaleError("");
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-500"
                />
                <span className="ml-2 text-sub2 text-gray-800">
                  Chuỗi nhà thuốc
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isClinic}
                  onChange={(e) => {
                    setIsClinic(e.target.checked);
                    if (businessScaleError) setBusinessScaleError("");
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-500"
                />
                <span className="ml-2 text-sub2 text-gray-800">
                  Phòng khám/phòng mạch
                </span>
              </label>
            </div>
            {businessScaleError && (
              <div className="mt-1 text-sm text-red-600">
                {businessScaleError}
              </div>
            )}
          </div>

          {/* Điều khoản sử dụng */}
          <div className="!mt-4">
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (termsError) setTermsError("");
                }}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-blue-500 mt-1 flex-shrink-0"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sub2 text-gray-700"
              >
                Tôi đã đọc và đồng ý với{" "}
                <Link
                  href="/dieu-khoan-su-dung" // Cập nhật đường dẫn nếu cần
                  target="_blank" // Mở tab mới cho điều khoản
                  className="font-medium text-primary hover:underline"
                >
                  Điều khoản sử dụng
                </Link>
                <span className="text-red-500"> *</span>
              </label>
            </div>
            {termsError && (
              <div className="mt-1 text-sm text-red-600 ml-6">
                {termsError}
              </div>
            )}
          </div>

          {/* Trạng thái lỗi/ thành công (giống trang HoTro) */}
          {formError && (
            <div className="!mt-4 w-full p-4 rounded-lg bg-red-100 text-red-700 flex items-center justify-between">
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
            <div className="!mt-4 w-full p-4 rounded-lg bg-green-100 text-green-700 flex items-center justify-between">
              <div className="flex items-center">
                <FiCheckCircle className="mr-2 flex-shrink-0" /> {formSuccess}
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

          {/* Submit button (giống trang HoTro) */}
          <button
            type="submit"
            className="w-full !mt-6 rounded-full text-sub2 bg-primary hover:bg-blue-600 px-8 py-3 font-bold text-white transition-colors duration-200 flex items-center justify-center disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? <FiLoader className="mr-2 animate-spin" /> : null}
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}