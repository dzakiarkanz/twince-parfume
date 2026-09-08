'use client';

import { useCart } from '../context/CartContext';

const WA_NUMBER = '6282123354047';

export default function CartDrawer() {
  const { cartItems, isCartOpen, totalPrice, totalItems, setIsCartOpen, updateQuantity, removeFromCart, clearCart } = useCart();
  const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

  const handleCheckout = () => {
    if (!cartItems.length) return;

    const name = window.prompt('Masukkan nama lengkap untuk pesanan');
    if (!name?.trim()) return;
    const phone = window.prompt('Masukkan nomor telepon yang dapat dihubungi');
    if (!phone?.trim()) return;
    const address = window.prompt('Masukkan alamat lengkap pengiriman');
    if (!address?.trim()) return;
    const cityPostalCode = window.prompt('Masukkan kota & kode pos');
    if (!cityPostalCode?.trim()) return;

    const lines = cartItems.map(({ product, quantity }) => (
      `- ${product.name} x${quantity} = ${formatPrice(product.price * quantity)}`
    ));
    const message = [
      'Halo Concierge TWINCE, saya ingin memesan Extrait de Parfum:',
      '',
      ...lines,
      '',
      `Total Tagihan: ${formatPrice(totalPrice)}`,
      '',
      'Format Pengiriman:',
      `Nama Lengkap: ${name.trim()}`,
      `No. HP: ${phone.trim()}`,
      `Alamat Pengiriman: ${address.trim()}`,
      `Kota & Kode Pos: ${cityPostalCode.trim()}`
    ].join('\n');

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className={`fixed inset-0 z-50 transition ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isCartOpen}>
      <button
        type="button"
        aria-label="Tutup keranjang"
        onClick={() => setIsCartOpen(false)}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] text-neutral-300 shadow-2xl transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`} aria-label="Keranjang belanja">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-amber-400">TWINCE</p>
            <h2 className="mt-1 font-serif text-2xl text-white">Keranjang Belanja</h2>
            <p className="mt-1 text-xs text-neutral-500">{totalItems} item{totalItems === 1 ? '' : 's'}</p>
          </div>
          <button type="button" onClick={() => setIsCartOpen(false)} aria-label="Tutup keranjang" className="text-2xl text-neutral-400 transition-colors hover:text-amber-400">
            <i className="fa-solid fa-xmark" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cartItems.length === 0 ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center gap-5 text-center">
              <i className="fa-solid fa-bag-shopping text-3xl text-neutral-600" />
              <p className="text-sm text-neutral-400">Keranjang Anda masih kosong</p>
              <button type="button" onClick={() => { setIsCartOpen(false); document.getElementById('koleksi')?.scrollIntoView({ behavior: 'smooth' }); }} className="border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-neutral-200 transition hover:border-amber-400 hover:text-amber-400">
                Jelajahi Koleksi
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map(({ product, quantity }) => (
                <article key={product.id} className="flex gap-4 border-b border-white/10 pb-5">
                  <img src={product.image} alt={product.name} className="h-24 w-20 shrink-0 object-cover brightness-75" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg text-white">{product.name}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-neutral-500">Extrait de Parfum · 50ml / 1.7 FL. OZ.</p>
                    <p className="mt-3 text-sm text-amber-400">{formatPrice(product.price)}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-white/10 text-sm">
                        <button type="button" aria-label={`Kurangi ${product.name}`} onClick={() => updateQuantity(product.id, -1)} className="px-3 py-1 text-neutral-400 transition hover:text-amber-400">-</button>
                        <span className="min-w-8 text-center text-neutral-200">{quantity}</span>
                        <button type="button" aria-label={`Tambah ${product.name}`} onClick={() => updateQuantity(product.id, 1)} className="px-3 py-1 text-neutral-400 transition hover:text-amber-400">+</button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(product.id)} className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 transition hover:text-red-400">Hapus</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <footer className="space-y-5 border-t border-white/10 bg-[#0a0a0a] px-6 py-6">
          <div className="flex items-center justify-between text-sm"><span className="text-neutral-400">Subtotal</span><strong className="font-serif text-xl text-white">{formatPrice(totalPrice)}</strong></div>
          <button type="button" disabled={!cartItems.length} onClick={handleCheckout} className="w-full border border-amber-400 bg-amber-400 px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-transparent hover:text-amber-400 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-neutral-900 disabled:text-neutral-600">
            Proses Pembayaran
          </button>
        </footer>
      </aside>
    </div>
  );
}
