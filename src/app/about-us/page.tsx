"use client";

import { useState } from "react";
import Image from "next/image";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import CTASection from "@/components/CTA";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { aboutUsData } from "@/lib/api/aboutUs";
import { BlockItems } from "@/types";

const StorySection = ({
  data,
}: {
  data: Extract<BlockItems, { __component: "about.story-section" }>;
}) => (
  <section className="bg-white py-20">
    <div className="container mx-auto px-4">
      <div className="rounded-2xl bg-ink p-8 text-white shadow-xl md:p-12 lg:p-16">
        <div className="mb-12 text-center">
          <p className="mb-4 text-h6 font-bold uppercase tracking-wide text-primary">
            {data.eyebrow}
          </p>
          <h2 className="mb-8 text-white">{data.title}</h2>
          <p className="mx-auto max-w-6xl text-h6 leading-relaxed text-white">
            {data.description}
          </p>
        </div>
        <div className="container grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {data.items.map((item, index) => (
            <div key={index} className="text-left">
              <div className="relative mb-6">
                <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
                <h3 className="pl-6 text-h4 font-bold text-primary">
                  {item.title}
                </h3>
              </div>
              <p className="text-sub1 max-w-xl text-white">
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
  <section className="bg-gradient-to-b from-white to-cyan-50 py-20">
    <div className="container mx-auto px-4">
      <div className="text-center">
        <p className="mb-4 text-h6 font-bold uppercase tracking-wide text-primary">
          {data.eyebrow}
        </p>
        <h2 className="mb-12 text-black">{data.title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data.cards.map((card, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-2xl border border-gray-200/80 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
          >
            <Image
              src={card.image}
              alt={card.title}
              width={200}
              height={150}
              className="mx-auto mb-6 rounded-lg object-contain"
            />
            <h3 className="mb-4 text-sub1 font-bold">{card.title}</h3>
            <p className="text-sub2 max-w-xs mx-auto">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Hàm render cho phần "Đội ngũ"
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
  // Nếu không có founders hoặc founders không phải là mảng => fallback rỗng
  const founders = Array.isArray(data?.founders) ? data.founders : [];

  const totalMembers = founders.length;

  if (totalMembers === 0) {
    return (
      <section className="bg-gradient-to-b from-cyan-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-h6 font-bold uppercase tracking-wide text-primary">
            {data.eyebrow}
          </p>
          <h2 className="mb-4 text-black">{data.title}</h2>
          <p className="mx-auto max-w-3xl text-h6">{data.description}</p>
          <p className="text-sub1 text-gray-500">
            Hiện chưa có thông tin thành viên sáng lập để hiển thị.
          </p>
        </div>
      </section>
    );
  }

  // Tính vị trí card
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
    <section className="h-screen bg-gradient-to-b from-cyan-50 to-white py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <p className="mb-4 text-h6 font-bold uppercase tracking-wide text-primary">
              {data?.eyebrow || ""}
            </p>
            <h2 className="mb-4 text-black">{data?.title || ""}</h2>
            <p className="mx-auto max-w-3xl text-h6">
              {data?.description || ""}
            </p>
          </div>

          <div className="relative h-96">
            <div className="relative flex h-full items-center justify-center">
              {founders.map((founder, index) => {
                const position = getCardPosition(index);
                let classes = "transition-all duration-500 ease-in-out";
                let infoClasses = "transition-opacity duration-300 delay-200";

                switch (position) {
                  case "center":
                    classes += " z-10 scale-[1.6]";
                    infoClasses += " opacity-100";
                    break;
                  case "left":
                    classes += " z-0 scale-90 -translate-x-[150%] opacity-60";
                    infoClasses += " opacity-0";
                    break;
                  case "right":
                    classes += " z-0 scale-90 translate-x-[150%] opacity-60";
                    infoClasses += " opacity-0";
                    break;
                  default:
                    classes += " z-0 scale-0 opacity-0";
                    infoClasses += " opacity-0";
                    break;
                }

                return (
                  <div
                    key={index}
                    className={`absolute flex w-64 flex-col items-center text-center ${classes}`}
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

            <div className="mt-15 flex justify-center gap-4">
              <button
                onClick={handlePrev}
                className="rounded-full bg-blue-100 p-3 text-primary shadow-lg transition hover:bg-primary hover:text-white hover:scale-110"
                aria-label="Thành viên trước"
              >
                <FiArrowLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="rounded-full bg-blue-100 p-3 text-primary shadow-lg transition hover:bg-primary hover:text-white hover:scale-110"
                aria-label="Thành viên kế tiếp"
              >
                <FiArrowRight size={24} />
              </button>
            </div>
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

  // Take blocks as blocks[]
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
      {/* Dashboard Section (Phần tĩnh) */}
      <section className=" bg-gradient-to-b from-blue-100 to-white text-center">
        <FadeInOnScroll>
          <div className="h-screen flex items-center mt-5 mx-auto max-w-6xl text-center">
            <div className="container">
              <p className="mb-4 text-h6 font-bold uppercase tracking-wide text-primary">
                {aboutUsData.eyebrow}
              </p>
              <h1 className="text-black">{aboutUsData.title}</h1>
              <p className="mx-auto mt-4 max-w-8xl text-h6">
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
