"use client";

import { useState } from "react";

function ReviewCarousel() {
  const REVIEWS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(0);

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
      name: "Anh Kiên",
      position: "Nhà thuốc Medigo",
      starCount: 3,
      content: "Mọi hoạt động của chuỗi nhà thuốc được quản lý tập trung.",
    },
  ];

  // Lọc ra 16 review tốt nhất
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
        <h2 className="text-h2 font-bold text-ink mt-2">
          Khách Hàng Nói Gì Về V-Pharma
        </h2>

        <div className="relative mx-auto mt-10">
          {/* Grid hiển thị reviews */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {selectedReviews.map((review, index) => (
              <div
                key={startIndex + index}
                className="flex flex-col rounded-lg bg-white p-6 text-left shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <h4 className="text-h6 font-bold text-ink">{review.name}</h4>
                <p className="text-sub1 text-gray-600 italic">{review.position}</p>

                <div className="my-3 flex text-yellow-400 ">
                  {Array.from({ length: review.starCount }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>

                <p className="flex-grow text-sub1  italic">
                  “{review.content}”
                </p>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  currentPage === index ? "bg-primary" : "bg-gray-300"
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

export default ReviewCarousel;
