'use client';

import { useEffect } from 'react';
import { CartDrawer, CollectionSection, FloatingWhatsApp, FooterSection, HeroSection, MobileMenu, NavBar, PhilosophySection, QuizSection, TestimonialsSection, ToastContainer } from './components/HomeSections';

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
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('motion-ready');

    let cart: Array<{ product: Product; quantity: number }> = [];
    let quizAnswers = { ...QUIZ_DEFAULT };

    const waNumber = document.body.dataset.waNumber || '6282123354047';
    const floatingWa = document.getElementById('floating-wa') as HTMLAnchorElement | null;
    const cartBadge = document.getElementById('cart-badge');
    const cartContainer = document.getElementById('cart-items-container');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const quizIntro = document.getElementById('quiz-intro');
    const quizStep1 = document.getElementById('quiz-step-1');
    const quizStep2 = document.getElementById('quiz-step-2');
    const quizStep3 = document.getElementById('quiz-step-3');
    const quizResult = document.getElementById('quiz-result');
    const recommendationCard = document.getElementById('recommendation-card');
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');

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

    const buildWhatsAppUrl = (message: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    const updateFloatingWa = () => {
      if (!floatingWa) return;
      floatingWa.href = buildWhatsAppUrl('Halo, saya tertarik dengan parfum TWINCE. Bisa bantu info dan pemesanan?');
    };

    const renderProducts = (filter = 'Semua') => {
      const grid = document.getElementById('product-grid');
      if (!grid) return;

      grid.innerHTML = '';

      const filteredProducts = filter === 'Semua'
        ? PRODUCTS
        : PRODUCTS.filter((product) => product.scentType.toLowerCase() === filter.toLowerCase());

      const rootStyles = getComputedStyle(document.documentElement);
      const scentToneMap: Record<string, string> = {
        floral: rootStyles.getPropertyValue('--accent-floral').trim() || '#D4A5A5',
        leaf: rootStyles.getPropertyValue('--accent-leaf').trim() || '#8FA89B',
        fresh: rootStyles.getPropertyValue('--accent-leaf-soft').trim() || '#A2B9B1',
        sweet: rootStyles.getPropertyValue('--accent-sweet').trim() || '#E0A96D',
        woody: rootStyles.getPropertyValue('--accent-woody').trim() || '#9C8470'
      };

      filteredProducts.forEach((product, index) => {
        const scentTone = scentToneMap[product.scentType.toLowerCase()] || '#E0A96D';
        const card = document.createElement('div');
        card.className = 'product-card group bg-white/90 backdrop-blur-sm border border-black/15 rounded-2xl overflow-hidden shadow-xl hover:border-black/30 transition-all duration-500 ease-in-out flex flex-col justify-between reveal-item';
        card.style.setProperty('--reveal-delay', `${index * 80}ms`);
        card.innerHTML = `
          <div>
            <div class="relative aspect-square overflow-hidden bg-white">
              <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.95]" onerror="this.src='https://placehold.co/400x400/222/aaa?text=${product.name}'">
              <span style="--scent-tone:${scentTone};" class="scent-chip absolute top-4 left-4 backdrop-blur-md border text-[10px] tracking-[0.22em] font-bold px-3 py-1 rounded-full uppercase">${product.scentType}</span>
            </div>
            <div class="p-6 space-y-3">
              <div class="flex justify-between items-center">
                <h3 class="font-serif text-xl text-black tracking-[0.06em]">${product.name}</h3>
                <div class="flex items-center text-black text-xs gap-1">
                  <i class="fa-solid fa-star"></i>
                  <span class="text-black font-semibold text-[11px]">${product.rating}</span>
                </div>
              </div>
              <p class="text-[11px] text-zinc-700 tracking-[0.1em] font-medium italic">${product.notes}</p>
              <p class="text-xs text-zinc-700 line-clamp-2 leading-relaxed font-light">${product.desc}</p>
            </div>
          </div>
          <div class="p-6 pt-0 border-t border-black/15 flex items-center justify-between mt-auto">
            <span class="font-bold text-black text-sm">Rp ${product.price.toLocaleString('id-ID')}</span>
            <button onclick="window.addToCart('${product.id}')" class="px-4 py-2 bg-white hover:bg-black text-black hover:text-white border border-black/20 hover:border-black rounded-full text-xs font-semibold tracking-[0.15em] transition-all duration-300 ease-in-out active:scale-[0.98] flex items-center gap-2">
              Add <i class="fa-solid fa-bag-shopping"></i>
            </button>
          </div>
        `;
        grid.appendChild(card);
      });
    };

    const updateCartUI = () => {
      if (!cartContainer || !cartBadge || !cartSubtotal) return;

      cartContainer.innerHTML = '';

      let totalItems = 0;
      let subtotal = 0;

      if (cart.length === 0) {
        cartContainer.innerHTML = `
          <div class="h-64 flex flex-col items-center justify-center text-zinc-700 text-center space-y-4">
            <i class="fa-solid fa-box-open text-4xl text-zinc-700"></i>
            <p class="text-sm font-light">Keranjang Anda masih kosong</p>
          </div>
        `;
      } else {
        cart.forEach((item) => {
          totalItems += item.quantity;
          subtotal += item.product.price * item.quantity;

          const row = document.createElement('div');
          row.className = 'flex gap-4 p-4 bg-white/90 backdrop-blur-sm border border-black/15 rounded-xl items-center';
          row.innerHTML = `
            <div class="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
              <img src="${item.product.image}" alt="${item.product.name}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-serif text-black text-sm font-medium truncate">${item.product.name}</h4>
              <p class="text-[10px] text-zinc-700 uppercase tracking-widest mt-1">${item.product.scentType}</p>
              <p class="text-xs font-semibold text-black mt-1">Rp ${item.product.price.toLocaleString('id-ID')}</p>
            </div>
            <div class="flex flex-col items-end gap-2">
              <div class="flex items-center border border-black/20 rounded-full bg-white">
                <button onclick="window.updateCartQuantity('${item.product.id}', -1)" class="px-2 py-1 text-xs text-zinc-700 hover:text-black transition-all duration-300 ease-in-out active:scale-95"><i class="fa-solid fa-minus"></i></button>
                <span class="px-2 text-xs font-bold text-black">${item.quantity}</span>
                <button onclick="window.updateCartQuantity('${item.product.id}', 1)" class="px-2 py-1 text-xs text-zinc-700 hover:text-black transition-all duration-300 ease-in-out active:scale-95"><i class="fa-solid fa-plus"></i></button>
              </div>
              <button onclick="window.updateCartQuantity('${item.product.id}', -${item.quantity})" class="text-[10px] text-zinc-700 hover:text-red-500 transition-all duration-300 ease-in-out uppercase tracking-[0.14em] font-semibold">Hapus</button>
            </div>
          `;
          cartContainer.appendChild(row);
        });
      }

      if (totalItems > 0) {
        cartBadge.innerText = String(totalItems);
        cartBadge.classList.remove('scale-0');
        cartBadge.classList.add('scale-100');
      } else {
        cartBadge.classList.add('scale-0');
        cartBadge.classList.remove('scale-100');
      }

      cartSubtotal.innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
    };

    const addToCart = (productId: string) => {
      const product = PRODUCTS.find((entry) => entry.id === productId);
      if (!product) return;

      const existingItem = cart.find((item) => item.product.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ product, quantity: 1 });
      }

      updateCartUI();
      showToast(`Berhasil menambahkan <strong>${product.name}</strong> ke keranjang.`);
    };

    const updateCartQuantity = (productId: string, change: number) => {
      const item = cart.find((entry) => entry.product.id === productId);
      if (!item) return;

      item.quantity += change;

      if (item.quantity <= 0) {
        cart = cart.filter((entry) => entry.product.id !== productId);
      }

      updateCartUI();
    };

    const startQuiz = () => {
      quizIntro?.classList.add('hidden');
      quizStep1?.classList.remove('hidden');
    };

    const selectOption = (step: 1 | 2 | 3, answer: string) => {
      quizAnswers = { ...quizAnswers, [`step${step}`]: answer } as typeof QUIZ_DEFAULT;
      document.getElementById(`quiz-step-${step}`)?.classList.add('hidden');

      if (step < 3) {
        document.getElementById(`quiz-step-${step + 1}`)?.classList.remove('hidden');
      } else {
        calculateQuizResult();
      }
    };

    const calculateQuizResult = () => {
      let recommendedProduct = PRODUCTS[0];

      if (quizAnswers.step2 === 'warm' || quizAnswers.step1 === 'romantic') {
        recommendedProduct = PRODUCTS[1];
      }
      if (quizAnswers.step1 === 'bold' || quizAnswers.step2 === 'elegant') {
        recommendedProduct = PRODUCTS[2];
      }
      if (quizAnswers.step3 === 'cold' && quizAnswers.step2 !== 'fresh') {
        recommendedProduct = PRODUCTS[3];
      }

      if (recommendationCard) {
        const rootStyles = getComputedStyle(document.documentElement);
        const scentToneMap: Record<string, string> = {
          floral: rootStyles.getPropertyValue('--accent-floral').trim() || '#D4A5A5',
          leaf: rootStyles.getPropertyValue('--accent-leaf').trim() || '#8FA89B',
          fresh: rootStyles.getPropertyValue('--accent-leaf-soft').trim() || '#A2B9B1',
          sweet: rootStyles.getPropertyValue('--accent-sweet').trim() || '#E0A96D',
          woody: rootStyles.getPropertyValue('--accent-woody').trim() || '#9C8470'
        };
        const recommendationTone = scentToneMap[recommendedProduct.scentType.toLowerCase()] || '#E0A96D';

        recommendationCard.innerHTML = `
          <div class="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden bg-white border border-black/15">
            <img src="${recommendedProduct.image}" alt="${recommendedProduct.name}" class="w-full h-full object-cover">
          </div>
          <div class="flex-1 space-y-4">
            <div>
              <span style="--scent-tone:${recommendationTone};" class="scent-chip inline-flex items-center border px-2 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold">${recommendedProduct.scentType} Profile</span>
              <h4 class="font-serif text-3xl text-black font-semibold mt-1">${recommendedProduct.name}</h4>
            </div>
            <p class="text-xs text-zinc-700 font-light leading-relaxed">${recommendedProduct.desc}</p>
            <div class="text-[11px] text-zinc-700"><strong>Aroma:</strong> ${recommendedProduct.notes}</div>
            <div class="flex items-center justify-between pt-2">
              <span class="font-bold text-black text-base">Rp ${recommendedProduct.price.toLocaleString('id-ID')}</span>
              <div class="flex items-center gap-3">
                <button onclick="window.addToCart('${recommendedProduct.id}')" class="px-6 py-2 bg-black hover:bg-zinc-900 text-white font-bold rounded-full text-xs uppercase tracking-[0.14em] transition-all duration-300 ease-in-out active:scale-[0.98]">
                  Tambah ke Keranjang <i class="fa-solid fa-cart-shopping ml-1"></i>
                </button>
                <button id="result-wa-order-btn" class="px-4 py-2 bg-transparent hover:bg-black hover:text-white border border-black/20 text-black rounded-full text-xs font-semibold tracking-[0.12em] transition-all duration-300 ease-in-out active:scale-[0.98]">
                  Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        `;

        const waBtn = document.getElementById('result-wa-order-btn');
        if (waBtn) {
          const waMessage = [
            `Halo Kak, saya mau order parfum ${recommendedProduct.name}.`,
            `Varian: ${recommendedProduct.name} - Rp ${recommendedProduct.price.toLocaleString('id-ID')}`,
            'Rekomendasi dari Scent Finder di website TWINCE.'
          ].join('\n');

          waBtn.addEventListener('click', () => {
            window.open(buildWhatsAppUrl(waMessage), '_blank', 'noopener,noreferrer');
          });
        }
      }

      quizStep3?.classList.add('hidden');
      quizResult?.classList.remove('hidden');
    };

    const restartQuiz = () => {
      quizAnswers = { ...QUIZ_DEFAULT };
      quizResult?.classList.add('hidden');
      quizIntro?.classList.remove('hidden');
    };

    const handleCheckout = () => {
      if (cart.length === 0) {
        showToast('Keranjang belanja kosong. Harap tambahkan parfum terlebih dahulu.', 'info');
        return;
      }

      const name = window.prompt('Masukkan nama lengkap untuk pesanan (contoh: Budi Santoso)');
      if (!name) {
        showToast('Nama diperlukan untuk memproses pesanan.', 'info');
        return;
      }

      const address = window.prompt('Masukkan alamat / detail pengantaran (contoh: Kost X, Jl. Mawar 12)');
      if (!address) {
        showToast('Alamat diperlukan untuk memproses pesanan.', 'info');
        return;
      }

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
      cart = [];
      updateCartUI();
      document.getElementById('close-cart-btn')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    };

    const initUIEvents = () => {
      const cartDrawer = document.getElementById('cart-drawer');
      const cartPanel = document.getElementById('cart-panel');
      const cartBackdrop = document.getElementById('cart-backdrop');
      const mobileMenuButton = document.getElementById('mobile-menu-btn');
      const closeMobileMenuButton = document.getElementById('close-mobile-menu');
      const searchBtn = document.getElementById('search-btn');
      const cartBtn = document.getElementById('cart-btn');
      const closeCartBtn = document.getElementById('close-cart-btn');

      const openCart = () => {
        cartDrawer?.classList.remove('pointer-events-none');
        cartBackdrop?.classList.remove('opacity-0', 'pointer-events-none');
        cartBackdrop?.classList.add('opacity-100');
        cartPanel?.classList.remove('translate-x-full');
      };

      const closeCart = () => {
        cartPanel?.classList.add('translate-x-full');
        cartBackdrop?.classList.remove('opacity-100');
        cartBackdrop?.classList.add('opacity-0');
        window.setTimeout(() => {
          cartDrawer?.classList.add('pointer-events-none');
          cartBackdrop?.classList.add('pointer-events-none');
        }, 500);
      };

      cartBtn?.addEventListener('click', openCart);
      closeCartBtn?.addEventListener('click', closeCart);
      cartBackdrop?.addEventListener('click', closeCart);

      mobileMenuButton?.addEventListener('click', () => {
        mobileMenu?.classList.remove('translate-x-full');
      });
      closeMobileMenuButton?.addEventListener('click', () => {
        mobileMenu?.classList.add('translate-x-full');
      });
      mobileMenu?.querySelectorAll('.mobile-link').forEach((link) => {
        link.addEventListener('click', () => mobileMenu?.classList.add('translate-x-full'));
      });

      searchBtn?.addEventListener('click', () => showToast('Fitur pencarian eksklusif sedang dikembangkan.', 'info'));

      const filterButtons = document.querySelectorAll('.filter-btn');
      filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
          filterButtons.forEach((filterButton) => {
            filterButton.classList.remove('text-black', 'border-b', 'border-black', 'font-semibold');
            filterButton.classList.add('text-zinc-700');
          });

          button.classList.add('text-black', 'border-b', 'border-black', 'font-semibold');
          button.classList.remove('text-zinc-700');
          renderProducts(button.textContent?.trim() || 'Semua');
        });
      });

      window.addEventListener('scroll', () => {
        if (!nav) return;
        if (window.scrollY > 50) {
          nav.style.paddingTop = '0px';
          nav.style.paddingBottom = '0px';
        } else {
          nav.style.paddingTop = '10px';
          nav.style.paddingBottom = '10px';
        }
      });
    };

    const initRevealObserver = () => {
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
    };

    (window as unknown as {
      addToCart: (productId: string) => void;
      updateCartQuantity: (productId: string, change: number) => void;
      startQuiz: () => void;
      selectOption: (step: 1 | 2 | 3, answer: string) => void;
      restartQuiz: () => void;
      handleCheckout: () => void;
    }).addToCart = addToCart;
    (window as unknown as {
      addToCart: (productId: string) => void;
      updateCartQuantity: (productId: string, change: number) => void;
      startQuiz: () => void;
      selectOption: (step: 1 | 2 | 3, answer: string) => void;
      restartQuiz: () => void;
      handleCheckout: () => void;
    }).updateCartQuantity = updateCartQuantity;

    const windowApi = window as unknown as {
      startQuiz: () => void;
      selectOption: (step: 1 | 2 | 3, answer: string) => void;
      restartQuiz: () => void;
      handleCheckout: () => void;
    };
    windowApi.startQuiz = startQuiz;
    windowApi.selectOption = selectOption;
    windowApi.restartQuiz = restartQuiz;
    windowApi.handleCheckout = handleCheckout;

    initRevealObserver();
    renderProducts();
    initUIEvents();
    updateCartUI();
    updateFloatingWa();

    return () => {
      // Lightweight cleanup is enough here because this page is effectively single-instance.
      delete (window as unknown as { addToCart?: unknown; updateCartQuantity?: unknown }).addToCart;
      delete (window as unknown as { addToCart?: unknown; updateCartQuantity?: unknown }).updateCartQuantity;
      delete (window as unknown as { startQuiz?: unknown; selectOption?: unknown; restartQuiz?: unknown; handleCheckout?: unknown }).startQuiz;
      delete (window as unknown as { startQuiz?: unknown; selectOption?: unknown; restartQuiz?: unknown; handleCheckout?: unknown }).selectOption;
      delete (window as unknown as { startQuiz?: unknown; selectOption?: unknown; restartQuiz?: unknown; handleCheckout?: unknown }).restartQuiz;
      delete (window as unknown as { startQuiz?: unknown; selectOption?: unknown; restartQuiz?: unknown; handleCheckout?: unknown }).handleCheckout;
    };
  }, []);

  const startQuizClick = () => (window as unknown as { startQuiz?: () => void }).startQuiz?.();
  const selectOptionClick = (step: 1 | 2 | 3, answer: string) =>
    (window as unknown as { selectOption?: (step: 1 | 2 | 3, answer: string) => void }).selectOption?.(step, answer);
  const restartQuizClick = () => (window as unknown as { restartQuiz?: () => void }).restartQuiz?.();
  const handleCheckoutClick = () => (window as unknown as { handleCheckout?: () => void }).handleCheckout?.();

  return (
    <>
      <ToastContainer />
      <NavBar />
      <MobileMenu />
      <HeroSection />
      <PhilosophySection />
      <CollectionSection />
      <QuizSection onStartQuiz={startQuizClick} onSelectOption={selectOptionClick} onRestartQuiz={restartQuizClick} />
      <TestimonialsSection />
      <CartDrawer onCheckout={handleCheckoutClick} />
      <FooterSection />
      <FloatingWhatsApp />
    </>
  );
}

