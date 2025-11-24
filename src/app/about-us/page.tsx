"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import CTASection from "@/components/CTA";
import { aboutUsData } from "@/lib/api/aboutUs";
import { BlockItems } from "@/types";

const StorySection = ({
  data,
}: {
  data: Extract<BlockItems, { __component: "about.story-section" }>;
}) => (
  <section className="bg-white py-5 md:py-10">
    <div className="container ">
      <div className="rounded-2xl bg-ink p-8 text-white shadow-xl md:p-12 lg:p-16">
        <div className=" text-center">
          <p className="mb-5 text-sub2 md:text-sub1 lg:text-h6 font-bold capitalize tracking-wide text-primary">
            {data.eyebrow}
          </p>
          <h2 className="mb-5 text-white">{data.title}</h2>
          <p className="mx-auto max-w-6xl text-sub2 md:text-sub1 lg:text-h6 leading-relaxed text-white mb-10">
            {data.description}
          </p>
        </div>
        <div className="container grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {data.items.map((item, index) => (
            <div key={index} className="text-left">
              <div className="relative mb-5">
                <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
                <h3 className="pl-6 text-h6 md:text-h5 lg:text-h4 font-bold text-primary">
                  {item.title}
                </h3>
              </div>
              <p className="text-body2 md:text-sub2 lg:text-sub1 max-w-xl text-white">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Hàm render cho phần "Giá trị"
const ValuesSection = ({
  data,
}: {
  data: Extract<BlockItems, { __component: "about.values-section" }>;
}) => (
  <section className="bg-gradient-to-b from-white to-cyan-50 py-5 md:py-10">
    <div className="container mx-auto ">
      <div className="text-center">
        <p className="mb-5 text-sub2 md:text-sub1 lg:text-h6 font-bold capitalize tracking-wide text-primary">
          {data.eyebrow}
        </p>
        <h2 className="mb-10 text-black">{data.title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3 ">
        {data.cards.map((card, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-2xl border border-black/20 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/40"
          >
            <Image
              src={card.image}
              alt={card.title}
              width={200}
              height={150}
              className="mx-auto mb-6 rounded-lg object-contain"
            />
            <h3 className="mb-5 text-sub1 text-black font-bold">{card.title}</h3>
            <p className="text-sub2 max-w-xs mx-auto">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const FounderSection = ({
  data,
  currentIndex,
  handleNext,
  handlePrev,
}: {
  data: Extract<BlockItems, { __component: "about.founder-section" }>;
  currentIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
}) => {
  const founders = Array.isArray(data?.founders) ? data.founders : [];
  const totalMembers = founders.length;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Logic Autoplay
  const startAutoplay = useCallback(() => {
    if (totalMembers > 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 3000);
    }
  }, [handleNext, totalMembers]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
    };
  }, [startAutoplay, stopAutoplay]);

  if (totalMembers === 0) {
    return (
      <section className="bg-gradient-to-b from-cyan-50 to-white py-5 md:py-10">
        <div className="container mx-auto px-4 text-center"></div>
      </section>
    );
  }

  const getCardPosition = (
    index: number
  ): "center" | "left" | "right" | "hidden" => {
    if (index === currentIndex) return "center";
    const prevIndex = (currentIndex - 1 + totalMembers) % totalMembers;
    if (index === prevIndex) return "left";
    const nextIndex = (currentIndex + 1) % totalMembers;
    if (index === nextIndex) return "right";
    return "hidden";
  };

  return (
    <section className=" bg-gradient-to-b from-cyan-50 to-white py-5 md:py-10 overflow-hidden">
      <div className="container">
        {/* === 1. KHỐI HEADER === */}
        <div className="text-center">
          <p className="mb-5 text-sub2 md:text-sub1 lg:text-h6 font-bold capitalize tracking-wide text-primary">
            {data?.eyebrow || ""}
          </p>
          <h2 className="mb-5 text-black">{data?.title || ""}</h2>
          <p className="mx-auto max-w-3xl text-sub2 md:text-sub1 lg:text-h6 mb-15">
            {data?.description || ""}
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {/* 2. "Sân khấu" (Stage) */}
          <div className="mb-10 relative flex h-120 items-center justify-center overflow-hidden">
            {founders.map((founder, index) => {
              const position = getCardPosition(index);

              let classes = "transition-all duration-500 ease-in-out";
              let infoClasses = "transition-opacity duration-300 delay-200";

              // Xác định xem card này có bấm được không để thêm cursor-pointer
              const isClickable = position === "left" || position === "right";

              switch (position) {
                case "center":
                  classes += " z-10 scale-[1.6]";
                  infoClasses += " opacity-100 scale-[0.625]";
                  break;
                case "left":
                  // Thêm hover effect nhẹ để người dùng biết có thể bấm
                  classes +=
                    " z-20 scale-90 -translate-x-[150%] opacity-60 hover:opacity-80";
                  infoClasses += " opacity-0";
                  break;
                case "right":
                  // Thêm hover effect nhẹ để người dùng biết có thể bấm
                  classes +=
                    " z-20 scale-90 translate-x-[150%] opacity-60 hover:opacity-80";
                  infoClasses += " opacity-0";
                  break;
                default:
                  classes += " z-0 scale-0 opacity-0 pointer-events-none"; // Không cho bấm vào hidden
                  infoClasses += " opacity-0";
                  break;
              }

              return (
                <div
                  key={index}
                  // Logic Click trực tiếp vào ảnh
                  onClick={() => {
                    if (position === "left") handlePrev();
                    if (position === "right") handleNext();
                  }}
                  className={`absolute flex w-64 flex-col items-center text-center ${classes} ${
                    isClickable ? "cursor-pointer" : ""
                  }`}
                >
                  <Image
                    src={founder.photo || "/placeholder.jpg"}
                    alt={founder.name || "Thành viên"}
                    width={200}
                    height={200}
                    className="h-52 w-52 rounded-full object-cover shadow-lg"
                  />
                  <div className={infoClasses}>
                    <h3 className="mt-6 text-h4 font-bold">
                      {founder.name || "Không rõ tên"}
                    </h3>
                    <p className="mt-2 text-sub1 text-primary">
                      {founder.role || ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Đã xóa khối nút bấm (ArrowLeft/Right) ở đây */}
        </div>
      </div>
    </section>
  );
};
// --- COMPONENT CHÍNH ---
export default function AboutUsPage() {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const { blocks } = aboutUsData;
  const founderSection = blocks.find(
    (block) => block.__component === "about.founder-section"
  ) as
    | Extract<BlockItems, { __component: "about.founder-section" }>
    | undefined;
  const founderCount = founderSection?.founders.length || 1;
  const handleNextMember = () =>
    setCurrentMemberIndex((prev) => (prev + 1) % founderCount);
  const handlePrevMember = () =>
    setCurrentMemberIndex((prev) => (prev - 1 + founderCount) % founderCount);
  console.log("About Us Blocks:", blocks);

  const renderBlock = (block: BlockItems) => {
    switch (block.__component) {
      case "about.story-section":
        return <StorySection data={block} />;
      case "about.values-section":
        return <ValuesSection data={block} />;
      case "about.founder-section":
        return (
          <FounderSection
            data={block}
            currentIndex={currentMemberIndex}
            handleNext={handleNextMember}
            handlePrev={handlePrevMember}
          />
        );
      case "solution.cta-section":
        return <CTASection ctaSection={block} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <section className=" bg-gradient-to-b from-blue-100 to-white ">
        <FadeInOnScroll>
          <div className="h-screen flex items-center mx-auto max-w-6xl text-center">
            <div className="container">
              <p className="mb-5 text-sub2 md:text-sub1 lg:text-h6 font-bold capitalize tracking-wide text-primary">
                {aboutUsData.eyebrow}
              </p>
              <h1 >{aboutUsData.title}</h1>
              <p className="mx-auto max-w-3xl text-sub2 md:text-sub1 lg:text-h6 text-colordescription">
                {aboutUsData.description}
              </p>
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* Dynamic Zone (Vùng động) */}
      {blocks.map((block, index) => (
        <div key={`${block.__component}-${index}`}>{renderBlock(block)}</div>
      ))}
    </div>
  );
}
