"use client";

import { useState } from "react";
import Image from "next/image";

const maxCards = 6;
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
const cards = pharmacyCards.slice(0, maxCards);

export default function PharmacyCarousel() {
  const totalSlidesPharmacy = cards.length;
  const cardsPerView = 3;
  const [indexPharmacy, setIndexPharmacy] = useState(0);
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
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-6xl text-center">
          <p className="mb-2 text-h6 font-bold uppercase tracking-wide text-primary">
            TĂNG TRẢI NGHIỆM KHÁCH HÀNG
          </p>
          <h2 className="mb-4 text-black">
            Được Tin Dùng Bởi Các Chuỗi Nhà Thuốc Hàng Đầu
          </h2>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Carousel card row */}
          <div className="w-full max-w-6xl overflow-hidden">
            <div
              className="flex transition-transform duration-700"
              style={{
                transform: `translateX(-${indexPharmacy * (100 / 3)}%)`,
              }}
            >
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="card-custom mx-4 min-w-[350px] max-w-[350px] flex-shrink-0 rounded-xl border border-gray-400 bg-white shadow-lg transition hover:shadow-xl"
                  style={{ height: 350 }}
                >
                  <div className="p-7">
                    <h3 className="mb-2 text-black">{card.title}</h3>
                    <p className="mb-4 text-sub1 text-black">{card.content}</p>
                    <div className="mt-3 rounded-lg py-6 px-4 flex flex-col items-center">
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
        </div>
        <div className=" relative mx-auto w-30 mt-10 ">
          <button
            onClick={handlePrevPharmacy}
            className="absolute text-primary left-0 z-10 h-12 w-12 rounded-full bg-blue-50 hover:bg-blue-100  flex items-center justify-center transition"
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
          <button
            onClick={handleNextPharmacy}
            className="absolute text-primary right-0 z-10 h-12 w-12 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition"
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
  );
}
