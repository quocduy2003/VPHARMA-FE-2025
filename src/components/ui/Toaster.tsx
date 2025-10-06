"use client";
import { useEffect, useState } from "react";

type Toast = { id: string; title: string; meta?: string };

export default function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (e: any) => {
      const id = crypto.randomUUID();
      const t = { id, title: e.detail?.title ?? "Thông báo", meta: e.detail?.meta };
      setItems((s) => [t, ...s]);
      setTimeout(() => remove(id), 4000);
    };
    const remove = (id: string) => setItems((s) => s.filter((i) => i.id !== id));
    const on = (ev: Event) => handler(ev);
    window.addEventListener("toast:add", on as any);
    return () => window.removeEventListener("toast:add", on as any);
  }, []);

  return (
    <div className="toast">
      {items.map((t) => (
        <div key={t.id} className="toast-item">
          <div className="toast-title">{t.title}</div>
          {t.meta && <div className="toast-meta">{t.meta}</div>}
        </div>
      ))}
    </div>
  );
}
