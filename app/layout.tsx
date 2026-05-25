import type { Metadata } from 'next';
import '../style.css';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'TWINCE | Extrait De Parfume',
    template: '%s | TWINCE'
  },
  description: 'Brand parfum TWINCE: koleksi extrait de parfum, scent finder quiz, dan pemesanan cepat via WhatsApp.',
  keywords: [
    'parfum lokal premium',
    'extrait de parfum',
    'parfum woody floral',
    'twince parfum',
    'parfum indonesia'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'TWINCE',
    title: 'TWINCE | Extrait De Parfume',
    description: 'Temukan aroma khasmu melalui koleksi signature dan scent finder quiz dari TWINCE.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TWINCE | Extrait De Parfume',
    description: 'Temukan aroma khasmu melalui koleksi signature dan scent finder quiz dari TWINCE.'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var next = saved || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', next);
                } catch (error) {}
              })();
            `
          }}
        />
        {process.env.NEXT_PUBLIC_GA4_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', { send_page_view: true });
                `
              }}
            />
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'TWINCE',
              url: siteUrl,
              description: 'Brand parfum premium dengan koleksi extrait de parfum.',
              sameAs: []
            })
          }}
        />
      </head>
      <body
        data-wa-number="6282123354047"
        className="bg-white text-black font-sans overflow-x-hidden antialiased"
      >
        {children}
      </body>
    </html>
  );
}
