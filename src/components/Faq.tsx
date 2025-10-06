"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

type Faq = {
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
        <span className="text-h6 font-semibold text-ink">
          {item.question}
        </span>
        {isOpen ? (
          <FiMinus className="text-white bg-primary rounded text-h6" />
        ) : (
          <FiPlus className="text-white bg-primary rounded text-h6" />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 text-sub1 text-sm text-body2">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  const faqItems: Faq[] = [
    {
      question: "Phần mềm V-Pharma có dễ sử dụng không?",
      answer:
        "Tuyệt đối! V-Pharma được thiết kế với giao diện thân thiện, trực quan, phù hợp với cả những người không rành về công nghệ. Đội ngũ của chúng tôi sẽ đào tạo 1-1 cho đến khi bạn và nhân viên thành thạo.",
    },
    {
      question: "Chi phí sử dụng phần mềm là bao nhiêu?",
      answer:
        "Chi phí rất hợp lý và linh hoạt theo quy mô của nhà thuốc. Vui lòng liên hệ để nhận báo giá chi tiết.",
    },
    {
      question: "Tôi có cần cài đặt phần mềm phức tạp không?",
      answer:
        "Không, V-Pharma là giải pháp dựa trên nền tảng web, bạn có thể truy cập từ bất kỳ đâu mà không cần cài đặt phức tạp.",
    },
    {
      question: "Dữ liệu của tôi có được bảo mật không?",
      answer:
        "An toàn dữ liệu là ưu tiên hàng đầu của chúng tôi. Hệ thống sử dụng các biện pháp bảo mật tiên tiến và sao lưu dữ liệu thường xuyên.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="container mx-auto max-w-4xl px-4 py-20">
      <h2 className="text-center text-h2 font-bold text-ink">
        Câu hỏi thường gặp
      </h2>
      <div className="mt-10">
        {faqItems.map((item, index) => (
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
