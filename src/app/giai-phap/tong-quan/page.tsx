"use client";

import Image from "next/image";
import { useState, useEffect } from "react"; // Thêm useEffect
import {
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import ReviewCarousel from "@/components/ReviewCarousel";
import FaqSection from "@/components/Faq";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

// Dữ liệu Các Tính Năng Nổi Bật Của V-Pharma
const featureTabs = [
  {
    id: "ban-hang",
    label: "Bán hàng",
    image: "/features-dashboard1.png",
    descriptions:
      "Theo dõi và quản lý tồn kho thuốc chính xác, giảm thiểu sai sót và tối ưu hóa nguồn hàng.",
    points: [
      "Nhập hàng từ nhà cung cấp, xuất kho điều chuyển",
      "Xem báo cáo tồn kho",
      "Kiểm kê định kỳ, cảnh báo hàng thiếu hoặc sắp hết hạn",
      "Hỗ trợ định biên hàng tồn, khai báo hàng thiếu và trả hàng NCC",
    ],
  },
  {
    id: "quan_ly-kho",
    label: "Quản Lý Kho",
    image: "/features-dashboard2.png",
    descriptions:
      "Theo dõi và quản lý tồn kho thuốc chính xác, giảm thiểu sai sót và tối ưu hóa nguồn hàng.",
    points: [
      "Nhập hàng từ nhà cung cấp, xuất kho điều chuyển",
      "Xem báo cáo tồn kho",
      "Kiểm kê định kỳ, cảnh báo hàng thiếu hoặc sắp hết hạn",
      "Hỗ trợ định biên hàng tồn, khai báo hàng thiếu và trả hàng NCC",
    ],
  },
  {
    id: "danh-muc",
    label: "Danh mục",
    image: "/features-dashboard3.jpg",
    descriptions:
      "Theo dõi và quản lý tồn kho thuốc chính xác, giảm thiểu sai sót và tối ưu hóa nguồn hàng.",
    points: [
      "Nhập hàng từ nhà cung cấp, xuất kho điều chuyển",
      "Xem báo cáo tồn kho",
      "Kiểm kê định kỳ, cảnh báo hàng thiếu hoặc sắp hết hạn",
      "Hỗ trợ định biên hàng tồn, khai báo hàng thiếu và trả hàng NCC",
    ],
  },
  {
    id: "bao-cao",
    label: "Báo cáo",
    image: "/features-dashboard4.png",
    descriptions:
      "Theo dõi và quản lý tồn kho thuốc chính xác, giảm thiểu sai sót và tối ưu hóa nguồn hàng.",
    points: [
      "Nhập hàng từ nhà cung cấp, xuất kho điều chuyển",
      "Xem báo cáo tồn kho",
      "Kiểm kê định kỳ, cảnh báo hàng thiếu hoặc sắp hết hạn",
      "Hỗ trợ định biên hàng tồn, khai báo hàng thiếu và trả hàng NCC",
    ],
  },
  {
    id: "ke-toan",
    label: "Kế toán",
    image: "/features-dashboard5.jpg",
    descriptions:
      "Theo dõi và quản lý tồn kho thuốc chính xác, giảm thiểu sai sót và tối ưu hóa nguồn hàng.",
    points: [
      "Nhập hàng từ nhà cung cấp, xuất kho điều chuyển",
      "Xem báo cáo tồn kho",
      "Kiểm kê định kỳ, cảnh báo hàng thiếu hoặc sắp hết hạn",
      "Hỗ trợ định biên hàng tồn, khai báo hàng thiếu và trả hàng NCC",
    ],
  },
  {
    id: "xuat-hoa-don-dien-tu",
    label: "Xuất hóa đơn điện tử",
    image: "/features-dashboard6.png",
    descriptions:
      "Theo dõi và quản lý tồn kho thuốc chính xác, giảm thiểu sai sót và tối ưu hóa nguồn hàng.",
    points: [
      "Nhập hàng từ nhà cung cấp, xuất kho điều chuyển",
      "Xem báo cáo tồn kho",
      "Kiểm kê định kỳ, cảnh báo hàng thiếu hoặc sắp hết hạn",
      "Hỗ trợ định biên hàng tồn, khai báo hàng thiếu và trả hàng NCC",
    ],
  },
  {
    id: "lien-ket-duoc-quoc-gia",
    label: "Liên kết dược quốc gia",
    image: "/features-dashboard7.png",
    descriptions:
      "Theo dõi và quản lý tồn kho thuốc chính xác, giảm thiểu sai sót và tối ưu hóa nguồn hàng.",
    points: [
      "Nhập hàng từ nhà cung cấp, xuất kho điều chuyển",
      "Xem báo cáo tồn kho",
      "Kiểm kê định kỳ, cảnh báo hàng thiếu hoặc sắp hết hạn",
      "Hỗ trợ định biên hàng tồn, khai báo hàng thiếu và trả hàng NCC",
    ],
  },
];

// dữ liệu cam kết đồng hành cùng nhà thuốc
const accordionItems = [
  {
    title: "Triển khai & đào tạo dễ dàng",
    content:
      "Hạ tầng mạnh mẽ, bảo mật hàng đầu, hỗ trợ 10.000 lượt truy cập đồng thời. Giao diện và tính năng linh hoạt, tùy chỉnh theo đặc thù doanh nghiệp.",
  },
  {
    title: "Triển khai & đào tạo dễ dàng",
    content:
      "Hạ tầng mạnh mẽ, bảo mật hàng đầu, hỗ trợ 10.000 lượt truy cập đồng thời. Giao diện và tính năng linh hoạt, tùy chỉnh theo đặc thù doanh nghiệp.",
  },
  {
    title: "Triển khai & đào tạo dễ dàng",
    content:
      "Hạ tầng mạnh mẽ, bảo mật hàng đầu, hỗ trợ 10.000 lượt truy cập đồng thời. Giao diện và tính năng linh hoạt, tùy chỉnh theo đặc thù doanh nghiệp.",
  },
  {
    title: "Triển khai & đào tạo dễ dàng",
    content:
      "Hạ tầng mạnh mẽ, bảo mật hàng đầu, hỗ trợ 10.000 lượt truy cập đồng thời. Giao diện và tính năng linh hoạt, tùy chỉnh theo đặc thù doanh nghiệp.",
  },
  {
    title: "Triển khai & đào tạo dễ dàng",
    content:
      "Hạ tầng mạnh mẽ, bảo mật hàng đầu, hỗ trợ 10.000 lượt truy cập đồng thời. Giao diện và tính năng linh hoạt, tùy chỉnh theo đặc thù doanh nghiệp.",
  },
  {
    title: "Hỗ trợ kỹ thuật 24/7",
    content:
      "Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và xử lý các vấn đề kỹ thuật nhanh chóng.",
  },
  {
    title: "Cập nhật tính năng liên tục",
    content:
      "V-Pharma liên tục được cập nhật các tính năng mới nhất để đáp ứng nhu cầu thay đổi của thị trường  V-Pharma liên tục được cập nhật các tính năng mới nhất để đáp ứng nhu cầu thay đổi của thị trườn    ggggggggggg ggggggggggggggggggggggggggggggggggg.",
  },
  {
    title: "Tích hợp linh hoạt",
    content:
      "Dễ dàng kết nối với các phần mềm kế toán, hóa đơn điện tử và các đối tác vận chuyển phổ biến.",
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

// Component mới cho dashboard scrolling carousel
const DashboardCarousel = ({
  images,
}: {
  images: { src: string; alt: string }[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Thay đổi slide mỗi 3 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [images.length]);

  return (
    <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-lg ">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative h-[600px] w-full flex-shrink-0">
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      {/* <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 w-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div> */}
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
};

// Dữ liệu hình ảnh cho dashboard scrolling carousel
const dashboardImages = [
  { src: "/hero-dashboard.jpg", alt: "V-Pharma Dashboard Overview" },
  { src: "/features-dashboard1.png", alt: "Sales Dashboard" },
  { src: "/features-dashboard2.png", alt: "Inventory Dashboard" },
  { src: "/features-dashboard4.png", alt: "Reports Dashboard" },
  { src: "/features-dashboard5.jpg", alt: "Accounting Dashboard" },
];

export default function IndependentPharmacyPage() {
  const [activeTab, setActiveTab] = useState("ban-hang");
  const [openAccordion, setOpenAccordion] = useState(0);
  return (
    <div>
      {/** Dashboard */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-10 text-center">
        <div className="container mx-auto px-4 lg:px-80">
          <h1 className="text-h1 font-bold text-ink">
            Phần Mềm Quản Lý Nhà Thuốc Toàn Diện V-Pharma
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-h5">
            Giải pháp toàn diện cho quản lý nhà thuốc, từ tồn kho đến bán hàng,
            với công nghệ hiện đại và dễ sử dụng.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
              Trải nghiệm miễn phí
            </button>
            <button className="rounded-full border border-primary bg-white px-6 py-3 font-semibold text-primary hover:bg-primary/10">
              Xem video
            </button>
          </div>
          <div className="relative mx-auto mt-12 max-w-4xl">
            <Image
              src="/hero-dashboard.jpg"
              alt="V-Pharma Dashboard"
              width={1000}
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 4 hero-section */}
      <FadeInOnScroll>
        <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-20 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Dễ dùng & Đơn giản",
              description:
                "Giao diện chuẩn hóa riêng cho nhà thuốc, thành thạo ngay từ lần đầu sử dụng.",
            },
            {
              title: "Quản lý mọi lúc mọi nơi",
              description:
                "Dễ dàng truy cập và kiểm soát thông tin dữ liệu hoạt động nhà thuốc từ mọi lúc mọi nơi.",
            },
            {
              title: "Tuân thủ chuẩn GPP",
              description:
                "Tích hợp liên thông Dược Quốc gia. Hỗ trợ kết nối với các đơn vị cung cấp hóa đơn điện tử.",
            },
            {
              title: "Hạn chế thất thoát",
              description:
                "Tự động theo dõi số lô, cảnh báo thiếu hụt/hết hạn. Dữ liệu rõ ràng, giúp kiểm kê định kỳ.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <div className="h-6 w-6 rounded bg-primary"></div>
              </div>
              <h4 className="text-h6 font-bold text-ink">{item.title}</h4>
              <p className="mt-2 text-sm text-sub1">{item.description}</p>
            </div>
          ))}
        </section>
      </FadeInOnScroll>

      {/* Features Section: Các Tính Năng Nổi Bật Của V-Pharma*/}
      <FadeInOnScroll>
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-center text-h2 font-bold text-ink">
            Các Tính Năng Nổi Bật Của V-Pharma
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-h6">
            Giải pháp quản lý nhà thuốc toàn diện, tối ưu hóa quy trình vận hành
            và nâng cao hiệu quả kinh doanh.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full text-body2 border px-5 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "border-primary bg-white text-text hover:bg-primary/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative">
              <Image
                src={featureTabs.find((t) => t.id === activeTab)?.image || ""}
                alt="Feature Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-h3 font-bold text-ink">
                {featureTabs.find((t) => t.id === activeTab)?.label}
              </h3>
              <p className="text-body1 text-ink">
                {featureTabs.find((t) => t.id === activeTab)?.descriptions}
              </p>
              <ul className="mt-4 text-body1 space-y-3">
                {featureTabs
                  .find((t) => t.id === activeTab)
                  ?.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FiCheckCircle className="mt-1 flex-shrink-0 text-success" />
                      <span>{point}</span>
                    </li>
                  ))}
              </ul>
              <button className="mt-8 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
                Trải nghiệm miễn phí
              </button>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* --- Section: An Tâm Và Vận Hành Hiệu Quả --- */}
      <FadeInOnScroll>
        <section className="bg-ink py-20 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-h2 font-bold">An Tâm Và Vận Hành Hiệu Quả</h2>
              <p className="mt-4 text-h6 text-white/80">
                Nền tảng V-Pharma biến quản lý phức tạp thành tự động hóa dễ
                dàng, giúp bạn tập trung vào Khách hàng và Tăng trưởng.
              </p>
            </div>

            <div className="mt-16 space-y-20">
              {/* Feature 1*/}
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                <div className="relative aspect-video rounded-lg bg-white/10 p-2">
                  <Image
                    src="/features-dashboard1.png"
                    alt="Marketing Dashboards"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div>
                  <h3 className="text-h3 font-semibold text-success">
                    Quản Lý Tài Chính Rõ Ràng
                  </h3>
                  <p className="text-sub1 mt-4 line-clamp-3 text-white/80">
                    Chấm dứt việc “tiền bán thuốc không rõ lý do” hay nhập quá
                    nhiều vì nghe khuyến mại. Hệ thống ghi nhận chi tiêu/giao
                    dịch. Dễ dàng nắm được lãi gộp và tiền mặt thực tế ngay lập
                    tức, tránh nhầm lẫn vốn và lãi.
                  </p>
                </div>
              </div>

              {/* Feature 2*/}
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                <div className="md:order-last">
                  <div className="relative aspect-video rounded-lg bg-white/10 p-2">
                    <Image
                      src="/features-dashboard2.png"
                      alt="Marketing Dashboards"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-h3 font-semibold text-success">
                    Nâng Cao Hiệu Quả Kinh Doanh
                  </h3>
                  <p className="text-sub1 mt-4 line-clamp-3 text-white/80">
                    Chuyển từ nỗi sợ nhập liệu sang lợi ích. AI Scan Hóa đơn đầu
                    vào giúp bạn nhập liệu nhanh chóng mà không cần gõ tay, giảm
                    đáng kể thời gian nhập liệu.
                  </p>
                </div>
              </div>

              {/* Feature 3*/}
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                <div className="relative aspect-video rounded-lg bg-white/10 p-2">
                  <Image
                    src="/features-dashboard3.jpg"
                    alt="Marketing Dashboards"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div>
                  <h3 className="text-h3 font-semibold text-success">
                    Chăm Sóc Khách Hàng Hiệu Quả
                  </h3>
                  <p className="text-sub1 mt-4 line-clamp-3 text-white/80">
                    Quản lý hồ sơ khách hàng để tư vấn thuốc chính xác hơn, dựa
                    trên dữ liệu đã ghi nhận trước đó. Nâng cao trải nghiệm
                    khách hàng để họ luôn quay lại.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                <div className="md:order-last">
                  <div className="relative aspect-video rounded-lg bg-white/10 p-2">
                    <Image
                      src="/features-dashboard5.jpg"
                      alt="Marketing Dashboards"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-h3 font-semibold text-success">
                    Tăng Cạnh Tranh Và Mở Rộng
                  </h3>
                  <p className="text-sub1 mt-4 line-clamp-3 text-white/80">
                    Dù là nhà thuốc độc lập, bạn vẫn cần tầm nhìn. Mọi dữ liệu
                    đã được số hóa và chuẩn hóa, tạo nền tảng vững chắc để mở
                    rộng quầy/chi nhánh khi bạn sẵn sàng.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-20 text-center">
              <button className="rounded-full bg-primary px-8 py-3 font-semibold text-white hover:opacity-90">
                Trải nghiệm miễn phí
              </button>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/** section Công nghệ AI - Trợ lý Kinh doanh 24/7 */}
      <FadeInOnScroll>
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-h2 font-bold text-ink">
            Công nghệ AI - Trợ lý Kinh doanh 24/7
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-h6 text-text/80">
            Ứng dụng công nghệ AI phân tích dữ liệu và đề xuất việc cần làm thay
            vì những con số khô khan.
          </p>
          <div className="mt-8">
            <button className="rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
              Trải nghiệm miễn phí
            </button>
          </div>
          <DashboardCarousel images={dashboardImages} />
        </section>
      </FadeInOnScroll>

      {/** section Giải Pháp Chuyên Biệt */}
      <FadeInOnScroll>
        <section className=" py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-h2 font-bold text-ink">
                Giải Pháp Chuyên Biệt
              </h2>
              <p className="mt-4 text-h6 text-text/80">
                Nền tảng của chúng tôi sử dụng Trí tuệ nhân tạo để phân tích dữ
                liệu và đưa ra các gợi ý hành động trực quan.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className="rounded-xl bg-white p-8 text-center shadow-lg">
                <h3 className="mt-6 text-h3 font-bold text-ink">
                  Chuỗi nhà thuốc
                </h3>
                <p className="mt-2 text-sub1">
                  Tối ưu vận hành cho chuỗi nhà thuốc, dễ dàng kiểm soát.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block font-semibold text-primary hover:underline"
                >
                  Tìm hiểu thêm →
                </a>
                <Image
                  src="/features-dashboard1.png"
                  alt="Chuỗi nhà thuốc"
                  width={250}
                  height={250}
                  className="mx-auto"
                />
              </div>
              <div className="rounded-xl bg-white p-8 text-center shadow-lg">
                <h3 className="mt-6 text-h3 font-bold text-ink">
                  Phòng khám/phòng mạch
                </h3>
                <p className="mt-2 text-sub1">
                  Giải pháp tích hợp quản lý thuốc và hồ sơ bệnh nhân hiệu quả.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block font-semibold text-primary hover:underline"
                >
                  Tìm hiểu thêm →
                </a>
                <Image
                  src="/features-dashboard1.png"
                  alt="Phòng khám"
                  width={250}
                  height={250}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* --- Section: Cam Kết Đồng Hành Cùng Nhà Thuốc --- */}
      <FadeInOnScroll>
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-h2 font-bold text-ink">
              Cam Kết Đồng Hành Cùng Nhà Thuốc
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-h6">
              Nền tảng của chúng tôi sử dụng Trí tuệ nhân tạo để phân tích dữ
              liệu và đưa ra các gợi ý hành động trực quan.
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
        </section>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <ReviewCarousel />
      </FadeInOnScroll>

      {/* Final CTA Section */}
      <FadeInOnScroll>
        <section className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-ink p-12 text-center text-white">
            <h2 className="text-h2 font-bold">
              Sẵn Sàng Số Hóa Nhà Thuốc Của Bạn?
            </h2>
            <p className="mx-auto text-h6 mt-4 max-w-1xl text-white/80">
              Trải nghiệm đầy đủ các tính năng ưu việt của V-Pharma hoàn toàn
              miễn phí trong 15 ngày. Không cần thẻ tín dụng.
            </p>
            <button className="mt-8 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
              Trải nghiệm miễn phí
            </button>
          </div>
        </section>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <FaqSection />
      </FadeInOnScroll>
    </div>
  );
}
