"use client";

import Image from "next/image";

interface FlipCardProps {
  frontTitle: string;
  backContent: {
    title: string;
    items: {
      label: string;
      description: string;
    }[];
  };
}

export default function FlipCard({ frontTitle, backContent }: FlipCardProps) {
  return (
    <div className="group h-[445px] cursor-pointer [perspective:1000px]">
      <div
        className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        {/* ==================== FRONT SIDE ==================== */}
        <div className="absolute inset-0 flex h-full w-full flex-col rounded-xl bg-white p-6 shadow-lg [backface-visibility:hidden]">
          <h3 className="mb-6 text-center text-h6 font-bold text-black">
            {frontTitle}
          </h3>
          <div>
            <Image
              src="/hero-dashboard.jpg"
              alt="Dashboard"
              width={700}
              height={500}
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>

        {/* ==================== BACK SIDE ==================== */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-white p-4 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h4 className="mb-1 text-center text-sub1 font-bold text-black">
            {backContent.title}
          </h4>

          <div className="space-y-3">
            {backContent.items.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                <h5 className="text-sub2 font-bold text-black">
                  {item.label}
                </h5>
                <p className="text-sub2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
