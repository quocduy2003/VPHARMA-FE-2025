"use client";

import { useState } from "react";
import Image from "next/image";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import CTASection from "@/components/CTA";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

// --- THÊM CÁC KIỂU DỮ LIỆU TYPESCRIPT ---
interface Vision {
  id: number;
  title: string;
  description: string;
}

interface Value {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

// --- DỮ LIỆU TĨNH ---
const storyData: { title: string; heading: string; description: string; visions: Vision[] } = {
  title: "Câu chuyện của V-Pharma",
  heading: "Bắt Nguồn Từ Sự Thấu Hiểu",
  description:
    "V-Pharma được thành lập bởi những chuyên gia công nghệ có người thân làm trong ngành dược. Chúng tôi đã chứng kiến những khó khăn hàng ngày trong việc quản lý thủ công, từ kiểm kho, theo dõi hạn dùng đến chăm sóc khách hàng. Đó là lý do chúng tôi quyết tâm xây dựng một giải pháp đơn giản, mạnh mẽ và đáng tin cậy cho nhà thuốc Việt Nam.",
  visions: [
    { id: 1, title: "Tầm nhìn", description: "Cung cấp nền tảng công nghệ ưu việt, giúp các nhà thuốc, quầy thuốc tối ưu hóa vận hành, nâng cao hiệu quả kinh doanh và chất lượng dịch vụ." },
    { id: 2, title: "Tầm nhìn", description: "Trở thành đối tác công nghệ đáng tin cậy và không thể thiếu của mọi nhà thuốc tại Việt Nam, góp phần vào sự phát triển chung của ngành y tế." },
  ],
};

const valuesData: { title: string; heading: string; values: Value[] } = {
  title: "Câu chuyện của V-Pharma",
  heading: "Những Giá Trị Chúng Tôi Theo Đuổi",
  values: [
    { id: 1, title: "Lấy khách hàng làm trọng tâm", description: "Mọi quyết định và hành động của chúng tôi đều bắt đầu và kết thúc bằng lợi ích của khách hàng.", image: "/features-dashboard1.png" },
    { id: 2, title: "Đổi mới và Sáng tạo", description: "Chúng tôi không ngừng tìm kiếm và áp dụng công nghệ mới để mang lại giải pháp tốt nhất, hiệu quả nhất.", image: "/features-dashboard2.png" },
    { id: 3, title: "Cam kết chất lượng", description: "Sản phẩm và dịch vụ của chúng tôi luôn được đảm bảo chất lượng cao nhất, ổn định và đáng tin cậy.", image: "/features-dashboard2.png" }
  ]
};

const teamData: { title: string; heading: string; description: string; members: TeamMember[] } = {
  title: "Câu chuyện của V-Pharma",
  heading: "Đội Ngũ Chuyên Gia Của Chúng Tôi",
  description: "Chúng tôi là sự kết hợp giữa các kỹ sư công nghệ đam mê và những chuyên gia am hiểu sâu sắc về ngành dược.",
  members: [
    { id: 1, name: "Nguyễn Văn An", role: "CEO & Co-Founder", image: "/avt1.jpg" },
    { id: 2, name: "Nguyễn Thị B", role: "CTO & Co-Founder", image: "/avt2.jpg" },
    { id: 3, name: "Trần Văn C", role: "Head of Product", image: "/avt3.jpg" },
    { id: 4, name: "Lê Thị D", role: "Lead Engineer", image: "/avt4.jpg" },
    { id: 5, name: "Phạm Văn E", role: "Senior Developer", image: "/avt1.jpg" },
  ]
};

const getCardPosition = (index: number, currentIndex: number, totalItems: number): 'center' | 'left' | 'right' | 'hidden' => {
  if (index === currentIndex) return 'center';
  const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
  if (index === prevIndex) return 'left';
  const nextIndex = (currentIndex + 1) % totalItems;
  if (index === nextIndex) return 'right';
  return 'hidden';
};

export default function AboutUsPage() {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const totalMembers = teamData.members.length;

  const handleNextMember = () => setCurrentMemberIndex((prev) => (prev + 1) % totalMembers);
  const handlePrevMember = () => setCurrentMemberIndex((prev) => (prev - 1 + totalMembers) % totalMembers);

  return (
    <div>
      {/* Dashboard */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-20 text-center">
        <div className="container mt-5 mx-auto max-w-6xl text-center">
          <p className="mb-4 text-h6 font-bold uppercase tracking-wide text-primary">
            VỀ V-PHARMA
          </p>
          <h1 className="text-black">
            Mang công nghệ đến gần hơn với nhà Thuốc Nhà Thuốc Việt Nam
          </h1>
          <p className="mx-auto mt-4 max-w-8xl text-h6">
            Chúng tôi tin rằng công nghệ là chìa khóa để giải phóng tiềm năng
            của các nhà thuốc, giúp dược sĩ có thêm thời gian chuyên tâm vào sứ
            mệnh chăm sóc sức
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="rounded-2xl bg-ink p-8 text-white shadow-xl md:p-12 lg:p-16">
              <div className="mb-12 text-center">
                <p className="mb-4 text-h6 font-bold uppercase tracking-wide text-primary">
                  {storyData.title}
                </p>
                <h2 className="mb-8 text-white">{storyData.heading}</h2>
                <p className="mx-auto max-w-6xl text-h6 leading-relaxed text-white">
                  {storyData.description}
                </p>
              </div>
              <div className="container grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                {storyData.visions.map((vision) => (
                  <div key={vision.id} className="text-left">
                    <div className="relative mb-6">
                      <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
                      <h3 className="pl-6 text-h4 font-bold text-primary">
                        {vision.title}
                      </h3>
                    </div>
                    <p className="text-sub1 max-w-xl text-white">
                      {vision.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
      
      {/* VALUES SECTION */}
      <section className="bg-gradient-to-b from-white to-cyan-50 py-20">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
              <div className="text-center">
                  <p className="mb-4 text-h6 font-bold uppercase tracking-wide text-primary">
                      {valuesData.title}
                  </p>
                  <h2 className="mb-12 text-black">{valuesData.heading}</h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {valuesData.values.map((value) => (
                      <div key={value.id} className="group cursor-pointer rounded-2xl border border-gray-200/80 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                          <Image 
                              src={value.image}
                              alt={value.title}
                              width={200}
                              height={150}
                              className="mx-auto mb-6 rounded-lg object-contain"
                          />
                          <h3 className="mb-4 text-sub1 font-bold">{value.title}</h3>
                          <p className="text-sub2 max-w-xs mx-auto"> 
                              {value.description}
                          </p>
                      </div>
                  ))}
              </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="bg-gradient-to-b from-cyan-50 to-white  py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="mb-20 text-center">
              <p className="mb-4 text-h6 font-bold uppercase tracking-wide text-primary">
                {teamData.title}
              </p>
              <h2 className="mb-4 text-black">{teamData.heading}</h2>
              <p className="mx-auto max-w-3xl text-h6">{teamData.description}</p>
            </div>
            
            <div className="relative h-96">
              <div className="relative flex h-full items-center justify-center">
                {teamData.members.map((member, index) => {
                  const position = getCardPosition(index, currentMemberIndex, totalMembers);
                  
                  let classes = 'transition-all duration-500 ease-in-out';
                  let infoClasses = 'transition-opacity duration-300 delay-200';
                  
                  switch (position) {
                    case 'center':
                      classes += ' z-10 scale-[1.6]'; // Tăng kích thước hình giữa lên 160%
                      infoClasses += ' opacity-100';
                      break;
                    case 'left':
                      classes += ' z-0 scale-90 -translate-x-[150%] opacity-60'; // Tăng khoảng cách ra xa hơn
                      infoClasses += ' opacity-0';
                      break;
                    case 'right':
                      classes += ' z-0 scale-90 translate-x-[150%] opacity-60'; // Tăng khoảng cách ra xa hơn
                       infoClasses += ' opacity-0';
                      break;
                    default:
                      classes += ' z-0 scale-0 opacity-0';
                       infoClasses += ' opacity-0';
                      break;
                  }

                  return (
                    <div key={member.id} className={`absolute flex w-64 flex-col items-center text-center ${classes}`}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="h-52 w-52 rounded-full object-cover shadow-lg"
                      />
                      <div className={infoClasses}>
                          <h3 className="mt-6 text-h4 font-bold">{member.name}</h3>
                          <p className="mt-2 text-sub1 text-primary">{member.role}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Nút điều khiển */}
              <div className="mt-15 flex justify-center gap-4">
                 <button 
                  onClick={handlePrevMember} 
                  className="rounded-full bg-blue-100 p-3 text-primary shadow-lg transition hover:bg-primary hover:text-white hover:scale-110"
                  aria-label="Thành viên trước"
                 >
                    <FiArrowLeft size={24} />
                </button>
                 <button 
                  onClick={handleNextMember} 
                  className="rounded-full bg-blue-100 p-3 text-primary shadow-lg transition hover:bg-primary hover:text-white hover:scale-110"
                  aria-label="Thành viên kế tiếp"
                  >
                    <FiArrowRight size={24} />
                </button>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* <CTASection /> */}
    </div>
  );
}