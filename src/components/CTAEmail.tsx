"use client";

export default function FaqSection() {
  return (
    <section className="bg-ink py-20 text-center text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-h2 font-bold">
          Bắt Đầu Dùng Thử Miễn Phí Giải Pháp Quản
          <br />
          Lý Nhà Thuốc Ngay Hôm Nay
        </h2>
        <form className=" rounded-xl mx-auto flex max-w-md gap-3">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="bg-white flex-1 rounded-xl px-4 py-3 text-ink focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </section>
  );
}
