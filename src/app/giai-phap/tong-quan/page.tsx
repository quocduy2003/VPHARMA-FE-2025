"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { independentPharmacyData } from "@/lib/api";
import { Button } from "@/components/ui/CTAButton";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { AccordionItem } from "@/components/ui/AccordionIteam";
import FaqSection from "@/components/Faq";
import ReviewCarousel from "@/components/ReviewCarousel";

interface TabItem {
  id: number;
  label: string;
}

const DashboardCarousel = ({
  images,
  alt,
}: {
  images: { url: string }[];
  alt: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const safeImages = Array.isArray(images) ? images : [];

  // 1. TẠO MẢNG MỞ RỘNG: Thêm hình đầu tiên vào cuối mảng để làm "Clone"
  // Ví dụ: [A, B, C] -> [A, B, C, A(clone)]
  const extendedImages =
    safeImages.length > 0 ? [...safeImages, safeImages[0]] : [];

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 2. XỬ LÝ AUTO PLAY
  useEffect(() => {
    // Nếu đang Pause hoặc không có ảnh thì dừng
    if (isPaused || safeImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, safeImages.length]);

  // 3. XỬ LÝ HIỆU ỨNG "LƯỚT TRÒN" (Infinite Scroll)
  useEffect(() => {
    // Nếu lướt đến hình cuối cùng (chính là hình Clone của hình đầu tiên)
    if (currentIndex === safeImages.length) {
      // Đợi 700ms (bằng thời gian animation) để lướt xong
      const timer = setTimeout(() => {
        setIsTransitioning(false); // Tắt hiệu ứng chuyển động
        setCurrentIndex(0); // Nhảy tức thì về hình đầu tiên thật sự
      }, 700);
      return () => clearTimeout(timer);
    }

    // Nếu vừa nhảy về 0 và đang tắt transition -> Bật lại transition
    if (currentIndex === 0 && !isTransitioning) {
      // Delay nhẹ để DOM cập nhật xong mới bật lại animation
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, safeImages.length, isTransitioning]);

  // 4. XỬ LÝ TƯƠNG TÁC NGƯỜI DÙNG (Click Dot)
  const handleUserInteract = (index: number) => {
    // Chuyển đến slide user chọn
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);

    // Kích hoạt chế độ Pause
    setIsPaused(true);

    // Xóa timer cũ nếu có
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set timer mới: Sau 5s không tương tác thì chạy lại (isPaused = false)
    timeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  if (safeImages.length === 0) return null;

  return (
    <div className="relative mx-auto mt-6 md:mt-12 max-w-4xl  overflow-hidden rounded-lg shadow-2xl">
      <div
        className="flex"
        style={{
          // Dịch chuyển: index * 100%
          transform: `translateX(-${currentIndex * 100}%)`,
          // Nếu isTransitioning = true thì dùng transition 700ms, ngược lại thì 0ms (nhảy tức thì)
          transition: isTransitioning ? "transform 700ms ease-in-out" : "none",
        }}
      >
        {/* Render mảng extendedImages (bao gồm cả hình clone) */}
        {extendedImages.map((image, index) => (
          <div
            key={index}
            className="relative h-[250px] md:h-[500px] lg:h-[600px] w-full flex-shrink-0"
          >
            <Image
              src={image.url}
              alt={alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 md:bottom-5 left-1/2 flex -translate-x-1/2 space-x-2">
        {safeImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleUserInteract(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-colors ${
              (currentIndex === safeImages.length ? 0 : currentIndex) === index
                ? "bg-primary"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function IndependentPharmacyPage() {
  const {
    heroSection,
    featureSection,
    featureBenefitsSection,
    featureShowcaseSection,
    solutionSection,
    commitmentSection,
    testimonialSection,
    ctaSection,
    faqSection,
  } = independentPharmacyData;

  const [activeTab, setActiveTab] = useState<number | null>(
    featureSection.tabs[0]?.id || null
  );

  // Typed current item based on inference from data
  const current = featureSection.tabs.find((tab) => tab.id === activeTab);
  const [openAccordion, setOpenAccordion] = useState(0);

  // --- LOGIC XỬ LÝ VUỐT (SWIPE) CHO MOBILE/TABLET ---
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const tabsList = (featureSection.tabs || []) as TabItem[];

  const handleNextTab = () => {
    if (!activeTab) return;
    const currentIndex = tabsList.findIndex((t) => t.id === activeTab);
    const nextIndex =
      currentIndex === tabsList.length - 1 ? 0 : currentIndex + 1;
    setActiveTab(tabsList[nextIndex].id);
  };

  const handlePrevTab = () => {
    if (!activeTab) return;
    const currentIndex = tabsList.findIndex((t) => t.id === activeTab);
    const prevIndex =
      currentIndex === 0 ? tabsList.length - 1 : currentIndex - 1;
    setActiveTab(tabsList[prevIndex].id);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNextTab();
    if (isRightSwipe) handlePrevTab();
  };
  // --------------------------------------------------

  return (
    <div>
      {/** Dashboard */}
      <section className="bg-blue-100 py-10 text-center">
        <div className="container mx-auto ">
          <h1 className="mt-10 mx-auto max-w-5xl">{heroSection.mainTitle}</h1>
          <p className="mx-auto mb-10 max-w-lg text-sub2 md:text-sub1 lg:text-h6 text-colordescription md:max-w-xl lg:max-w-2xl">
            {heroSection.mainDescription}
          </p>
         <div className="flex justify-center gap-4">
            {Array.isArray(heroSection.ctaButtons) &&
              heroSection.ctaButtons.map((button, index) => (
                <Button
                  size="md"
                  key={button.title}
                  variant={index === 0 ? "primary" : "secondary"}
                >
                  {button.title}
                </Button>
              ))}
          </div>
          <div className="relative mx-auto mt-12 max-w-4xl">
            <Image
              src={heroSection.image.url}
              alt="V-Pharma Dashboard"
              width={1000}
              height={600}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 896px"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 4 hero-section */}
      <section className="bg-gradient-to-b from-blue-100 to-white py-15 md:px-4">
        <div className="container mx-auto grid grid-cols-1 gap-6 lg:gap-8 px-4 text-center md:grid-cols-2 lg:grid-cols-4">
          {Array.isArray(featureSection.gridItems) &&
            featureSection.gridItems.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40 "
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <div className="h-6 w-6 rounded bg-primary"></div>
                </div>
                <h3 className="text-sub2 md:text-sub1 lg:text-h6 mb-3 text-black">
                  {item.title}
                </h3>
                <p className=" text-body2 md:text-sub2 lg:text-sub1 mx-auto max-w-xl">
                  {item.description}
                </p>
              </div>
            ))}
        </div>
      </section>

      {/* --- FEATURES SECTION: UNIFIED & TYPED --- */}
      <section className="container mx-auto py-15 px-4 relative">
        {/* HEADER */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-black mb-4">{featureSection.title}</h2>
          <p className="text-colordescription text-body2 md:text-sub1 mx-auto max-w-2xl">
            {featureSection.description}
          </p>
        </div>

        {/* DESKTOP TABS (Chỉ hiện trên màn hình lớn >= 1024px) */}
        <div className="hidden lg:flex mx-auto max-w-3xl flex-wrap justify-center gap-6 mb-10">
          {tabsList.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-6 py-3 text-sub1 font-bold transition-all ring ${
                activeTab === tab.id
                  ? "bg-primary text-white ring-primary shadow-md"
                  : "ring-gray-200 bg-white text-black hover:bg-primary/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- MAIN DISPLAY AREA --- */}
        <div className="max-w-6xl mx-auto">
          {/* === A. MOBILE & TABLET VIEW (< 1024px): SWIPEABLE CARD === */}
          <div
            className="block lg:hidden relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 touch-pan-y max-w-2xl mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 1. IMAGE AREA */}
            <div className="relative h-[250px] md:h-[450px] w-full bg-gray-100 group">
              {current?.image && (
                <Image
                  src={current.image.url}
                  alt={current.label || "Feature"}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500"
                />
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

              {/* COUNTER (Góc trên phải) */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-sm z-30 select-none">
                {tabsList.findIndex((t) => t.id === activeTab) + 1} /{" "}
                {tabsList.length}
              </div>

              {/* --- NAVIGATION ARROWS (FIXED FOR TABLET) --- */}
              {/* Button Previous (Trái) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevTab();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 
                           p-2 md:p-3 rounded-full shadow-lg transition-all active:scale-95
                           bg-white/70 hover:bg-white text-white hover:text-primary backdrop-blur-md border border-white/20"
                aria-label="Previous feature"
              >
                <FiChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </button>

              {/* Button Next (Phải) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextTab();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 
                           p-2 md:p-3 rounded-full shadow-lg transition-all active:scale-95
                           bg-white/70 hover:bg-white text-white hover:text-primary backdrop-blur-md border border-white/20"
                aria-label="Next feature"
              >
                <FiChevronRight className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </button>
            </div>

            {/* 2. CONTENT AREA (List below image) */}
            <div className="p-4 md:p-8">
              <div className="mb-2 md:mb-8">
                <h3 className="text-sub2 md:text-sub1 lg:text-h6 mb-2 text-black uppercase">
                  {current?.label}
                </h3>
                <p className="text-primary text-sub2 md:text-sub1 font-semibold lg:text-h6 ">
                  {current?.title}
                </p>
              </div>

              <ul className="space-y-4 md:space-y-6 mb-4 min-h-[150px]">
                {Array.isArray(current?.description) &&
                  current.description.map((block, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 md:gap-4 animate-[fadeIn_0.3s_ease-in-out]"
                    >
                      <FiCheckCircle className="mt-1 flex-shrink-0 text-success w-5 h-5 md:w-7 md:h-7" />
                      <div className="text-body2 md:text-sub2 text-gray-700">
                        <RichTextRenderer content={[block]} />
                      </div>
                    </li>
                  ))}
              </ul>

              <div className="sm:flex sm:justify-center">
                <Button 
                  size="md" 
                  href="/signup" 
                  className="w-full md:w-auto md:px-12 md:py-3 shadow-lg shadow-primary/20"
                >
                  Đăng ký dùng thử
                </Button>
              </div>
            </div>
          </div>

          {/* === B. DESKTOP VIEW (>= 1024px): EQUAL HEIGHT GRID === */}
          <div className="hidden lg:grid grid-cols-2 gap-16 items-stretch">
            <div className="relative h-full min-h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              {current?.image && (
                <Image
                  src={current.image.url}
                  alt={current.label || "Feature"}
                  layout="fill"
                  objectFit="cover" // Quan trọng: Giúp hình tự cắt (crop) để lấp đầy khung mà ko bị méo
                  className="hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>

            {/* Desktop Content */}
            <div className="relative h-full">
              <div className="p-8 rounded-lg shadow-lg h-full flex flex-col justify-center bg-white border border-gray-50">
                <h3 className="text-h6 mb-4 font-bold text-black">
                  {current?.label}
                </h3>
                <p className="text-sub1 mb-4 font-bold text-primary">
                  {current?.title}
                </p>

                {/* flex-grow: Đẩy nút xuống đáy nếu muốn, hoặc để tự nhiên */}
                <ul className="text-sub1 space-y-4 mb-4">
                  {Array.isArray(current?.description) &&
                    current.description.map((block, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <FiCheckCircle className="mt-1.5 flex-shrink-0 text-success" />
                        <RichTextRenderer content={[block]} />
                      </li>
                    ))}
                </ul>

                {/* mt-auto: Nếu bạn muốn nút luôn nằm ở đáy khung, hãy dùng class này. Nếu không thì bỏ đi */}
                <div className="mt-auto ">
                  <Button
                    size="md"
                    href="/signup"
                    className="hover:shadow-primary/40 hover:shadow-lg "
                  >
                    Đăng ký dùng thử
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: An Tâm Và Vận Hành Hiệu Quả --- */}
      <section className=" bg-ink text-white">
        <div className="container py-10 mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className=" mb-5 font-bold">{featureBenefitsSection.title}</h2>
            <p className="text-body2 md:text-sub1 lg:text-h6 mb-15 text-white">
              {featureBenefitsSection.description}
            </p>
          </div>
          <div className="space-y-10 md:space-y-15 lg:space-y-20">
            {Array.isArray(featureBenefitsSection.contents) &&
              featureBenefitsSection.contents.map((feature, index) => {
                const isEven = index % 2 === 1;
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-1 items-center gap-8 md:gap-10 lg:gap-12 md:grid-cols-2`}
                  >
                    <div
                      className={`relative aspect-video rounded-lg bg-white/10 p-2 ${
                        isEven ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <Image
                        src={feature.image.url}
                        alt={feature.alt}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div className={`${isEven ? "md:order-1" : "md:order-2"}`}>
                      <h3 className="text-sub2 md:text-sub1 lg:text-h6 font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <RichTextRenderer
                        content={feature.description}
                        className="text-sm md:text-body2 lg:text-sub2 line-clamp-4 text-white"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center mt-10 justify-center ">
            <Button
              size="md"
              href={featureBenefitsSection.ctaButton.link || undefined}
              className="w-full md:w-auto shadow-lg"
            >
              {featureBenefitsSection.ctaButton.title}
            </Button>
          </div>
        </div>
      </section>

      {/** section Công nghệ AI - Trợ lý Kinh doanh 24/7 */}
      <section className="container mx-auto px-4 py-15 md:py-20 text-center">
        <h2 className="text-black mb-4 md:mb-5">
          {featureShowcaseSection.title}
        </h2>
        <p className="mx-auto mb-4 md:mb-8 lg:mb-12 max-w-2xl text-body2 md:text-sub1 lg:text-h6 text-colordescription">
          {featureShowcaseSection.description}
        </p>

        {/* Wrapper Flexbox để đảo vị trí trên Mobile */}
        <div className="flex flex-col">
          {/* NÚT BẤM (BUTTON) */}
          {/* Mobile: order-2 (Nằm dưới) + mt-8 (Cách hình ra) */}
          {/* Desktop: md:order-1 (Nằm trên) + md:mb-15 (Cách hình ra) */}
          <div className="flex items-center justify-center order-2 mt-8 md:order-1 md:mt-0">
            <Button
              size="md"
              href={featureShowcaseSection.ctaButton.link || undefined}
              className="w-full md:w-auto shadow-lg"
            >
              {featureShowcaseSection.ctaButton.title}
            </Button>
          </div>

          {/* DASHBOARD CAROUSEL */}
          {/* Mobile: order-1 (Nằm trên nút) */}
          {/* Desktop: md:order-2 (Nằm dưới nút) */}
          <div className="order-1 md:order-2 w-full px-4">
            {featureShowcaseSection.images &&
              featureShowcaseSection.images.length > 0 && (
                <DashboardCarousel
                  images={featureShowcaseSection.images}
                  alt={featureShowcaseSection.alt}
                />
              )}
          </div>
        </div>
      </section>

      <section className="container mx-auto py-15 md:py-20 ">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-5 text-black">{solutionSection.title}</h2>
          <p className="mx-auto mb-4 md:mb-8 lg:mb-12 max-w-2xl text-body2 md:text-sub1 lg:text-h6 text-colordescription">
            {solutionSection.description}
          </p>
        </div>
        <div className=" px-0 grid grid-cols-1 gap-5  md:grid-cols-2">
          {Array.isArray(solutionSection.solutionCard) &&
            solutionSection.solutionCard.map((card, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-4 md:p-6 lg:p-8 text-center shadow-lg max-w-lg mx-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40"
              >
                <h3 className=" text-sub2 md:text-sub1 lg:text-h6 text-black mb-4">
                  {card.title}
                </h3>
                <p className="text-body2 md:text-sub2 lg:text-sub1 mb-4 mx-auto max-w-lg">
                  {card.description}
                </p>

                <Image
                  src={card.image?.url || "/features-dashboard1.png"}
                  alt={card.image?.alt || card.title}
                  width={450}
                  height={450}
                  className="mx-auto"
                />
                <a
                  href={card.ctaButton.link || "#"}
                  className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-body2 md:text-sub2 lg:text-sub1 font-bold text-primary"
                >
                  {card.ctaButton.title}
                  <FiArrowRight className="h-5 w-5 lg:h-6 lg:w-6" />
                </a>
              </div>
            ))}
        </div>
      </section>

      {/* --- COMMITMENT SECTION: NEW LAYOUT (XL Breakpoint) - ORIGINAL COLORS --- */}
      <section className="container mx-auto py-15 md:py-20 px-4">
        
        {/* 1. HEADER TITLE (Giữ nguyên style text cũ) */}
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <h2 className="text-black mb-5">
            {commitmentSection.title}
          </h2>
          <p className="mx-auto max-w-2xl text-body1 md:text-sub1 text-colordescription leading-relaxed">
            {commitmentSection.description}
          </p>
        </div>

        {/* 2. GRID LAYOUT */}
        {/* Mobile/Tablet (< 1280px): 1 Cột (Dọc) */}
        {/* Desktop (>= 1280px): 2 Cột (Ngang) */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 md:px-4 xl:gap-20 items-start">
          
          {/* --- LEFT COLUMN: IMAGE --- */}
          {/* Style: Quay về "bg-white p-2 shadow-xl" như cũ */}
          {/* Layout: Sticky khi ở màn hình lớn */}
          <div className="order-1 relative xl:sticky xl:top-24">
            <div className="relative aspect-video w-full rounded-lg bg-white p-2 shadow-xl">
              <Image
                src={commitmentSection.image.url}
                alt="Commitment Illustration"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN: ACCORDION LIST --- */}
          {/* Style: Quay về "bg-primary/9" như cũ */}
          <div className="order-2 w-full">
            <div className="flex flex-col gap-4">
              {Array.isArray(commitmentSection.contents) &&
                commitmentSection.contents.map((item, index) => (
                  <AccordionItem
                    key={index}
                    title={item.title}
                    description={item.description}
                    isOpen={openAccordion === index}
                    onClick={() =>
                      setOpenAccordion(openAccordion === index ? -1 : index)
                    }
                    // TRẢ LẠI STYLE CŨ: bg-primary/9 w-full
                    buttonClassName="bg-primary/9 w-full"
                  />
                ))}
            </div>
          </div>

        </div>
      </section>

      <ReviewCarousel sectionData={testimonialSection} />

      {/* Final CTA Section */}
      <section className=" container mx-auto py-10 text-center">
        <div className="rounded-2xl bg-ink p-5">
          <h2 className="mt-10 text-white mb-5">
            {ctaSection.title}
          </h2>
          <p className="mx-auto mb-4  max-w-2xl text-body2 md:text-sub1 lg:text-h6 text-white">
            {ctaSection.description}
          </p>
          <Button
            size="md"
            href={ctaSection.ctaButton.link || undefined}
            className="mt-5 mb-10"
          >
            {ctaSection.ctaButton.title}
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <FaqSection title={faqSection.title} items={faqSection.faqItems} />
      </section>
    </div>
  );
}
