"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { FiArrowLeft, FiArrowRight, FiUsers, FiShoppingCart, FiDatabase, FiShield } from "react-icons/fi"; // Thêm icon
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import FlipCard from "@/components/animations/FlipCard";

import PharmacyCarousel from "@/components/PharmacyCarousel";
import { chainPharmacyData } from "@/lib/api";
import CTASection from "@/components/CTA";
import { Button } from "@/components/ui/CTAButton";
import { AccordionItem } from "@/components/ui/AccordionIteam";
import FeatureCardTest from "@/components/ui/FeatureCardTest";
import FaqSection from "@/components/Faq";
// --- DỮ LIỆU CŨ (Không dùng cho Section 4) ---

function DashboardCarousel({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const safeImages = Array.isArray(images) ? images : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (safeImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [safeImages.length]);

  const getImg = (offset: number) => {
    if (safeImages.length === 0) {
      return { url: '/placeholder.png', alt: 'Placeholder' };
    }
    const idx = (currentIndex + offset + safeImages.length) % safeImages.length;
    return safeImages[idx] || { url: '/placeholder.png', alt: 'Placeholder' };
  };

  // Return null after hooks if no images
  if (safeImages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full gap-6 md:gap-10">
        {/* Slide left */}
        <div className="relative h-[280px] w-[380px] opacity-70 transition-all duration-500">
          <div className="relative h-full w-full">
            <Image
              src={getImg(-1).url}
              alt={getImg(-1).alt}
              fill
              className="rounded-xl "
            />
          </div>
        </div>

        {/* Slide center */}
        <div className="relative h-[450px] w-[600px] transition-all duration-500">
          <Image
            src={getImg(0).url}
            alt={getImg(0).alt}
            fill
            className="rounded-2xl "
          />
        </div>

        {/* Slide right */}
        <div className="relative h-[280px] w-[380px] opacity-70 transition-all duration-500">
          <div className="relative h-full w-full">
            <Image
              src={getImg(1).url}
              alt={getImg(1).alt}
              fill
              className="rounded-xl "
            />
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex justify-center gap-2">
        {safeImages.map((_, idx) => (
          <button
            key={idx}
            className={`h-3 w-7 rounded-full transition-all duration-200 ${currentIndex === idx ? "bg-primary" : "bg-gray-200"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

// COMPONENT CHÍNH
export default function ChuoiNhaThuoc() {
  const [openAccordion, setOpenAccordion] = useState(0);

  const {
    heroSection,
    pharmacyChainChallengesSection,
    featureBenefitsSection,
    operationsStandardizationSection,
    customerExperienceSection,
    featureOverview,
    featureCarousel,
    operationsStandardizationBottomSection,
    pharmaFeedback,
    ctaSection,
    faqSection,
  } = chainPharmacyData || {};

  // --- 2. LOGIC CHO SECTION 4 ---
  const cardsPerViewCustomer = 3;
  const cardWidthCustomer = 350; // px (từ min-w-[350px])
  const cardGapCustomer = 32; // px (từ mx-4)
  const stepCustomer = cardWidthCustomer + cardGapCustomer;
  const transitionDurationCustomer = 700; // ms (từ duration-700)
  const autoplayDelayCustomer = 2500; // 2.5 giây theo yêu cầu

  // Lấy đúng data cho Section 4
  const originalCustomerCards = Array.isArray(customerExperienceSection?.cards)
    ? customerExperienceSection.cards
    : [];

  // Nhân bản cards
  const clonedCardsStartCustomer = originalCustomerCards.slice(
    0,
    cardsPerViewCustomer
  );
  const clonedCardsEndCustomer = originalCustomerCards.slice(
    -cardsPerViewCustomer
  );
  const displayCustomerCards = [
    ...clonedCardsEndCustomer,
    ...originalCustomerCards,
    ...clonedCardsStartCustomer,
  ];

  // State mới cho Section 4
  const [customerIndex, setCustomerIndex] = useState(cardsPerViewCustomer);
  const [isJumpingCustomer, setIsJumpingCustomer] = useState(false);
  const [isAnimatingCustomer, setIsAnimatingCustomer] = useState(false);
  const [isHoveringCustomer, setIsHoveringCustomer] = useState(false);
const icons = [FiUsers, FiShoppingCart, FiDatabase, FiShield];
  // Handlers mới cho Section 4 (dùng useCallback)
  const handleNextCustomer = useCallback(() => {
    if (isAnimatingCustomer) return;
    setIsAnimatingCustomer(true);

    const newIndex = customerIndex + 1;
    setCustomerIndex(newIndex);

    if (newIndex === cardsPerViewCustomer + originalCustomerCards.length) {
      setTimeout(() => {
        setIsJumpingCustomer(true);
        setCustomerIndex(cardsPerViewCustomer);
      }, transitionDurationCustomer);
    }

    setTimeout(
      () => setIsAnimatingCustomer(false),
      transitionDurationCustomer
    );
  }, [
    isAnimatingCustomer,
    customerIndex,
    originalCustomerCards.length,
    cardsPerViewCustomer,
    transitionDurationCustomer,
  ]);

  const handlePrevCustomer = useCallback(() => {
    if (isAnimatingCustomer) return;
    setIsAnimatingCustomer(true);

    const newIndex = customerIndex - 1;
    setCustomerIndex(newIndex);

    if (newIndex === cardsPerViewCustomer - 1) {
      setTimeout(() => {
        setIsJumpingCustomer(true);
        setCustomerIndex(
          cardsPerViewCustomer + originalCustomerCards.length - 1
        );
      }, transitionDurationCustomer);
    }

    setTimeout(
      () => setIsAnimatingCustomer(false),
      transitionDurationCustomer
    );
  }, [
    isAnimatingCustomer,
    customerIndex,
    originalCustomerCards.length,
    cardsPerViewCustomer,
    transitionDurationCustomer,
  ]);

  // useEffect để reset jumping
  useEffect(() => {
    if (isJumpingCustomer) {
      requestAnimationFrame(() => {
        setIsJumpingCustomer(false);
      });
    }
  }, [isJumpingCustomer]);

  // useEffect cho Autoplay Section 4
  useEffect(() => {
    if (isHoveringCustomer || isAnimatingCustomer) return;

    const timer = setInterval(() => {
      handleNextCustomer();
    }, autoplayDelayCustomer);

    return () => {
      clearInterval(timer);
    };
  }, [
    isHoveringCustomer,
    isAnimatingCustomer,
    handleNextCustomer,
    autoplayDelayCustomer,
  ]);

  return (
    <div className="bg-white pt-10">
      {/* SECTION: HERO*/}
      <section className="container mx-auto py-10 ">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-h6 mb-2 font-bold tracking-wide text-primary capitalize">
              {heroSection?.eyebrow?.toLowerCase() || "Giải pháp chuỗi nhà thuốc"}
            </p>
            <h1>{heroSection?.title || "Giải pháp chuỗi nhà thuốc"}</h1>
            <p className="mb-10 text-colordescription text-h6">
              {heroSection?.description || ""}
            </p>
            <div className="flex gap-4 ">
              {Array.isArray(heroSection?.ctaButtons) && heroSection.ctaButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "primary" : "secondary"}
                  size="md"
                  href={button.link || "#"}
                >
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Image
              src="/hero-dashboard.jpg"
              alt="Dashboard"
              width={600}
              height={500}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1: Thách thức */}
      <FadeInOnScroll>
        <section className="bg-gradient-to-b from-white to-blue-100 rounded-b-4xl py-10">
          <div className="container mx-auto ">
            <div className=" mb-15 ">
              <h2 className="mb-5 mx-auto max-w-5xl text-center text-black">
                {pharmacyChainChallengesSection.title}
              </h2>
              <p className="text-h6 mx-auto max-w-3xl text-center">
                {pharmacyChainChallengesSection.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.isArray(pharmacyChainChallengesSection.challengeCards) && pharmacyChainChallengesSection.challengeCards.map(
                (card, index) => (
                  <FlipCard key={index} challengeCard={card} />
                )
              )}
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION 2: tối ưu và luân chuyển*/}
      <section className="bg-white ">
        <FadeInOnScroll>
          <div className="container mx-auto py-15">
            <div className="mx-auto mb-15 max-w-5xl text-center">
              <h2 className="text-black mb-5">
                {featureBenefitsSection.title}
              </h2>
              <p className="mx-auto  max-w-3xl text-center text-h6 text-colordescription">
                {featureBenefitsSection.description}
              </p>
            </div>
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 h-[400px]">
              <div className="relative aspect-video rounded-lg bg-white p-2 shadow-xl">
                <Image
                  src={featureBenefitsSection.image}
                  alt="Marketing Dashboards"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="relative w-full max-w-[800px] mx-auto h-full">
                <div className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center space-y-3 p-2">
                  {Array.isArray(featureBenefitsSection.contents) && featureBenefitsSection.contents.map((item, index) => (
                    <AccordionItem
                      key={index}
                      title={item.title}
                      description={item.description}
                      isOpen={openAccordion === index}
                      onClick={() =>
                        setOpenAccordion(openAccordion === index ? -1 : index)
                      }
                      buttonClassName="bg-primary/9 w-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* SECTION 3: Chuẩn Hóa Vận Hành*/}
      <FadeInOnScroll>
        <section className="bg-white ">
          <div className="container mx-auto py-15">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-2 text-h6 font-bold capitalize tracking-wide text-primary">
                {operationsStandardizationSection?.eyebrow || "Tiêu chuẩn hóa vận hành"}
              </p>
              <h2 className="text-black mb-15">
                {operationsStandardizationSection?.title || ""}
              </h2>
            </div>
            <FeatureCardTest
              features={operationsStandardizationSection?.contents || []}
              direction="left"
              animation={true}
            />
          </div>
        </section>
      </FadeInOnScroll>

      <FadeInOnScroll>
        <section className="bg-gradient-to-b from-white to-blue-100 ">
          <div className="container mx-auto py-15">
            {/* Tiêu đề (giữ nguyên) */}
            <div className="mx-auto mb-12 max-w-5xl text-center">
              <p className="mb-5 text-h6 font-bold  tracking-wide text-primary capitalize">
                {customerExperienceSection?.eyebrow?.toLowerCase() || "Trải nghiệm khách hàng"}
              </p>
              <h2 className="mb-15 text-black">
                {customerExperienceSection?.title || ""}
              </h2>
            </div>

            {/* Container mới cho carousel và nút bấm */}
            <div className="relative flex items-center justify-center">
              {/* Nút Prev mới */}
              <button
                onClick={handlePrevCustomer}
                className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100 text-3xl font-bold"
                aria-label="Previous"
                disabled={isAnimatingCustomer}
              >
                <FiArrowLeft className="h-6 w-6" />
              </button>

              {/* Carousel container */}
              <div
                className="w-full max-w-6xl overflow-hidden"
                // Thêm sự kiện hover
                onMouseEnter={() => setIsHoveringCustomer(true)}
                onMouseLeave={() => setIsHoveringCustomer(false)}
              >
                <div
                  className="flex" // Bỏ transition-transform
                  style={{
                    width: `${
                      displayCustomerCards.length * stepCustomer
                    }px`,
                    transform: `translateX(-${
                      customerIndex * stepCustomer
                    }px)`,
                    transition: isJumpingCustomer
                      ? "none"
                      : `transform ${transitionDurationCustomer}ms ease-in-out`,
                  }}
                >
                  {/* Map qua mảng displayCustomerCards mới */}
                  {displayCustomerCards.map((card, idx) => (
                    <div
                      key={idx}
                      // Thêm mx-4 để tạo gap 32px
                      className="card-custom mx-4 min-w-[350px] max-w-[350px] flex-shrink-0 rounded-xl border border-gray-400 bg-white shadow-lg transition hover:shadow-xl"
                      style={{ height: 400 }} 
                    >
                      <div className="p-7">
                        <h3 className="mb-2 text-sub1 text-black">
                          {card.title}
                        </h3>
                        <p className="mb-4 text-sub2 text-black">
                          {card.description}
                        </p>
                        <div className="mt-2 rounded-lg py-6 px-4 flex flex-col items-center">
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

              {/* Nút Next mới */}
              <button
                onClick={handleNextCustomer}
                className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-primary transition hover:bg-blue-100 text-3xl font-bold"
                aria-label="Next"
                disabled={isAnimatingCustomer}
              >
                <FiArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION Xây Dựng Hệ Thống Khách Hàng 4 card có hover */}
      <section className="bg-gradient-to-b from-blue-100 to-white ">
  <FadeInOnScroll>
    <div className="container mx-auto py-15">
      <div className="mb-15 text-center">
        <p className="mb-5 text-h6 font-bold capitalize tracking-wide text-primary">
          {featureOverview?.eyebrow?.toLowerCase() || "Tổng quan tính năng"}
        </p>
        <h2 className="mx-auto max-w-6xl text-black">
          {featureOverview?.title || ""}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12">
        {Array.isArray(featureOverview.contentCards) && featureOverview.contentCards.map((card, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div
              key={index}
              className="group relative rounded-2xl p-8 text-left transition-all duration-300 cursor-pointer bg-white shadow-md hover:shadow-2xl hover:bg-ink"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success transition-all duration-300 group-hover:bg-success group-hover:text-white">
                <Icon size={24} className="transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
              </div>

              <h3 className="mb-3 text-black transition-colors duration-300 group-hover:text-white">
                {card.title}
              </h3>

              <p className="text-sub1 transition-colors duration-300 group-hover:text-white">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center mt-15 justify-center ">
        <Button
          size="md"
          href={featureOverview.ctaButton.link || undefined}
        >
          {featureOverview.ctaButton.title}
        </Button>
      </div>
    </div>
  </FadeInOnScroll>
</section>

      {/** section dashboard scrolling carousel */}
      <FadeInOnScroll>
        <section className="py-15 text-center">
          <div className="container mx-auto">
            <p className="mb-5 text-h6 font-bold capitalize tracking-wide text-primary">
              {featureCarousel?.eyebrow?.toLowerCase() || "Tính năng nổi bật"}
            </p>
            <h2 className="text-black mb-5">{featureCarousel?.title || ""}</h2>
            <p className="mx-auto mb-15 max-w-2xl text-h6 ">
              {featureCarousel?.description || ""}
            </p>
            <DashboardCarousel images={featureCarousel?.featureImages || []} />
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION : Chuẩn Hóa Vận Hành*/}

      <section className="bg-ink ">
        <FadeInOnScroll>
          <div className="container mx-auto py-15">
            <div className=" text-center mb-15">
              <p className="mb-5 text-h6 font-bold capitalize tracking-wide text-primary">
                {operationsStandardizationBottomSection?.eyebrow?.toLowerCase() || "Tiêu chuẩn hóa vận hành"}
              </p>
              <h2 className="mx-auto max-w-4xl text-white">
                {operationsStandardizationBottomSection?.title || ""}
              </h2>
            </div>
            <FeatureCardTest
              features={operationsStandardizationBottomSection.contents}
              direction="right"
              animation={true}
              theme="dark"
            />
          </div>
        </FadeInOnScroll>
      </section>

      {/*SECTION 7: Pharmacy  Carousel*/}
      <FadeInOnScroll>
        <section className="bg-white ">
          <div className="container mx-auto py-15">
            <div className="mx-auto mt-5 mb-15 max-w-6xl text-center">
              <p className="mb-5 text-h6 font-bold capitalize tracking-wide text-primary">
                {pharmaFeedback?.title?.toLowerCase() || "Phản hồi từ khách hàng"}
              </p>
              <h2 className="text-black">{pharmaFeedback?.description || ""}</h2>
            </div>
            <PharmacyCarousel cards={pharmaFeedback?.cards || []} />
          </div>
        </section>
      </FadeInOnScroll>

      {/* SECTION : CTA */}
      <FadeInOnScroll>
        <CTASection ctaSection={ctaSection} />
      </FadeInOnScroll>

      {/* SECTION : FAQ*/}
      <FadeInOnScroll>
        <section className="container mx-auto max-w-4xl px-4 py-20">
          <FaqSection
            title={faqSection.title}
            items={faqSection.faqItems}
          />
        </section>
      </FadeInOnScroll>
    </div>
  );
}