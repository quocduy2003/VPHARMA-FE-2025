// src/data/blogData.ts
export interface ContentSection {
  id: string;
  level: 1 | 2;
  title: string;
  content: string;
  images?: string[];
}

export interface BlogPost {
  title: string;
  description: string;
  categories: string[];
  sections: ContentSection[];
  imageTitle: string;
  date: string;
}

const images = [
  "/blog/blog1.png", "/blog/blog2.png", "/blog/blog3.png",
  "/blog/blog4.jpg", "/blog/blog5.jpg", "/blog/blog6.jpg",
  "/blog/blog7.jpg", "/blog/blog8.jpg",
];

export const blogPosts: BlogPost[] = [
  // 1
  {
    title: "12 Cách Kiểm Kê Hiệu Quả Vừa Tiết Kiệm Thời Gian Cho Nhà Thuốc",
    description: "Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.",
    categories: ["Quản lý kho", "Kinh nghiệm kinh doanh", "123","thiet ke","thiet ke1","thiet ke2","thiet ke4"],
    imageTitle: images[0],
    date: "2025-10-26",
    sections: [
      { id: '1', level: 1, title: 'Tìm hiểu về kiểm kê', content: '' },
      { id: '1.1', level: 2, title: 'Áp dụng quy tắc 80/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.', images: [images[1]] },
      { id: '1.2', level: 2, title: 'Áp dụng quy tắc 60/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.', images: [images[3]] },
      { id: '1.3', level: 2, title: 'Áp dụng quy tắc 50/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.' },
      { id: '2', level: 1, title: 'Tìm hiểu về kiểm kê', content: '' },
      { id: '2.1', level: 2, title: 'Áp dụng quy tắc 80/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.', images: [images[1]] },
      { id: '2.2', level: 2, title: 'Áp dụng quy tắc 60/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.', images: [images[3]] },
      { id: '2.3', level: 2, title: 'Áp dụng quy tắc 50/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.' },
      { id: '3', level: 1, title: 'Tìm hiểu về kiểm kê', content: '' },
      { id: '3.1', level: 2, title: 'Áp dụng quy tắc 80/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.', images: [images[1]] },
      { id: '3.2', level: 2, title: 'Áp dụng quy tắc 60/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.', images: [images[3]] },
      { id: '3.3', level: 2, title: 'Áp dụng quy tắc 50/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.' },
      { id: '4', level: 1, title: 'Tìm hiểu về kiểm kê', content: '' },
      { id: '4.1', level: 2, title: 'Áp dụng quy tắc 80/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.', images: [images[1]] },
      { id: '4.2', level: 2, title: 'Áp dụng quy tắc 60/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.', images: [images[3]] },
      { id: '4.3', level: 2, title: 'Áp dụng quy tắc 50/20', content: 'Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Tập trung vào 20% mặt hàng có giá trị cao nhất chiếm 80% tổng giá trị kho để tối ưu hóa thời gian và nguồn lực. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao. Khám phá 12 phương pháp kiểm kê kho hàng hiệu quả, giúp nhà thuốc tối ưu hóa quy trình, tiết kiệm thời gian và đảm bảo độ chính xác cao.' },

    ]
  },
  // 2
  {
    title: "Chuyển Đổi Số Trong Ngành Dược: Lợi Ích Và Thách Thức",
    description: "Phân tích sâu về xu hướng chuyển đổi số đang diễn ra trong ngành dược phẩm, những cơ hội mà nó mang lại và các rào cản cần vượt qua.",
    categories: ["Chuyển đổi số", "Tin tức"],
    imageTitle: images[1],
    date: "2025-10-25",
    sections: [
      { id: 'loi-ich-chuyen-doi-so', level: 1, title: 'Lợi ích của Chuyển đổi số', content: 'Chuyển đổi số giúp tối ưu hóa vận hành, cải thiện trải nghiệm khách hàng và mở ra các mô hình kinh doanh mới.' },
      { id: 'thach-thuc-can-vuot-qua', level: 2, title: 'Những thách thức cần vượt qua', content: 'Các thách thức bao gồm chi phí đầu tư ban đầu, vấn đề bảo mật dữ liệu và sự thay đổi trong thói quen làm việc.' },
    ]
  },
  // 3
  {
    title: "Marketing Dược Phẩm 4.0: Tiếp Cận Khách Hàng Đa Kênh",
    description: "Tìm hiểu cách áp dụng các chiến lược marketing hiện đại, từ mạng xã hội đến SEO, để xây dựng thương hiệu và thu hút khách hàng cho nhà thuốc.",
    categories: ["Marketing Dược", "Chuyển đổi số"],
    imageTitle: images[2],
    date: "2025-10-24",
    sections: [
      { id: 'marketing-da-kenh', level: 1, title: 'Marketing đa kênh là gì?', content: 'Là việc sử dụng kết hợp nhiều kênh khác nhau (online và offline) để tạo ra một trải nghiệm khách hàng liền mạch.' },
      { id: 'xay-dung-thuong-hieu', level: 2, title: 'Xây dựng thương hiệu trên mạng xã hội', content: 'Sử dụng các nền tảng như Facebook, Zalo để chia sẻ kiến thức sức khỏe, tạo dựng uy tín và tương tác với khách hàng.', images: [images[3]] },
    ]
  },
  // 4
  {
    title: "Quyết Toán Thuế Cuối Năm Cho Nhà Thuốc: Những Điều Cần Biết",
    description: "Một danh sách kiểm tra chi tiết những hạng mục quan trọng cần chuẩn bị cho kỳ quyết toán thuế cuối năm, giúp nhà thuốc tránh các rủi ro pháp lý.",
    categories: ["Thuế & Kế Toán"],
    imageTitle: images[3],
    date: "2025-10-23",
    sections: [
      { id: 'chung-tu-can-thiet', level: 1, title: 'Các chứng từ cần thiết', content: 'Bao gồm hóa đơn đầu vào, bảng kê bán lẻ, chứng từ ngân hàng và bảng lương nhân viên.' },
      { id: 'luu-y-quan-trong', level: 2, title: 'Những lưu ý quan trọng', content: 'Cần đảm bảo tính hợp lệ của hóa đơn, kê khai đúng hạn và lưu trữ chứng từ theo quy định.' },
    ]
  },
  // 5
  {
    title: "5 Sai Lầm Phổ Biến Khi Quản Lý Tồn Kho Nhà Thuốc",
    description: "Nhận diện và học cách tránh 5 sai lầm nghiêm trọng trong việc quản lý tồn kho có thể gây thất thoát doanh thu và giảm hiệu quả kinh doanh.",
    categories: ["Quản lý kho", "Quản lý bán hàng"],
    imageTitle: images[4],
    date: "2025-10-22",
    sections: [
      { id: 'khong-phan-loai-hang-hoa', level: 1, title: 'Sai lầm 1: Không phân loại hàng hóa', content: 'Việc không phân loại hàng hóa theo nhóm (nhanh luân chuyển, chậm luân chuyển) khiến việc quản lý trở nên khó khăn.' },
      { id: 'dat-hang-theo-cam-tinh', level: 2, title: 'Sai lầm 2: Đặt hàng theo cảm tính', content: 'Đặt hàng mà không dựa trên dữ liệu bán hàng lịch sử dễ dẫn đến tình trạng tồn kho quá nhiều hoặc thiếu hụt.' },
    ]
  },
  // 6
  {
    title: "Tối Ưu Hóa Trải Nghiệm Khách Hàng Tại Điểm Bán",
    description: "Các bí quyết để cải thiện trải nghiệm khách hàng, từ cách bài trí không gian đến kỹ năng tư vấn của dược sĩ, nhằm tăng lòng trung thành.",
    categories: ["Kinh nghiệm kinh doanh", "Marketing Dược"],
    imageTitle: images[5],
    date: "2025-10-21",
    sections: [
      { id: 'bai-tri-khong-gian', level: 1, title: 'Bài trí không gian chuyên nghiệp', content: 'Không gian sạch sẽ, gọn gàng với cách sắp xếp sản phẩm logic giúp khách hàng dễ dàng tìm kiếm và cảm thấy tin tưởng hơn.' },
      { id: 'ky-nang-tu-van', level: 2, title: 'Nâng cao kỹ năng tư vấn', content: 'Đào tạo dược sĩ kỹ năng lắng nghe, thấu hiểu và tư vấn tận tâm để giải quyết đúng vấn đề của khách hàng.' },
    ]
  },
  // 7
  {
    title: "Ứng Dụng Phần Mềm Quản Lý Bán Hàng: Nên Hay Không?",
    description: "Đánh giá ưu và nhược điểm của việc triển khai phần mềm quản lý bán hàng, giúp chủ nhà thuốc đưa ra quyết định đầu tư đúng đắn.",
    categories: ["Chuyển đổi số", "Quản lý bán hàng"],
    imageTitle: images[6],
    date: "2025-10-20",
    sections: [
      { id: 'uu-diem-phan-mem', level: 1, title: 'Ưu điểm của phần mềm quản lý', content: 'Tự động hóa quy trình bán hàng, quản lý kho chính xác, báo cáo doanh thu chi tiết và chăm sóc khách hàng hiệu quả.' },
      { id: 'nhuoc-diem-can-can-nhac', level: 2, title: 'Nhược điểm cần cân nhắc', content: 'Chi phí bản quyền, thời gian đào tạo nhân viên và yêu cầu về hạ tầng kỹ thuật.' },
    ]
  },
  // 8
  {
    title: "Báo Cáo Ngành Dược Quý 3/2025: Những Con Số Biết Nói",
    description: "Tổng hợp các số liệu và xu hướng nổi bật của thị trường dược phẩm trong quý 3 năm 2025, cung cấp cái nhìn toàn cảnh cho các nhà kinh doanh.",
    categories: ["Tin tức"],
    imageTitle: images[7],
    date: "2025-10-19",
    sections: [
      { id: 'tang-truong-kenh-online', level: 1, title: 'Sự tăng trưởng của kênh online', content: 'Doanh số bán thuốc và sản phẩm chăm sóc sức khỏe qua các nền tảng trực tuyến tăng trưởng mạnh mẽ.' },
      { id: 'xu-huong-thuc-pham-chuc-nang', level: 2, title: 'Xu hướng thực phẩm chức năng', content: 'Các sản phẩm hỗ trợ tăng cường hệ miễn dịch và chăm sóc sắc đẹp tiếp tục dẫn đầu thị trường.' },
    ]
  },
  // 9
  {
    title: "Kỹ Năng Tư Vấn Bán Chéo (Cross-selling) Cho Dược Sĩ",
    description: "Nâng cao doanh thu trên mỗi đơn hàng bằng cách trang bị cho dược sĩ kỹ năng tư vấn và bán chéo sản phẩm một cách hiệu quả và có tâm.",
    categories: ["Quản lý bán hàng", "Kinh nghiệm kinh doanh"],
    imageTitle: images[0],
    date: "2025-10-18",
    sections: [
      { id: 'nguyen-tac-ban-cheo', level: 1, title: 'Nguyên tắc vàng của bán chéo', content: 'Chỉ gợi ý những sản phẩm thực sự liên quan và mang lại lợi ích cho khách hàng, tránh tạo cảm giác bị chèo kéo.' },
      { id: 'vi-du-thuc-te', level: 2, title: 'Ví dụ thực tế', content: 'Khi khách hàng mua thuốc kháng sinh, dược sĩ có thể tư vấn thêm men vi sinh để hỗ trợ hệ tiêu hóa.', images: [images[2]] },
    ]
  },
  // 10
  {
    title: "Làm Thế Nào Để Giảm Tỷ Lệ Hàng Hết Hạn Tồn Kho?",
    description: "Các chiến lược và công cụ giúp theo dõi hạn sử dụng sản phẩm một cách chặt chẽ, giảm thiểu rủi ro và thất thoát do hàng hết hạn.",
    categories: ["Quản lý kho"],
    imageTitle: images[1],
    date: "2025-10-17",
    sections: [
      { id: 'nguyen-tac-fifo', level: 1, title: 'Áp dụng nguyên tắc FIFO/FEFO', content: 'Luôn ưu tiên bán các sản phẩm nhập trước (First-In, First-Out) hoặc hết hạn trước (First-Expired, First-Out).' },
      { id: 'su-dung-phan-mem', level: 2, title: 'Sử dụng phần mềm cảnh báo', content: 'Các phần mềm quản lý nhà thuốc hiện đại có tính năng cảnh báo tự động khi sản phẩm sắp hết hạn.' },
    ]
  },
  // 11
  {
    title: "Xây Dựng Chương Trình Khách Hàng Thân Thiết Hiệu Quả",
    description: "Từ thẻ tích điểm đến ưu đãi độc quyền, khám phá cách xây dựng một chương trình khách hàng thân thiết để giữ chân khách hàng.",
    categories: ["Marketing Dược"],
    imageTitle: images[2],
    date: "2025-10-16",
    sections: [
      { id: 'loi-ich-chuong-trinh', level: 1, title: 'Lợi ích của chương trình', content: 'Tăng tần suất mua hàng, nâng cao giá trị đơn hàng trung bình và biến khách hàng thành người quảng bá thương hiệu.' },
      { id: 'cac-hinh-thuc-pho-bien', level: 2, title: 'Các hình thức phổ biến', content: 'Bao gồm tích điểm đổi quà, giảm giá theo hạng thành viên, và gửi tặng voucher vào các dịp đặc biệt.' },
    ]
  },
  // 12
  {
    title: "Hóa Đơn Điện Tử Trong Nhà Thuốc: Quy Định và Lợi Ích",
    description: "Tất cả những gì bạn cần biết về việc áp dụng hóa đơn điện tử, từ quy định pháp lý đến lợi ích thiết thực cho kinh doanh.",
    categories: ["Thuế & Kế Toán", "Chuyển đổi số"],
    imageTitle: images[3],
    date: "2025-10-15",
    sections: [
      { id: 'quy-dinh-bat-buoc', level: 1, title: 'Quy định bắt buộc', content: 'Theo quy định mới, hầu hết các nhà thuốc đều bắt buộc phải chuyển sang sử dụng hóa đơn điện tử.' },
      { id: 'loi-ich-thiet-thuc', level: 2, title: 'Lợi ích thiết thực', content: 'Tiết kiệm chi phí in ấn, lưu trữ, dễ dàng quản lý và tra cứu, đồng thời tăng tính minh bạch.' },
    ]
  },
  // 13
  {
    title: "Phân Tích Đối Thủ Cạnh Tranh Trong Khu Vực Của Bạn",
    description: "Hướng dẫn từng bước cách nghiên cứu và phân tích các nhà thuốc đối thủ để tìm ra lợi thế cạnh tranh và định vị thương hiệu.",
    categories: ["Kinh nghiệm kinh doanh"],
    imageTitle: images[4],
    date: "2025-10-14",
    sections: [
      { id: 'xac-dinh-doi-thu', level: 1, title: 'Xác định đối thủ', content: 'Liệt kê tất cả các nhà thuốc trong bán kính 1-2 km và các chuỗi lớn có mặt trong khu vực.' },
      { id: 'phan-tich-swot', level: 2, title: 'Phân tích SWOT', content: 'Đánh giá điểm mạnh, điểm yếu, cơ hội và thách thức của đối thủ so với nhà thuốc của bạn.' },
    ]
  },
  // 14
  {
    title: "Dự Báo Nhu Cầu Thuốc Dựa Trên Dữ Liệu Lịch Sử",
    description: "Sử dụng dữ liệu bán hàng trong quá khứ để dự báo nhu cầu tương lai, giúp tối ưu hóa việc nhập hàng và đảm bảo đủ thuốc cần thiết.",
    categories: ["Quản lý kho", "Chuyển đổi số"],
    imageTitle: images[5],
    date: "2025-10-13",
    sections: [
      { id: 'thu-thap-du-lieu', level: 1, title: 'Thu thập dữ liệu', content: 'Sử dụng báo cáo bán hàng từ phần mềm để thu thập dữ liệu về số lượng bán của từng sản phẩm theo thời gian.' },
      { id: 'phan-tich-theo-mua', level: 2, title: 'Phân tích tính thời vụ', content: 'Nhận diện các loại thuốc có nhu cầu tăng đột biến theo mùa (ví dụ: thuốc cảm cúm vào mùa lạnh) để chuẩn bị tồn kho.' },
    ]
  },
  // 15
  {
    title: "An Ninh Mạng Cho Dữ Liệu Nhà Thuốc",
    description: "Trong thời đại số, việc bảo vệ thông tin khách hàng và dữ liệu kinh doanh là tối quan trọng. Bài viết cung cấp các biện pháp an ninh mạng cơ bản.",
    categories: ["Chuyển đổi số"],
    imageTitle: images[6],
    date: "2025-10-12",
    sections: [
      { id: 'bao-mat-mat-khau', level: 1, title: 'Bảo mật mật khẩu', content: 'Đặt mật khẩu mạnh, phức tạp và thường xuyên thay đổi cho các hệ thống phần mềm và máy tính.' },
      { id: 'sao-luu-du-lieu', level: 2, title: 'Sao lưu dữ liệu định kỳ', content: 'Thực hiện sao lưu dữ liệu kinh doanh hàng ngày để có thể phục hồi khi có sự cố xảy ra.' },
    ]
  },
  // 16
  {
    title: "Content Marketing Cho Nhà Thuốc: Viết Gì Trên Fanpage?",
    description: "Gợi ý các chủ đề nội dung hấp dẫn và hữu ích để đăng tải trên Fanpage, giúp xây dựng cộng đồng và tăng tương tác với khách hàng.",
    categories: ["Marketing Dược"],
    imageTitle: images[7],
    date: "2025-10-11",
    sections: [
      { id: 'chia-se-kien-thuc', level: 1, title: 'Chia sẻ kiến thức sức khỏe', content: 'Viết bài về cách phòng ngừa các bệnh thông thường, lợi ích của các loại vitamin, khoáng chất.' },
      { id: 'tuong-tac-voi-khach-hang', level: 2, title: 'Tương tác với khách hàng', content: 'Tổ chức các buổi livestream hỏi đáp cùng dược sĩ, tạo các mini-game có thưởng để tăng tương tác.' },
    ]
  },
  // 17
  {
    title: "Hiểu Về Thuế Giá Trị Gia Tăng (VAT) Trong Ngành Dược",
    description: "Giải thích rõ ràng về các mức thuế suất VAT áp dụng cho từng loại sản phẩm dược và cách kê khai chính xác để tuân thủ quy định.",
    categories: ["Thuế & Kế Toán"],
    imageTitle: images[0],
    date: "2025-10-10",
    sections: [
      { id: 'cac-muc-thue-suat', level: 1, title: 'Các mức thuế suất', content: 'Phân biệt các sản phẩm chịu thuế suất 0%, 5% và 10% theo danh mục quy định của Bộ Tài chính.' },
      { id: 'ke-khai-thue', level: 2, title: 'Kê khai thuế VAT', content: 'Hướng dẫn cách lập tờ khai thuế GTGT hàng tháng hoặc hàng quý một cách chính xác.' },
    ]
  },
  // 18
  {
    title: "Tối Ưu Bố Cục Trưng Bày Sản Phẩm Trong Nhà Thuốc",
    description: "Nghệ thuật sắp xếp và trưng bày sản phẩm không chỉ giúp không gian đẹp hơn mà còn có thể thúc đẩy doanh số bán hàng hiệu quả.",
    categories: ["Kinh nghiệm kinh doanh", "Marketing Dược"],
    imageTitle: images[1],
    date: "2025-10-09",
    sections: [
      { id: 'quy-tac-tam-nhin', level: 1, title: 'Quy tắc tầm nhìn', content: 'Đặt các sản phẩm có biên lợi nhuận cao hoặc đang trong chương trình khuyến mãi ở vị trí ngang tầm mắt khách hàng.' },
      { id: 'trung-bay-theo-nhom', level: 2, title: 'Trưng bày theo nhóm công dụng', content: 'Sắp xếp các sản phẩm có cùng công dụng (ví dụ: nhóm giảm đau, nhóm vitamin) lại gần nhau để khách hàng dễ lựa chọn.' },
    ]
  },
  // 19
  {
    title: "Quản Lý Dòng Tiền Cho Doanh Nghiệp Nhỏ Và Vừa",
    description: "Các nguyên tắc vàng trong quản lý dòng tiền giúp nhà thuốc duy trì sự ổn định tài chính và sẵn sàng cho các cơ hội phát triển.",
    categories: ["Thuế & Kế Toán", "Kinh nghiệm kinh doanh"],
    imageTitle: images[2],
    date: "2025-10-08",
    sections: [
      { id: 'lap-ke-hoach-thu-chi', level: 1, title: 'Lập kế hoạch thu chi', content: 'Dự báo các khoản thu và chi trong tháng/quý để đảm bảo luôn có đủ tiền mặt cho các hoạt động cần thiết.' },
      { id: 'quan-ly-cong-no', level: 2, title: 'Quản lý công nợ', content: 'Theo dõi chặt chẽ các khoản phải thu từ khách hàng và các khoản phải trả cho nhà cung cấp.' },
    ]
  },
  // 20
  {
    title: "Luật Dược Sửa Đổi: Những Điểm Mới Cần Chú Ý",
    description: "Tổng hợp và phân tích những thay đổi quan trọng trong Luật Dược sửa đổi và tác động của chúng đến hoạt động của các nhà thuốc.",
    categories: ["Tin tức"],
    imageTitle: images[3],
    date: "2025-10-07",
    sections: [
      { id: 'quy-dinh-ve-kinh-doanh-online', level: 1, title: 'Quy định về kinh doanh online', content: 'Các điều khoản mới siết chặt hơn việc bán thuốc kê đơn qua các kênh trực tuyến.' },
      { id: 'truy-xuat-nguon-goc', level: 2, title: 'Yêu cầu về truy xuất nguồn gốc', content: 'Bắt buộc áp dụng các giải pháp tem, mã QR để truy xuất nguồn gốc thuốc, chống hàng giả.' },
    ]
  },
  // 21
  {
    title: "Phân Tích Chỉ Số Đo Lường Hiệu Quả Kinh Doanh (KPIs)",
    description: "Tìm hiểu các chỉ số KPIs quan trọng cần theo dõi như doanh thu trung bình, tỷ lệ chuyển đổi... để đánh giá sức khỏe kinh doanh.",
    categories: ["Kinh nghiệm kinh doanh"],
    imageTitle: images[4],
    date: "2025-10-06",
    sections: [
      { id: 'doanh-thu-trung-binh', level: 1, title: 'Doanh thu trung bình/đơn', content: 'Chỉ số này cho biết giá trị trung bình mà mỗi khách hàng chi tiêu trong một lần mua sắm.' },
      { id: 'ty-le-khach-quay-lai', level: 2, title: 'Tỷ lệ khách hàng quay lại', content: 'Đo lường mức độ trung thành của khách hàng và hiệu quả của các chương trình chăm sóc.' },
    ]
  },
  // 22
  {
    title: "Bảo Quản Thuốc Theo Tiêu Chuẩn GSP",
    description: "Hướng dẫn chi tiết về cách bảo quản các loại thuốc khác nhau theo đúng tiêu chuẩn thực hành tốt bảo quản thuốc (GSP).",
    categories: ["Quản lý kho"],
    imageTitle: images[5],
    date: "2025-10-05",
    sections: [
      { id: 'kiem-soat-nhiet-do', level: 1, title: 'Kiểm soát nhiệt độ, độ ẩm', content: 'Sử dụng các thiết bị theo dõi nhiệt độ, độ ẩm tự động để đảm bảo điều kiện bảo quản luôn trong ngưỡng cho phép.' },
      { id: 'sap-xep-khoa-hoc', level: 2, title: 'Sắp xếp khoa học', content: 'Thuốc cần được sắp xếp trên kệ, tránh tiếp xúc trực tiếp với sàn và tường, đảm bảo thông thoáng.' },
    ]
  },
  // 23
  {
    title: "Vai Trò Của Trí Tuệ Nhân Tạo (AI) Trong Ngành Dược",
    description: "Khám phá cách AI đang thay đổi ngành dược, từ việc phát triển thuốc mới đến cá nhân hóa phác đồ điều trị và quản lý nhà thuốc.",
    categories: ["Chuyển đổi số", "Tin tức"],
    imageTitle: images[6],
    date: "2025-10-04",
    sections: [
      { id: 'ai-trong-quan-ly-kho', level: 1, title: 'AI trong quản lý kho', content: 'AI có thể phân tích dữ liệu để dự báo nhu cầu và tự động đề xuất đơn hàng một cách chính xác.' },
      { id: 'chatbot-tu-van', level: 2, title: 'Chatbot tư vấn sức khỏe', content: 'Các chatbot thông minh có thể trả lời các câu hỏi cơ bản về sức khỏe 24/7, giảm tải cho dược sĩ.' },
    ]
  },
  // 24
  {
    title: "Các Hình Thức Thanh Toán Không Dùng Tiền Mặt Tại Nhà Thuốc",
    description: "Lợi ích và cách triển khai các phương thức thanh toán hiện đại như quẹt thẻ, mã QR, ví điện tử để tăng tiện lợi cho khách hàng.",
    categories: ["Chuyển đổi số", "Quản lý bán hàng"],
    imageTitle: images[7],
    date: "2025-10-03",
    sections: [
      { id: 'loi-ich-thanh-toan-so', level: 1, title: 'Lợi ích của thanh toán số', content: 'Nhanh chóng, tiện lợi, giảm rủi ro sai sót khi thối tiền và dễ dàng đối soát giao dịch.' },
      { id: 'tich-hop-vietqr', level: 2, title: 'Tích hợp VietQR', content: 'Là giải pháp thanh toán qua mã QR đơn giản, miễn phí và phù hợp với mọi quy mô nhà thuốc.' },
    ]
  },
  // 25
  {
    title: "Hội Thảo Y Dược Toàn Quốc 2025: Những Gì Đã Diễn Ra?",
    description: "Tổng kết những nội dung, báo cáo và công nghệ nổi bật được trình bày tại Hội thảo Y Dược Toàn quốc vừa qua.",
    categories: ["Tin tức"],
    imageTitle: images[0],
    date: "2025-10-02",
    sections: [
      { id: 'bao-cao-noi-bat', level: 1, title: 'Các báo cáo nổi bật', content: 'Các báo cáo về ứng dụng công nghệ sinh học trong sản xuất vắc-xin và thuốc điều trị ung thư thế hệ mới.' },
      { id: 'cong-nghe-trinh-lang', level: 2, title: 'Công nghệ được trình làng', content: 'Các hệ thống robot tự động hóa trong dược phẩm và nền tảng quản lý chuỗi cung ứng bằng blockchain.' },
    ]
  },
  // 26
  {
    title: "Mở Rộng Kinh Doanh: Từ Một Nhà Thuốc Lên Chuỗi",
    description: "Lộ trình và những yếu tố cốt lõi cần chuẩn bị khi bạn có ý định mở rộng quy mô kinh doanh từ một nhà thuốc đơn lẻ thành một chuỗi.",
    categories: ["Kinh nghiệm kinh doanh"],
    imageTitle: images[1],
    date: "2025-10-01",
    sections: [
      { id: 'chuan-hoa-quy-trinh', level: 1, title: 'Chuẩn hóa quy trình', content: 'Trước khi nhân rộng, mọi quy trình từ bán hàng, quản lý kho đến chăm sóc khách hàng cần được chuẩn hóa.' },
      { id: 'xay-dung-doi-ngu', level: 2, title: 'Xây dựng đội ngũ kế cận', content: 'Đào tạo và phát triển đội ngũ quản lý có năng lực để điều hành các chi nhánh mới.' },
    ]
  },
  // 27
  {
    title: "Tổ Chức Sự Kiện Tư Vấn Sức Khỏe Tại Nhà Thuốc",
    description: "Ý tưởng và kế hoạch chi tiết để tổ chức các sự kiện cộng đồng nhằm tăng cường uy tín và thu hút người dân trong khu vực.",
    categories: ["Marketing Dược"],
    imageTitle: images[2],
    date: "2025-09-30",
    sections: [
      { id: 'y-tuong-su-kien', level: 1, title: 'Ý tưởng sự kiện', content: 'Tổ chức đo huyết áp, tiểu đường miễn phí; mời chuyên gia dinh dưỡng nói chuyện; hoặc tư vấn chăm sóc da.' },
      { id: 'truyen-thong-su-kien', level: 2, title: 'Truyền thông cho sự kiện', content: 'Thông báo trên Fanpage, treo băng rôn tại nhà thuốc và hợp tác với các tổ dân phố để lan tỏa thông tin.' },
    ]
  },
  // 28
  {
    title: "Cách Định Giá Sản Phẩm Để Tối Ưu Hóa Lợi Nhuận",
    description: "Khám phá các phương pháp định giá sản phẩm khác nhau để tìm ra chiến lược phù hợp nhất cho nhà thuốc của bạn.",
    categories: ["Quản lý bán hàng"],
    imageTitle: images[3],
    date: "2025-09-29",
    sections: [
      { id: 'dinh-gia-theo-chi-phi', level: 1, title: 'Định giá dựa trên chi phí', content: 'Là phương pháp cộng thêm một tỷ lệ lợi nhuận mong muốn vào giá vốn hàng bán.' },
      { id: 'dinh-gia-theo-doi-thu', level: 2, title: 'Định giá theo đối thủ cạnh tranh', content: 'Nghiên cứu mức giá của các đối thủ để đưa ra mức giá cạnh tranh cho sản phẩm của mình.' },
    ]
  },
  // 29
  {
    title: "Xu Hướng Thực Phẩm Chức Năng Mới Nhất Năm 2025",
    description: "Điểm qua các dòng sản phẩm thực phẩm chức năng đang được người tiêu dùng quan tâm, giúp nhà thuốc nắm bắt xu hướng.",
    categories: ["Tin tức", "Marketing Dược"],
    imageTitle: images[4],
    date: "2025-09-28",
    sections: [
      { id: 'san-pham-collagen', level: 1, title: 'Sản phẩm Collagen thế hệ mới', content: 'Các loại collagen peptide, collagen thủy phân với kích thước siêu nhỏ giúp hấp thu tốt hơn đang là xu hướng.' },
      { id: 'thuc-pham-ho-tro-giac-ngu', level: 2, title: 'Thực phẩm hỗ trợ giấc ngủ', content: 'Các sản phẩm chứa Melatonin hoặc các thảo dược tự nhiên giúp cải thiện chất lượng giấc ngủ được tìm kiếm nhiều.' },
    ]
  },
  // 30
  {
    title: "Tầm Quan Trọng Của Báo Cáo Doanh Thu Hàng Ngày",
    description: "Tại sao việc theo dõi và phân tích báo cáo doanh thu hàng ngày lại là công cụ quản trị mạnh mẽ giúp ra quyết định nhanh chóng.",
    categories: ["Thuế & Kế Toán", "Quản lý bán hàng"],
    imageTitle: images[5],
    date: "2025-09-27",
    sections: [
      { id: 'nam-bat-tinh-hinh', level: 1, title: 'Nắm bắt tình hình kinh doanh', content: 'Báo cáo hàng ngày giúp chủ nhà thuốc biết được ngay lập tức hiệu quả hoạt động trong ngày.' },
      { id: 'phat-hien-bat-thuong', level: 2, title: 'Phát hiện vấn đề bất thường', content: 'Doanh thu sụt giảm đột ngột có thể là dấu hiệu của một vấn đề cần được giải quyết ngay.' },
    ]
  },
  // 31
  {
    title: "Đào Tạo Nhân Viên Mới: Cẩm Nang Cho Quản Lý Nhà Thuốc",
    description: "Quy trình đào tạo bài bản giúp nhân viên mới nhanh chóng hòa nhập và nắm vững chuyên môn, góp phần nâng cao chất lượng dịch vụ.",
    categories: ["Kinh nghiệm kinh doanh"],
    imageTitle: images[6],
    date: "2025-09-26",
    sections: [
      { id: 'dao-tao-san-pham', level: 1, title: 'Đào tạo về sản phẩm', content: 'Nhân viên mới cần nắm vững thông tin về các sản phẩm chủ lực, bao gồm công dụng, liều dùng và tác dụng phụ.' },
      { id: 'dao-tao-ky-nang-mem', level: 2, title: 'Đào tạo kỹ năng mềm', content: 'Các kỹ năng như giao tiếp, lắng nghe và xử lý tình huống là cực kỳ quan trọng đối với dược sĩ đứng quầy.' },
    ]
  },
  // 32
  {
    title: "Giải Quyết Khiếu Nại Của Khách Hàng Một Cách Chuyên Nghiệp",
    description: "Biến những lời phàn nàn của khách hàng thành cơ hội để cải thiện dịch vụ và củng cố lòng tin bằng quy trình xử lý chuyên nghiệp.",
    categories: ["Quản lý bán hàng"],
    imageTitle: images[7],
    date: "2025-09-25",
    sections: [
      { id: 'lang-nghe-dong-cam', level: 1, title: 'Bước 1: Lắng nghe và đồng cảm', content: 'Hãy để khách hàng trình bày hết vấn đề của họ và thể hiện sự đồng cảm chân thành.' },
      { id: 'dua-ra-giai-phap', level: 2, title: 'Bước 2: Đưa ra giải pháp', content: 'Đề xuất các giải pháp hợp lý như đổi trả sản phẩm, hoàn tiền hoặc tặng voucher để xoa dịu khách hàng.' },
    ]
  },
  // 33
  {
    title: "Telemedicine: Tương Lai Của Tư Vấn Dược Trực Tuyến",
    description: "Xu hướng tư vấn sức khỏe từ xa đang ngày càng phát triển. Nhà thuốc có thể tận dụng cơ hội này như thế nào để mở rộng dịch vụ?",
    categories: ["Tin tức", "Chuyển đổi số"],
    imageTitle: images[0],
    date: "2025-09-24",
    sections: [
      { id: 'mo-hinh-tu-van-online', level: 1, title: 'Mô hình tư vấn online', content: 'Nhà thuốc có thể thiết lập kênh tư vấn qua Zalo, Facebook Messenger hoặc website để hỗ trợ khách hàng từ xa.' },
      { id: 'thach-thuc-phap-ly', level: 2, title: 'Thách thức về pháp lý', content: 'Cần tuân thủ nghiêm ngặt các quy định về tư vấn và bán thuốc trực tuyến, đặc biệt là thuốc kê đơn.' },
    ]
  },
  // 34
  {
    title: "Chạy Quảng Cáo Facebook Ads Cho Nhà Thuốc: Cần Lưu Ý Gì?",
    description: "Những quy định đặc thù của Facebook đối với quảng cáo ngành dược, và cách để xây dựng một chiến dịch hiệu quả, đúng luật.",
    categories: ["Marketing Dược"],
    imageTitle: images[1],
    date: "2025-09-23",
    sections: [
      { id: 'chinh-sach-han-che', level: 1, title: 'Chính sách hạn chế', content: 'Facebook cấm quảng cáo thuốc kê đơn và các nội dung nhạy cảm, cam kết hiệu quả một cách vô căn cứ.' },
      { id: 'target-khach-hang', level: 2, title: 'Nhắm mục tiêu khách hàng', content: 'Tập trung vào các nhóm đối tượng theo độ tuổi, giới tính, sở thích và vị trí địa lý gần nhà thuốc.' },
    ]
  },
  // 35
  {
    title: "TOP 5 Phần Mềm Quản Lý Nhà Thuốc Phổ Biến Nhất",
    description: "Đánh giá và so sánh 5 phần mềm quản lý nhà thuốc hàng đầu hiện nay dựa trên các tiêu chí về tính năng, chi phí và dịch vụ hỗ trợ.",
    categories: ["Chuyển đổi số", "Tin tức"],
    imageTitle: images[2],
    date: "2025-09-22",
    sections: [
      { id: 'tieu-chi-lua-chon', level: 1, title: 'Tiêu chí lựa chọn', content: 'Các tiêu chí quan trọng bao gồm: quản lý kho, bán hàng, chăm sóc khách hàng, báo cáo và kết nối liên thông Dược Quốc gia.' },
      { id: 'danh-gia-chi-tiet', level: 2, title: 'Đánh giá chi tiết', content: 'Phân tích ưu nhược điểm của các phần mềm như VPharma, Sapo, KiotViet, Misa và PharmSoft.' },
    ]
  },
  // 36
  {
    title: "Thủ Tục Đăng Ký Kinh Doanh Nhà Thuốc Mới Nhất",
    description: "Cập nhật các quy định, giấy tờ và thủ tục cần thiết để đăng ký thành lập một nhà thuốc mới theo đúng quy định của pháp luật.",
    categories: ["Kinh nghiệm kinh doanh"],
    imageTitle: images[3],
    date: "2025-09-21",
    sections: [
      { id: 'dieu-kien-ve-nhan-su', level: 1, title: 'Điều kiện về nhân sự', content: 'Người chịu trách nhiệm chuyên môn phải có Chứng chỉ hành nghề Dược và có thời gian thực hành phù hợp.' },
      { id: 'ho-so-dang-ky', level: 2, title: 'Hồ sơ đăng ký', content: 'Bao gồm đơn đề nghị cấp Giấy chứng nhận đủ điều kiện kinh doanh dược, Chứng chỉ hành nghề và các giấy tờ pháp lý khác.' },
    ]
  },
  // 37
  {
    title: "Tối Ưu Tốc Độ Xử Lý Đơn Hàng Tại Quầy",
    description: "Giảm thời gian chờ đợi cho khách hàng bằng cách tối ưu hóa quy trình thanh toán và xử lý đơn hàng, nâng cao sự hài lòng.",
    categories: ["Quản lý bán hàng"],
    imageTitle: images[4],
    date: "2025-09-20",
    sections: [
      { id: 'su-dung-may-quet-ma-vach', level: 1, title: 'Sử dụng máy quét mã vạch', content: 'Máy quét giúp tìm kiếm sản phẩm và thêm vào hóa đơn nhanh chóng, giảm thiểu sai sót so với nhập tay.' },
      { id: 'tich-hop-thanh-toan-qr', level: 2, title: 'Tích hợp thanh toán QR', content: 'Thanh toán qua mã QR giúp giao dịch diễn ra nhanh hơn và không cần lo lắng về việc thối tiền lẻ.' },
    ]
  },
  // 38
  {
    title: "Lưu Trữ Chứng Từ Kế Toán Đúng Cách",
    description: "Quy định về việc lưu trữ và bảo quản các loại chứng từ, hóa đơn kế toán để phục vụ cho công tác kiểm tra, thanh tra thuế.",
    categories: ["Thuế & Kế Toán"],
    imageTitle: images[5],
    date: "2025-09-19",
    sections: [
      { id: 'thoi-gian-luu-tru', level: 1, title: 'Thời gian lưu trữ', content: 'Theo Luật Kế toán, hầu hết các chứng từ phải được lưu trữ tối thiểu 10 năm.' },
      { id: 'hinh-thuc-luu-tru', level: 2, title: 'Hình thức lưu trữ', content: 'Có thể lưu trữ bản giấy gốc hoặc số hóa thành các file điện tử và lưu trữ trên các nền tảng đám mây an toàn.' },
    ]
  },
  // 39
  {
    title: "Sử Dụng Email Marketing Để Chăm Sóc Khách Hàng",
    description: "Cách thu thập email và xây dựng các chiến dịch email marketing gửi thông tin khuyến mãi, kiến thức sức khỏe để giữ kết nối.",
    categories: ["Marketing Dược"],
    imageTitle: images[6],
    date: "2025-09-18",
    sections: [
      { id: 'thu-thap-email', level: 1, title: 'Cách thu thập email', content: 'Xin thông tin email của khách hàng khi họ tham gia chương trình khách hàng thân thiết hoặc đăng ký nhận tin.' },
      { id: 'noi-dung-email', level: 2, title: 'Nội dung email hiệu quả', content: 'Gửi các bản tin sức khỏe hàng tuần, thông báo về chương trình khuyến mãi sắp diễn ra, hoặc lời chúc mừng sinh nhật.' },
    ]
  },
  // 40
  {
    title: "SEO Local: Đưa Nhà Thuốc Của Bạn Lên Top Google Maps",
    description: "Hướng dẫn các bước tối ưu hóa thông tin doanh nghiệp trên Google để người dùng trong khu vực có thể tìm thấy nhà thuốc của bạn.",
    categories: ["Marketing Dược"],
    imageTitle: images[7],
    date: "2025-09-17",
    sections: [
      { id: 'tao-google-business', level: 1, title: 'Tạo và xác minh Google Business Profile', content: 'Đây là bước đầu tiên và quan trọng nhất, cung cấp đầy đủ thông tin: địa chỉ, số điện thoại, giờ mở cửa.' },
      { id: 'thu-thap-danh-gia', level: 2, title: 'Khuyến khích khách hàng đánh giá', content: 'Số lượng và chất lượng đánh giá tích cực là một yếu tố xếp hạng quan trọng trên Google Maps.' },
    ]
  }
];