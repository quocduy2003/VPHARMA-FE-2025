// src/app/giai-phap/chuoi-nha-thuoc/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import FlipCard from "@/components/animations/FlipCard";
import FaqSection from "@/components/Faq";
import CTAEmail from "@/components/CTAEmail";

//data section1
const challengeCards = [
  {
    frontTitle: "Khó kiểm soát tài chính và giá bán",
    backContent: {
      title: "Khó kiểm soát tài chính và giá bán",
      items: [
        {
          label: "Lỗ hổng giá bán không đồng đều:",
          description:
            "Mỗi chi nhánh tự định giá hoặc khuyến mại khác nhau dẫn đến tình trạng 'phá giá nội bộ'.",
        },
        {
          label: "Thiếu dữ liệu phân tích:",
          description:
            "Không khán trong việc tổng hợp và đối chiếu báo cáo tài chính từ nhiều điểm bán.",
        },
        {
          label: "Quản lý chi phí vận hành riêng lẻ:",
          description:
            "Các chi phí mặt bằng, nhân sự, điện nước ở mỗi chi nhánh được quản lý rời rạc, làm phức tạp việc kiểm soát ngân sách và xác định chi nhánh nào đang vận hành kém hiệu quả.",
        },
      ],
    },
  },
  {
    frontTitle: "Khó kiểm soát tài chính và giá bán",
    backContent: {
      title: "Khó kiểm soát tài chính và giá bán",
      items: [
        {
          label: "Lỗ hổng giá bán không đồng đều:",
          description:
            "Mỗi chi nhánh tự định giá hoặc khuyến mại khác nhau dẫn đến tình trạng 'phá giá nội bộ'.",
        },
        {
          label: "Thiếu dữ liệu phân tích:",
          description:
            "Không khán trong việc tổng hợp và đối chiếu báo cáo tài chính từ nhiều điểm bán.",
        },
        {
          label: "Quản lý chi phí vận hành riêng lẻ:",
          description:
            "Các chi phí mặt bằng, nhân sự, điện nước ở mỗi chi nhánh được quản lý rời rạc, làm phức tạp việc kiểm soát ngân sách và xác định chi nhánh nào đang vận hành kém hiệu quả.",
        },
      ],
    },
  },
  {
    frontTitle: "Khó kiểm soát tài chính và giá bán",
    backContent: {
      title: "Khó kiểm soát tài chính và giá bán",
      items: [
        {
          label: "Lỗ hổng giá bán không đồng đều:",
          description:
            "Mỗi chi nhánh tự định giá hoặc khuyến mại khác nhau dẫn đến tình trạng 'phá giá nội bộ'.",
        },
        {
          label: "Thiếu dữ liệu phân tích:",
          description:
            "Không khán trong việc tổng hợp và đối chiếu báo cáo tài chính từ nhiều điểm bán.",
        },
        {
          label: "Quản lý chi phí vận hành riêng lẻ:",
          description:
            "Các chi phí mặt bằng, nhân sự, điện nước ở mỗi chi nhánh được quản lý rời rạc.",
        },
      ],
    },
  },
  {
    frontTitle: "Khó kiểm soát tài chính và giá bán",
    backContent: {
      title: "Khó kiểm soát tài chính và giá bán",
      items: [
        {
          label: "Lỗ hổng giá bán không đồng đều:",
          description:
            "Mỗi chi nhánh tự định giá hoặc khuyến mại khác nhau dẫn đến tình trạng 'phá giá nội bộ'.",
        },
        {
          label: "Thiếu dữ liệu phân tích:",
          description:
            "Không khán trong việc tổng hợp và đối chiếu báo cáo tài chính từ nhiều điểm bán.",
        },
        {
          label: "Quản lý chi phí vận hành riêng lẻ:",
          description:
            "Các chi phí mặt bằng, nhân sự, điện nước ở mỗi chi nhánh được quản lý rời rạc.",
        },
      ],
    },
  },
  {
    frontTitle: "Khó kiểm soát tài chính và giá bán",
    backContent: {
      title: "Khó kiểm soát tài chính và giá bán",
      items: [
        {
          label: "Lỗ hổng giá bán không đồng đều:",
          description:
            "Mỗi chi nhánh tự định giá hoặc khuyến mại khác nhau dẫn đến tình trạng 'phá giá nội bộ'.",
        },
        {
          label: "Thiếu dữ liệu phân tích:",
          description:
            "Không khán trong việc tổng hợp và đối chiếu báo cáo tài chính từ nhiều điểm bán.",
        },
        {
          label: "Quản lý chi phí vận hành riêng lẻ:",
          description:
            "Các chi phí mặt bằng, nhân sự, điện nước ở mỗi chi nhánh được quản lý rời rạc.",
        },
      ],
    },
  },
  {
    frontTitle: "Khó kiểm soát tài chính và giá bán",
    backContent: {
      title: "Khó kiểm soát tài chính và giá bán",
      items: [
        {
          label: "Lỗ hổng giá bán không đồng đều:",
          description:
            "Mỗi chi nhánh tự định giá hoặc khuyến mại khác nhau dẫn đến tình trạng 'phá giá nội bộ'.",
        },
        {
          label: "Thiếu dữ liệu phân tích:",
          description:
            "Không khán trong việc tổng hợp và đối chiếu báo cáo tài chính từ nhiều điểm bán.",
        },
        {
          label: "Quản lý chi phí vận hành riêng lẻ:",
          description:
            "Các chi phí mặt bằng, nhân sự, điện nước ở mỗi chi nhánh được quản lý rời rạc.",
        },
      ],
    },
  },
];

// Data section2
const accordionItems = [
  {
    title: "Kho Tổng & Tồn kho Liên chi nhánh",
    content:
      "Xem tồn kho từng chi nhánh và tổng toàn bộ thống theo thời gian. Giúp quản lý vốn thực thời. Điều quản hiệu chuyển hàng liệu định thị trường hợp.",
  },
  {
    title: "Luân chuyển & Tối ưu Hàng hóa",
    content:
      "Theo dõi vận chuyển hàng hóa giữa các chi nhánh một cách dễ dàng và minh bạch. Hệ thống tự động đề xuất tối ưu luân chuyển.",
  },
];
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}
function AccordionItem({
  title,
  children,
  isOpen,
  onClick,
}: AccordionItemProps) {
  return (
    <div className="rounded-lg bg-primary/9 p-4 shadow-sm">
      <button
        className="flex w-full items-center justify-between text-left font-semibold text-ink"
        onClick={onClick}
      >
        <span className="text-h6 font-semibold text-ink">{title}</span>
        {isOpen ? (
          <FiMinus className="text-white bg-primary rounded text-h6" />
        ) : (
          <FiPlus className="text-white bg-primary rounded text-h6" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 text-sm text-sub1 text-text/80">{children}</div>
      )}
    </div>
  );
}

const maxCards = 6;
// data section 4
const customerSystemCards = [
  {
    title: "Website bán hàng",
    content:
      "Cho phép khách hàng đặt thuốc online. Tự động kiểm tra tồn kho và phân đơn về chi nhánh gần nhất để tối ưu tốc độ giao hàng.",
    image: "/features-dashboard1.png",
  },
  {
    title: "App Quản lý Cho Chủ chuỗi",
    content:
      "App quản lý dành cho chủ chuỗi đề suôn sẻn báo cáo doanh thu, hiệu suất tổng các nhảnh ngay trên di động bất kỳ đâu.",
    image: "/features-dashboard1.png",
  },
  {
    title: "App Quản lý Cho Chủ chuỗi",
    content:
      "App quản lý dành cho chủ chuỗi đề suôn sẻn báo cáo doanh thu, hiệu suất tổng các nhảnh ngay trên di động bất kỳ đâu.",
    image: "/features-dashboard1.png",
  },
  {
    title: "App Quản lý Cho Chủ chuỗi",
    content:
      "App quản lý dành cho chủ chuỗi đề suôn sẻn báo cáo doanh thu, hiệu suất tổng các nhảnh ngay trên di động bất kỳ đâu.",
    image: "/features-dashboard1.png",
  },
  {
    title: "Hệ thống CRM",
    content:
      "Quản lý thông tin khách hàng, lịch sử mua hàng và chương trình khách hàng thân thiết một cách chuyên nghiệp.",
    image: "/features-dashboard1.png",
  },
  {
    title: "Báo cáo thông minh",
    content:
      "Phân tích dữ liệu chi tiết về doanh thu, tồn kho và hiệu quả kinh doanh từng chi nhánh trong thời gian thực.",
    image: "/features-dashboard1.png",
  },
];
const cards = customerSystemCards.slice(0, maxCards);

//data section 5
const loyaltyCards = [
  {
    id: 1,
    title: "Hồ sơ khách hàng đúng chung toàn chuỗi",
    description:
      "Website bán hàng cho chuỗi cho phép khách hàng đặt thuốc online. Tự động kiểm tra tồn kho và phân đơn về chi nhánh gần nhất để tối ưu tốc độ giao hàng.",
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Hồ sơ khách hàng đúng chung toàn chuỗi",
    description:
      "Website bán hàng cho chuỗi cho phép khách hàng đặt thuốc online. Tự động kiểm tra tồn kho và phân đơn về chi nhánh gần nhất để tối ưu tốc độ giao hàng.",
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Hồ sơ khách hàng đúng chung toàn chuỗi",
    description:
      "Website bán hàng cho chuỗi cho phép khách hàng đặt thuốc online. Tự động kiểm tra tồn kho và phân đơn về chi nhánh gần nhất để tối ưu tốc độ giao hàng.",
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Hồ sơ khách hàng đúng chung toàn chuỗi",
    description:
      "Website bán hàng cho chuỗi cho phép khách hàng đặt thuốc online. Tự động kiểm tra tồn kho và phân đơn về chi nhánh gần nhất để tối ưu tốc độ giao hàng.",
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
  },
];

const dashboardImages = [
  { src: "/hero-dashboard.jpg", alt: "V-Pharma Dashboard Overview" },
  { src: "/features-dashboard1.png", alt: "Sales Dashboard" },
  { src: "/features-dashboard2.png", alt: "Inventory Dashboard" },
  { src: "/features-dashboard3.jpg", alt: "Reports Dashboard" },
  { src: "/features-dashboard5.jpg", alt: "Accounting Dashboard" },
];

function DashboardCarousel({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  const getImg = (offset: number) => {
    const idx = (currentIndex + offset + images.length) % images.length;
    return images[idx];
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center text-h6 font-semibold text-primary">
        Marketing Dashboards
      </div>
      <div className="flex justify-between items-center w-full gap-6 md:gap-10">
        {/* Slide left */}
        <div className="relative h-[180px] w-[280px] opacity-70 transition-all duration-500">
          <div className="relative h-[200px] w-[320px]">
            <Image
              src={getImg(-1).src}
              alt={getImg(-1).alt}
              fill
              className="rounded-xl object-contain bg-white"
            />
          </div>
        </div>

        {/* Slide center */}
        <div className="relative h-[300px] w-[440px] transition-all duration-500">
          <Image
            src={getImg(0).src}
            alt={getImg(0).alt}
            fill
            className="rounded-2xl border-[5px] border-white shadow-2xl object-contain bg-white"
          />
        </div>

        {/* Slide right */}
        <div className="relative h-[180px] w-[280px] opacity-70 transition-all duration-500">
          <div className="relative h-[200px] w-[320px]">
            <Image
              src={getImg(1).src}
              alt={getImg(1).alt}
              fill
              className="rounded-xl object-contain bg-white"
            />
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`h-3 w-7 rounded-full transition-all duration-200 ${
              currentIndex === idx ? "bg-primary" : "bg-gray-200"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

//DATA section 8 nhà thuoc tin dung
const pharmacyCards = [
  {
    title: "Nhà thuốc Thanh Hoài 1",
    content: "789 Đường Hai Bà Trưng, Quận 1, TP.Hồ Chí Minh",
    image: "/hero-dashboard.jpg",
  },
  {
    title: "Nhà thuốc Thanh Hoài 2",
    content: "123 Lý Thái Tổ, Quận 10, TP.Hồ Chí Minh",
    image: "/features-dashboard1.png",
  },
  {
    title: "Nhà thuốc Thanh Hoài 3",
    content: "456 Nguyễn Trãi, Quận 5, TP.Hồ Chí Minh",
    image: "/hero-dashboard.jpg",
  },
  {
    title: "Nhà thuốc Thanh Hoài 4",
    content: "12 Cách Mạng Tháng 8, Quận 3, TP.Hồ Chí Minh",
    image: "/features-dashboard1.png",
  },
  {
    title: "Nhà thuốc Thanh Hoài 5",
    content: "999 Võ Văn Tần, Quận 3, TP.Hồ Chí Minh",
    image: "/hero-dashboard.jpg",
  },
  {
    title: "Nhà thuốc Thanh Hoài 6",
    content: "36 Trường Sa, Quận Bình Thạnh, TP.Hồ Chí Minh",
    image: "/features-dashboard1.png",
  },
];
const cards2 = pharmacyCards.slice(0, maxCards);

// COMPONENT CHÍNH
export default function ChuoiNhaThuocPage() {
  const [openAccordion, setOpenAccordion] = useState(0);

  // State quản lý chỉ số slide hiện tại cho từng bộ card
  const [indexCustomer, setIndexCustomer] = useState(0);
  const [indexPharmacy, setIndexPharmacy] = useState(0);

  const cardsPerView = 3; // số card hiển thị trên 1 lần slide

  // Tính tổng số slides theo dữ liệu
  const totalSlidesCustomer = cards.length;

  const totalSlidesPharmacy = cards2.length;

  // Các hàm điều hướng slide
  function handlePrevCustomer() {
    setIndexCustomer((prev) =>
      prev === 0 ? totalSlidesCustomer - cardsPerView : prev - 1
    );
  }

  function handleNextCustomer() {
    setIndexCustomer((prev) =>
      prev === totalSlidesCustomer - cardsPerView ? 0 : prev + 1
    );
  }

  const getVisibleCardsCustomer = () => {
    const arr = [];
    for (let i = 0; i < cardsPerView; i++) {
      arr.push(cards[(indexCustomer + i) % totalSlidesCustomer]);
    }
    return arr;
  };


  function handlePrevPharmacy() {
    setIndexPharmacy((prev) =>
      prev === 0 ? totalSlidesPharmacy - cardsPerView : prev - 1
    );
  }

  function handleNextPharmacy() {
    setIndexPharmacy((prev) =>
      prev === totalSlidesPharmacy - cardsPerView ? 0 : prev + 1
    );
  }

  const getVisibleCardsPharmacy = () => {
    const arr = [];
    for (let i = 0; i < cardsPerView; i++) {
      arr.push(cards[(indexPharmacy + i) % totalSlidesPharmacy]);
    }
    return arr;
  };

  return (
    <div className="bg-white py-10">
      {/* SECTION: HERO*/}
      <section className="container mx-auto px-4 py-20 ">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-body2 font-semibold uppercase tracking-wide text-primary">
              GIẢI PHÁP QUẢN LÝ CHUỖI NHÀ THUỐC V-PHARMA
            </p>
            <h1 className="mb-6 text-ink">
              Kiểm Soát Chính Xác
              <br />
              Tăng Trưởng Toàn Diện
            </h1>
            <p className="mb-8 text-h5 text-text/80">
              Kết nối đa kênh, chăm sóc khách liên mạch từ lúc qua năng. Hỗ trợ
              chuyên nghiệp 24/7 với Haravan AI Chat.
            </p>
            <Link
              href="#"
              className="inline-block rounded-full bg-primary px-8 py-3 text-body1 font-semibold text-white shadow-lg hover:bg-primary/90"
            >
              Liên hệ tư vấn
            </Link>
          </div>
          <div>
            <Image
              src="/hero-dashboard.jpg"
              alt="Dashboard"
              width={700}
              height={500}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1: Thách thức */}
      <FadeInOnScroll>
        <section className="bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-6xl text-center">
              <h2 className="mb-4 text-ink">
                Những Thách Thức Khi Vận Hành Chuỗi Nhà Thuốc
              </h2>
              <p className="text-h6 text-text/80">
                Giải pháp quản lý nhà thuốc toàn diện, tối ưu hóa quy trình vận
                hành và nâng cao hiệu quả kinh doanh.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {challengeCards.map((card, index) => (
                <FlipCard
                  key={index}
                  frontTitle={card.frontTitle}
                  backContent={card.backContent}
                />
              ))}
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION 2: tối ưu và luân chuyển*/}
      <FadeInOnScroll>
        <section className="bg-gradient-to-b from-blue-50 to-white ">
          <div className="container mx-auto px-4 py-20">
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="text-h2 font-bold text-ink">
                Tối Ưu Hóa Vốn & Luân Chuyển Hàng Hóa
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-center text-h6">
                Giải pháp quản lý nhà thuốc toàn diện, tối ưu hóa quy trình vận
                hành và nâng cao hiệu quả kinh doanh.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="relative aspect-video rounded-lg bg-white p-2 shadow-xl">
                <Image
                  src="/features-dashboard1.png"
                  alt="Marketing Dashboards"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="space-y-4">
                {accordionItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    title={item.title}
                    isOpen={openAccordion === index}
                    onClick={() =>
                      setOpenAccordion(openAccordion === index ? -1 : index)
                    }
                  >
                    {item.content}
                  </AccordionItem>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION 3: Chuẩn Hóa Vận Hành*/}
      <FadeInOnScroll>
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-2 text-body2 font-semibold uppercase tracking-wide text-primary">
                TĂNG TRẢI NGHIỆM KHÁCH HÀNG
              </p>
              <h2 className="text-h2 font-bold text-ink">
                Chuẩn Hóa Vận Hành và Kiểm Soát
                <br />
                Giá Bán Toàn Chuỗi
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative z-10">
                  <Image
                    src="/people.jpg"
                    alt="Quản lý giá bán"
                    width={600}
                    height={500}
                    className="relative z-10 rounded-xl"
                  />
                  <div className="absolute bottom-8 left-8 rounded-xl bg-white p-6 shadow-2xl">
                    <Image
                      src="/hero-dashboard.jpg"
                      alt="Quản lý giá bán"
                      width={300}
                      height={200}
                      className="relative z-10 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                {/* Feature List */}
                <div className="space-y-6">
                  {/* Feature 1 */}
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-success/10">
                      <svg
                        className="h-6 w-6 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="mb-2 text-h6 font-semibold text-ink">
                        Quản lý Giá Bán Toàn Chuỗi
                      </h4>
                      <p className="text-sub1 leading-relaxed text-text/80">
                        Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách
                        sử dụng danh mục chung. Dễ dàng cập nhật giá từ 1 nơi
                        trên toàn hệ thống. Dễ dàng cập nhật giá từ 1 nơi trên
                        toàn hệ thống để tối ưu tốt nhất chi phí và điều kiểm
                        toàn tất cả điểm bán.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-success/10">
                      <svg
                        className="h-6 w-6 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="mb-2 text-h6 font-semibold text-ink">
                        Quản lý Danh mục & Dữ liệu
                      </h4>
                      <p className="text-sub1 leading-relaxed text-text/80">
                        Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách
                        sử dụng danh mục chung. Dễ dàng cập nhật giá từ 1 nơi
                        trên toàn hệ thống. Dễ dàng cập nhật giá từ 1 nơi trên
                        toàn hệ thống để tối ưu tốt nhất chi phí và điều kiểm
                        toàn tất cả điểm bán.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="mt-8 rounded-full bg-primary px-8 py-3 text-body1 font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl">
                  Liên hệ tư vấn
                </button>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION 4 Xây dựng hệ thống thân thiết chuyên nghiệp */}
      <FadeInOnScroll>
        <section className="bg-gradient-to-b from-white to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-5xl text-center">
              <p className="mb-2 text-body2 font-semibold uppercase tracking-wide text-primary">
                TĂNG TRẢI NGHIỆM KHÁCH HÀNG
              </p>
              <h2 className="mb-4 text-h2 font-bold text-ink">
                Xây Dựng Hệ Thống Khách Hàng Thân Thiết
                <br />
                Chuyên Nghiệp
              </h2>
            </div>

            <div className="relative flex items-center justify-center">
              {/* Arrow prev */}
              <button
                onClick={handlePrevCustomer}
                className="absolute left-0 z-10 h-12 w-12 -translate-x-4 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center transition"
                aria-label="Previous"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              {/* Carousel card row */}
              <div className="w-full max-w-6xl overflow-hidden">
                <div
                  className="flex transition-transform duration-700"
                  style={{
                    transform: `translateX(-${indexCustomer * (100 / 3)}%)`,
                  }}
                >
                  {cards.map((card, idx) => (
                    <div
                      key={idx}
                      className="card-custom mx-4 min-w-[350px] max-w-[350px] flex-shrink-0 rounded-xl border border-gray-400 bg-white shadow-lg transition hover:shadow-xl"
                      style={{ height: 400 }}
                    >
                      <div className="p-7">
                        <h3 className="mb-2 text-sub1 font-bold text-ink">
                          {card.title}
                        </h3>
                        <div className="mb-4 text-sub2 text-ink">
                          {card.content}
                        </div>
                        <div className="mt-3 rounded-lg bg-gray-50 py-6 px-4 flex flex-col items-center">
                          <Image
                            src={card.image}
                            alt={card.title}
                            width={310}
                            height={110}
                            className="h-[110px] w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Arrow next */}
              <button
                onClick={handleNextCustomer}
                className="absolute right-0 z-10 h-12 w-12 translate-x-4 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center transition"
                aria-label="Next"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION Xây Dựng Hệ Thống Khách Hàng 4 card có hover */}
      <FadeInOnScroll>
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-5xl text-center">
              <p className="mb-2 text-body2 font-semibold uppercase tracking-wide text-primary">
                TĂNG TRẢI NGHIỆM KHÁCH HÀNG
              </p>
              <h2 className="mb-4 text-h2 font-bold text-ink">
                Xây Dựng Hệ Thống Khách Hàng
                <br />
                Thân Thiết Chuyên Nghiệp
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {loyaltyCards.map((card) => (
                <div
                  key={card.id}
                  className="group relative rounded-2xl p-8 text-left transition-all duration-300 cursor-pointer bg-white shadow-md hover:shadow-2xl hover:bg-ink"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success transition-all duration-300 group-hover:bg-success group-hover:text-white">
                    {card.icon}
                  </div>

                  <h3 className="mb-3 text-h6 font-bold text-ink transition-colors duration-300 group-hover:text-white">
                    {card.title}
                  </h3>

                  <p className="text-sub1 text-text/80 transition-colors duration-300 group-hover:text-white/90">
                    {card.description}
                  </p>

                  <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <svg
                      className="h-6 w-6 text-success"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="rounded-full bg-primary px-8 py-3 text-body1 font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl">
                Liên hệ tư vấn
              </button>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/** section dashboard scrolling carousel */}
      <FadeInOnScroll>
        <section className="py-20 text-center">
          <div className="container mx-auto">
            <p className="mb-2 text-body2 font-semibold uppercase tracking-wide text-primary">
              TĂNG TRẢI NGHIỆM KHÁCH HÀNG
            </p>
            <h2 className="text-h2 mb- font-bold text-ink">
              Quyết Định Tối Ưu Với Trợ Lý AI
            </h2>
            <p className="mx-auto mb-20 max-w-2xl text-h6 text-text/80">
              Ứng dụng công nghệ AI để biến dữ liệu khổng lồ thành thông tin
              hành động, hỗ trợ các quyết định kinh doanh
            </p>
            <DashboardCarousel images={dashboardImages} />
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION : Chuẩn Hóa Vận Hành*/}
      <FadeInOnScroll>
        <section className="bg-ink py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-2 text-body2 font-semibold uppercase tracking-wide text-primary">
                TĂNG TRẢI NGHIỆM KHÁCH HÀNG
              </p>
              <h2 className="text-h2 font-bold text-white">
                Chuẩn Hóa Vận Hành và Kiểm Soát
                <br />
                Giá Bán Toàn Chuỗi
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative z-10">
                  <Image
                    src="/people.jpg"
                    alt="Quản lý giá bán"
                    width={600}
                    height={500}
                    className="relative z-10 rounded-xl"
                  />
                  <div className="absolute bottom-8 left-8 rounded-xl bg-white p-6 shadow-2xl">
                    <Image
                      src="/hero-dashboard.jpg"
                      alt="Quản lý giá bán"
                      width={300}
                      height={200}
                      className="relative z-10 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                {/* Feature List */}
                <div className="space-y-6">
                  {/* Feature 1 */}
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-success/10">
                      <svg
                        className="h-6 w-6 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="mb-2 text-h6 font-semibold text-white">
                        Quản lý Giá Bán Toàn Chuỗi
                      </h4>
                      <p className="text-sub1 leading-relaxed text-white">
                        Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách
                        sử dụng danh mục chung. Dễ dàng cập nhật giá từ 1 nơi
                        trên toàn hệ thống. Dễ dàng cập nhật giá từ 1 nơi trên
                        toàn hệ thống để tối ưu tốt nhất chi phí và điều kiểm
                        toàn tất cả điểm bán.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-success/10">
                      <svg
                        className="h-6 w-6 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="mb-2 text-h6 font-semibold text-white">
                        Quản lý Danh mục & Dữ liệu
                      </h4>
                      <p className="text-sub1 leading-relaxed text-white">
                        Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách
                        sử dụng danh mục chung. Dễ dàng cập nhật giá từ 1 nơi
                        trên toàn hệ thống. Dễ dàng cập nhật giá từ 1 nơi trên
                        toàn hệ thống để tối ưu tốt nhất chi phí và điều kiểm
                        toàn tất cả điểm bán.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-success/10">
                      <svg
                        className="h-6 w-6 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="mb-2 text-h6 font-semibold text-white">
                        Quản lý Danh mục & Dữ liệu
                      </h4>
                      <p className="text-sub1 leading-relaxed text-white">
                        Chuẩn hóa danh mục thuốc & giá bán toàn chuỗi bằng cách
                        sử dụng danh mục chung. Dễ dàng cập nhật giá từ 1 nơi
                        trên toàn hệ thống. Dễ dàng cập nhật giá từ 1 nơi trên
                        toàn hệ thống để tối ưu tốt nhất chi phí và điều kiểm
                        toàn tất cả điểm bán.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="mt-8 rounded-full bg-primary px-8 py-3 text-body1 font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl">
                  Liên hệ tư vấn
                </button>
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* ========================================
          SECTION 7: Được Tin Dùng - Carousel
          ======================================== */}

      <FadeInOnScroll>
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-6xl text-center">
              <p className="mb-2 text-center text-body2 font-semibold uppercase tracking-wide text-primary">
                TĂNG TRẢI NGHIỆM KHÁCH HÀNG
              </p>
              <h2 className="mb-4 text-h2 font-bold text-ink">
                Được Tin Dùng Bởi Các Chuỗi Nhà Thuốc Hàng Đầu
              </h2>
            </div>

            <div className="relative flex items-center justify-center">
              {/* Arrow prev */}
              <button
                onClick={handlePrevPharmacy}
                className="absolute left-0 z-10 h-12 w-12 -translate-x-4 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center transition"
                aria-label="Previous"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              {/* Carousel card row */}
              <div className="w-full max-w-6xl overflow-hidden">
                <div
                  className="flex transition-transform duration-700"
                  style={{
                    transform: `translateX(-${indexPharmacy * (100 / 3)}%)`,
                  }}
                >
                  {cards2.map((card, idx) => (
                    <div
                      key={idx}
                      className="card-custom mx-4 min-w-[350px] max-w-[350px] flex-shrink-0 rounded-xl border border-gray-400 bg-white shadow-lg transition hover:shadow-xl"
                      style={{ height: 350 }}
                    >
                      <div className="p-7">
                        <h3 className="mb-2 text-h6 font-bold text-ink">
                          {card.title}
                        </h3>
                        <div className="mb-4 text-sub1 text-ink">
                          {card.content}
                        </div>
                        <div className="mt-3 rounded-lg bg-gray-50 py-6 px-4 flex flex-col items-center">
                          <Image
                            src={card.image}
                            alt={card.title}
                            width={310}
                            height={110}
                            className="h-[110px] w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Arrow next */}
              <button
                onClick={handleNextPharmacy}
                className="absolute right-0 z-10 h-12 w-12 translate-x-4 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center transition"
                aria-label="Next"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION : CTA Email*/}
      <FadeInOnScroll>
        <CTAEmail />
      </FadeInOnScroll>

      {/* SECTION : FAQ*/}
      <FadeInOnScroll>
        <FaqSection />
      </FadeInOnScroll>
    </div>
  );
}
