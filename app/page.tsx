'use client';

import { useState, useEffect } from 'react';
import { 
  CartDrawer, 
  CollectionSection, 
  FloatingWhatsApp, 
  FooterSection, 
  HeroSection, 
  MobileMenu, 
  NavBar, 
  PhilosophySection, 
  QuizSection, 
  TestimonialsSection, 
  ToastContainer 
} from './components/HomeSection';

type Product = {
  id: string;
  name: string;
  scentType: string;
  notes: string;
  price: number;
  rating: number;
  image: string;
  desc: string;
};

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'AÉTHER',
    scentType: 'Fresh',
    notes: 'Bergamot, Marine Accord, White Musk',
    price: 1350000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    desc: 'Aroma udara pagi pesisir pantai yang bersih, dipadu kesegaran citrus murni untuk jiwa yang berenergi bebas.'
  },
  {
    id: 'p2',
    name: 'IGNIS',
    scentType: 'Woody',
    notes: 'Sandalwood, Spiced Cardamom, Vetiver',
    price: 1550000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
    desc: 'Reputasi kehangatan api malam hari yang dikelilingi hutan kayu cedar. Sangat elegan dan misterius.'
  },
  {
    id: 'p3',
    name: 'NOX',
    scentType: 'Floral',
    notes: 'Black Jasmine, Midnight Orchid, Vanilla Oud',
    price: 1650000,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=600',
    desc: 'Aroma malam yang penuh rahasia dan daya pikat. Intensitas floral gelap yang memikat indra penciuman.'
  },
  {
    id: 'p4',
    name: 'TERRA',
    scentType: 'Woody',
    notes: 'Patchouli, Earthy Moss, Amberwood',
    price: 1400000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600',
    desc: 'Aroma tanah basah setelah hujan berpadu keanggunan lumut basah purba. Membumi dan menenangkan.'
  }
];

const QUIZ_DEFAULT = { step1: '', step2: '', step3: '' };

export default function Page() {
  // --- REACT STATES (Menggantikan Manipulasi DOM Manual) ---
  const [cart, setCart] = useState<Array<{ product: Product; quantity: number }>>([]);
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
      observer.observe(target);
    });

    // 4. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    const handleScroll = () => {
      if (!nav) return;
      if (window.scrollY > 50) {
        nav.style.paddingTop = '0px';
        nav.style.paddingBottom = '0px';
      } else {
        nav.style.paddingTop = '10px';
        nav.style.paddingBottom = '10px';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  // --- LOGIC HANDLERS ---
  const addToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

    showToast(`Berhasil menambahkan <strong>${product.name}</strong> ke keranjang.`);
  };

  const updateCartQuantity = (productId: string, change: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + change;
          return newQty <= 0 ? null : { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean) as Array<{ product: Product; quantity: number }>;
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Keranjang belanja kosong. Harap tambahkan parfum terlebih dahulu.', 'info');
      return;
    }

    const name = window.prompt('Masukkan nama lengkap untuk pesanan (contoh: Budi Santoso)');
    if (!name) return;

    const address = window.prompt('Masukkan alamat / detail pengantaran (contoh: Kost X, Jl. Mawar 12)');
    if (!address) return;

    let subtotal = 0;
    const lines = cart.map((item) => {
      subtotal += item.product.price * item.quantity;
      return `- ${item.product.name} x${item.quantity} (Rp ${item.product.price.toLocaleString('id-ID')})`;
    });

    const message = [
      'Halo Kak, saya mau order parfum TWINCE.',
      `Nama: ${name}`,
      'Pesanan:',
      ...lines,
      `Subtotal: Rp ${subtotal.toLocaleString('id-ID')}`,
      `Alamat/Detail: ${address}`,
      'Mohon konfirmasi ketersediaan stok dan ongkir. Terima kasih.'
    ].join('\n');

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    setCart([]); // Kosongkan keranjang setelah checkout sukses
    document.getElementById('close-cart-btn')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
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
      <NavBar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onSearchClick={() => showToast('Fitur pencarian eksklusif sedang dikembangkan.', 'info')} />
      <MobileMenu />
      <HeroSection />
      <PhilosophySection />
      
      {/* Kirim State dan fungsi Handler ke dalam komponen CollectionSection */}
      <CollectionSection 
        products={PRODUCTS} 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
        onAddToCart={addToCart} 
      />
      
      {/* Kirim State dan fungsi Handler ke dalam komponen QuizSection */}
      <QuizSection 
        answers={quizAnswers}
        recommendedProduct={getRecommendedProduct()}
        onSelectOption={handleSelectOption}
        onRestartQuiz={() => setQuizAnswers(QUIZ_DEFAULT)}
        onAddToCart={addToCart}
        onOrderWhatsApp={(prod: Product) => {
          const msg = [`Halo Kak, saya mau order parfum ${prod.name}.`, `Varian: ${prod.name} - Rp ${prod.price.toLocaleString('id-ID')}`, 'Rekomendasi dari Scent Finder di website TWINCE.'].join('\n');
          window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
        }}
      />
      
      <TestimonialsSection />
      
      {/* Kirim Data Keranjang langsung ke Drawer */}
      <CartDrawer 
        cartItems={cart} 
        onUpdateQuantity={updateCartQuantity} 
        onCheckout={handleCheckout} 
      />
      
      <FooterSection />
      <FloatingWhatsApp waUrl={buildWhatsAppUrl('Halo, saya tertarik dengan parfum TWINCE. Bisa bantu info dan pemesanan?')} />
    </>
  );
}