// app/page.tsx
export default function HomePage() {
  return (
    <>
      <section
        id="hero"
        className="h-screen max-h-[1100px] bg-gradient-to-t from-blue-100 to-white overflow-y-clip"
      >
        <div className="container h-full w-full flex items-center justify-center flex-col text-center">
          <h6 className="capitalize">the Best Pharmacy Management System</h6>
          <h1>Vận Hành Nhà Thuốc Hiệu quả Cùng giải pháp v-pharma</h1>
          <div className="flex items-center justify-center">
            <div className="flex w-full max-w-xl rounded-full border border-primary/30 mt-9">
              <input
                className="h-10 flex-1 rounded-full bg-transparent px-4 text-sm outline-none"
                placeholder="Nhập email của bạn"
                type="email"
              />
              <button className="btn ">
                Bắt đầu
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="rounded-3xl bg-[#132a5a] px-6 py-8 shadow-2xl ring-1 ring-white/10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">
              Điều Gì Tạo Nên Sự Khác Biệt Của V-Pharma?
            </h2>
            <p className="mt-2 text-sm text-white/80">
              Giải pháp quản lý nhà thuốc toàn diện, tối ưu hóa quy trình
              vận hành và nâng cao hiệu quả kinh doanh.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* <!-- Card 1 --> */}
            <article className="group relative rounded-xl bg-white p-5 shadow-lg">
              <h3 className="text-center text-[15px] font-semibold text-gray-800">
                Nhà Thuốc/Quầy Thuốc
              </h3>
              <img
                src="/images/pharmacy-1.png"
                alt=""
                className="mx-auto my-4 h-24 w-24 object-contain"
              />
              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-100"
                >
                  Tìm hiểu thêm
                  <span className="text-sky-600">→</span>
                </a>
              </div>

              {/* glow under card */}
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-sky-400/20 to-transparent blur"></div>
            </article>

            {/* Card 2 */}
            <article className="group relative rounded-xl bg-white p-5 shadow-lg">
              <h3 className="text-center text-[15px] font-semibold text-gray-800">
                Chuỗi Nhà Thuốc
              </h3>
              <img
                src="/images/pharmacy-2.png"
                alt=""
                className="mx-auto my-4 h-24 w-24 object-contain"
              />
              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-100"
                >
                  Tìm hiểu thêm
                  <span className="text-sky-600">→</span>
                </a>
              </div>
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-sky-400/20 to-transparent blur"></div>
            </article>

            {/* Card 3 */}
            <article className="group relative rounded-xl bg-white p-5 shadow-lg">
              <h3 className="text-center text-[15px] font-semibold text-gray-800">
                Phòng Khám/Phòng Mạch
              </h3>
              <img
                src="/images/pharmacy-3.png"
                alt=""
                className="mx-auto my-4 h-24 w-24 object-contain"
              />
              <div className="flex justify-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-100"
                >
                  Tìm hiểu thêm
                  <span className="text-sky-600">→</span>
                </a>
              </div>
              <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-sky-400/20 to-transparent blur"></div>
            </article>
          </div>
        </div>
      </section>

    </>
  );
}
