"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { independentPharmacyData } from "@/lib/api";
import { Button } from "@/components/ui/CTAButton";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { AccordionItem } from "@/components/ui/AccordionIteam";
import ReviewCarousel from "@/components/ReviewCarousel";

const DashboardCarousel = ({
  images,
  alt,
}: {
  images: { url: string }[];
  alt: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => clearInterval(interval);
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
              src={image.url}
              alt={alt}
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
            className={`h-3 w-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-primary" : "bg-white/50"
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
    featureSection.tabs[0].id
  );
  const current = featureSection.tabs.find((tab) => tab.id === activeTab);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openAccordion, setOpenAccordion] = useState(0);
  console.log("Testimonial Section Data:", testimonialSection);

  return (
    <div>
      {/** Dashboard */}
      <section className="bg-blue-100 py-10 text-center">
        <div className="container mx-auto px-4 lg:px-90">
          <h1 className="mt-15">{heroSection.mainTitle}</h1>
          <p className="mx-auto mb-10 max-w-2xl text-colordescription text-h6">
            {heroSection.mainDescription}
          </p>
          <div className="flex justify-center gap-4">
            {heroSection.ctaButtons.map((button, index) => (
              <Button
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
      <section className="bg-gradient-to-b from-blue-100 to-white py-10">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 text-center md:grid-cols-2 lg:grid-cols-4">
          {featureSection.gridItems.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/40 "
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <div className="h-6 w-6 rounded bg-primary"></div>
              </div>
              <h3 className="text-h6 font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-sub1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section: Các Tính Năng Nổi Bật Của V-Pharma*/}
      <section className="container mx-auto py-10">
        <h2 className="text-center font-bold text-black">
          {featureSection.title}
        </h2>
        <p className="mx-auto max-w-3xl text-center text-colordescription text-h6">
          {featureSection.description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {featureSection.tabs.map((tab, idx) => (
            <button
              key={idx}
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
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="relative">
            {current?.image && (
              <Image
                src={current.image.url}
                alt={current.label || "Feature Dashboard"}
                width={600}
                height={400}
                className="absolute inset-0 w-full h-full p-5 rounded-lg shadow-lg object-cover"
              />
            )}
          </div>
          <div className="relative">
            <div className="p-5 rounded-lg shadow-lg h-full">
              <h3 className="text-h5 font-bold text-ink">{current?.label}</h3>
              <p className="text-body1  text-ink">{current?.title}</p>
              <ul className="mt-8 text-body1 space-y-3">
                {Array.isArray(current?.description) &&
                  current.description.map((block, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FiCheckCircle className="mt-1 flex-shrink-0 text-success" />
                      <RichTextRenderer content={[block]} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: An Tâm Và Vận Hành Hiệu Quả --- */}
      <section className="bg-ink py-10 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-h3 font-bold">
              {featureBenefitsSection.title}
            </h2>
            <p className="mt-4 text-h6 text-white">
              {featureBenefitsSection.description}
            </p>
          </div>

          {/* Feature 1*/}
          <div className="mt-16 space-y-20">
            {featureBenefitsSection.contents.map((feature, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 items-center gap-12 md:grid-cols-2`}
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
                    <h3 className="text-h5 font-semibold text-success">
                      {feature.title}
                    </h3>
                    <RichTextRenderer
                      content={feature.description}
                      className="text-sub1 mt-4 line-clamp-3 text-white/80"
                    />
                  </div>
                </div>
              );
            })}

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
              {featureBenefitsSection.ctaButton.title}
            </button>
          </div>
        </div>
      </section>

      {/** section Công nghệ AI - Trợ lý Kinh doanh 24/7 */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-h3 font-bold text-ink">
          {featureShowcaseSection.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-h6 text-text/80">
          {featureShowcaseSection.description}
        </p>
        <div className="mt-8">
          <button className="rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
            {featureShowcaseSection.ctaButton.title}
          </button>
        </div>
        {/* -- THAY THẾ IMAGE TĨNH BẰNG CAROUSEL -- */}
        {featureShowcaseSection.images &&
          featureShowcaseSection.images.length > 0 && (
            <DashboardCarousel
              images={featureShowcaseSection.images}
              alt={featureShowcaseSection.alt}
            />
          )}
      </section>

      {/** section Giải Pháp Chuyên Biệt */}
      <section className=" py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h3 font-bold text-ink">
              {solutionSection.title}
            </h2>
            <p className="mt-4 text-h6 text-text/80">
              {solutionSection.description}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            {solutionSection.solutionCard?.map((card, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-8 text-center shadow-lg"
              >
                <h3 className="mt-6 text-h5 font-bold text-ink">
                  {card.title}
                </h3>
                <p className="mt-2 text-sub1">{card.description}</p>
                <a
                  href={card.ctaButton.link || "#"}
                  className="mt-4 inline-block font-semibold text-primary hover:underline"
                >
                  {card.ctaButton.title}
                </a>
                <Image
                  src={card.image?.url || "/features-dashboard1.png"}
                  alt={card.image?.alt || card.title}
                  width={250}
                  height={250}
                  className="mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section: Cam Kết Đồng Hành Cùng Nhà Thuốc --- */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h3 font-bold text-ink">
            {commitmentSection.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-h6">
            {commitmentSection.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 h-[400px]">
          {/* Ảnh bên trái */}
          <div className="relative aspect-video rounded-lg bg-white p-2 shadow-xl">
            <Image
              src={commitmentSection.image.url}
              alt="Marketing Dashboards"
              layout="fill"
              objectFit="contain"
            />
          </div>

          {/* Khung Accordion bên phải */}
          <div className="relative w-full max-w-[500px] mx-auto h-full">
            {/* Nội dung Accordion cố định container, scroll khi dài */}
            <div className="absolute inset-0 overflow-hidden flex flex-col items-center justify-start space-y-3 p-2">
              {commitmentSection.contents.map((item, index) => (
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
      </section>

      <ReviewCarousel sectionData={testimonialSection} />
      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-2xl bg-ink p-12 text-center text-white">
          <h2 className="text-h3 font-bold">{ctaSection.title}</h2>
          <p className="mx-auto text-h6 mt-4 max-w-1xl text-white/80">
            {ctaSection.description}
          </p>
          <button className="mt-8 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
            {ctaSection.ctaButton.title}
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-center text-h3 font-bold text-ink">
          {faqSection.title}
        </h2>
        <div className="mt-10">
          {faqSection.faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.question}
              description={item.answer}
              isOpen={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
