


"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

// 1. Export type Faq để các file khác (như page.tsx) có thể import
export type Faq = {
  question: string;
  answer: string;
};

function FaqItem({
  item,
  isOpen,
  onClick,
}: {
  item: Faq;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left text-lg font-medium text-text"
        onClick={onClick}
      >
        <span className="text-sub1 font-bold text-black">{item.question}</span>
        {isOpen ? (
          <FiMinus className="text-white bg-primary rounded text-h6" />
        ) : (
          <FiPlus className="text-white bg-primary rounded text-h6" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 text-sub2 text-colordescription text-body2">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}

// 2. Tạo interface cho props của FaqSection
interface FaqSectionProps {
  title: string;
  items: Faq[];
}

// 3. Sửa FaqSection để nhận props
export default function FaqSection({ title, items }: FaqSectionProps) {
  // 4. Xóa data cứng (faqItems)
  
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="container mx-auto max-w-4xl px-4 py-20">
      <h2 className="text-center text-black">
        {/* 5. Dùng title từ prop */}
        {title}
      </h2>
      <div className="mt-10">
        {/* 6. Dùng items từ prop */}
        {items.map((item, index) => (
          <FaqItem
            key={index}
            item={item}
            isOpen={openFaq === index}
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}