'use client';

import ThemeToggle from './ThemeToggle';

type HomeActionHandlers = {
  onStartQuiz: () => void;
  onSelectOption: (step: 1 | 2 | 3, answer: string) => void;
  onRestartQuiz: () => void;
  onCheckout: () => void;
};

export function ToastContainer() {
  return <div id="toast-container" className="fixed top-5 right-5 z-50 flex max-w-sm w-full flex-col gap-3 pointer-events-none px-4" aria-live="polite" aria-atomic="true" />;
}

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 glass-nav transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex flex-col items-center transition-all duration-300 ease-in-out hover:opacity-80" aria-label="TWINCE home">
          <span className="font-serif text-2xl tracking-[0.25em] text-black font-bold">TWINCE</span>
          <span className="text-[8px] tracking-[0.5em] text-zinc-700 uppercase">Extrait De Parfume</span>
        </a>
        <div className="hidden md:flex items-center space-x-10 text-xs tracking-[0.2em] uppercase font-semibold">
          <a href="#koleksi" className="text-black transition-all duration-300 ease-in-out hover:opacity-70">Koleksi</a>
          <a href="#philosophy" className="text-black transition-all duration-300 ease-in-out hover:opacity-70">Filosofi</a>
          <a href="#quiz" className="text-black transition-all duration-300 ease-in-out hover:opacity-70">Scent Finder</a>
          <a href="#tentang" className="text-black transition-all duration-300 ease-in-out hover:opacity-70">Tentang</a>
        </div>
        <div className="flex items-center space-x-6 text-black">
          <button id="search-btn" aria-label="Search perfumes" className="transition-all duration-300 ease-in-out hover:opacity-70 hover:-translate-y-0.5 focus:outline-none" type="button">
            <i className="fa-solid fa-magnifying-glass text-lg" />
          </button>
          <button id="cart-btn" aria-label="Open cart" className="relative transition-all duration-300 ease-in-out hover:opacity-70 hover:-translate-y-0.5 focus:outline-none" type="button">
            <i className="fa-solid fa-bag-shopping text-xl" />
            <span id="cart-badge" className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center scale-0 transition-transform duration-300">0</span>
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
        <a href="#koleksi" className="mobile-link text-black transition-all duration-300 ease-in-out hover:opacity-70">Koleksi</a>
        <a href="#philosophy" className="mobile-link text-black transition-all duration-300 ease-in-out hover:opacity-70">Filosofi</a>
        <a href="#quiz" className="mobile-link text-black transition-all duration-300 ease-in-out hover:opacity-70">Scent Finder</a>
        <a href="#tentang" className="mobile-link text-black transition-all duration-300 ease-in-out hover:opacity-70">Tentang</a>
      </div>
      <div className="border-t border-black pt-6 text-center text-xs tracking-wider text-zinc-700">&copy; 2026 TWINCE Perfumes. All rights reserved.</div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover object-center filter brightness-[0.35] scale-105 transform motion-safe:animate-[pulse_10s_infinite]" alt="Luxury Perfume Bottle Aesthetic" onError={(event) => { (event.currentTarget as HTMLImageElement).src = 'https://placehold.co/1920x1080/111/fff?text=TWINCE+Aesthetic'; }} />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="ambient-blob absolute top-1/4 left-10 w-96 h-96 bg-white rounded-full blur-[120px] pointer-events-none" />
      <div className="ambient-blob blob-right absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-white rounded-full blur-[150px] pointer-events-none" />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
        <p className="text-xs uppercase tracking-[0.4em] text-white font-bold mb-6 animate-fade-in-up">Karya Seni Aroma yang Abadi</p>
        <h1 className="font-serif text-5xl md:text-8xl text-white font-bold leading-tight tracking-wide mb-8">Definisikan <br className="hidden md:inline" /><span className="hero-accent italic font-light">Kharismamu</span></h1>
        <p className="text-sm md:text-lg text-white/90 font-light leading-relaxed max-w-2xl mx-auto mb-12 tracking-wide">Dibuat dengan ekstraksi bahan nabati premium dan diproduksi secara eksklusif. Setiap semprotan TWINCE bercerita tentang keanggunan, ambisi, dan kemewahan sejati.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#koleksi" className="group relative px-8 py-4 bg-black hover:bg-zinc-900 text-white font-semibold tracking-[0.15em] text-xs uppercase rounded-full transition-all duration-300 ease-in-out active:scale-[0.98] overflow-hidden shadow-lg shadow-black/20 w-full sm:w-auto"><span className="relative z-10 flex items-center justify-center gap-2">Jelajahi Koleksi <i className="fa-solid fa-arrow-right transition-transform duration-300 ease-in-out group-hover:translate-x-1" /></span></a>
          <a href="#quiz" className="px-8 py-4 border border-white hover:border-white text-white hover:text-white font-semibold tracking-[0.15em] text-xs uppercase rounded-full transition-all duration-300 bg-transparent w-full sm:w-auto">Cari Scent Anda <i className="fa-solid fa-wand-magic-sparkles ml-1" /></a>
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
    <section id="philosophy" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl relative border border-black/15 backdrop-blur-sm">
            <img src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=1200" alt="Fine Crafting Perfume Ingredients" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" onError={(event) => { (event.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x450/222/aaa?text=Organic+Sourcing'; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.3em] text-black font-medium">Bahan Organik Murni</span>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden aspect-square border border-black/15 backdrop-blur-sm"><img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600" alt="Luxury Glass Bottle Detail" className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105" onError={(event) => { (event.currentTarget as HTMLImageElement).src = 'https://placehold.co/300x300/222/aaa?text=Minimalist+Design'; }} /></div>
            <div className="rounded-xl overflow-hidden aspect-square border border-black/15 backdrop-blur-sm"><img src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600" alt="Exquisite Perfume Extraction" className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105" onError={(event) => { (event.currentTarget as HTMLImageElement).src = 'https://placehold.co/300x300/222/aaa?text=Crowning+Scent'; }} /></div>
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

export function CollectionSection() {
  return (
    <section id="koleksi" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3"><span className="text-xs uppercase tracking-[0.24em] text-black font-bold block">Signature Line</span><h2 className="font-serif text-3xl md:text-5xl text-black font-light">Koleksi Signature Kami</h2></div>
          <div className="flex items-center gap-4 text-xs tracking-[0.14em] border-b border-black/15 pb-2">
            <button className="filter-btn text-black border-b border-black pb-2 -mb-[10px] uppercase font-semibold transition-all duration-300 ease-in-out" type="button">Semua</button>
            <button className="filter-btn text-zinc-700 hover:text-black pb-2 -mb-[10px] uppercase transition-all duration-300 ease-in-out" type="button">Woody</button>
            <button className="filter-btn text-zinc-700 hover:text-black pb-2 -mb-[10px] uppercase transition-all duration-300 ease-in-out" type="button">Fresh</button>
            <button className="filter-btn text-zinc-700 hover:text-black pb-2 -mb-[10px] uppercase transition-all duration-300 ease-in-out" type="button">Floral</button>
          </div>
        </div>
        <div id="product-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" />
      </div>
    </section>
  );
}

export function QuizSection({ onStartQuiz, onSelectOption, onRestartQuiz }: Pick<HomeActionHandlers, 'onStartQuiz' | 'onSelectOption' | 'onRestartQuiz'>) {
  return (
    <section id="quiz" className="py-24 bg-white border-y border-black relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.24em] text-black font-bold block">Personal Scent Quiz</span>
          <h2 className="font-serif text-3xl md:text-5xl text-black font-light">Temukan Scent Identitasmu</h2>
          <p className="text-zinc-700 text-sm max-w-xl mx-auto font-light">Jawab 3 pertanyaan sederhana dan algoritma pencocokan aroma kami akan merekomendasikan varian TWINCE yang sesuai dengan karaktermu.</p>
        </div>
        <div className="bg-white/90 backdrop-blur-sm border border-black/15 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[350px] flex flex-col justify-center">
          <div id="quiz-intro" className="space-y-8">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black border border-black mx-auto text-2xl"><i className="fa-solid fa-wand-magic-sparkles" /></div>
            <h3 className="font-serif text-2xl text-black">Mulai Pencarian Aroma Unikmu</h3>
            <p className="text-zinc-700 text-xs md:text-sm font-light max-w-md mx-auto">Kami akan menganalisis preferensi aktivitas, vibe, dan cuaca favorit Anda demi aroma yang benar-benar memikat.</p>
            <button onClick={onStartQuiz} className="px-8 py-4 bg-black hover:bg-zinc-900 text-white font-bold tracking-[0.2em] text-xs uppercase rounded-full transition-all duration-300 ease-in-out active:scale-[0.98]" type="button">Mulai Kuis Sekarang</button>
          </div>
          <div id="quiz-step-1" className="hidden space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-black font-semibold block">Pertanyaan 1 dari 3</span>
            <h3 className="font-serif text-2xl text-black">Di mana lokasi utama pemakaian parfum Anda?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <button onClick={() => onSelectOption(1, 'formal')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-briefcase text-lg text-black block mb-2" />Ngampus, Kantor / Harian</button>
              <button onClick={() => onSelectOption(1, 'romantic')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-heart text-lg text-black block mb-2" />Kencan Malam / Intim</button>
              <button onClick={() => onSelectOption(1, 'bold')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-champagne-glasses text-lg text-black block mb-2" />Pesta / Acara Spesial</button>
            </div>
          </div>
          <div id="quiz-step-2" className="hidden space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-black font-semibold block">Pertanyaan 2 dari 3</span>
            <h3 className="font-serif text-2xl text-black">Karakter / Vibe apa yang paling mendeskripsikan diri Anda?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <button onClick={() => onSelectOption(2, 'fresh')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-wind text-lg text-black block mb-2" />Segar & Energetik</button>
              <button onClick={() => onSelectOption(2, 'warm')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-fire text-lg text-black block mb-2" />Hangat & Misterius</button>
              <button onClick={() => onSelectOption(2, 'elegant')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-crown text-lg text-black block mb-2" />Elegan & Klasik</button>
            </div>
          </div>
          <div id="quiz-step-3" className="hidden space-y-8">
            <span className="text-xs uppercase tracking-[0.3em] text-black font-semibold block">Pertanyaan 3 dari 3</span>
            <h3 className="font-serif text-2xl text-black">Suasana cuaca / Suhu lingkungan favorit Anda?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <button onClick={() => onSelectOption(3, 'cold')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-snowflake text-lg text-black block mb-2" />Dingin & Hujan</button>
              <button onClick={() => onSelectOption(3, 'tropical')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-sun text-lg text-black block mb-2" />Panas & Tropis</button>
              <button onClick={() => onSelectOption(3, 'cool')} className="quiz-option p-4 border border-black/15 hover:border-black/30 bg-white hover:bg-black/[0.02] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:scale-[0.98] text-black text-sm font-medium" type="button"><i className="fa-solid fa-cloud-moon text-lg text-black block mb-2" />Sejuk Sore / Teduh</button>
            </div>
          </div>
          <div id="quiz-result" className="hidden space-y-6">
            <span className="text-xs uppercase tracking-[0.24em] text-black font-bold block">Rekomendasi Terbaik Anda</span>
            <div id="recommendation-card" className="flex flex-col md:flex-row items-center gap-8 text-left max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-black/15" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={onRestartQuiz} className="px-6 py-3 border border-black/20 hover:border-black text-zinc-700 hover:text-black text-xs uppercase tracking-[0.14em] rounded-full transition-all duration-300 ease-in-out active:scale-[0.98]" type="button">Ulangi Kuis</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white text-center relative">
      <div className="max-w-4xl mx-auto px-6">
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

export function CartDrawer({ onCheckout }: Pick<HomeActionHandlers, 'onCheckout'>) {
  return (
    <div id="cart-drawer" className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <div id="cart-backdrop" className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 ease-in-out pointer-events-none" />
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div id="cart-panel" className="w-screen max-w-md bg-white border-l border-black pointer-events-auto transform translate-x-full transition-transform duration-500 ease-in-out flex flex-col justify-between shadow-2xl">
          <div className="px-6 py-6 border-b border-black flex items-center justify-between"><h3 className="font-serif text-lg text-black tracking-wide flex items-center gap-2"><i className="fa-solid fa-bag-shopping text-black" /> Keranjang Belanja</h3><button id="close-cart-btn" aria-label="Close cart" className="text-zinc-700 hover:text-black text-xl" type="button"><i className="fa-solid fa-xmark" /></button></div>
          <div id="cart-items-container" className="flex-1 overflow-y-auto p-6 space-y-4" />
          <div className="p-6 border-t border-black/15 space-y-6 bg-white/90 backdrop-blur-sm">
            <div className="flex justify-between text-sm tracking-wide"><span className="text-zinc-700">Subtotal:</span><span id="cart-subtotal" className="font-bold text-black">Rp 0</span></div>
            <p className="text-[10px] text-zinc-700 leading-normal">Estimasi biaya pengiriman dan pajak dihitung pada saat penyelesaian transaksi pembayaran berikutnya.</p>
            <button onClick={onCheckout} className="w-full py-4 bg-black hover:bg-zinc-900 text-white font-bold tracking-[0.2em] text-xs uppercase rounded-full transition-all duration-300 ease-in-out active:scale-[0.98]" type="button">Proses Pembayaran</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FooterSection() {
  return (
    <footer id="tentang" className="bg-white border-t border-black pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6"><a href="#top" className="flex flex-col transition-all duration-300 ease-in-out hover:opacity-80" aria-label="TWINCE home"><span className="font-serif text-2xl tracking-[0.25em] text-black font-bold">TWINCE</span><span className="text-[8px] tracking-[0.5em] text-zinc-700 uppercase">Extrait De Parfume</span></a><p className="text-xs text-zinc-700 leading-relaxed font-light">Menghidupkan kemewahan penciuman dengan bahan alami berkualitas terbaik dan dedikasi artisanal tinggi.</p><div className="flex space-x-4 text-zinc-700"><a href="#" className="transition-all duration-300 ease-in-out hover:text-black hover:-translate-y-0.5" aria-label="Instagram"><i className="fa-brands fa-instagram text-lg" /></a><a href="#" className="transition-all duration-300 ease-in-out hover:text-black hover:-translate-y-0.5" aria-label="Facebook"><i className="fa-brands fa-facebook text-lg" /></a><a href="#" className="transition-all duration-300 ease-in-out hover:text-black hover:-translate-y-0.5" aria-label="TikTok"><i className="fa-brands fa-tiktok text-lg" /></a><a href="#" className="transition-all duration-300 ease-in-out hover:text-black hover:-translate-y-0.5" aria-label="YouTube"><i className="fa-brands fa-youtube text-lg" /></a></div></div>
        <div className="space-y-4"><h4 className="font-serif text-black text-sm tracking-[0.14em] font-semibold">Toko & Koleksi</h4><ul className="space-y-2 text-xs text-zinc-700"><li><a href="#" className="transition-all duration-300 ease-in-out hover:text-black">Extrait De Parfum</a></li><li><a href="#" className="transition-all duration-300 ease-in-out hover:text-black">Eau De Parfum</a></li><li><a href="#" className="transition-all duration-300 ease-in-out hover:text-black">Home Fragrance</a></li><li><a href="#" className="transition-all duration-300 ease-in-out hover:text-black">Edisi Terbatas</a></li></ul></div>
        <div className="space-y-4"><h4 className="font-serif text-black text-sm tracking-[0.14em] font-semibold">Layanan Pelanggan</h4><ul className="space-y-2 text-xs text-zinc-700"><li><a href="#" className="transition-all duration-300 ease-in-out hover:text-black">Kontak Kami</a></li><li><a href="#" className="transition-all duration-300 ease-in-out hover:text-black">Status Pengiriman</a></li><li><a href="#" className="transition-all duration-300 ease-in-out hover:text-black">Kebijakan Pengembalian</a></li><li><a href="#" className="transition-all duration-300 ease-in-out hover:text-black">Pertanyaan Umum (FAQ)</a></li></ul></div>
        <div className="space-y-4 newsletter-cta-wrap"><h4 className="font-serif text-black text-sm tracking-[0.14em] font-semibold">Bergabung dalam Klub</h4><p className="text-xs text-zinc-700 leading-relaxed font-light">Dapatkan penawaran rilis produk eksklusif dan undangan event TWINCE.</p><form onSubmit={(event) => { event.preventDefault(); const input = event.currentTarget.querySelector('input') as HTMLInputElement | null; if (!input) return; const container = document.getElementById('toast-container'); if (!container) return; const toast = document.createElement('div'); toast.className = 'flex items-center gap-3 p-4 bg-white border border-black/20 rounded-2xl shadow-2xl text-black text-sm transition-all duration-300 transform translate-y-5 opacity-0'; toast.innerHTML = `<div class="flex-shrink-0 text-lg"><i class="fa-solid fa-circle-check text-black"></i></div><div class="flex-1 font-light">Terima kasih! <strong>${input.value}</strong> telah didaftarkan dalam keanggotaan eksklusif kami.</div>`; container.appendChild(toast); requestAnimationFrame(() => toast.classList.remove('translate-y-5', 'opacity-0')); window.setTimeout(() => { toast.classList.add('opacity-0', 'scale-90'); window.setTimeout(() => toast.remove(), 300); }, 3500); input.value = ''; }} className="relative"><input type="email" required placeholder="Masukkan email Anda" className="w-full bg-white border border-black/20 text-xs px-4 py-3 pr-10 rounded-full focus:outline-none focus:border-black text-black transition-all duration-300 ease-in-out" /><button type="submit" className="absolute right-1 top-1 bottom-1 px-4 bg-black hover:bg-zinc-900 text-white text-xs font-bold rounded-full transition-all duration-300 ease-in-out active:scale-[0.98]">Join</button></form></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-black pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-700"><div>&copy; 2026 TWINCE Perfumes. Seluruh Hak Cipta Dilindungi.</div><div className="flex space-x-6"><a href="#" className="hover:text-black transition-colors">Syarat & Ketentuan</a><a href="#" className="hover:text-black transition-colors">Kebijakan Privasi</a></div></div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return <a id="floating-wa" className="floating-wa" href="#" target="_blank" rel="noopener noreferrer" aria-label="Chat via WhatsApp"><span className="floating-wa-label">Chat WhatsApp</span><span className="sr-only">Chat via WhatsApp</span><i className="fa-brands fa-whatsapp" aria-hidden="true" /></a>;
}