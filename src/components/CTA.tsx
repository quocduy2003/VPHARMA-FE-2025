"use client";

export default function CTASection() {
  return (
    // <section className="container mx-auto px-4 py-20">
    //   <div className="rounded-2xl bg-ink p-12 text-center text-white">
    //     <h2 className="mb-6 text-h2 font-bold">
    //       Bắt Đầu Dùng Thử Miễn Phí Giải Pháp Quản
    //       <br />
    //       Lý Nhà Thuốc Ngay Hôm Nay
    //     </h2>
    //     <form className=" rounded-xl mx-auto flex max-w-md gap-3">
    //       <input
    //         type="email"
    //         placeholder="Nhập email của bạn"
    //         className="bg-white flex-1 rounded-xl px-4 py-3 text-ink focus:ring-2 focus:ring-primary"
    //       />
    //       <button
    //         type="submit"
    //         className="rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
    //       >
    //         Đăng ký
    //       </button>
    //     </form>
    //   </div>
    // </section>
    <section className="container mx-auto px-4 py-20">
          <div className="rounded-2xl bg-ink p-12 text-center text-white">
            <h2>Sẵn Sàng Số Hóa Nhà Thuốc Của Bạn?</h2>
            <p className="mx-auto text-h6 mt-4 max-w-1xl text-white/80">
              Trải nghiệm đầy đủ các tính năng ưu việt của V-Pharma hoàn toàn
              miễn phí trong 15 ngày. Không cần thẻ tín dụng.
            </p>
            <button className="mt-8 text-sub1 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:opacity-90">
              Đăng ký dùng thử
            </button>
          </div>
        </section>
  );
}
