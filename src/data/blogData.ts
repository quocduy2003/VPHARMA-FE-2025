
// export interface BlogPost {
//   title: string;          // Tiêu đề bài viết
//   tags: string[];           // Mảng các chủ đề (tags)
//   Content: string;          // Nội dung chính của bài viết
//   imageTitle: string;       // URL của ảnh đại diện (ảnh chính)
//   imageContent: string[];   // Mảng các URL ảnh trong nội dung bài viết
//   date: string;             // Ngày đăng bài
// }

// const images = [
//   "/blog/blog1.png",
//   "/blog/blog2.png",
//   "/blog/blog3.png",
//   "/blog/blog4.jpg",
//   "/blog/blog5.jpg",
//   "/blog/blog6.jpg",
//   "/blog/blog7.jpg",
//   "/blog/blog8.jpg",
// ];

// const sampleTags = ["Kinh nghiệm kinh doanh", "Quản lý bán hàng", "Chuyển đổi số", "Thuế & Kế Toán", "Tin tức", "Marketing Dược", "Quản lý kho"];
// const sampleContent = "Nội dung chi tiết của bài viết sẽ khám phá sâu hơn về các chiến lược tối ưu hóa, ứng dụng công nghệ và những kinh nghiệm thực tiễn giúp nhà thuốc của bạn tăng trưởng bền vững. Chúng tôi sẽ phân tích các case study thành công và đưa ra lời khuyên hữu ích mà bạn có thể áp dụng ngay.";

// // Hàm tạo dữ liệu ngẫu nhiên
// const generateBlogPosts = (count: number): BlogPost[] => {
//   const posts: BlogPost[] = [];
//   const today = new Date("2025-10-26");

//   for (let i = 0; i < count; i++) {
//     const postDate = new Date(today);
//     postDate.setDate(today.getDate() - i);

//     const randomTags = [...sampleTags].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 1);

//     posts.push({
//       title: `Bài viết chuyên đề số ${100 - i}: Tối ưu hóa vận hành nhà thuốc 
//       Tối ưu hóa vận hành nhà thuốc 
//       Tối ưu hóa vận hành nhà thuốc 
//       Tối ưu hóa vận hành nhà thuốc`,
//       tags: randomTags,
//       Content: `Đây là nội dung của bài viết số ${100 - i}. ${sampleContent}`,
//       imageTitle: images[i % images.length],
//       imageContent: [images[(i + 1) % images.length], images[(i + 2) % images.length]],
//       date: postDate.toISOString().split('T')[0],
//     });
//   }
//   return posts;
// };

// // Dữ liệu mẫu cho các bài blog
// export const blogPosts: BlogPost[] = generateBlogPosts(100);



export interface BlogPost {
  title: string;           // Tiêu đề bài viết
  tags: string[];            // Mảng các chủ đề (tags)
  Content: string;           // Nội dung chính của bài viết
  imageTitle: string;        // URL của ảnh đại diện (ảnh chính)
  imageContent: string[];    // Mảng các URL ảnh trong nội dung bài viết
  date: string;              // Ngày đăng bài
}

const images = [
  "/blog/blog1.png",
  "/blog/blog2.png",
  "/blog/blog3.png",
  "/blog/blog4.jpg",
  "/blog/blog5.jpg",
  "/blog/blog6.jpg",
  "/blog/blog7.jpg",
  "/blog/blog8.jpg",
];

export const blogPosts: BlogPost[] = [
  {
    title: "Hướng Dẫn Xây Dựng Quy Trình Vận Hành Nhà Thuốc Chuẩn GPP",
    tags: ["Kinh nghiệm kinh doanh"],
    Content: "Khám phá các bước cần thiết để xây dựng và duy trì quy trình vận hành nhà thuốc đạt chuẩn GPP, từ quản lý nhân sự đến tối ưu hóa quy trình bán hàng.",
    imageTitle: images[0],
    imageContent: [images[1], images[2]],
    date: "2025-10-26",
  },
  {
    title: "Chuyển Đổi Số Trong Ngành Dược: Lợi Ích Và Thách Thức",
    tags: ["Chuyển đổi số"],
    Content: "Phân tích sâu về xu hướng chuyển đổi số đang diễn ra trong ngành dược phẩm, những cơ hội mà nó mang lại và các rào cản cần vượt qua.",
    imageTitle: images[1],
    imageContent: [images[2], images[3]],
    date: "2025-10-25",
  },
  {
    title: "5 Sai Lầm Phổ Biến Khi Quản Lý Tồn Kho Nhà Thuốc",
    tags: ["Quản lý kho"],
    Content: "Nhận diện và học cách tránh 5 sai lầm nghiêm trọng trong việc quản lý tồn kho có thể gây thất thoát doanh thu và giảm hiệu quả kinh doanh.",
    imageTitle: images[2],
    imageContent: [images[3], images[4]],
    date: "2025-10-24",
  },
  {
    title: "Marketing Dược Phẩm 4.0: Tiếp Cận Khách Hàng Đa Kênh",
    tags: ["Marketing Dược"],
    Content: "Tìm hiểu cách áp dụng các chiến lược marketing hiện đại, từ mạng xã hội đến SEO, để xây dựng thương hiệu và thu hút khách hàng cho nhà thuốc.",
    imageTitle: images[3],
    imageContent: [images[4], images[5]],
    date: "2025-10-23",
  },
  {
    title: "Quyết Toán Thuế Cuối Năm Cho Nhà Thuốc: Những Điều Cần Biết",
    tags: ["Thuế & Kế Toán"],
    Content: "Một danh sách kiểm tra chi tiết những hạng mục quan trọng cần chuẩn bị cho kỳ quyết toán thuế cuối năm, giúp nhà thuốc tránh các rủi ro pháp lý.",
    imageTitle: images[4],
    imageContent: [images[5], images[6]],
    date: "2025-10-22",
  },
  {
    title: "Tối Ưu Hóa Trải Nghiệm Khách Hàng Tại Điểm Bán",
    tags: ["Marketing Dược"],
    Content: "Các bí quyết để cải thiện trải nghiệm khách hàng, từ cách bài trí không gian đến kỹ năng tư vấn của dược sĩ, nhằm tăng lòng trung thành của khách hàng.",
    imageTitle: images[5],
    imageContent: [images[6], images[7]],
    date: "2025-10-21",
  },
  {
    title: "Ứng Dụng Phần Mềm Quản Lý Bán Hàng: Nên Hay Không?",
    tags: ["Quản lý bán hàng"],
    Content: "Đánh giá ưu và nhược điểm của việc triển khai phần mềm quản lý bán hàng, giúp chủ nhà thuốc đưa ra quyết định đầu tư đúng đắn.",
    imageTitle: images[6],
    imageContent: [images[7], images[0]],
    date: "2025-10-20",
  },
  {
    title: "Báo Cáo Ngành Dược Quý 3/2025: Những Con Số Biết Nói",
    tags: ["Tin tức"],
    Content: "Tổng hợp các số liệu và xu hướng nổi bật của thị trường dược phẩm trong quý 3 năm 2025, cung cấp cái nhìn toàn cảnh cho các nhà đầu tư và kinh doanh.",
    imageTitle: images[7],
    imageContent: [images[0], images[1]],
    date: "2025-10-19",
  },
  {
    title: "Kỹ Năng Tư Vấn Bán Chéo (Cross-selling) Cho Dược Sĩ",
    tags: [ "Kinh nghiệm kinh doanh"],
    Content: "Nâng cao doanh thu trên mỗi đơn hàng bằng cách trang bị cho dược sĩ kỹ năng tư vấn và bán chéo sản phẩm một cách hiệu quả và có tâm.",
    imageTitle: images[0],
    imageContent: [images[1], images[2]],
    date: "2025-10-18",
  },
  {
    title: "Làm Thế Nào Để Giảm Tỷ Lệ Hàng Hết Hạn Tồn Kho?",
    tags: ["Quản lý kho"],
    Content: "Các chiến lược và công cụ giúp theo dõi hạn sử dụng sản phẩm một cách chặt chẽ, giảm thiểu rủi ro và thất thoát do hàng hết hạn.",
    imageTitle: images[1],
    imageContent: [images[2], images[3]],
    date: "2025-10-17",
  },
  {
    title: "Xây Dựng Chương Trình Khách Hàng Thân Thiết Hiệu Quả",
    tags: ["Marketing Dược"],
    Content: "Từ thẻ tích điểm đến ưu đãi độc quyền, khám phá cách xây dựng một chương trình khách hàng thân thiết để giữ chân khách hàng cũ và thu hút khách hàng mới.",
    imageTitle: images[2],
    imageContent: [images[3], images[4]],
    date: "2025-10-16",
  },
  {
    title: "Hóa Đơn Điện Tử Trong Nhà Thuốc: Quy Định và Lợi Ích",
    tags: ["Thuế & Kế Toán"],
    Content: "Tất cả những gì bạn cần biết về việc áp dụng hóa đơn điện tử, từ các quy định pháp lý mới nhất đến những lợi ích thiết thực cho hoạt động kinh doanh.",
    imageTitle: images[3],
    imageContent: [images[4], images[5]],
    date: "2025-10-15",
  },
  {
    title: "Phân Tích Đối Thủ Cạnh Tranh Trong Khu Vực Của Bạn",
    tags: ["Kinh nghiệm kinh doanh"],
    Content: "Hướng dẫn từng bước cách nghiên cứu và phân tích các nhà thuốc đối thủ, từ đó tìm ra lợi thế cạnh tranh và định vị thương hiệu cho riêng mình.",
    imageTitle: images[4],
    imageContent: [images[5], images[6]],
    date: "2025-10-14",
  },
  {
    title: "Tổ Chức Sự Kiện Tư Vấn Sức Khỏe Tại Nhà Thuốc",
    tags: ["Marketing Dược"],
    Content: "Ý tưởng và kế hoạch chi tiết để tổ chức các sự kiện cộng đồng như đo huyết áp, tiểu đường miễn phí, nhằm tăng cường uy tín và thu hút người dân.",
    imageTitle: images[5],
    imageContent: [images[6], images[7]],
    date: "2025-10-13",
  },
  {
    title: "Dự Báo Nhu Cầu Thuốc Dựa Trên Dữ Liệu Lịch Sử",
    tags: ["Quản lý kho", "Chuyển đổi số"],
    Content: "Sử dụng dữ liệu bán hàng trong quá khứ để dự báo nhu cầu trong tương lai, giúp tối ưu hóa việc nhập hàng và đảm bảo luôn đủ thuốc cần thiết.",
    imageTitle: images[6],
    imageContent: [images[7], images[0]],
    date: "2025-10-12",
  },
  {
    title: "Cách Định Giá Sản Phẩm Để Tối Ưu Hóa Lợi Nhuận",
    tags: ["Quản lý bán hàng"],
    Content: "Khám phá các phương pháp định giá sản phẩm khác nhau, từ định giá theo đối thủ đến định giá dựa trên giá trị, để tìm ra chiến lược phù hợp nhất.",
    imageTitle: images[7],
    imageContent: [images[0], images[1]],
    date: "2025-10-11",
  },
  {
    title: "Xu Hướng Thực Phẩm Chức Năng Mới Nhất Năm 2025",
    tags: ["Tin tức", "Marketing Dược"],
    Content: "Điểm qua các dòng sản phẩm thực phẩm chức năng đang được người tiêu dùng quan tâm, giúp nhà thuốc nắm bắt xu hướng và lựa chọn sản phẩm kinh doanh.",
    imageTitle: images[0],
    imageContent: [images[1], images[2]],
    date: "2025-10-10",
  },
  {
    title: "Tầm Quan Trọng Của Báo Cáo Doanh Thu Hàng Ngày",
    tags: ["Thuế & Kế Toán", "Quản lý bán hàng"],
    Content: "Tại sao việc theo dõi và phân tích báo cáo doanh thu hàng ngày lại là công cụ quản trị mạnh mẽ giúp chủ nhà thuốc ra quyết định nhanh chóng và chính xác.",
    imageTitle: images[1],
    imageContent: [images[2], images[3]],
    date: "2025-10-09",
  },
  {
    title: "Mở Rộng Kinh Doanh: Từ Một Nhà Thuốc Lên Chuỗi",
    tags: ["Kinh nghiệm kinh doanh"],
    Content: "Lộ trình và những yếu tố cốt lõi cần chuẩn bị khi bạn có ý định mở rộng quy mô kinh doanh từ một nhà thuốc đơn lẻ thành một chuỗi nhà thuốc.",
    imageTitle: images[2],
    imageContent: [images[3], images[4]],
    date: "2025-10-08",
  },
  {
    title: "An Ninh Mạng Cho Dữ Liệu Nhà Thuốc",
    tags: ["Chuyển đổi số"],
    Content: "Trong thời đại số, việc bảo vệ thông tin khách hàng và dữ liệu kinh doanh là tối quan trọng. Bài viết này cung cấp các biện pháp an ninh mạng cơ bản.",
    imageTitle: images[3],
    imageContent: [images[4], images[5]],
    date: "2025-10-07",
  },
  {
    title: "Đào Tạo Nhân Viên Mới: Cẩm Nang Cho Quản Lý Nhà Thuốc",
    tags: ["Kinh nghiệm kinh doanh"],
    Content: "Quy trình đào tạo bài bản giúp nhân viên mới nhanh chóng hòa nhập và nắm vững chuyên môn, góp phần nâng cao chất lượng dịch vụ.",
    imageTitle: images[4],
    imageContent: [images[5], images[6]],
    date: "2025-10-06",
  },
  {
    title: "Chiến Lược Tồn Kho An Toàn (Safety Stock) Là Gì?",
    tags: ["Quản lý kho"],
    Content: "Tìm hiểu khái niệm và cách tính toán lượng tồn kho an toàn để phòng ngừa rủi ro hết hàng đột ngột mà không gây tồn đọng vốn.",
    imageTitle: images[5],
    imageContent: [images[6], images[7]],
    date: "2025-10-05",
  },
  {
    title: "Content Marketing Cho Nhà Thuốc: Viết Gì Trên Fanpage?",
    tags: ["Marketing Dược"],
    Content: "Gợi ý các chủ đề nội dung hấp dẫn và hữu ích để đăng tải trên Fanpage, giúp xây dựng cộng đồng và tăng tương tác với khách hàng.",
    imageTitle: images[6],
    imageContent: [images[7], images[0]],
    date: "2025-10-04",
  },
  {
    title: "Hiểu Về Thuế Giá Trị Gia Tăng (VAT) Trong Ngành Dược",
    tags: ["Thuế & Kế Toán"],
    Content: "Giải thích rõ ràng về các mức thuế suất VAT áp dụng cho từng loại sản phẩm dược và cách kê khai chính xác để tuân thủ quy định.",
    imageTitle: images[7],
    imageContent: [images[0], images[1]],
    date: "2025-10-03",
  },
  {
    title: "Giải Quyết Khiếu Nại Của Khách Hàng Một Cách Chuyên Nghiệp",
    tags: ["Quản lý bán hàng"],
    Content: "Biến những lời phàn nàn của khách hàng thành cơ hội để cải thiện dịch vụ và củng cố lòng tin bằng quy trình xử lý khiếu nại chuyên nghiệp.",
    imageTitle: images[0],
    imageContent: [images[1], images[2]],
    date: "2025-10-02",
  },
  {
    title: "Telemedicine: Tương Lai Của Tư Vấn Dược Trực Tuyến",
    tags: ["Tin tức", "Chuyển đổi số"],
    Content: "Xu hướng tư vấn sức khỏe từ xa đang ngày càng phát triển. Nhà thuốc có thể tận dụng cơ hội này như thế nào để mở rộng dịch vụ?",
    imageTitle: images[1],
    imageContent: [images[2], images[3]],
    date: "2025-10-01",
  },
  {
    title: "Tối Ưu Bố Cục Trưng Bày Sản Phẩm Trong Nhà Thuốc",
    tags: ["Kinh nghiệm kinh doanh", "Marketing Dược"],
    Content: "Nghệ thuật sắp xếp và trưng bày sản phẩm không chỉ giúp không gian đẹp hơn mà còn có thể thúc đẩy doanh số bán hàng một cách hiệu quả.",
    imageTitle: images[2],
    imageContent: [images[3], images[4]],
    date: "2025-09-30",
  },
  {
    title: "Phân Loại Hàng Hóa Theo Phương Pháp ABC",
    tags: ["Quản lý kho"],
    Content: "Áp dụng phương pháp phân tích ABC để phân loại hàng tồn kho, giúp tập trung nguồn lực quản lý vào những mặt hàng quan trọng nhất.",
    imageTitle: images[3],
    imageContent: [images[4], images[5]],
    date: "2025-09-29",
  },
  {
    title: "Chạy Quảng Cáo Facebook Ads Cho Nhà Thuốc: Cần Lưu Ý Gì?",
    tags: ["Marketing Dược"],
    Content: "Những quy định và chính sách đặc thù của Facebook đối với quảng cáo ngành dược, và cách để xây dựng một chiến dịch hiệu quả, đúng luật.",
    imageTitle: images[4],
    imageContent: [images[5], images[6]],
    date: "2025-09-28",
  },
  {
    title: "Quản Lý Dòng Tiền Cho Doanh Nghiệp Nhỏ Và Vừa",
    tags: ["Thuế & Kế Toán", "Kinh nghiệm kinh doanh"],
    Content: "Các nguyên tắc vàng trong quản lý dòng tiền giúp nhà thuốc duy trì sự ổn định tài chính và sẵn sàng cho các cơ hội phát triển.",
    imageTitle: images[5],
    imageContent: [images[6], images[7]],
    date: "2025-09-27",
  },
  {
    title: "TOP 5 Phần Mềm Quản Lý Nhà Thuốc Phổ Biến Nhất",
    tags: ["Chuyển đổi số", "Tin tức"],
    Content: "Đánh giá và so sánh 5 phần mềm quản lý nhà thuốc hàng đầu hiện nay dựa trên các tiêu chí về tính năng, chi phí và dịch vụ hỗ trợ.",
    imageTitle: images[6],
    imageContent: [images[7], images[0]],
    date: "2025-09-26",
  },
  {
    title: "Tạo Động Lực Cho Đội Ngũ Bán Hàng",
    tags: ["Quản lý bán hàng"],
    Content: "Không chỉ là lương thưởng, bài viết này khám phá các phương pháp phi tài chính để tạo động lực và giữ chân đội ngũ dược sĩ tài năng.",
    imageTitle: images[7],
    imageContent: [images[0], images[1]],
    date: "2025-09-25",
  },
  {
    title: "Thủ Tục Đăng Ký Kinh Doanh Nhà Thuốc Mới Nhất",
    tags: ["Kinh nghiệm kinh doanh"],
    Content: "Cập nhật các quy định, giấy tờ và thủ tục cần thiết để đăng ký thành lập một nhà thuốc mới theo đúng quy định của pháp luật.",
    imageTitle: images[0],
    imageContent: [images[1], images[2]],
    date: "2025-09-24",
  },
  {
    title: "Tối Ưu Tốc Độ Xử Lý Đơn Hàng Tại Quầy",
    tags: ["Quản lý bán hàng"],
    Content: "Giảm thời gian chờ đợi cho khách hàng bằng cách tối ưu hóa quy trình thanh toán và xử lý đơn hàng, nâng cao sự hài lòng và hiệu suất.",
    imageTitle: images[1],
    imageContent: [images[2], images[3]],
    date: "2025-09-23",
  },
  {
    title: "Kiểm Kê Kho Định Kỳ: Tại Sao và Như Thế Nào?",
    tags: ["Quản lý kho"],
    Content: "Tầm quan trọng của việc kiểm kê kho định kỳ và hướng dẫn quy trình kiểm kê hiệu quả để đảm bảo số liệu luôn chính xác.",
    imageTitle: images[2],
    imageContent: [images[3], images[4]],
    date: "2025-09-22",
  },
  {
    title: "Xây Dựng Website Cho Nhà Thuốc: Bắt Đầu Từ Đâu?",
    tags: ["Marketing Dược", "Chuyển đổi số"],
    Content: "Các bước cơ bản để xây dựng một website chuyên nghiệp cho nhà thuốc, từ việc chọn tên miền đến các tính năng cần có.",
    imageTitle: images[3],
    imageContent: [images[4], images[5]],
    date: "2025-09-21",
  },
  {
    title: "Lưu Trữ Chứng Từ Kế Toán Đúng Cách",
    tags: ["Thuế & Kế Toán"],
    Content: "Quy định về việc lưu trữ và bảo quản các loại chứng từ, hóa đơn kế toán để phục vụ cho công tác kiểm tra, thanh tra thuế.",
    imageTitle: images[4],
    imageContent: [images[5], images[6]],
    date: "2025-09-20",
  },
  {
    title: "Luật Dược Sửa Đổi: Những Điểm Mới Cần Chú Ý",
    tags: ["Tin tức"],
    Content: "Tổng hợp và phân tích những thay đổi quan trọng trong Luật Dược sửa đổi và tác động của chúng đến hoạt động của các nhà thuốc.",
    imageTitle: images[5],
    imageContent: [images[6], images[7]],
    date: "2025-09-19",
  },
  {
    title: "Phân Tích Chỉ Số Đo Lường Hiệu Quả Kinh Doanh (KPIs)",
    tags: ["Kinh nghiệm kinh doanh"],
    Content: "Tìm hiểu các chỉ số KPIs quan trọng cần theo dõi như doanh thu trung bình, tỷ lệ chuyển đổi... để đánh giá sức khỏe kinh doanh.",
    imageTitle: images[6],
    imageContent: [images[7], images[0]],
    date: "2025-09-18",
  },
  {
    title: "Bảo Quản Thuốc Theo Tiêu Chuẩn GSP",
    tags: ["Quản lý kho"],
    Content: "Hướng dẫn chi tiết về cách bảo quản các loại thuốc khác nhau theo đúng tiêu chuẩn thực hành tốt bảo quản thuốc (GSP).",
    imageTitle: images[7],
    imageContent: [images[0], images[1]],
    date: "2025-09-17",
  },
  {
    title: "Tối Ưu Hóa Chi Phí Hoạt Động Cho Nhà Thuốc",
    tags: ["Kinh nghiệm kinh doanh", "Thuế & Kế Toán"],
    Content: "Các phương pháp giúp cắt giảm các chi phí không cần thiết trong vận hành mà vẫn đảm bảo chất lượng dịch vụ và sản phẩm.",
    imageTitle: images[0],
    imageContent: [images[1], images[2]],
    date: "2025-09-16",
  },
  {
    title: "Sử Dụng Email Marketing Để Chăm Sóc Khách Hàng",
    tags: ["Marketing Dược"],
    Content: "Cách thu thập email và xây dựng các chiến dịch email marketing gửi thông tin khuyến mãi, kiến thức sức khỏe để giữ kết nối với khách hàng.",
    imageTitle: images[1],
    imageContent: [images[2], images[3]],
    date: "2025-09-15",
  },
  {
    title: "Vai Trò Của Trí Tuệ Nhân Tạo (AI) Trong Ngành Dược",
    tags: ["Chuyển đổi số", "Tin tức"],
    Content: "Khám phá cách AI đang thay đổi ngành dược, từ việc phát triển thuốc mới đến cá nhân hóa phác đồ điều trị và quản lý nhà thuốc.",
    imageTitle: images[2],
    imageContent: [images[3], images[4]],
    date: "2025-09-14",
  },
  {
    title: "Kỹ Năng Lắng Nghe Và Thấu Hiểu Nhu Cầu Khách Hàng",
    tags: ["Quản lý bán hàng"],
    Content: "Nâng cao kỹ năng giao tiếp cho đội ngũ dược sĩ để không chỉ bán được hàng mà còn trở thành người tư vấn sức khỏe đáng tin cậy.",
    imageTitle: images[3],
    imageContent: [images[4], images[5]],
    date: "2025-09-13",
  },
  {
    title: "Các Hình Thức Thanh Toán Không Dùng Tiền Mặt Tại Nhà Thuốc",
    tags: ["Chuyển đổi số", "Quản lý bán hàng"],
    Content: "Lợi ích và cách triển khai các phương thức thanh toán hiện đại như quẹt thẻ, mã QR, ví điện tử để tăng tiện lợi cho khách hàng.",
    imageTitle: images[4],
    imageContent: [images[5], images[6]],
    date: "2025-09-12",
  },
  {
    title: "Xử Lý Hàng Trả Lại: Quy Trình và Chính Sách",
    tags: ["Quản lý bán hàng"],
    Content: "Xây dựng một chính sách đổi trả hàng hóa rõ ràng và quy trình xử lý chuyên nghiệp để đảm bảo sự hài lòng của khách hàng và quản lý kho hiệu quả.",
    imageTitle: images[5],
    imageContent: [images[6], images[7]],
    date: "2025-09-11",
  },
  {
    title: "Hội Thảo Y Dược Toàn Quốc 2025: Những Gì Đã Diễn Ra?",
    tags: ["Tin tức"],
    Content: "Tổng kết những nội dung, báo cáo và công nghệ nổi bật được trình bày tại Hội thảo Y Dược Toàn quốc vừa qua.",
    imageTitle: images[6],
    imageContent: [images[7], images[0]],
    date: "2025-09-10",
  },
  {
    title: "Lương và Phúc Lợi Cho Nhân Viên Nhà Thuốc",
    tags: ["Thuế & Kế Toán", "Kinh nghiệm kinh doanh"],
    Content: "Cách xây dựng một cơ chế lương thưởng và phúc lợi cạnh tranh để thu hút và giữ chân nhân tài trong ngành dược.",
    imageTitle: images[7],
    imageContent: [images[0], images[1]],
    date: "2025-09-09",
  },
  {
    title: "SEO Local: Đưa Nhà Thuốc Của Bạn Lên Top Google Maps",
    tags: ["Marketing Dược"],
    Content: "Hướng dẫn các bước tối ưu hóa thông tin doanh nghiệp trên Google để người dùng trong khu vực có thể tìm thấy nhà thuốc của bạn một cách dễ dàng.",
    imageTitle: images[0],
    imageContent: [images[1], images[2]],
    date: "2025-09-08",
  },
  {
    title: "Quy Trình Nhập Hàng Và Kiểm Tra Chất Lượng Đầu Vào",
    tags: ["Quản lý kho"],
    Content: "Đảm bảo chất lượng sản phẩm ngay từ khâu đầu vào với một quy trình nhập hàng và kiểm tra nhà cung cấp, chất lượng sản phẩm một cách nghiêm ngặt.",
    imageTitle: images[1],
    imageContent: [images[2], images[3]],
    date: "2025-09-07",
  },
];