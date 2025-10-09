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
import { independentPharmacyData } from "@/lib/api/solution";
import { Button } from "@/components/ui/Button";

import { button } from "framer-motion/client";


// Dữ liệu cho Các Tính Năng Nổi Bật Của V-Pharma
const featureTabs = [
  {
    id: "ban-hang",
    label: "Bán hàng",
    image: "/features-dashboard1.png",
    discriptions:
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
    discriptions:
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
    discriptions:
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
    discriptions:
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
    discriptions:
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
    discriptions:
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
    discriptions:
      "Theo dõi và quản lý tồn kho thuốc chính xác, giảm thiểu sai sót và tối ưu hóa nguồn hàng.",
    points: [
      "Nhập hàng từ nhà cung cấp, xuất kho điều chuyển",
      "Xem báo cáo tồn kho",
      "Kiểm kê định kỳ, cảnh báo hàng thiếu hoặc sắp hết hạn",
      "Hỗ trợ định biên hàng tồn, khai báo hàng thiếu và trả hàng NCC",
    ],
  },
  // Thêm các tab khác ở đây nếu có...
];

// Dữ liệu cho câu hỏi thường gặp (FAQ)
const faqItems = [
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
];

const accordionItems = [
  {
    title: "Triển khai & đào tạo dễ dàng",
    content:
      "Hạ tầng mạnh mẽ, đáp ứng tới 10.000 lượt truy cập đồng thời cùng hệ thống bảo mật hàng đầu. Giao diện và tính năng thiết kế theo đặc thù doanh nghiệp, cho phép tuỳ chỉnh linh hoạt.",
  },
  {
    title: "Hỗ trợ kỹ thuật 24/7",
    content:
      "Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và xử lý các vấn đề kỹ thuật nhanh chóng.",
  },
  {
    title: "Cập nhật tính năng liên tục",
    content:
      "V-Pharma liên tục được cập nhật các tính năng mới nhất để đáp ứng nhu cầu thay đổi của thị trường.",
  },
  {
    title: "Tích hợp linh hoạt",
    content:
      "Dễ dàng kết nối với các phần mềm kế toán, hóa đơn điện tử và các đối tác vận chuyển phổ biến.",
  },
];

// Component con cho từng câu hỏi FAQ
function FaqItem({
  item,
  isOpen,
  onClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left text-lg font-medium text-text"
        onClick={onClick}
      >
        <span className="text-sub1 font-semibold text-ink">
          {item.question}
        </span>
        {isOpen ? (
          <FiMinus className="text-white bg-primary rounded text-h6" />
        ) : (
          <FiPlus className="text-white bg-primary rounded text-h6" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 text-sm text-body2">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AccordionItem({ title, children, isOpen, onClick }: any) {
  return (
    <div className="rounded-lg bg-primary/9 p-4 shadow-sm">
      <button
        className="flex w-full items-center justify-between text-left font-semibold text-ink"
        onClick={onClick}
      >
        <span className="text-sub1 font-semibold text-ink">{title}</span>
        {isOpen ? (
          <FiMinus className="text-white bg-primary rounded text-h6" />
        ) : (
          <FiPlus className="text-white bg-primary rounded text-h6" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 text-sm text-body2 text-text/80">{children}</div>
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
    <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-lg shadow-2xl">
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
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 w-3 rounded-full transition-colors ${currentIndex === index ? "bg-primary" : "bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

// Dữ liệu hình ảnh cho carousel
const dashboardImages = [
  { src: "/hero-dashboard.jpg", alt: "V-Pharma Dashboard Overview" },
  { src: "/features-dashboard1.png", alt: "Sales Dashboard" },
  { src: "/features-dashboard2.png", alt: "Inventory Dashboard" },
  { src: "/features-dashboard4.png", alt: "Reports Dashboard" },
  { src: "/features-dashboard5.jpg", alt: "Accounting Dashboard" },
];

const reviewsData = [
  {
    name: "Chị Ngọc Anh",
    position: "Nhà thuốc Cô Nở 2",
    starCount: 5,
    content: "Dịch vụ hỗ trợ 1:1 thực sự khác biệt.",
  },
  {
    name: "Anh Minh",
    position: "Nhà thuốc Minh Tâm",
    starCount: 5,
    content: "Phần mềm rất dễ sử dụng, giao diện thân thiện.",
  },
  {
    name: "Chị Lan Anh",
    position: "Quầy thuốc Sức Khỏe Xanh",
    starCount: 5,
    content: "Tính năng báo cáo và quản lý tồn kho thông minh.",
  },
  {
    name: "Anh Tuấn",
    position: "Nhà thuốc An Lạc",
    starCount: 5,
    content: "Đội ngũ kỹ thuật chuyên nghiệp và tận tâm.",
  },
  {
    name: "Chị Hà",
    position: "Nhà thuốc An Khang",
    starCount: 5,
    content: "AI Scan hóa đơn tiết kiệm thời gian nhập liệu.",
  },
  {
    name: "Anh Bảo",
    position: "Nhà thuốc Gia Đình",
    starCount: 5,
    content: "Hệ thống báo cáo trực quan giúp nắm bắt kinh doanh.",
  },
  {
    name: "Chị Mai",
    position: "Quầy thuốc FPT Long Châu",
    starCount: 5,
    content: "Tuân thủ chuẩn GPP và liên thông Dược Quốc gia.",
  },
  {
    name: "Anh Phong",
    position: "Nhà thuốc Việt",
    starCount: 5,
    content: "Kiểm kê hàng hóa và cảnh báo date hiệu quả.",
  },
  {
    name: "Chị Quỳnh",
    position: "Nhà thuốc Pharmacity",
    starCount: 5,
    content: "Giao diện hiện đại, dễ dàng thao tác trên mọi thiết bị.",
  },
  {
    name: "Anh Hùng",
    position: "Nhà thuốc An Tâm",
    starCount: 5,
    content: "Tính năng quản lý khách hàng giúp chăm sóc tốt hơn.",
  },
  {
    name: "Chị Yến",
    position: "Quầy thuốc Hạnh Phúc",
    starCount: 4,
    content: "Rất hài lòng với sự ổn định và tốc độ của phần mềm.",
  },
  {
    name: "Anh Khoa",
    position: "Nhà thuốc Trung Sơn",
    starCount: 4,
    content: "Tích hợp hóa đơn điện tử tiện lợi và nhanh chóng.",
  },
  {
    name: "Chị Dung",
    position: "Nhà thuốc Phước Thiện",
    starCount: 3,
    content: "Phần mềm giúp tôi giảm thất thoát đáng kể.",
  },
  {
    name: "Anh Long",
    position: "Nhà thuốc An Bình",
    starCount: 3,
    content: "Đáng tiền! Một giải pháp toàn diện cho nhà thuốc.",
  },
  {
    name: "Chị Thảo",
    position: "Quầy thuốc V-Pharma",
    starCount: 4,
    content: "Hỗ trợ 24/7 thực sự cứu cánh những lúc cần gấp.",
  },
  {
    name: "Chị Ngọc Anh",
    position: "Nhà thuốc Cô Nở 2",
    starCount: 5,
    content: "Dịch vụ hỗ trợ 1:1 thực sự khác biệt.",
  },
  {
    name: "Chị Ngọc Anh",
    position: "Nhà thuốc Cô Nở 2",
    starCount: 4,
    content: "Dịch vụ hỗ trợ 1:1 thực sự khác biệt.",
  },
  {
    name: "Chị Ngọc Anh",
    position: "Nhà thuốc Cô Nở 2",
    starCount: 3,
    content: "Dịch vụ hỗ trợ 1:1 thực sự khác biệt.",
  },
  {
    name: "Chị Ngọc Anh",
    position: "Nhà thuốc Cô Nở 2",
    starCount: 4,
    content: "Dịch vụ hỗ trợ 1:1 thực sự khác biệt.",
  },
  {
    name: "Chị Ngọc Anh",
    position: "Nhà thuốc Cô Nở 2",
    starCount: 1,
    content: "Dịch vụ hỗ trợ 1:1 thực sự khác biệt.",
  },
  {
    name: "Anh Kiên",
    position: "Nhà thuốc Medigo",
    starCount: 3,
    content: "Mọi hoạt động của chuỗi nhà thuốc được quản lý tập trung.",
  },
];




function ReviewCarousel() {
  const REVIEWS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(0);

  // Lọc và giới hạn 16 bình luận tốt nhất
  const bestReviews = reviewsData
    .sort((a, b) => b.starCount - a.starCount)
    .slice(0, 16);

  const totalPages = Math.ceil(bestReviews.length / REVIEWS_PER_PAGE);

  const startIndex = currentPage * REVIEWS_PER_PAGE;
  const selectedReviews = bestReviews.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE
  );

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary font-semibold">Reviews</p>
        <h2 className="text-h3 font-bold text-ink mt-2">
          Khách Hàng Nói Gì Về V-Pharma
        </h2>
        <div className="relative mx-auto mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {selectedReviews.map((review, index) => (
              <div
                key={startIndex + index}
                className="flex transform-gpu flex-col rounded-lg bg-white p-6 text-left shadow-lg transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-lg font-bold text-ink">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.position}</p>
                <div className="my-3 flex text-yellow-400">
                  {Array.from({ length: review.starCount }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="flex-grow text-gray-600 italic">
                  “{review.content}”
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-3 w-3 rounded-full transition-colors ${currentPage === index ? "bg-primary" : "bg-gray-300"
                  }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function IndependentPharmacyPage() {

  const [activeTab, setActiveTab] = useState("ban-hang");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openAccordion, setOpenAccordion] = useState(0);
  const { heroSection, featureSection } = independentPharmacyData;
  return (
    <div>
      {/** Dashboard */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 text-center">
        <div className="container mx-auto px-4 lg:px-80">
          <h1 className="text-h1 font-bold text-ink">
            {heroSection.mainTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-h6">
            {heroSection.mainDescription}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            {heroSection.ctaButtons.map((button, index) => (
              <Button
                key={button.title}
                variant={index === 0 ? 'primary' : 'secondary'}
              >
                {button.title}
              </Button>
            ))}
          </div>
          <div className="relative mx-auto mt-12 max-w-4xl">
            <Image
              src="/features-dashboard1.png"
              alt="V-Pharma Dashboard"
              width={1000}
              height={600}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 4 hero-section */}
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
            <h3 className="text-h6 font-bold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm text-sub1">{item.description}</p>
          </div>
        ))}
      </section>

      {/* Features Section: Các Tính Năng Nổi Bật Của V-Pharma*/}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-center text-h3 font-bold text-ink">
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
              className={`rounded-full text-body2 border px-5 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
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
            <h3 className="text-h5 font-bold text-ink">
              {featureTabs.find((t) => t.id === activeTab)?.label}
            </h3>
            <p className="text-body1 text-ink">
              {featureTabs.find((t) => t.id === activeTab)?.discriptions}
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

      {/* --- Section: An Tâm Và Vận Hành Hiệu Quả --- */}
      <section className="bg-ink py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-h3 font-bold">An Tâm Và Vận Hành Hiệu Quả</h2>
            <p className="mt-4 text-h6 text-white/80">
              Nền tảng V-Pharma biến quản lý phức tạp thành tự động hóa dễ dàng,
              giúp bạn tập trung vào Khách hàng và Tăng trưởng.
            </p>
          </div>

          {/* Feature 1*/}
          <div className="mt-16 space-y-20">
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
                <h3 className="text-h5 font-semibold text-success">
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
                <h3 className="text-h5 font-semibold text-success">
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
                <h3 className="text-h5 font-semibold text-success">
                  Chăm Sóc Khách Hàng Hiệu Quả
                </h3>
                <p className="text-sub1 mt-4 line-clamp-3 text-white/80">
                  Quản lý hồ sơ khách hàng để tư vấn thuốc chính xác hơn, dựa
                  trên dữ liệu đã ghi nhận trước đó. Nâng cao trải nghiệm khách
                  hàng để họ luôn quay lại.
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
                <h3 className="text-h5 font-semibold text-success">
                  Tăng Cạnh Tranh Và Mở Rộng
                </h3>
                <p className="text-sub1 mt-4 line-clamp-3 text-white/80">
                  Dù là nhà thuốc độc lập, bạn vẫn cần tầm nhìn. Mọi dữ liệu đã
                  được số hóa và chuẩn hóa, tạo nền tảng vững chắc để mở rộng
                  quầy/chi nhánh khi bạn sẵn sàng.
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

      {/** section Công nghệ AI - Trợ lý Kinh doanh 24/7 */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-h3 font-bold text-ink">
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
        {/* -- THAY THẾ IMAGE TĨNH BẰNG CAROUSEL -- */}
        <DashboardCarousel images={dashboardImages} />
      </section>

      {/** section Giải Pháp Chuyên Biệt */}
      <section className=" py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h3 font-bold text-ink">
              Giải Pháp Chuyên Biệt
            </h2>
            <p className="mt-4 text-h6 text-text/80">
              Nền tảng của chúng tôi sử dụng Trí tuệ nhân tạo để phân tích dữ
              liệu và đưa ra các gợi ý hành động trực quan.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 text-center shadow-lg">
              <h3 className="mt-6 text-h5 font-bold text-ink">
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
              <h3 className="mt-6 text-h5 font-bold text-ink">
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

      {/* --- Section: Cam Kết Đồng Hành Cùng Nhà Thuốc --- */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h3 font-bold text-ink">
            Cam Kết Đồng Hành Cùng Nhà Thuốc
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-h6">
            Nền tảng của chúng tôi sử dụng Trí tuệ nhân tạo để phân tích dữ liệu
            và đưa ra các gợi ý hành động trực quan.
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
      <ReviewCarousel />
      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-2xl bg-ink p-12 text-center text-white">
          <h2 className="text-h3 font-bold">
            Sẵn Sàng Số Hóa Nhà Thuốc Của Bạn?
          </h2>
          <p className="mx-auto text-h6 mt-4 max-w-1xl text-white/80">
            Trải nghiệm đầy đủ các tính năng ưu việt của V-Pharma hoàn toàn miễn
            phí trong 15 ngày. Không cần thẻ tín dụng.
          </p>
          <button className="mt-8 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
            Trải nghiệm miễn phí
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-center text-h3 font-bold text-ink">
          Câu hỏi thường gặp
        </h2>
        <div className="mt-10">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
