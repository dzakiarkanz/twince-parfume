'use client';

import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';

// --- DEFINISI TYPE DATA (PROPS INTERFACE) ---
type NavBarProps = {
  cartCount: number;
  onSearchClick: () => void;
  onLoginClick: () => void;
  onCartClick: () => void;
};

type CollectionSectionProps = {
  products: Product[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onAddToCart: (product: Product) => void;
};

type QuizSectionProps = {
  answers: { step1: string; step2: string; step3: string };
  recommendedProduct: Product;
  onSelectOption: (step: 1 | 2 | 3, answer: string) => void;
  onRestartQuiz: () => void;
  onAddToCart: (productId: string) => void;
  onOrderWhatsApp: (product: Product) => void;
  onOpenQuiz: () => void;
};

type HeroSectionProps = {
  onOpenQuiz: () => void;
};

export function ToastContainer() {
  return <div id="toast-container" className="fixed top-5 right-5 z-50 flex max-w-sm w-full flex-col gap-3 pointer-events-none px-4" aria-live="polite" aria-atomic="true" />;
}

// 1. NAVBAR (Sekarang menggunakan Looping Menu & Animasi Garis Bawah Premium dari Tengah)
export function NavBar({ cartCount, onSearchClick, onLoginClick, onCartClick }: NavBarProps) {
  // Array menu navigasi agar tidak perlu menulis kode link berulang-ulang
  const menuItems = [
    { name: 'Koleksi', href: '#koleksi' },
    { name: 'Filosofi', href: '#philosophy' },
    { name: 'Scent Finder', href: '#quiz' },
    { name: 'Tentang', href: '#tentang' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 glass-nav transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex flex-col items-center transition-all duration-300 ease-in-out hover:opacity-80" aria-label="TWINCE home">
          <span className="font-serif text-2xl tracking-[0.25em] text-black font-bold">TWINCE</span>
          <span className="text-[8px] tracking-[0.5em] text-zinc-700 uppercase">Extrait De Parfum</span>
        </a>

        {/* --- TOMBOL NAVIGASI DENGAN MOTIF GARIS BEKERJA DARI TENGAH --- */}
        <div className="hidden md:flex items-center space-x-10 text-xs tracking-[0.2em] uppercase font-semibold">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-link text-zinc-200 hover:text-white relative py-1 focus:outline-none transition-all duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.38)] focus-visible:text-white focus-visible:after:scale-x-100"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 text-black">
          <button onClick={onLoginClick} id="login-btn" aria-label="Open login" className="nav-icon-btn nav-login-btn" type="button">
            <i className="fa-solid fa-user-large text-[15px]" />
          </button>

          <button onClick={onSearchClick} id="search-btn" aria-label="Search perfumes" className="nav-icon-btn" type="button">
            <i className="fa-solid fa-magnifying-glass text-lg" />
          </button>

          <button onClick={onCartClick} id="cart-btn" aria-label="Open cart" className="nav-icon-btn nav-cart-btn relative" type="button">
            <i className="fa-solid fa-bag-shopping text-xl" />
            <span id="cart-badge" className={`absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${cartCount > 0 ? 'scale-100' : 'scale-0'}`}>{cartCount}</span>
          </button>

          <ThemeToggle />

          <button id="mobile-menu-btn" aria-label="Open navigation menu" className="md:hidden transition-all duration-300 ease-in-out hover:opacity-70 hover:-translate-y-0.5 focus:outline-none" type="button">
            <i className="fa-solid fa-bars-staggered text-xl" />
          </button>
        </div>
      </div>
    </nav>
  );
}
export function MobileMenu() {
  return (
    <div id="mobile-menu" className="fixed inset-0 bg-white/95 backdrop-blur-md border-l border-black/15 z-50 transform translate-x-full transition-transform duration-500 ease-in-out flex flex-col justify-between p-8 md:hidden" aria-hidden="true">
      <div className="flex justify-between items-center">
        <span className="font-serif text-xl tracking-[0.2em] text-black">TWINCE</span>
        <button id="close-mobile-menu" aria-label="Close navigation menu" className="text-black text-2xl transition-all duration-300 ease-in-out hover:opacity-70" type="button">
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <div className="flex flex-col space-y-8 text-lg tracking-[0.15em] uppercase font-serif py-12">
        <a href="#koleksi" className="mobile-link text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white hover:shadow-lg hover:shadow-black/10 focus-visible:bg-black focus-visible:text-white">Koleksi</a>
        <a href="#philosophy" className="mobile-link text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white hover:shadow-lg hover:shadow-black/10 focus-visible:bg-black focus-visible:text-white">Filosofi</a>
        <a href="#quiz" className="mobile-link text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white hover:shadow-lg hover:shadow-black/10 focus-visible:bg-black focus-visible:text-white">Scent Finder</a>
        <a href="#tentang" className="mobile-link text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white hover:shadow-lg hover:shadow-black/10 focus-visible:bg-black focus-visible:text-white">Tentang</a>
      </div>
      <div className="border-t border-black pt-6 text-center text-xs tracking-wider text-zinc-700">&copy; 2026 TWINCE Perfumes. All rights reserved.</div>
    </div>
  );
}

export function HeroSection({ onOpenQuiz }: HeroSectionProps) {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=2000" className="hero-image-motion w-full h-full object-cover object-center filter brightness-[0.35] scale-105 transform-gpu" alt="Plain amber perfume bottle in a dark studio" loading="eager" decoding="async" fetchPriority="high" />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="ambient-blob absolute top-1/4 left-10 w-96 h-96 bg-white rounded-full blur-[120px] pointer-events-none transform-gpu" />
      <div className="ambient-blob blob-right absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-white rounded-full blur-[150px] pointer-events-none transform-gpu" />
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto mt-20">
        <p className="text-xs uppercase tracking-[0.4em] text-white font-bold mb-6 animate-fade-in-up">Karya Seni Aroma yang Abadi</p>
        <h1 className="font-serif text-5xl md:text-8xl text-white font-bold leading-tight tracking-wide mb-8">Definisikan <br className="hidden md:inline" /><span className="hero-accent italic font-light">Kharismamu</span></h1>
        <p className="text-sm md:text-lg text-white/90 font-light leading-relaxed max-w-2xl mx-auto mb-12 tracking-wide">Dibuat dengan ekstraksi bahan nabati premium dan diproduksi secara eksklusif. Setiap semprotan TWINCE bercerita tentang keanggunan, ambisi, dan kemewahan sejati.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#koleksi" className="group relative px-8 py-4 bg-black hover:bg-zinc-900 text-white border border-white/70 hover:border-white font-semibold tracking-[0.15em] text-xs uppercase rounded-full transition-all duration-300 ease-in-out active:scale-[0.98] overflow-hidden shadow-lg shadow-black/20 w-full sm:w-auto"><span className="hero-cta-primary-label relative z-10 flex items-center justify-center gap-2">Jelajahi Koleksi <i className="fa-solid fa-arrow-right transition-transform duration-300 ease-in-out group-hover:translate-x-1" /></span></a>
          <button onClick={onOpenQuiz} type="button" className="px-8 py-4 border border-white hover:border-white text-white hover:text-white font-semibold tracking-[0.15em] text-xs uppercase rounded-full transition-all duration-300 bg-transparent w-full sm:w-auto">Cari Scent Anda <i className="fa-solid fa-wand-magic-sparkles ml-1" /></button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/80">
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[2px] h-10 bg-white rounded-full relative overflow-hidden"><div className="hero-scroll-accent absolute top-0 left-0 w-full h-1/2 rounded-full animate-[bounce_2s_infinite]" /></div>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-20 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="relative flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl relative border border-black/15 backdrop-blur-sm">
            <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1200" alt="Amber dropper bottle for botanical fragrance extraction" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.3em] text-white font-medium">Bahan Organik Murni</span>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden aspect-square border border-black/15 backdrop-blur-sm"><img src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600" alt="Plain amber fragrance bottle detail" className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105" loading="lazy" decoding="async" /></div>
            <div className="rounded-xl overflow-hidden aspect-square border border-black/15 backdrop-blur-sm"><img src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600" alt="Dark glass vessel and warm fragrance atmosphere" className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105" loading="lazy" decoding="async" /></div>
          </div>
        </div>
        <div className="space-y-8 lg:pl-10">
          <div className="space-y-3"><span className="text-xs uppercase tracking-[0.24em] text-black font-bold block">Seni Formulasi</span><h2 className="font-serif text-3xl md:text-5xl text-black font-light leading-tight">Keajaiban Ekstraksi yang Presisi</h2></div>
          <p className="text-zinc-700 text-sm md:text-base leading-relaxed font-light">Di TWINCE, kami percaya bahwa parfum adalah bentuk seni tidak kasat mata yang paling kuat dalam menyampaikan kepribadian seseorang. Kami bekerja sama dengan petani lokal dari Grasse, Perancis, hingga perkebunan rempah nusantara untuk mengekstrak konsentrat murni terbaik.</p>
          <p className="text-zinc-700 text-sm md:text-base leading-relaxed font-light">Setiap botol melambangkan dedikasi ratusan jam pengerjaan, disaring dengan presisi kimia modern yang menjaga kemurnian dan daya tahan keharuman hingga 12 jam pemakaian.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-black flex-shrink-0"><i className="fa-solid fa-leaf text-sm" /></div><div><h4 className="font-serif text-black text-base mb-1">Cruelty Free & Vegan</h4><p className="text-xs text-zinc-700 font-light">Tanpa pengujian hewan dengan bahan botanical organik pilihan.</p></div></div>
            <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-black flex-shrink-0"><i className="fa-solid fa-droplet text-sm" /></div><div><h4 className="font-serif text-black text-base mb-1">Extrait De Parfum</h4><p className="text-xs text-zinc-700 font-light">Konsentrasi minyak wangi 30%+ untuk keharuman maksimal.</p></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. COLLECTION LINE (Sekarang menggambar produk murni menggunakan looping map React)
export function CollectionSection({ products, activeFilter, onFilterChange, onAddToCart }: CollectionSectionProps) {
  const filteredProducts = activeFilter === 'Semua'
    ? products
    : products.filter((p) => (p.scentType || '').toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="koleksi" className="relative bg-neutral-950 py-20 text-neutral-300 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="space-y-3"><span className="block text-xs font-bold uppercase tracking-[0.24em] text-amber-400">Signature Line</span><h2 className="font-serif text-3xl font-light text-white md:text-5xl">Koleksi Signature Kami</h2></div>
          <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3 text-xs tracking-[0.14em] md:gap-4 md:pb-2">
            {['Semua', 'Woody', 'Fresh', 'Floral'].map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                aria-pressed={activeFilter === filter}
                className={`filter-btn -mb-[10px] pb-2 uppercase transition-all duration-300 ease-in-out ${activeFilter === filter ? 'font-semibold text-amber-400' : 'text-neutral-500 hover:text-white'}`}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {filteredProducts.map((product, index) => (
            <div key={`${activeFilter}-${product.id}`} style={{ animationDelay: `${index * 55}ms` }}>
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BusinessAssuranceSection() {
  const assurances = [
    { title: '100% Original', copy: 'Setiap batch memiliki nomor SKU dan quality check sebelum dikirim.', icon: 'fa-shield-heart' },
    { title: 'Same-Day Response', copy: 'Admin WhatsApp aktif setiap hari 09:00 - 21:00 WIB untuk order dan konsultasi.', icon: 'fa-headset' },
    { title: 'Garansi Retur 7 Hari', copy: 'Jika botol bocor atau rusak saat tiba, kami kirim pengganti tanpa biaya tambahan.', icon: 'fa-rotate-left' },
    { title: 'Pengiriman Nasional', copy: 'Didukung kurir reguler dan instant untuk area tertentu dengan update resi real-time.', icon: 'fa-truck-fast' }
  ];

  return (
    <section id="kebijakan" className="py-20 md:py-24 bg-white border-y border-black/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-3 text-center">
          <span className="text-xs uppercase tracking-[0.24em] text-black font-bold block">Kepercayaan Pelanggan</span>
          <h2 className="font-serif text-3xl md:text-5xl text-black font-light">Belanja Nyaman Sejak Order Pertama</h2>
          <p className="text-zinc-700 text-sm md:text-base max-w-3xl mx-auto font-light">Semua fondasi penting untuk tahap rintis kami hadirkan: pengiriman jelas, retur transparan, support cepat, dan produk terverifikasi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {assurances.map((item) => (
            <article key={item.title} className="assurance-card rounded-2xl p-6">
              <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center mb-4">
                <i className={`fa-solid ${item.icon} text-black text-sm`} />
              </div>
              <h3 className="font-serif text-lg text-black mb-2">{item.title}</h3>
              <p className="text-xs text-zinc-700 leading-relaxed font-light">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3. PERSONAL SCENT QUIZ (Sekarang dikendalikan state wizard, bersih tanpa manipulasi ID hidden)
export function QuizSection({ answers, recommendedProduct, onSelectOption, onRestartQuiz, onAddToCart, onOrderWhatsApp, onOpenQuiz }: QuizSectionProps) {
  // Menentukan langkah kuis yang aktif berdasarkan data state answers
  const currentStep = !answers.step1 ? 'intro' : !answers.step2 ? 1 : !answers.step3 ? 2 : 3;

  const scentToneMap: Record<string, string> = {
    floral: '#D4A5A5',
    leaf: '#8FA89B',
    fresh: '#A2B9B1',
    sweet: '#E0A96D',
    woody: '#9C8470'
  };

  const recommendationTone = scentToneMap[(recommendedProduct.scentType || 'fresh').toLowerCase()] || '#E0A96D';

  return (
    <section id="quiz" className="py-28 md:py-32 bg-white border-y border-black relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.24em] text-black font-bold block">Personal Scent Quiz</span>
          <h2 className="font-serif text-3xl md:text-5xl text-black font-light">Temukan Scent Identitasmu</h2>
          <p className="text-zinc-700 text-sm max-w-xl mx-auto font-light">Jawab 3 pertanyaan sederhana dan algoritma pencocokan aroma kami akan merekomendasikan varian TWINCE yang sesuai dengan karaktermu.</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-black/15 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[350px] flex flex-col justify-center">
          
          {currentStep === 'intro' && (
            <div id="quiz-intro" className="space-y-8">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black border border-black mx-auto text-2xl"><i className="fa-solid fa-wand-magic-sparkles" /></div>
              <h3 className="font-serif text-2xl text-black">Mulai Pencarian Aroma Unikmu</h3>
              <p className="text-zinc-700 text-xs md:text-sm font-light max-w-md mx-auto">Kami akan menganalisis preferensi aktivitas, vibe, dan cuaca favorit Anda demi aroma yang benar-benar memikat.</p>
              <button onClick={onOpenQuiz} className="px-8 py-4 bg-black hover:bg-zinc-900 text-white font-bold tracking-[0.2em] text-xs uppercase rounded-full transition-all duration-300 ease-in-out active:scale-[0.98]" type="button">Mulai Kuis Sekarang</button>
            </div>
          )}

          {currentStep === 1 && (
            <div id="quiz-step-1" className="space-y-8">
              <span className="text-xs uppercase tracking-[0.3em] text-black font-semibold block">Pertanyaan 1 dari 3</span>
              <h3 className="font-serif text-2xl text-black">Di mana lokasi utama pemakaian parfum Anda?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <button onClick={() => onSelectOption(1, 'formal')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-briefcase text-lg text-black block mb-2" />Ngampus, Kantor / Harian</button>
                <button onClick={() => onSelectOption(1, 'romantic')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-heart text-lg text-black block mb-2" />Kencan Malam / Intim</button>
                <button onClick={() => onSelectOption(1, 'bold')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-champagne-glasses text-lg text-black block mb-2" />Pesta / Acara Spesial</button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div id="quiz-step-2" className="space-y-8">
              <span className="text-xs uppercase tracking-[0.3em] text-black font-semibold block">Pertanyaan 2 dari 3</span>
              <h3 className="font-serif text-2xl text-black">Karakter / Vibe apa yang paling mendeskripsikan diri Anda?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <button onClick={() => onSelectOption(2, 'fresh')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-wind text-lg text-black block mb-2" />Segar & Energetik</button>
                <button onClick={() => onSelectOption(2, 'warm')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-fire text-lg text-black block mb-2" />Hangat & Misterius</button>
                <button onClick={() => onSelectOption(2, 'elegant')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-crown text-lg text-black block mb-2" />Elegan & Klasik</button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div id="quiz-step-3" className="space-y-8">
              <span className="text-xs uppercase tracking-[0.3em] text-black font-semibold block">Pertanyaan 3 dari 3</span>
              <h3 className="font-serif text-2xl text-black">Suasana cuaca / Suhu lingkungan favorit Anda?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <button onClick={() => onSelectOption(3, 'cold')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-snowflake text-lg text-black block mb-2" />Dingin & Hujan</button>
                <button onClick={() => onSelectOption(3, 'tropical')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-sun text-lg text-black block mb-2" />Panas & Tropis</button>
                <button onClick={() => onSelectOption(3, 'cool')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-cloud-moon text-lg text-black block mb-2" />Sejuk Sore / Teduh</button>
              </div>
            </div>
          )}

          {answers.step1 && answers.step2 && answers.step3 && (
            <div id="quiz-result" className="space-y-6">
              <span className="text-xs uppercase tracking-[0.24em] text-black font-bold block">Rekomendasi Terbaik Anda</span>
              <div id="recommendation-card" className="flex flex-col md:flex-row items-center gap-8 text-left max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-black/15">
                <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden bg-white border border-black/15">
                  <img src={recommendedProduct.image} alt={recommendedProduct.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <span style={{ ['--scent-tone' as any]: recommendationTone }} className="scent-chip inline-flex items-center border px-2 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold text-black">{recommendedProduct.scentType} Profile</span>
                    <h4 className="font-serif text-3xl text-black font-semibold mt-1">{recommendedProduct.name}</h4>
                  </div>
                  <p className="text-xs text-zinc-700 font-light leading-relaxed">{recommendedProduct.desc}</p>
                  <div className="text-[11px] text-zinc-700"><strong>Aroma:</strong> {recommendedProduct.notes}</div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-black text-base">Rp {recommendedProduct.price.toLocaleString('id-ID')}</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => onAddToCart(recommendedProduct.id)} className="px-6 py-2 bg-black hover:bg-zinc-900 text-white font-bold rounded-full text-xs uppercase tracking-[0.14em] transition-all duration-300 ease-in-out active:scale-[0.98]">
                        Tambah <i className="fa-solid fa-cart-shopping ml-1" />
                      </button>
                      <button onClick={() => onOrderWhatsApp(recommendedProduct)} id="result-wa-order-btn" className="px-4 py-2 bg-transparent hover:bg-black hover:text-white border border-black/20 text-black rounded-full text-xs font-semibold tracking-[0.12em] transition-all duration-300 ease-in-out active:scale-[0.98]">
                        Order via WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onClick={onRestartQuiz} className="px-6 py-3 border border-black/20 hover:border-black text-zinc-700 hover:text-black text-xs uppercase tracking-[0.14em] rounded-full transition-all duration-300 ease-in-out active:scale-[0.98]" type="button">Ulangi Kuis</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-28 md:py-32 bg-white text-center relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-3 mb-12"><span className="text-xs uppercase tracking-[0.3em] text-black font-semibold block">Suara Pelanggan</span><h2 className="font-serif text-3xl md:text-5xl text-black font-light">Kisah Keharuman Mereka</h2></div>
        <div className="relative min-h-[250px] flex items-center justify-center">
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex justify-center text-black text-sm gap-1" aria-label="5 out of 5 stars"><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /><i className="fa-solid fa-star" /></div>
            <p className="font-serif text-lg md:text-xl text-black italic leading-relaxed">"Saya menggunakan varian IGNIS saat menghadiri malam gala. Begitu banyak orang yang bertanya apa merek parfum saya. Aromanya memancarkan kehangatan kayu yang sangat mahal dan berkelas!"</p>
            <div><h4 className="font-serif text-black text-sm tracking-wide font-semibold">Alexandra Devian</h4><p className="text-[10px] text-zinc-700 uppercase tracking-[0.2em] mt-1">Pengusaha Fashion, Jakarta</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer id="tentang" className="bg-white border-t border-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">
        <div className="space-y-6"><a href="#top" className="flex flex-col transition-all duration-300 ease-in-out hover:opacity-80" aria-label="TWINCE home"><span className="font-serif text-2xl tracking-[0.25em] text-black font-bold">TWINCE</span><span className="text-[8px] tracking-[0.5em] text-zinc-700 uppercase">Extrait De Parfum</span></a><p className="text-xs text-zinc-700 leading-relaxed font-light">Menghidupkan kemewahan penciuman dengan bahan alami berkualitas terbaik dan dedikasi artisanal tinggi.</p><div id="kontak" className="space-y-1 text-xs text-zinc-700"><p className="font-semibold text-black">Official Contact</p><a href="https://wa.me/6282123354047?text=Halo%20TWINCE%2C%20saya%20ingin%20berkonsultasi%20tentang%20parfum." target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-black">WhatsApp: +62 821-2335-4047</a><p>Email: hello@twince.id</p><p>Operasional: 09:00 - 21:00 WIB</p></div><div className="flex space-x-4 text-zinc-700"><a href="#" className="transition-all duration-300 ease-in-out hover:text-black hover:-translate-y-0.5" aria-label="Instagram"><i className="fa-brands fa-instagram text-lg" /></a><a href="#" className="transition-all duration-300 ease-in-out hover:text-black hover:-translate-y-0.5" aria-label="Facebook"><i className="fa-brands fa-facebook text-lg" /></a><a href="#" className="transition-all duration-300 ease-in-out hover:text-black hover:-translate-y-0.5" aria-label="TikTok"><i className="fa-brands fa-tiktok text-lg" /></a><a href="#" className="transition-all duration-300 ease-in-out hover:text-black hover:-translate-y-0.5" aria-label="YouTube"><i className="fa-brands fa-youtube text-lg" /></a></div></div>
        <div className="space-y-4"><h4 className="font-serif text-black text-sm tracking-[0.14em] font-semibold">Toko & Koleksi</h4><ul className="space-y-2 text-xs text-zinc-700"><li><a href="#koleksi" className="transition-all duration-300 ease-in-out hover:text-black">Signature Collection</a></li><li><a href="#quiz" className="transition-all duration-300 ease-in-out hover:text-black">Scent Finder</a></li><li><a href="#kebijakan" className="transition-all duration-300 ease-in-out hover:text-black">Garansi & Retur</a></li><li><a href="#kontak" className="transition-all duration-300 ease-in-out hover:text-black">Konsultasi Aroma</a></li></ul></div>
        <div className="space-y-4"><h4 className="font-serif text-black text-sm tracking-[0.14em] font-semibold">Layanan Pelanggan</h4><ul className="space-y-2 text-xs text-zinc-700"><li><a href="#kontak" className="transition-all duration-300 ease-in-out hover:text-black">Kontak Kami</a></li><li><a href="#kebijakan" className="transition-all duration-300 ease-in-out hover:text-black">Status Pengiriman</a></li><li><a href="#kebijakan" className="transition-all duration-300 ease-in-out hover:text-black">Kebijakan Pengembalian</a></li><li><a href="#kebijakan" className="transition-all duration-300 ease-in-out hover:text-black">Pertanyaan Umum (FAQ)</a></li><li><a href="#philosophy" className="transition-all duration-300 ease-in-out hover:text-black">Kisah Brand</a></li></ul></div>
        <div className="space-y-4 newsletter-cta-wrap"><h4 className="font-serif text-black text-sm tracking-[0.14em] font-semibold">Bergabung dalam Klub</h4><p className="text-xs text-zinc-700 leading-relaxed font-light">Dapatkan penawaran rilis pengumuman produk eksklusif dan undangan event TWINCE.</p><form onSubmit={(event) => { event.preventDefault(); const input = event.currentTarget.querySelector('input') as HTMLInputElement | null; if (!input) return; const container = document.getElementById('toast-container'); if (!container) return; const toast = document.createElement('div'); toast.className = 'flex items-center gap-3 p-4 bg-white border border-black/20 rounded-2xl shadow-2xl text-black text-sm transition-all duration-300 transform translate-y-5 opacity-0'; toast.innerHTML = `<div class="flex-shrink-0 text-lg"><i class="fa-solid fa-circle-check text-black"></i></div><div class="flex-1 font-light">Terima kasih! <strong>${input.value}</strong> telah didaftarkan dalam keanggotaan eksklusif kami.</div>`; container.appendChild(toast); requestAnimationFrame(() => toast.classList.remove('translate-y-5', 'opacity-0')); window.setTimeout(() => { toast.classList.add('opacity-0', 'scale-90'); window.setTimeout(() => toast.remove(), 300); }, 3500); input.value = ''; }} className="relative"><input type="email" required placeholder="Masukkan email Anda" className="w-full bg-white border border-black/20 text-xs px-4 py-3 pr-10 rounded-full focus:outline-none focus:border-black text-black transition-all duration-300 ease-in-out" /><button type="submit" className="absolute right-1 top-1 bottom-1 px-4 bg-black hover:bg-zinc-900 text-white text-xs font-bold rounded-full transition-all duration-300 ease-in-out active:scale-[0.98]">Join</button></form></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-black pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-700"><div>&copy; 2026 TWINCE Perfumes. Seluruh Hak Cipta Dilindungi. NIB: 1203240001</div><div className="flex space-x-6"><a href="#kebijakan" className="hover:text-black transition-colors">Syarat & Ketentuan</a><a href="#kebijakan" className="hover:text-black transition-colors">Kebijakan Privasi</a></div></div>
    </footer>
  );
}

export function FloatingWhatsApp({ waUrl }: { waUrl: string }) {
  return <a id="floating-wa" className="floating-wa" href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat via WhatsApp"><span className="floating-wa-label">Chat WhatsApp</span><span className="sr-only">Chat via WhatsApp</span><i className="fa-brands fa-whatsapp" aria-hidden="true" /></a>;
}

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const [showPyramid, setShowPyramid] = useState(false);
  const displayImage = product.imageUrl || product.image || '';
  const currentStock = product.stockQuantity ?? product.stock ?? 10;
  const isAvailable = currentStock > 0;
  const scentLabel = product.scentType || product.concentration || 'Signature';

  return (
    <article className="product-card filter-card-enter group flex h-full flex-col overflow-hidden rounded-sm border border-white/5 bg-neutral-950 text-neutral-300 shadow-2xl transition-colors duration-500 hover:border-amber-400/40 reveal-item is-visible">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
        <img
          src={displayImage}
          alt={product.name}
          className={`h-full w-full object-cover transition duration-700 ${showPyramid ? 'scale-105 brightness-[0.55]' : 'group-hover:scale-105 brightness-[0.72]'}`}
          loading="lazy"
          decoding="async"
        />
        {!showPyramid && (
          <span className="absolute left-5 top-5 z-10 border border-amber-400/50 bg-neutral-950/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-amber-400 backdrop-blur-sm">
            {scentLabel}
          </span>
        )}

        {showPyramid && (
          <div className="absolute inset-0 z-10 flex flex-col justify-center bg-black/60 px-6 py-8 backdrop-blur-[2px]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400">The Olfactive Pyramid</p>
            <dl className="space-y-2.5">
              {[
                ['Top Notes', product.aromaPyramid?.top || product.topNotes || '-'],
                ['Heart Notes', product.aromaPyramid?.heart || product.heartNotes || '-'],
                ['Base Notes', product.aromaPyramid?.base || product.baseNotes || '-']
              ].map(([label, value]) => (
                <div key={label} className="border-b border-white/10 pb-2 last:border-0">
                  <dt className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">{label}</dt>
                  <dd className="font-serif text-xs tracking-wide text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowPyramid(!showPyramid)}
          aria-expanded={showPyramid}
          className="absolute bottom-3 right-3 z-20 border border-white/30 bg-neutral-950/80 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:border-amber-400 hover:text-amber-400"
        >
          {showPyramid ? 'Lihat Botol' : 'Lihat Notes'}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl tracking-[0.08em] text-white">{product.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-xs text-amber-400" aria-label={`Rating ${product.rating} dari 5`}>
            <i className="fa-solid fa-star" />
            <span>{product.rating}</span>
          </span>
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-neutral-500">{product.concentration || 'Extrait de Parfum'} · 50ml / 1.7 FL. OZ.</p>
        <p className="mt-5 text-xs italic leading-relaxed text-neutral-400">{product.notes || [product.topNotes, product.heartNotes, product.baseNotes].filter(Boolean).join(', ')}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-300">{product.desc || `${product.name} Extrait de Parfum.`}</p>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/5 pt-6">
          <span className="font-serif text-lg text-white">Rp {product.price.toLocaleString('id-ID')}</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(">> TOMBOL ADD TO BAG DIKLIK:", product);
              addToCart(product);
              setIsCartOpen(true);
              onAddToCart?.(product);
            }}
            disabled={!isAvailable}
            className="relative z-30 pointer-events-auto cursor-pointer border border-white/20 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-200 transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-neutral-950 active:scale-95 active:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isAvailable ? '+ Add to Bag' : 'Unavailable'}
          </button>
        </div>
      </div>
    </article>
  );
}