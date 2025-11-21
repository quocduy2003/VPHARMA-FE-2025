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

export default function Login() {
  // --- State quản lý dữ liệu ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Checkbox ghi nhớ
  const [rememberMe, setRememberMe] = useState(false);

  // Ẩn hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  // Trạng thái form
  const [formError, setFormError] = useState<string>("");
  const [formSuccess, setFormSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State lỗi
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // --- Helper Styles ---
  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border-2 px-2 py-2 text-base placeholder-gray-400 text-sm md:text-body2 lg:text-sub2
    ${hasError ? "border-red-500" : "border-gray-300"}
    outline-none focus:border-blue-500 transition-all`;

  const labelClass =
    "block text-black font-semibold text-sm md:text-body2 lg:text-sub2 mb-2";

  // --- Validate Logic ---
  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value.trim()) error = "Vui lòng nhập tên đăng nhập.";
        break;
      case "password":
        if (!value) error = "Vui lòng nhập mật khẩu.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const validateForm = () => {
    const isUserValid = validateField("username", username);
    const isPassValid = validateField("password", password);
    return isUserValid && isPassValid;
  };

  // --- Submit Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    // Giả lập API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFormSuccess("Đăng nhập thành công! Đang chuyển hướng...");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-100 to-white px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl px-8 py-10 shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-primary mb-2">
            Đăng Nhập
          </h1>
          <p className="text-center text-body2  md:text-sub1 lg:text-h6 text-colordescription">
            Chào mừng quay trở lại với Vpharma.
          </p>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
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
              placeholder="Nhập tên đăng nhập"
            />
            {errors.username && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.username}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClass}>
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validateField("password", password)}
                className={inputClass(!!errors.password)}
                placeholder="Nhập mật khẩu"
              />
              {/* FIX: Thêm aria-label để sửa lỗi accessibility */}
              <button
                type="button"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-primary"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm mt-1 block">
                {errors.password}
              </span>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3 h-3 lg:w-4 lg:h-4 text-primary border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm md:text-body2 text-gray-700 select-none">
                Ghi nhớ đăng nhập
              </span>
            </label>

            <Link
              href="/forgot-password"
              className="text-sm md:text-body2 text-primary hover:underline font-medium"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Alerts */}
          {formError && (
            <div className="w-full p-3 rounded-lg bg-red-100 text-red-700 flex items-center justify-between">
              <div className="flex items-center">
                <FiXCircle className="mr-2" /> {formError}
              </div>
              {/* FIX: Thêm aria-label cho nút đóng alert */}
              <button 
                type="button" 
                onClick={() => setFormError("")}
                aria-label="Đóng thông báo lỗi"
              >
                <FiX />
              </button>
            </div>
          )}
          {formSuccess && (
            <div className="w-full p-3 rounded-lg bg-green-100 text-green-700 flex items-center justify-between">
              <div className="flex items-center">
                <FiCheckCircle className="mr-2" /> {formSuccess}
              </div>
              {/* FIX: Thêm aria-label cho nút đóng alert */}
              <button 
                type="button" 
                onClick={() => setFormSuccess("")}
                aria-label="Đóng thông báo thành công"
              >
                <FiX />
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full text-sub2 bg-primary hover:bg-blue-600 px-8 py-3 font-bold text-white transition-colors duration-200 flex items-center justify-center disabled:opacity-70 shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <FiLoader className="mr-2 animate-spin" />
            ) : (
              "Đăng nhập"
            )}
          </button>

          {/* Footer Link */}
          <div className="text-center mt-6 text-sm md:text-body2">
            <span className="text-gray-600">Bạn chưa có tài khoản? </span>
            <Link
              href="/register"
              className="text-primary font-bold hover:underline"
            >
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}