import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       // 1. Cấu hình cũ cho ảnh demo (Unsplash)
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//         port: "",
//         pathname: "/**",
//       },
//       // 2. Cấu hình MỚI cho ảnh từ Backend Local (Strapi)
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "1337", // Cổng mặc định của Strapi
//         pathname: "/uploads/**",
//       },
//     ],
//   },
// };

// export default nextConfig;