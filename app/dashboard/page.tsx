'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type ProductSummary = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  sold: number;
  reorderPoint: number;
  price: number;
  scentType: string;
  orderStatus: 'Siap Kirim' | 'Perlu Restock' | 'Menunggu Konfirmasi';
};

const INITIAL_PRODUCTS: ProductSummary[] = [
  { id: 'p1', name: 'AÉTHER', sku: 'TW-ATH-01', stock: 12, sold: 18, reorderPoint: 5, price: 1350000, scentType: 'Fresh', orderStatus: 'Siap Kirim' },
  { id: 'p2', name: 'IGNIS', sku: 'TW-IGN-02', stock: 9, sold: 14, reorderPoint: 5, price: 1550000, scentType: 'Woody', orderStatus: 'Menunggu Konfirmasi' },
  { id: 'p3', name: 'NOX', sku: 'TW-NOX-03', stock: 6, sold: 22, reorderPoint: 5, price: 1650000, scentType: 'Floral', orderStatus: 'Perlu Restock' }
];

const INITIAL_ORDERS = [
  { id: '#TW-1001', customer: 'Alya', item: 'AÉTHER', qty: 2, status: 'Diproses' },
  { id: '#TW-1002', customer: 'Raka', item: 'IGNIS', qty: 1, status: 'Siap Dikirim' },
  { id: '#TW-1003', customer: 'Nadia', item: 'NOX', qty: 1, status: 'Menunggu Pembayaran' }
];

export default function DashboardPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedSku, setSelectedSku] = useState(INITIAL_PRODUCTS[0].sku);

  const activeProduct = useMemo(
    () => products.find((product) => product.sku === selectedSku) ?? products[0],
    [products, selectedSku]
  );

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalSold = products.reduce((sum, product) => sum + product.sold, 0);
  const lowStockCount = products.filter((product) => product.stock <= product.reorderPoint).length;
  const pendingEstimate = products.reduce((sum, product) => sum + Math.max(0, product.sold - product.reorderPoint), 0);

  const adjustStock = (productId: string, delta: number) => {
    setProducts((current) => current.map((product) => product.id === productId ? { ...product, stock: Math.max(0, product.stock + delta) } : product));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f8f7f2_100%)] text-black">
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Link href="/" className="font-serif text-2xl tracking-[0.28em] font-bold text-black">
              TWINCE
            </Link>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-700 mt-3">Stok & Order Dashboard</p>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="rounded-full border border-black/15 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition">
              Member Login
            </Link>
            <Link href="/" className="rounded-full bg-black px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-zinc-900 transition">
              Back to Store
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            ['Total Stok', totalStock],
            ['Total Terjual', totalSold],
            ['Pending Estimate', pendingEstimate],
            ['Low Stock SKU', lowStockCount]
          ].map(([label, value]) => (
            <article key={label as string} className="rounded-2xl border border-black/15 bg-white/90 p-6 shadow-lg">
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-700 block">{label as string}</span>
              <p className="mt-3 font-serif text-4xl text-black">{String(value)}</p>
            </article>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.35fr_0.95fr] gap-6">
          <section className="rounded-[2rem] border border-black/15 bg-white/95 shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.22em] font-bold text-black block">3 Varian Awal</span>
                <h2 className="font-serif text-3xl text-black font-light">Inventory Control</h2>
              </div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Local demo</span>
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="rounded-2xl border border-black/15 p-5 bg-white/90">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <button onClick={() => setSelectedSku(product.sku)} className="text-left">
                      <div className="flex items-center gap-3">
                        <h3 className="font-serif text-xl text-black">{product.name}</h3>
                        <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{product.sku}</span>
                      </div>
                      <p className="text-xs text-zinc-700 mt-2">{product.scentType} · Rp {product.price.toLocaleString('id-ID')}</p>
                      <p className="text-xs text-zinc-700 mt-1">Status order: <span className="font-semibold text-black">{product.orderStatus}</span></p>
                    </button>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Stok</div>
                        <div className="font-serif text-2xl text-black">{product.stock}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => adjustStock(product.id, 1)} className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] hover:bg-black hover:text-white transition">+ Restock</button>
                        <button onClick={() => adjustStock(product.id, -1)} className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] hover:bg-black hover:text-white transition">- Out</button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-black/10 overflow-hidden">
                    <div className={`h-full rounded-full ${product.stock <= product.reorderPoint ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, (product.stock / 15) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-black/15 bg-white/95 shadow-2xl p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-700 font-semibold">Quick Action</p>
              <h2 className="font-serif text-2xl font-light mt-2">{activeProduct.name}</h2>
              <p className="text-sm text-zinc-700 mt-3 leading-relaxed">
                Gunakan panel ini untuk simulasi stok. Kamu bisa tambah atau kurangi stok awal tanpa backend, cukup untuk operasional awal 3 varian.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button onClick={() => adjustStock(activeProduct.id, 1)} className="rounded-full bg-black text-white px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] hover:bg-zinc-900 transition">
                  + Stok
                </button>
                <button onClick={() => adjustStock(activeProduct.id, -1)} className="rounded-full border border-black/15 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] hover:bg-black hover:text-white transition">
                  - Stok
                </button>
              </div>
              <div className="mt-5 rounded-2xl bg-[#f7f7f4] border border-black/10 p-4 text-sm">
                <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-700">Detail</p>
                <p className="mt-2 font-semibold">{activeProduct.scentType}</p>
                <p className="text-zinc-700 mt-1">SKU {activeProduct.sku}</p>
                <p className="text-zinc-700">Stok {activeProduct.stock}</p>
                <p className="text-zinc-700">Terjual {activeProduct.sold}</p>
                <p className="text-zinc-700">Pending {Math.max(0, activeProduct.sold - activeProduct.reorderPoint)}</p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-black/15 bg-white/95 shadow-2xl p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-700 font-semibold">Order Feed</p>
              <h2 className="font-serif text-2xl font-light mt-2">Pesanan terbaru</h2>
              <div className="space-y-3 mt-5">
                {INITIAL_ORDERS.map((order) => (
                  <article key={order.id} className="rounded-2xl border border-black/10 bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{order.customer}</p>
                        <p className="text-xs text-zinc-700 mt-1">{order.item} x{order.qty}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] rounded-full border border-black/15 px-3 py-1">{order.status}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
