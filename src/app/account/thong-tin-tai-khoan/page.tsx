"use client";

import React, { useState, useRef } from 'react';
import { 
  FiCamera, 
  FiLoader, 
  FiSave, 
  FiEye, 
  FiEyeOff, 
  FiLink, 
  FiInfo 
} from 'react-icons/fi';

export type BusinessScaleType = 'independent' | 'chain' | 'clinic' | '';

export interface UserProfile {
  fullName: string;
  username: string;
  phone: string;
  email: string;
  businessName: string;
  businessScale: BusinessScaleType;
  avatar: string | null;
}

export interface DemoData {
  username: string;
  password?: string;
  link: string;
  title?: string;
  description?: string;
}

interface PasswordData {
  oldPass: string;
  newPass: string;
  confirmPass: string;
}

// --- MOCK DATA ---
const MOCK_USER_DATA: UserProfile = {
  fullName: "Trần Tuấn",
  username: "trantuan2024",
  phone: "0335686793",
  email: "trantuan@vpharma.com",
  businessName: "Nhà thuốc An Tâm",
  businessScale: "independent",
  avatar: null,
};

const MOCK_DEMO_DATA: DemoData = {
  username: "demo_user",
  password: "Demo@123456",
  link: "https://bizplan.vn/",
  title: "Demo Sản Phẩm",
  description: "Truy cập đường dẫn bên dưới để xem bản demo đầy đủ tính năng."
};

// --- PROPS ---
interface AccountPageProps {
  initialData?: UserProfile; 
  demoData?: DemoData;       
}

// --- 2. COMPONENT AVATAR ---
interface AvatarProps {
  avatarUrl: string | null;
  name: string;
  businessName: string;
  onUpload: (file: File) => void;
}

const AvatarUploader = ({ avatarUrl, name, businessName, onUpload }: AvatarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(avatarUrl);

  const initial = name ? name.charAt(0).toUpperCase() : "U";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div 
        className="relative group cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-blue-100 flex items-center justify-center relative">
          {preview ? (
            <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-blue-600 select-none">{initial}</span>
          )}
          
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <FiCamera className="text-white text-2xl" />
          </div>
        </div>
        
        <div className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow border border-gray-200 text-gray-600">
          <FiCamera size={14} />
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-black">{name}</h3>
        <p className="text-sub2 font-semibold text-primary mt-1">{businessName}</p>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
        aria-label="Tải ảnh đại diện" 
        title="Tải ảnh đại diện"
      />
    </div>
  );
};

// --- 3. TRANG CHÍNH ---
export default function AccountPage({ initialData, demoData }: AccountPageProps) {
  const [formData, setFormData] = useState<UserProfile>(initialData || MOCK_USER_DATA);
  const currentDemoData = demoData || MOCK_DEMO_DATA;
  
  const [passData, setPassData] = useState<PasswordData>({ oldPass: '', newPass: '', confirmPass: '' });
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Styles utility classes
  const labelClass = "block text-black font-semibold text-sm md:text-base mb-2";
  const inputClass = "w-full rounded-lg border-2 border-gray-300 px-2 py-2 text-base placeholder-gray-400 focus:border-blue-500 outline-none transition-all bg-white";
  const disabledInputClass = "w-full rounded-lg border-2 border-gray-200 px-2 py-2 text-base bg-gray-100 text-gray-500 cursor-not-allowed";

  // Handlers
  const handleChange = <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePassChange = (field: keyof PasswordData, value: string) => {
    setPassData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (file: File) => {
    console.log("Upload file:", file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting Data:", formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert("Cập nhật thông tin thành công!");
  };

  const businessScaleOptions: { label: string; value: BusinessScaleType }[] = [
    { label: "Độc lập", value: "independent" },
    { label: "Chuỗi", value: "chain" },
    { label: "Phòng khám", value: "clinic" }
  ];

  return (
    <div className="w-full min-h-screen">
      {/* GRID LAYOUT LOGIC:
        - Mobile/Tablet: Grid chia cột để xếp Avatar và Demo ngang nhau.
        - Desktop: Grid 3 cột (1 cột trái chứa Avatar+Demo, 2 cột phải chứa Form).
      */}
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* --- CỘT TRÁI (WRAPPER) --- */}
        {/* QUAN TRỌNG: Sử dụng class `contents` cho Mobile/Tablet.
            - `contents`: Thẻ div này coi như không tồn tại trong mắt Grid cha, 
               khiến AvatarCard và DemoCard trở thành con trực tiếp của Grid cha.
               Điều này cho phép ta dùng `order` để sắp xếp chúng xen kẽ với Form.
            - `lg:block`: Trên desktop, thẻ div này quay lại làm wrapper (sidebar) bình thường.
        */}
        <div className="contents lg:block lg:col-span-1 lg:space-y-6">
          
          {/* 1. Card Avatar */}
          {/* Mobile: Order 1 (Đầu tiên) */}
          <div className="order-1 shadow-sm border border-gray-100 rounded-xl bg-white p-6">
            <AvatarUploader 
              avatarUrl={formData.avatar} 
              name={formData.fullName} 
              businessName={formData.businessName}
              onUpload={handleAvatarUpload} 
            />
          </div>

          {/* 2. Card Demo Sản Phẩm */}
          {/* Mobile (< md): Order 3 (Nằm cuối cùng sau Form)
             Tablet (md -> lg): Order 2 (Nằm cạnh Avatar)
          */}
          <div className="order-3 md:order-2 shadow-sm border border-blue-100 rounded-xl bg-blue-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <FiInfo size={20} />
              </div>
              <h3 className="font-bold text-black ">
                {currentDemoData.title || "Demo Sản Phẩm"}
              </h3>
            </div>
            
            <p className="text-body2 text-colordescription mb-5 leading-relaxed">
              {currentDemoData.description}
            </p>

            <div className="bg-white p-4 rounded-lg border border-blue-100 mb-5 shadow-sm">
              <div className="mb-3">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Tài khoản</span>
                <code className="text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">
                  {currentDemoData.username}
                </code>
              </div>
              {currentDemoData.password && (
                <div className="border-t border-gray-100 pt-3">
                  <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Mật khẩu</span>
                  <code className="text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">
                    {currentDemoData.password}
                  </code>
                </div>
              )}
            </div>

            <a 
              href={currentDemoData.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm text-sm"
            >
              <FiLink />
              Truy cập Demo
            </a>
          </div>

        </div>

        {/* --- CỘT PHẢI (Form chính) --- */}
        {/*
            Mobile (< md): Order 2 (Nằm giữa Avatar và Demo)
            Tablet (md -> lg): Order 3, col-span-2 (Nằm dưới cùng, full chiều ngang)
            Desktop (lg): Order mặc định, col-span-2 (Nằm bên phải)
        */}
        <div className="order-2 md:order-3 md:col-span-2 lg:col-span-2 lg:order-none shadow-sm border border-gray-100 rounded-xl bg-white p-6 md:p-8">
          <div className="border-b mb-4">
            <h2 className="text-black mb-4">Thông tin chi tiết</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
              
              {/* Họ tên */}
              <div className="col-span-1">
                <label htmlFor="fullName" className={labelClass}>
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input 
                  id="fullName"
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={inputClass}
                  placeholder="Nguyễn Văn A"
                />
              </div>

              {/* Username */}
              <div className="col-span-1">
                <label htmlFor="username" className={labelClass}>
                  Tên đăng nhập <span className="text-red-500">*</span>
                </label>
                <input 
                  id="username"
                  type="text" 
                  value={formData.username}
                  readOnly
                  className={disabledInputClass}
                />
              </div>

              {/* Phone */}
              <div className="col-span-1">
                <label htmlFor="phone" className={labelClass}>
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input 
                  id="phone"
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div className="col-span-1">
                <label htmlFor="email" className={labelClass}>
                  Email <span className="text-gray-400 font-normal text-xs">(Không bắt buộc)</span>
                </label>
                <input 
                  id="email"
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputClass}
                  placeholder="ten@example.com"
                />
              </div>

              {/* Tên nhà thuốc */}
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="businessName" className={labelClass}>
                  Tên nhà thuốc/ doanh nghiệp <span className="text-red-500">*</span>
                </label>
                <input 
                  id="businessName"
                  type="text" 
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Quy mô */}
              <div className="col-span-1 md:col-span-2">
                <label className={labelClass}>
                  Quy mô kinh doanh <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-row flex-wrap gap-6 mt-2">
                  {businessScaleOptions.map((item) => (
                    <label key={item.value} className="flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                        checked={formData.businessScale === item.value} 
                        onChange={() => handleChange('businessScale', item.value)}
                      />
                      <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Đổi mật khẩu */}
              <div className="col-span-1 md:col-span-2 mt-4 pt-4 border-t border-black">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Đổi mật khẩu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Mật khẩu cũ */}
                  <div className="col-span-1 md:col-span-2">
                    <label htmlFor="oldPass" className={labelClass}>Mật khẩu cũ</label>
                    <div className="relative">
                      <input 
                        id="oldPass"
                        type={showOldPass ? "text" : "password"}
                        value={passData.oldPass}
                        onChange={(e) => handlePassChange('oldPass', e.target.value)}
                        className={inputClass}
                        placeholder="Nhập mật khẩu cũ"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPass(!showOldPass)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600"
                      >
                        {showOldPass ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Mật khẩu mới */}
                  <div className="col-span-1">
                    <label htmlFor="newPass" className={labelClass}>Mật khẩu mới</label>
                    <div className="relative">
                      <input 
                        id="newPass"
                        type={showNewPass ? "text" : "password"}
                        value={passData.newPass}
                        onChange={(e) => handlePassChange('newPass', e.target.value)}
                        className={inputClass}
                        placeholder="Mật khẩu mới"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600"
                      >
                        {showNewPass ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Xác nhận mật khẩu mới */}
                  <div className="col-span-1">
                    <label htmlFor="confirmPass" className={labelClass}>Xác nhận mật khẩu</label>
                    <div className="relative">
                      <input 
                        id="confirmPass"
                        type={showConfirmPass ? "text" : "password"}
                        value={passData.confirmPass}
                        onChange={(e) => handlePassChange('confirmPass', e.target.value)}
                        className={inputClass}
                        placeholder="Nhập lại mật khẩu mới"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600"
                      >
                        {showConfirmPass ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Button Save */}
              <div className="col-span-1 md:col-span-2 flex justify-end pt-6 mt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 font-bold text-white shadow-md hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-70"
                >
                  {isSubmitting ? <FiLoader className="animate-spin" /> : <FiSave />}
                  Lưu thay đổi
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}