"use client";

import Image from "next/image";
import { useState } from "react";
import { FeatureCardProps } from "@/types";

export default function FeatureCard({ features, direction = "right" }: FeatureCardProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);
    const isLeft = direction === "left";

    return (
        <div className={`grid items-center  lg:grid-cols-2`}>
            {/* Cột hình ảnh */}
            <div
                className={`${isLeft ? "lg:order-2" : "lg:order-1"} flex justify-center relative`}
            >
                <div className="relative w-full max-w-[520px] h-64 rounded-2xl overflow-hidden shadow-lg">
                    {features.map((item, index) => (
                        <Image
                            key={index}
                            src={item.image}
                            alt={item.title}
                            width={640}
                            height={420}
                            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[85%] h-auto rounded-xl object-cover transition-opacity duration-500
                          ${hoveredIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Cột mô tả */}
            <div className={`${isLeft ? "lg:order-1" : "lg:order-2"}`}>
                <ul className="space-y-7">
                    {features.map((item, index) => (
                        <li
                            key={index}
                            className={`flex gap-4 group cursor-pointer transition-all duration-300 ${hoveredIndex === index ? "opacity-100" : "opacity-80"
                                }`}
                            onMouseEnter={() => setHoveredIndex(index)} // ✅ Chỉ cần hover để đổi ảnh
                        >
                            <span
                                className={`mt-1 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full
                bg-emerald-100 text-success ring-1 ring-inset ring-emerald-200
                transition-all duration-300
                ${hoveredIndex === index
                                        ? "bg-success text-white ring-emerald-500"
                                        : "group-hover:bg-success group-hover:text-white group-hover:ring-emerald-500"
                                    }`}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M12 6v12M6 12h12" />
                                </svg>
                            </span>
                            <div>
                                <h3
                                    className={`font-bold mb-2 transition-colors duration-300 ${hoveredIndex === index ? "text-primary" : "text-black group-hover:text-primary"
                                        }`}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className={`text-sub2 leading-6 max-w-xl transition-colors  duration-300 ${hoveredIndex === index
                                        ? "text-primary"
                                        : "text-colordescription group-hover:text-primary"
                                        }`}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
