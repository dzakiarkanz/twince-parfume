'use client';

import { useState, useEffect } from 'react';
import { 
  CollectionSection, 
  FloatingWhatsApp, 
  FooterSection, 
  HeroSection, 
  MobileMenu, 
  NavBar, 
  PhilosophySection, 
  BusinessAssuranceSection,
  QuizSection, 
  TestimonialsSection, 
  ToastContainer 
} from './components/HomeSection';
import CartDrawer from './components/CartDrawer';
import { useCart } from './context/CartContext';
import type { Product } from './types/product';

type AnalyticsEventName =
  | 'search_click'
  | 'login_click'
  | 'filter_products'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'generate_lead';

type Ga4Event = {
  name: string;
  params: Record<string, unknown>;
};

const GA4_EVENT_MAP: Record<AnalyticsEventName, (payload: Record<string, unknown>) => Ga4Event> = {
  search_click: () => ({
    name: 'search',
    params: {
      search_term: 'TWINCE perfume'
    }
  }),
  login_click: () => ({
    name: 'login',
    params: {
      method: 'member_button'
    }
  }),
  filter_products: (payload) => ({
    name: 'view_item_list',
    params: {
      item_list_name: String(payload.filter ?? 'Semua'),
      item_list_id: `collection_${String(payload.filter ?? 'semua').toLowerCase()}`,
      items: payload.items ?? []
    }
  }),
  add_to_cart: (payload) => ({
    name: 'add_to_cart',
    params: {
      currency: 'IDR',
      value: payload.price ?? 0,
      items: [
        {
          item_id: payload.productId,
          item_name: payload.productName,
          item_category: payload.scentType,
          price: payload.price,
          quantity: 1
        }
      ]
    }
  }),
  begin_checkout: (payload) => ({
    name: 'begin_checkout',
    params: {
      currency: 'IDR',
      value: payload.subtotal ?? 0,
      items: payload.items ?? []
    }
  }),
  generate_lead: (payload) => ({
    name: 'generate_lead',
    params: {
      method: String(payload.method ?? 'unknown'),
      currency: payload.currency ?? 'IDR',
      value: payload.value ?? 0,
      items: payload.items ?? []
    }
  })
};

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'AÉTHER',
    sku: 'TW-ATH-01',
    scentType: 'Fresh',
    notes: 'Bergamot, Marine Accord, White Musk',
    price: 1350000,
    rating: 4.8,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=85&w=800&h=800',
    desc: 'Aroma udara pagi pesisir pantai yang bersih, dipadu kesegaran citrus murni untuk jiwa yang berenergi bebas.',
    aromaPyramid: {
      top: 'Bergamot, Lemon Zest',
      heart: 'Marine Accord, Neroli',
      base: 'White Musk, Driftwood'
    }
  },
  {
    id: 'p2',
    name: 'IGNIS',
    sku: 'TW-IGN-02',
    scentType: 'Woody',
    notes: 'Sandalwood, Spiced Cardamom, Vetiver',
    price: 1550000,
    rating: 4.9,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=85&w=800&h=800',
    desc: 'Reputasi kehangatan api malam hari yang dikelilingi hutan kayu cedar. Sangat elegan dan misterius.',
    aromaPyramid: {
      top: 'Spiced Cardamom, Pink Pepper',
      heart: 'Sandalwood, Cedarwood',
      base: 'Vetiver, Tonka Bean'
    }
  },
  {
    id: 'p3',
    name: 'NOX',
    sku: 'TW-NOX-03',
    scentType: 'Floral',
    notes: 'Black Jasmine, Midnight Orchid, Vanilla Oud',
    price: 1650000,
    rating: 5.0,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=85&w=800&h=800',
    desc: 'Aroma malam yang penuh rahasia dan daya pikat. Intensitas floral gelap yang memikat indra penciuman.',
    aromaPyramid: {
      top: 'Black Pepper, Bergamot',
      heart: 'Black Jasmine, Midnight Orchid',
      base: 'Vanilla Oud, Dark Amber'
    }
  },
  {
    id: 'p4',
    name: 'TERRA',
    sku: 'TW-TER-04',
    scentType: 'Woody',
    notes: 'Patchouli, Earthy Moss, Amberwood',
    price: 1400000,
    rating: 4.7,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&sat=-20&exp=-1&w=800&h=800',
    desc: 'Aroma tanah basah setelah hujan berpadu keanggunan lumut basah purba. Membumi dan menenangkan.',
    aromaPyramid: {
      top: 'Green Mandarin, Black Pepper',
      heart: 'Patchouli, Earthy Moss',
      base: 'Amberwood, Vetiver'
    }
  }
];

const QUIZ_DEFAULT = { step1: '', step2: '', step3: '' };

export default function Page() {
  // --- REACT STATES (Menggantikan Manipulasi DOM Manual) ---
  const { totalItems, addToCart: addProductToCart, setIsCartOpen } = useCart();
  const [quizAnswers, setQuizAnswers] = useState(QUIZ_DEFAULT);
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [waNumber, setWaNumber] = useState('6282123354047');

  useEffect(() => {
    // 1. Setup inisialisasi kelas animasi
    document.documentElement.classList.add('motion-ready');
    
    // 2. Ambil WA number dari dataset jika ada
    if (document.body.dataset.waNumber) {
      setWaNumber(document.body.dataset.waNumber);
    }

    // 3. Setup Reveal Intersection Observer
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section, footer').forEach((element, index) => {
      const target = element as HTMLElement;
      target.classList.add('reveal-item');
      target.style.setProperty('--reveal-delay', `${index * 20}ms`);
    });

    // Observe every reveal target, including product cards that already have `reveal-item`.
    document.querySelectorAll('.reveal-item').forEach((element) => {
      observer.observe(element);
    });

    // 4. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    let scrollRaf = 0;
    const handleScroll = () => {
      if (!nav) return;
      const shouldCompact = window.scrollY > 50;
      nav.classList.toggle('is-scrolled', shouldCompact);
    };

    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        handleScroll();
        scrollRaf = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf);
      }
      observer.disconnect();
    };
  }, []);

  // --- HELPER FUNCTIONS ---
  const buildWhatsAppUrl = (message: string) => {
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `flex items-center gap-3 p-4 bg-white border ${type === 'success' ? 'border-black' : 'border-red-500/30'} rounded-2xl shadow-2xl text-black text-sm transition-all duration-300 transform translate-y-5 opacity-0`;
    
    const icon = type === 'success'
      ? '<i class="fa-solid fa-circle-check text-black"></i>'
      : '<i class="fa-solid fa-triangle-exclamation text-red-400"></i>';

    toast.innerHTML = `
      <div class="flex-shrink-0 text-lg">${icon}</div>
      <div class="flex-1 font-light">${message}</div>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.remove('translate-y-5', 'opacity-0'));

    window.setTimeout(() => {
      toast.classList.add('opacity-0', 'scale-90');
      window.setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  const trackEvent = (eventName: AnalyticsEventName, payload: Record<string, unknown> = {}) => {
    try {
      window.dispatchEvent(new CustomEvent('twince:analytics', { detail: { eventName, payload, ts: Date.now() } }));
      const win = window as Window & { dataLayer?: Array<Record<string, unknown>> };
      if (win.dataLayer) {
        const mapped = GA4_EVENT_MAP[eventName](payload);
        win.dataLayer.push({ event: mapped.name, ...mapped.params });
      }
      if (typeof window.gtag === 'function') {
        const mapped = GA4_EVENT_MAP[eventName](payload);
        window.gtag('event', mapped.name, mapped.params);
      }
    } catch (error) {
      // noop
    }
  };

  // --- LOGIC HANDLERS ---
  const handleAddToCart = (product: Product) => {
    addProductToCart(product);
    showToast(`Berhasil menambahkan <strong>${product.name}</strong> ke keranjang.`);
    trackEvent('add_to_cart', { productId: product.id, productName: product.name, scentType: product.scentType, price: product.price });
  };

  const handleQuizAddToCart = (productId: string) => {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (product) handleAddToCart(product);
  };

  // --- QUIZ LOGIC ---
  const handleSelectOption = (step: 1 | 2 | 3, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [`step${step}`]: answer }));
  };

  const getRecommendedProduct = (): Product => {
    if (quizAnswers.step2 === 'warm' || quizAnswers.step1 === 'romantic') return PRODUCTS[1];
    if (quizAnswers.step1 === 'bold' || quizAnswers.step2 === 'elegant') return PRODUCTS[2];
    if (quizAnswers.step3 === 'cold' && quizAnswers.step2 !== 'fresh') return PRODUCTS[3];
    return PRODUCTS[0];
  };

  return (
    <>
      <ToastContainer />
      <NavBar
        cartCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => { showToast('Fitur pencarian eksklusif sedang dikembangkan.', 'info'); trackEvent('search_click'); }}
        onLoginClick={() => { trackEvent('login_click'); window.location.assign('/login'); }}
      />
      <MobileMenu />
      <HeroSection />
      <PhilosophySection />
      <BusinessAssuranceSection />
      
      {/* Kirim State dan fungsi Handler ke dalam komponen CollectionSection */}
      <CollectionSection 
        products={PRODUCTS} 
        activeFilter={activeFilter} 
        onFilterChange={(filter) => {
          setActiveFilter(filter);
          const filteredItems = PRODUCTS.filter((product) => filter === 'Semua' || product.scentType === filter).map((product) => ({
            item_id: product.id,
            item_name: product.name,
            item_category: product.scentType,
            price: product.price,
            quantity: 1
          }));
          trackEvent('filter_products', { filter, items: filteredItems });
        }} 
        onAddToCart={handleAddToCart}
      />
      
      {/* Kirim State dan fungsi Handler ke dalam komponen QuizSection */}
      <QuizSection 
        answers={quizAnswers}
        recommendedProduct={getRecommendedProduct()}
        onSelectOption={handleSelectOption}
        onRestartQuiz={() => setQuizAnswers(QUIZ_DEFAULT)}
        onAddToCart={handleQuizAddToCart}
        onOrderWhatsApp={(prod: Product) => {
          const msg = [`Halo Kak, saya mau order parfum ${prod.name}.`, `Varian: ${prod.name} - Rp ${prod.price.toLocaleString('id-ID')}`, 'Rekomendasi dari Scent Finder di website TWINCE.'].join('\n');
          window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
        }}
      />
      
      <TestimonialsSection />
      
      <CartDrawer />
      
      <FooterSection />
      <FloatingWhatsApp waUrl={buildWhatsAppUrl('Halo, saya tertarik dengan parfum TWINCE. Bisa bantu info dan pemesanan?')} />
    </>
  );
}