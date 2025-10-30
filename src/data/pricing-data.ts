// Gợi ý: Đặt file này ở /data/pricing-data.ts hoặc tương tự

// Định nghĩa kiểu dữ liệu (Types)
type PlanId = "co_ban" | "tieu_chuan" | "linh_hoat" | "chuoi";

export type FeatureValue =
  | string
  | number
  | boolean
  | "coming_soon"
  | "unlimited"
  | null;

// Cấp 2: Một tính năng cụ thể
export interface Feature {
  id: string;
  name: string;
  // values: một object chứa giá trị cho từng gói (plan)
  values: Record<PlanId, FeatureValue>;
}

// Cấp 1: Nhóm các tính năng
export interface FeatureCategory {
  title: string;
  features: Feature[];
}

// Dữ liệu cho các cột (Plans)
export const plans = [
  {
    id: "co_ban" as PlanId,
    name: "Cơ bản",
    price: "1.800.000",
    billingCycle: "VNĐ/ năm",
    trialNote: "1 Trải nghiệm 1 năm",
    audienceNote: "Áp dụng cho nhà thuốc nhỏ",
    // isFeatured: true,
  },
  {
    id: "tieu_chuan" as PlanId,
    name: "Tiêu chuẩn",
    price: "1.800.000",
    billingCycle: "VNĐ/ năm",
    trialNote: "1 Trải nghiệm 1 năm",
    audienceNote: "Áp dụng cho nhà thuốc vừa",
  },
  {
    id: "linh_hoat" as PlanId,
    name: "Linh hoạt",
    price: "1.000.000",
    billingCycle: "VNĐ/ năm",
    trialNote: "1 Trải nghiệm 1 năm",
    audienceNote: "Áp dụng cho nhà thuốc lớn",
  },
  {
    id: "chuoi" as PlanId,
    name: "Chuỗi",
    price: "12.000.000",
    billingCycle: "VNĐ/ năm",
    trialNote: "( Trả theo năm )",
    audienceNote: "Áp dụng cho chuỗi nhà thuốc",
  },
];

// Dữ liệu cho các hàng (Features) - Phân cấp theo yêu cầu
export const featureCategories: FeatureCategory[] = [
  {
    title: "Thông tin gói",
    features: [
      {
        id: "users",
        name: "Số lượng tài khoản",
        values: {
          co_ban: "5,000 users",
          tieu_chuan: "10,000 users",
          linh_hoat: "20,000 users",
          chuoi: "20,000 users",
        },
      },
      {
        id: "storage",
        name: "Số lượng file storage",
        values: {
          co_ban: "2 GB file storage",
          tieu_chuan: "100 GB file storage",
          linh_hoat: "1 TB file storage",
          chuoi: "1 TB file storage",
        },
      },
      {
        id: "support_time",
        name: "Thời gian hỗ trợ",
        values: {
          co_ban: "Professional",
          tieu_chuan: "Professional",
          linh_hoat: "Professional",
          chuoi: "Professional",
        },
      },
      {
        id: "monitoring",
        name: "Giám sát, xử lý lỗi TTB",
        values: { co_ban: "No", tieu_chuan: "Yes", linh_hoat: "Yes", chuoi: "Yes" },
      },
      {
        id: "training",
        name: "Hướng dẫn sử dụng",
        values: {
          co_ban: "1 Admin",
          tieu_chuan: "5 Admin",
          linh_hoat: "20 Admin",
          chuoi: "20 Admin",
        },
      },
    ],
  },
  {
    title: "Tính năng cơ bản",
    features: [
      {
        id: "site_cdn",
        name: "Site/CDN",
        values: { co_ban: 5, tieu_chuan: 10, linh_hoat: 25, chuoi: 25 },
      },
      {
        id: "scrum_kanban",
        name: "Scrum and Kanban boards",
        values: { co_ban: true, tieu_chuan: true, linh_hoat: true, chuoi: true },
      },
      {
        id: "backlog",
        name: "Backlog",
        values: { co_ban: true, tieu_chuan: false, linh_hoat: true, chuoi: true },
      },
      {
        id: "basic_workflows",
        name: "Basic workflows",
        values: { co_ban: true, tieu_chuan: false, linh_hoat: true, chuoi: true },
      },
      {
        id: "apps_integrations",
        name: "Apps and integrations",
        values: { co_ban: true, tieu_chuan: false, linh_hoat: true, chuoi: true },
      },
      {
        id: "capacity_planning",
        name: "Capacity planning",
        values: { co_ban: true, tieu_chuan: false, linh_hoat: true, chuoi: true },
      },
      {
        id: "automation",
        name: "Automation",
        values: { co_ban: false, tieu_chuan: false, linh_hoat: true, chuoi: true },
      },
      {
        id: "roadmap",
        name: "Roadmap",
        values: { co_ban: false, tieu_chuan: false, linh_hoat: true, chuoi: true },
      },
      {
        id: "dependency_management",
        name: "Dependency management",
        values: { co_ban: false, tieu_chuan: false, linh_hoat: true, chuoi: true },
      },
      {
        id: "project_archiving",
        name: "Project archiving",
        values: { co_ban: false, tieu_chuan: false, linh_hoat: true, chuoi: true },
      },
    ],
  },
  {
    title: "Tính năng nâng cao",
    features: [
      {
        id: "domain_notification",
        name: "Domain notification & account capture",
        values: { co_ban: false, tieu_chuan: true, linh_hoat: true, chuoi: true },
      },
      {
        id: "session_duration",
        name: "Session duration management",
        values: { co_ban: false, tieu_chuan: true, linh_hoat: true, chuoi: true },
      },
      {
        id: "project_roles",
        name: "Project roles",
        values: { co_ban: false, tieu_chuan: true, linh_hoat: true, chuoi: true },
      },
      {
        id: "advanced_permissions",
        name: "Advanced permissions",
        values: { co_ban: false, tieu_chuan: true, linh_hoat: true, chuoi: true },
      },
      {
        id: "admin_insights",
        name: "Admin insights",
        values: { co_ban: false, tieu_chuan: true, linh_hoat: true, chuoi: true },
      },
      {
        id: "sandbox",
        name: "Sandbox",
        values: {
          co_ban: "coming_soon",
          tieu_chuan: "coming_soon",
          linh_hoat: "coming_soon",
          chuoi: "coming_soon",
        },
      },
      {
        id: "release_tracks",
        name: "Release tracks",
        values: {
          co_ban: "coming_soon",
          tieu_chuan: "coming_soon",
          linh_hoat: "coming_soon",
          chuoi: "coming_soon",
        },
      },
    ],
  },
  {
    title: "Tính năng dành cho chuỗi",
    features: [
      {
        id: "chain_sync",
        name: "Đồng bộ dữ liệu kho, doanh thu, nhân sự",
        values: { co_ban: false, tieu_chuan: false, linh_hoat: false, chuoi: true },
      },
      {
        id: "chain_transfer",
        name: "Điều chuyển thuốc giữa các chi nhánh",
        values: { co_ban: false, tieu_chuan: false, linh_hoat: false, chuoi: true },
      },
      {
        id: "sla",
        name: "So sánh doanh thu, sản phẩm bán chạy",
        values: {
          co_ban: "99.5%",
          tieu_chuan: "99.5%",
          linh_hoat: "99.5%",
          chuoi: "99.5%",
        },
      },
      {
        id: "inventory_forecast",
        name: "Dự báo xu hướng tiêu dùng",
        values: { co_ban: true, tieu_chuan: true, linh_hoat: true, chuoi: true },
      },
      {
        id: "staff_dispatch",
        name: "Điều phối nhân viên",
        values: {
          co_ban: "unlimited",
          tieu_chuan: "unlimited",
          linh_hoat: "unlimited",
          chuoi: "unlimited",
        },
      },
      {
        id: "market_check",
        name: "Quản lý giá kim toàn thị trường",
        values: { co_ban: true, tieu_chuan: true, linh_hoat: true, chuoi: true },
      },
      {
        id: "ip_allowlisting",
        name: "IP allowlisting",
        values: { co_ban: true, tieu_chuan: true, linh_hoat: true, chuoi: true },
      },
    ],
  },
];