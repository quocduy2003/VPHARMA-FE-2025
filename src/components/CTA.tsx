"use client";

export default function CTASection() {
  return (
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
