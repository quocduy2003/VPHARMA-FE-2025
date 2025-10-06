// src/app/giai-phap/chuoi-nha-thuoc/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiCheck, FiPlus, FiMinus } from "react-icons/fi";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import FlipCard from "@/components/animations/FlipCard";
import FaqSection from "@/components/Faq";

// DỮ LIỆU - Accordion Items cho Section tôi ưu luân chuyển hàng hóa
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

//data những thách thức khi vận hành chuổi nhà thuốc
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

const customerSystemCards = [
  {
    id: 1,
    title: "Website bán hàng",
    description:
      "Cho phép khách hàng đặt thuốc online. Tự động kiểm tra tồn kho và phân đơn về chi nhánh gần nhất để tối ưu tốc độ giao hàng.",
    image: "/features-dashboard1.png",
  },
  {
    id: 2,
    title: "App Quản lý Cho Chủ chuỗi",
    description:
      "App quản lý dành cho chủ chuỗi đề suôn sẻn báo cáo doanh thu, hiệu suất tổng các nhảnh ngay trên di động bất kỳ đâu.",
    image: "/features-dashboard1.png",
  },
  {
    id: 3,
    title: "App Quản lý Cho Chủ chuỗi",
    description:
      "App quản lý dành cho chủ chuỗi đề suôn sẻn báo cáo doanh thu, hiệu suất tổng các nhảnh ngay trên di động bất kỳ đâu.",
    image: "/features-dashboard1.png",
  },
  {
    id: 4,
    title: "App Quản lý Cho Chủ chuỗi",
    description:
      "App quản lý dành cho chủ chuỗi đề suôn sẻn báo cáo doanh thu, hiệu suất tổng các nhảnh ngay trên di động bất kỳ đâu.",
    image: "/features-dashboard1.png",
  },
  {
    id: 5,
    title: "Hệ thống CRM",
    description:
      "Quản lý thông tin khách hàng, lịch sử mua hàng và chương trình khách hàng thân thiết một cách chuyên nghiệp.",
    image: "/features-dashboard1.png",
  },
  {
    id: 6,
    title: "Báo cáo thông minh",
    description:
      "Phân tích dữ liệu chi tiết về doanh thu, tồn kho và hiệu quả kinh doanh từng chi nhánh trong thời gian thực.",
    image: "/features-dashboard1.png",
  },
];

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


//Data section dashboard scrolling carousel
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
      <div className="relative flex h-[320px] w-full items-center justify-center">
        {/* Slide left */}
        <div className="absolute left-0 z-10 flex h-[380px] w-[420px] items-center justify-center opacity-70 md:left-4 transition-all duration-500">
          <div className="relative h-[380px] w-[420px]">
            <Image
              src={getImg(-1).src}
              alt={getImg(-1).alt}
              fill
              className="rounded-xl object-contain bg-white"
            />
          </div>
        </div>

        {/* Slide center */}
        <div className="relative mx-auto h-[400px] w-[600px] transition-all duration-500">
          <Image
            src={getImg(0).src}
            alt={getImg(0).alt}
            fill
            className="rounded-2xl border-[5px] border-white shadow-2xl object-contain bg-white"
          />
        </div>

        {/* Slide right */}
        <div className="absolute right-0 z-10 flex h-[380px] w-[420px] items-center justify-center opacity-70 md:right-4 transition-all duration-500">
          <div className="relative h-[380px] w-[420px]">
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
      <div className="mt-15 flex justify-center gap-2">
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

//DATA section nhà thuoc tin dung
const pharmacyCards = [
  {
    title: "Nhà thuốc Thanh Hoài 1",
    content: "789 Đường Hai Bà Trưng, Quận 1, TP.Hồ Chí Minh",
    image: "/mock-convo.jpg", // Đổi đường dẫn đúng ảnh mockup trong card!
  },
  {
    title: "Nhà thuốc Thanh Hoài 2",
    content: "123 Lý Thái Tổ, Quận 10, TP.Hồ Chí Minh",
    image: "/mock-convo.jpg",
  },
  {
    title: "Nhà thuốc Thanh Hoài 3",
    content: "456 Nguyễn Trãi, Quận 5, TP.Hồ Chí Minh",
    image: "/mock-convo.jpg",
  },
  {
    title: "Nhà thuốc Thanh Hoài 4",
    content: "12 Cách Mạng Tháng 8, Quận 3, TP.Hồ Chí Minh",
    image: "/mock-convo.jpg",
  },
  {
    title: "Nhà thuốc Thanh Hoài 5",
    content: "999 Võ Văn Tần, Quận 3, TP.Hồ Chí Minh",
    image: "/mock-convo.jpg",
  },
  {
    title: "Nhà thuốc Thanh Hoài 6",
    content: "36 Trường Sa, Quận Bình Thạnh, TP.Hồ Chí Minh",
    image: "/mock-convo.jpg",
  },
];
const maxCards = 6;
const cards = pharmacyCards.slice(0, maxCards);
const cardsPerView = 3;

// COMPONENT CHÍNH
export default function ChuoiNhaThuocPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [openAccordion, setOpenAccordion] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3; // Hiển thị 3 cards cùng lúc
  const totalSlides = Math.ceil(customerSystemCards.length / cardsPerView); // Tổng số slides (mỗi slide hiển thị 3 cards)



  // onst [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = cards.length;



  // Hàm chuyển đến slide trước
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // Hàm chuyển đến slide tiếp theo
  // const handleNext = () => {
  //   setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  // };


  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalCards - cardsPerView : prev - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === totalCards - cardsPerView ? 0 : prev + 1
    );
  };

  // Hiện 3 card liền kề, dịch từng card một
  const getVisibleCards = () => {
    const arr = [];
    for (let i = 0; i < cardsPerView; i++) {
      arr.push(cards[(currentIndex + i) % totalCards]);
    }
    return arr;
  };
  // const visibleCards = getVisibleCards();

  const startIndex = currentIndex * cardsPerView; // Tính toán cards hiển thị trong slide hiện tại
  const visibleCards = customerSystemCards.slice(
    startIndex,
    startIndex + cardsPerView
  );
  return (
    <div className="bg-white">
      {/* SECTION: HERO*/}
      <section className="container mx-auto px-4 py-20 ">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-body2 font-semibold uppercase tracking-wide text-primary">
              GIẢI PHÁP QUẢN LÝ CHUỖI NHÀ THUỐC V-PHARMA
            </p>
            <h1 className="mb-6 text-h1 font-bold text-ink">
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

      {/* SECTION: Thách thức */}
      <FadeInOnScroll>
        <section className="bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-6xl text-center">
              <h2 className="mb-4 text-h2 font-bold text-ink">
                Những Thách Thức Khi Vận Hành Chuỗi Nhà Thuốc
              </h2>
              <p className="text-h6 text-text/80">
                Giải pháp quản lý nhà thuốc toàn diện, tối ưu hóa quy trình vận
                hành và nâng cao hiệu quả kinh doanh.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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

      {/* SECTION: tối ưu và luân chuyển*/}
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

      {/* SECTION : Chuẩn Hóa Vận Hành*/}
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

      {/* SECTION Xây dựng hệ thống thân thiết chuyên nghiệp */}
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

            {/* ========== CAROUSEL CONTAINER ========== */}
            <div className="relative">
              {/* Navigation Arrow - Previous */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-x-6 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
                aria-label="Previous"
              >
                <svg
                  className="h-6 w-6 text-ink"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Navigation Arrow - Next */}
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 translate-x-6 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
                aria-label="Next"
              >
                <svg
                  className="h-6 w-6 text-ink"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* ========== CARDS GRID ========== */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {visibleCards.map((card) => (
                  <div
                    key={card.id}
                    className="group rounded-xl bg-gray-50 p-8 transition-shadow hover:shadow-lg"
                  >
                    {/* Title */}
                    <h3 className="mb-4 text-center text-h6 font-bold text-ink">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-center text-sub1 text-text/80">
                      {card.description}
                    </p>

                    <div className="overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={400}
                        height={300}
                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* ========== DOTS INDICATOR ========== */}
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      currentIndex === index
                        ? "w-8 bg-primary"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
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
                <button
                  key={card.id}
                  onClick={() => setActiveCard(card.id)}
                  className={`group relative rounded-2xl p-8 text-left transition-all duration-300 ${
                    activeCard === card.id
                      ? "bg-ink shadow-2xl"
                      : activeCard === null
                      ? "bg-white shadow-md hover:shadow-xl"
                      : "bg-white opacity-40 shadow-md"
                  }`}
                >
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-colors ${
                      activeCard === card.id
                        ? "bg-success text-white"
                        : "bg-success/10 text-success group-hover:bg-success group-hover:text-white"
                    }`}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className={`mb-3 text-h6 font-bold transition-colors ${
                      activeCard === card.id
                        ? "text-white"
                        : "text-ink group-hover:text-primary"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`text-sub1 transition-colors ${
                      activeCard === card.id
                        ? "text-white/90"
                        : "text-text/80 group-hover:text-text"
                    }`}
                  >
                    {card.description}
                  </p>

                  {activeCard === card.id && (
                    <div className="absolute right-4 top-4">
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
                  )}
                </button>
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
        <div className="mb-2 text-center text-body2 font-semibold uppercase tracking-wide text-primary">
          TĂNG TRẢI NGHIỆM KHÁCH HÀNG
        </div>
        <h2 className="mb-10 text-center text-h2 font-extrabold text-ink">
          Được Tin Dùng Bởi Các Chuỗi Nhà Thuốc Hàng Đầu
        </h2>
        <div className="relative flex items-center justify-center">
          {/* Arrow prev */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 h-12 w-12 -translate-x-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center transition"
            aria-label="Previous"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Carousel card row */}
          <div className="w-full max-w-6xl overflow-hidden">
            <div
              className="flex transition-transform duration-700"
              style={{
                transform: `translateX(-${currentIndex * (100/3)}%)`
              }}
            >
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="card-custom mx-4 min-w-[360px] max-w-[360px] flex-shrink-0 rounded-xl border border-gray-400 bg-white shadow-lg transition hover:shadow-xl"
                  style={{ height: 350 }}
                >
                  <div className="p-7">
                    <h3 className="mb-2 text-h5 font-bold text-ink">{card.title}</h3>
                    <div className="mb-4 text-sub1 text-ink">{card.content}</div>
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
            onClick={handleNext}
            className="absolute right-0 z-10 h-12 w-12 translate-x-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center transition"
            aria-label="Next"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-9 flex justify-center gap-2">
          {Array.from({ length: totalCards - cardsPerView + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 w-8 rounded-full transition-all duration-150 ${
                currentIndex === idx ? "bg-primary" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
      </FadeInOnScroll>

      {/* SECTION : CTA Email*/}
      <FadeInOnScroll>
        <section className="bg-ink py-20 text-center text-white">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-h2 font-bold">
              Bắt Đầu Dùng Thử Miễn Phí Giải Pháp Quản
              <br />
              Lý Nhà Thuốc Ngay Hôm Nay
            </h2>
            <form className=" rounded-xl mx-auto flex max-w-md gap-3">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="bg-white flex-1 rounded-xl px-4 py-3 text-ink focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION : FAQ*/}
      <FadeInOnScroll>
        <FaqSection />
      </FadeInOnScroll>
    </div>
  );
}
