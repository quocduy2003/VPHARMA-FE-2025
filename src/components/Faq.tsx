


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
        <h3 className="text-body3 font-bold text-black">{item.question}</h3>
        {isOpen ? (
          <FiMinus className="text-white bg-primary rounded text-h6" />
        ) : (
          <FiPlus className="text-white bg-primary rounded text-h6" />
        )}
      </button>
      {isOpen && (
          <p className=" max-w-4xl text-sub2">{item.answer}</p>
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
    <section className="container mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-center text-black mb-15">
        {title}
      </h2>
      <div>
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