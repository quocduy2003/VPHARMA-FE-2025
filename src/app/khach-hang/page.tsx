"use client";
import { motion } from "framer-motion";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import PharmacyCarousel from "@/components/PharmacyCarousel";
import CTASection from "@/components/CTA";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const testimonials = [
  {
    avatar: "/avt1.jpg",
    name: "Chị Trang",
    pharmacy: "Nhà Thuốc Quỳnh Trang",
    review:
      "“Từ khi áp dụng hệ thống quản lý mới, nhà thuốc tôi hoạt động chuyên nghiệp hơn hẳn. Dữ liệu được đồng bộ tự động, không còn lo thất thoát doanh thu hay sai sót trong nhập hàng. Mọi quy trình đều minh bạch, dễ kiểm soát — thực sự là một bước ngoặt giúp tôi mở rộng thêm chi nhánh trong năm nay.”",
  },
  {
    avatar: "/avt2.jpg",
    name: "Anh Minh",
    pharmacy: "Nhà Thuốc An Tâm",
    review:
      "“Trước đây, tôi phải ghi chép thủ công nên mỗi lần kiểm kho là cực hình. Giờ chỉ cần vài cú nhấp chuột là hệ thống thống kê đầy đủ, chi tiết tới từng mặt hàng. Đặc biệt, phần mềm còn giúp tôi theo dõi lịch sử giao dịch và nhắc hạn thuốc — điều mà trước giờ tôi luôn lo lắng.”",
  },
  {
    avatar: "/avt3.jpg",
    name: "Chị Hạnh",
    pharmacy: "Nhà Thuốc Thiên Phúc",
    review:
      "“Tôi rất ấn tượng với tính năng báo cáo doanh thu theo ngày, tuần và tháng. Nhờ đó, tôi dễ dàng điều chỉnh chính sách bán hàng và nhập kho hợp lý hơn. Ngoài ra, đội ngũ hỗ trợ cực kỳ tận tâm — mỗi khi cần là có người hướng dẫn chi tiết ngay.”",
  },
  {
    avatar: "/avt4.jpg",
    name: "Anh Dũng",
    pharmacy: "Nhà Thuốc Dũng Tâm",
    review:
      "“Tôi từng thử qua vài phần mềm khác nhưng chỉ đến khi dùng hệ thống này, tôi mới thực sự cảm thấy yên tâm. Giao diện thân thiện, dễ dùng cho cả nhân viên lớn tuổi. Điều tuyệt nhất là mọi dữ liệu đều lưu trữ an toàn trên cloud, không sợ mất mát khi thay máy hay gặp sự cố.”",
  },
  {
    avatar: "/avt1.jpg",
    name: "Chị Ngọc",
    pharmacy: "Nhà Thuốc Minh Ngọc",
    review:
      "“Phần mềm này giúp tôi tiết kiệm được hàng giờ mỗi ngày. Không chỉ bán hàng nhanh chóng mà còn quản lý được nhà cung cấp, công nợ và tồn kho cực kỳ chi tiết. Sau hơn 6 tháng sử dụng, doanh thu tăng rõ rệt vì mọi thứ được sắp xếp khoa học, gọn gàng.”",
  },
  {
    avatar: "/avt2.jpg",
    name: "Anh Toàn",
    pharmacy: "Nhà Thuốc Toàn Phúc",
    review:
      "“Điều tôi thích nhất là khả năng theo dõi hoạt động của từng chi nhánh ngay trên điện thoại. Dù đi công tác xa, tôi vẫn biết được tình hình bán hàng từng giờ. Phần mềm thực sự giúp tôi an tâm hơn khi mở rộng mô hình chuỗi nhà thuốc.”",
  },
  {
    avatar: "/avt3.jpg",
    name: "Chị My",
    pharmacy: "Nhà Thuốc Ánh Dương",
    review:
      "“Từ ngày dùng hệ thống này, việc đào tạo nhân viên mới trở nên dễ dàng. Giao diện rõ ràng, thao tác nhanh, ai cũng làm quen được chỉ sau một buổi. Tôi cũng rất thích các biểu đồ trực quan giúp nhìn thấy hiệu quả kinh doanh một cách sinh động.”",
  },
  {
    avatar: "/avt4.jpg",
    name: "Anh Huy",
    pharmacy: "Nhà Thuốc Huy Phát",
    review:
      "“Không chỉ là một phần mềm bán hàng, đây gần như là trợ lý đắc lực của tôi. Từ quản lý tồn kho, theo dõi doanh số, cho tới cảnh báo hạn dùng – mọi thứ đều được tự động hóa. Cảm giác vận hành nhà thuốc giờ đây nhẹ nhàng và chuyên nghiệp hơn bao giờ hết.”",
  },
];

function TestimonialStackedCards() {
  const [active, setActive] = useState(0);
  const isScrolling = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0) {
        // Cuộn xuống: chuyển sang card kế tiếp, quay vòng về 0 nếu đến cuối
        setActive((a) => (a + 1) % testimonials.length);
      } else {
        // Cuộn lên: quay về card trước, quay vòng về cuối nếu đang ở đầu
        setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 400);
    };

    node.addEventListener("wheel", wheelHandler, { passive: false });
    return () => node.removeEventListener("wheel", wheelHandler);
  }, [active]);

  // Tạo stack: card active + 2 card phía sau (với xoay vòng)
  const stackCards = [];
  for (let i = 0; i < 3; i++) {
    const idx = (active + i) % testimonials.length; // Xoay vòng index
    stackCards.push({ ...testimonials[idx], stackIndex: i });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div
        ref={cardRef}
        className="flex justify-center  w-full max-w-2xl h-[500px] flex items-center justify-center cursor-pointer select-none"
        tabIndex={0}
      >
        {stackCards.reverse().map((item, reverseIdx) => {
          const stackIdx = stackCards.length - 1 - reverseIdx;
          const isActive = stackIdx === 2;

          const scale = isActive ? 1 : stackIdx === 1.3 ? 1.1 : 0.9;
          const translateY = isActive ? 0 : stackIdx === 1 ? 35 : 60;
          const opacity = isActive ? 1 : 0.6;
          const zIndex = 10 + stackIdx;

          return (
            <motion.div
              key={`${active}-${stackIdx}`}
              initial={{ scale: 0.85, opacity: 0, y: 100 }}
              animate={{ scale, opacity, y: translateY }}
              transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
              className="absolute left-0 right-0 mx-auto bg-white shadow-2xl rounded-2xl flex flex-col items-center overflow-hidden"
              style={{
                width: isActive ? 840 : 800,
                height: isActive ? 400 : 360,
                zIndex,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <img
                src={item.avatar}
                className="w-20 h-20 rounded-full object-cover mb-6 mt-12"
                alt={item.name}
              />
              <div className="font-bold text-2xl mb-2">{item.name}</div>
              <div className="text-lg text-gray-500 mb-4">{item.pharmacy}</div>
              <div className="text-center text-lg text-gray-800 italic px-8">
                {item.review}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Định nghĩa kiểu cho một bài blog
interface BlogItem {
  id: number;
  title: string;
  image: string; // URL của hình ảnh
}

// Định nghĩa kiểu cho Card Trống (Filler)
interface FillerCard {
  id: string;
  empty: true; // Dùng để xác định đây là card trống
}

// Kiểu cho các item sẽ được render
type CardToRender = BlogItem | FillerCard;
const blogs = [
  {
    id: 1,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt1.jpg",
  },
  {
    id: 2,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt2.jpg",
  },
  {
    id: 3,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt3.jpg",
  },
  {
    id: 4,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt1.jpg",
  },
  {
    id: 5,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt4.jpg",
  },
  {
    id: 6,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt2.jpg",
  },
  {
    id: 7,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt3.jpg",
  },
  {
    id: 8,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt1.jpg",
  },
  {
    id: 9,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt2.jpg",
  },
  {
    id: 10,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt3.jpg",
  },
  {
    id: 11,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt1.jpg",
  },
  {
    id: 12,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt4.jpg",
  },
  {
    id: 13,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt2.jpg",
  },
  {
    id: 14,
    title: "Nhà thuốc Quỳnh Anh: Nhân đôi mô hình kinh doanh cùng V-Pharma",
    image: "/avt3.jpg",
  },
];

function BlogCarouselSection() {
  const [page, setPage] = useState(0);
  const router = useRouter();

  // LOGIC TRƯỢT 2 CARD
  const cardsPerView = 4; // Số card luôn hiển thị
  const step = 2; // Số card trượt qua khi chuyển trang (Overlap 2)

  // Công thức tính số trang tối đa có thể trượt
  const maxPage = Math.max(
    0,
    Math.ceil((blogs.length - cardsPerView) / step) + 1
  );
  const pageCount = maxPage > 0 ? maxPage : 1;

  // Tính toán chỉ số BẮT ĐẦU VÀ KẾT THÚC
  const startIndex = page * step;
  const endIndex = startIndex + cardsPerView;

  // Lấy các bài blog cho trang hiện tại
  const currentBlogs: BlogItem[] = blogs.slice(
    startIndex,
    endIndex
  ) as BlogItem[];

  // LOGIC LẤP ĐẦY (FILLER): Đảm bảo cardsToRender luôn có 4 phần tử (trừ khi blogs.length < 4)
  let cardsToRender: CardToRender[];

  if (blogs.length < cardsPerView) {
    // Nếu tổng số blog ít hơn 4 (trang đầu), thêm filler
    const fillerCount = cardsPerView - blogs.length;
    const fillerArray: FillerCard[] = Array.from(
      { length: fillerCount },
      (_, i) => ({ id: `filler-${i}`, empty: true })
    );
    cardsToRender = [...currentBlogs, ...fillerArray];
  } else {
    // Với cơ chế trượt, ta chỉ render các blog đã slice, không cần filler
    // vì pageCount đã được tính toán để trang cuối cùng vẫn lấy đủ cardsPerView
    // (ví dụ: 6 blogs -> page 1 lấy 3,4,5,6)
    cardsToRender = currentBlogs;
  }
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-black">
            Những Thách Thức Khi Vận Hành Chuỗi Nhà Thuốc
          </h2>
          <p className="text-h6 mx-auto max-w-3xl">
            Giải pháp quản lý nhà thuốc toàn diện, tối ưu hóa quy trình vận hành
            và nâng cao hiệu quả kinh doanh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {cardsToRender.map((card) => {
            const isBlog = "title" in card;

            if (isBlog) {
              const blog = card as BlogItem;
              return (
                <div
                  key={blog.id}
                  className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1" // Loại bỏ overflow-hidden ở đây
                  onClick={() => router.push(`/blog/${blog.id}`)}
                >
                  {/* Div chứa ảnh với padding và bo góc */}
                  <div className="p-4">
                    {" "}
                    {/* Thêm padding vào đây */}
                    <div className="relative h-48 w-full rounded-lg overflow-hidden">
                      {" "}
                      {/* Thêm rounded-lg và overflow-hidden cho div này */}
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill // Vẫn dùng fill nếu bạn muốn ảnh chiếm hết div bọc nó
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Quan trọng cho responsive
                      />
                    </div>
                  </div>

                  <div className="container flex flex-col items-center text-center justify-center p-6">
                    {" "}
                    {/* Thêm padding cho nội dung */}
                    <h3 className="font-bold text-h5 mb-4 line-clamp-2 min-h-[56px]">
                      {blog.title}
                    </h3>
                    <button className="text-primary text-sub1 font-bold hover:gap-3 flex items-center gap-1 transition-all">
                      Đọc thêm
                      <span>→</span>
                    </button>
                  </div>
                </div>
              );
            }

            // Trường hợp là card trống (FILLER CARD)
            return (
              <div
                key={card.id}
                className="bg-transparent border-none opacity-0 pointer-events-none"
              >
                {/* Giữ nguyên cấu trúc để duy trì chiều cao của grid item */}
                <div className="relative h-48 w-full"></div>
                <div className="p-6 h-[100px]"></div>
              </div>
            );
          })}
        </div>

        {/* Pagination Buttons */}
        <div className="relative mx-auto w-30 mt-10">
          <button
            className="absolute text-primary left-0 z-10 h-12 w-12 
            rounded-full bg-blue-50 hover:bg-blue-100  
            flex items-center justify-center transition"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous page"
          >
            <svg
              className="w-5 h-5"
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
          <button
            className="absolute text-primary right-0 z-10 h-12 w-12 
            rounded-full bg-blue-50 hover:bg-blue-100 flex items-center 
            justify-center transition"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page === pageCount - 1}
            aria-label="Next page"
          >
            <svg
              className="w-5 h-5"
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
        </div>
      </div>
    </section>
  );
}

export default function KhachHang() {
  return (
    <div className="py-10">
      <section className="bg-blue-100 py-20 text-center">
        <FadeInOnScroll>
          <div className="container mx-auto max-w-6xl ">
            <p className="mb-2 text-h6 font-bold uppercase tracking-wide text-primary">
              SỰ HÀI LÒNG CỦA KHÁCH HÀNG LÀ NIỀM TỰ HÀO CỦA CHÚNG TÔI
            </p>
            <h1 className="text-black">
              Hành trình thành công của{" "}
              <span className="text-h1 font-bold text-primary">
                hơn 500 chuỗi
              </span>{" "}
              nhà thuốc Việt
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-h6">
              Đồng hành với các nhà thuốc và chuỗi nhà thuốc nổi tiếng giúp bạn
              quản lý tập trung, tối ưu vận hành và tăng trưởng doanh thu bền
              vững.
            </p>
          </div>
        </FadeInOnScroll>
      </section>

      {/** section 1: Customer Reviews */}
      <section className="py-20">
        <FadeInOnScroll>
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-black">
              Những thử thách khi vận hành chuỗi nhà thuốc
            </h2>
            <p className="text-h6 mx-auto max-w-3xl text-center">
              Giải pháp quản lý nhà thuốc toàn diện, tối ưu hóa quy trình vận
              hành và nâng cao hiệu quả kinh doanh.
            </p>
            <TestimonialStackedCards />
          </div>
        </FadeInOnScroll>
      </section>

      {/** section 2: Pharmacy Carousel */}
      <FadeInOnScroll>
        <PharmacyCarousel />
      </FadeInOnScroll>

      {/** section 3: Blog Carousel */}
      <FadeInOnScroll>
        <BlogCarouselSection />
      </FadeInOnScroll>
      {/** section 2: CTA */}
      <FadeInOnScroll>
        <CTASection />
      </FadeInOnScroll>
    </div>
  );
}
