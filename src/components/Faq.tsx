"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import type { Faq } from "@/types";
import { RichTextRenderer } from "./ui/RichTextRenderer";
type FaqSectionProps = {
  title: string;
  items: Faq[];
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
    <div className="border-b border-gray-300 py-5 transition-colors">
      <button
        className="flex w-full items-center justify-between text-left hover:text-primary transition-colors"
        onClick={onClick}
      >
        <span className="text-black text-[18px] font-semibold">{item.question}</span>

        {/* icon không nền, nhẹ, giống Google */}
        <span className="text-gray-700">
          {isOpen ? (
            <FiMinus className="text-[22px] transition-transform duration-300" />
          ) : (
            <FiPlus className="text-[22px] transition-transform duration-300" />
          )}
        </span>
      </button>

      {/* hiệu ứng mở/đóng mượt */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
      >
        <RichTextRenderer content={item.answer} className="text-[16px] leading-relaxed text-colordescription max-w-3xl" />
      </div>
    </div>
  );
}
export default function FaqSection({ title, items }: FaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="container mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-center text-black font-bold mb-12">
        {title}
      </h2>

      <div>
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
