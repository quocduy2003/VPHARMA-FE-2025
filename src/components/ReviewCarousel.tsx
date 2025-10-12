"use client"; // nếu dùng NextJS

import React, { useEffect, useRef, useState } from "react";

const REVIEWS_PER_PAGE = 4;

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

// Lấy danh sách review tốt nhất, tối đa 16
const bestReviews = [...reviewsData]
  .sort((a, b) => b.starCount - a.starCount)
  .slice(0, 16);

export default function ReviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null); // <-- Sửa kiểu
  const repeat = 2;

  useEffect(() => {
    const track = trackRef.current;
    let animationFrame: number;
    let pos = 0;

    const move = () => {
      pos += 0.3;
      if (track) {
        const width = track.scrollWidth / repeat; // <-- Không lỗi kiểu
        if (pos >= width) pos = 0;
        track.style.transform = `translateX(-${pos}px)`; // <-- Không lỗi kiểu
        animationFrame = requestAnimationFrame(move);
      }
    };
    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, [repeat]);
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2 text-sub2 font-bold uppercase tracking-wide text-primary">
          Reviews
        </p>
        <h2 className="text-h2 font-bold text-black mt-2 mb-8">
          Khách Hàng Nói Gì Về V-Pharma
        </h2>
        <div className="relative w-full overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{
              willChange: "transform",
              transition: "none",
            }}
          >
            {[...Array(repeat)].flatMap((_, rIdx) =>
              reviewsData.map((review, idx) => (
                <div
                  key={`${rIdx}-${idx}`}
                  className="flex flex-col rounded-lg bg-white p-6 text-left shadow-lg m-3 min-w-[300px] max-w-[320px]"
                  style={{ flex: "0 0 20%" }}
                >
                  <h4 className="text-sub2 font-bold text-black">
                    {review.name}
                  </h4>
                  <p className="text-sub2 text-gray-600 italic">
                    {review.position}
                  </p>
                  <div className="my-3 flex text-yellow-400">
                    {Array.from({ length: review.starCount }).map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="text-body2 flex-grow italic">
                    “{review.content}”
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
