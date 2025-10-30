"use client";

import Image from "next/image";
import { ChallengeCardProp } from "@/types"
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";



export default function FlipCard({ challengeCard }: ChallengeCardProp) {
  return (
    <div className="group h-[420px] cursor-pointer [perspective:1000px]">
      <div
        className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        {/* ==================== FRONT SIDE ==================== */}
        <div className="absolute inset-0 flex h-full w-full flex-col rounded-xl bg-white p-6 shadow-lg [backface-visibility:hidden]">
          <h3 className="mb-5 text-center text-h6 font-bold text-black">
            {challengeCard.title}
          </h3>
          <div className="flex-grow flex items-center justify-center">
            <Image
              src={challengeCard.image}
              alt={challengeCard.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
        </div>

        {/* ==================== BACK SIDE ==================== */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-white  shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
          <div className="prose container max-w-none">
            <RichTextRenderer content={challengeCard.descriptionBlocks} />
          </div>
        </div>
      </div>
    </div>
  );
}
