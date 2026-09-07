# 🌿 Twince — Modern E-Commerce Platform

> **Live Demo:** [twince.vercel.app](https://twince-parfume.vercel.app/)  
> **Project Status:** 🚀 **Active MVP / Beta v0.9** (Actively maintained & developed)

---

## 📌 Project Overview
Twince adalah platform e-commerce produk wewangian (fragrance) editorial modern yang dibangun menggunakan arsitektur Next.js App Router. Platform ini dirancang dengan fokus pada estetika visual premium, performa tinggi, navigasi responsif, SEO-ready metadata, serta integrasi konsultasi aroma cerdas berbasis kecerdasan buatan (*AI Scent Sommelier*).

### 🛠️ Tech Stack & Tools
- **Framework:** Next.js 14 (App Router)
- **UI & Styling:** React 18, Tailwind CSS, Glassmorphism Custom Utilities, Lucide Icons
- **AI Integration:** Google Gemini API (`@google/genai`)
- **Analytics & SEO:** Google Analytics 4 (Custom Event Tracking), JSON-LD Schema, Dynamic Sitemap & Robots
- **Deployment:** Vercel (CI/CD Pipeline)

---

## ✨ Key Features

- **Editorial Landing Page:** Desain responsif bertema luxury editorial dengan interaksi mikro yang halus.
- **Dynamic Catalog & Filter:** Kurasi dan penyesuaian filter aroma secara instan di sisi klien.
- **Interactive Scent Finder Quiz:** Kuis interaktif pencocokan profil wewangian berdasarkan preferensi pengguna.
- **Cart Drawer & Seamless Checkout:** Keranjang belanja interaktif terintegrasi WhatsApp Order Lead generator.
- **Production-Ready SEO:** Optimasi crawl engine dengan `sitemap.ts`, `robots.ts`, dan JSON-LD structured data.
- **GA4 E-Commerce Tracking:** Event logging otomatis untuk pencarian (`search`), filter katalog (`view_item_list`), keranjang (`add_to_cart`), dan checkout (`begin_checkout`).

---

## 🚦 Roadmap & Engineering Progress

| Fitur / Komponen | Status | Detail Teknis |
| :--- | :--- | :--- |
| **Responsive Catalog UI** | ✅ Completed | Tailwind CSS + Dynamic Filter |
| **Interactive Fragrance Quiz** | ✅ Completed | Client-side preference matcher |
| **Cart Drawer & State** | ✅ Completed | Local state persistence + WhatsApp Checkout |
| **SEO & E-Commerce Telemetry** | ✅ Completed | Meta tags, Sitemap, Robots, GA4 Event Logging |
| **AI Scent Sommelier** | 🔄 In Progress | Gemini 2.5 Flash API Route Handler (`@google/genai`) |
| **Database & Auth Integration** | 🔄 In Progress | Supabase (PostgreSQL) + Prisma ORM |
| **Payment Gateway** | 📋 Planned | Midtrans Snap sandbox integration |

---

## 📁 Project Architecture

```text
├── app/
│   ├── layout.tsx         # Root layout, SEO metadata, JSON-LD schema
│   ├── page.tsx           # Main page & interactive client components (Cart, Quiz, Toast)
│   ├── loading.tsx        # Suspense loading boundary
│   ├── not-found.tsx      # Custom 404 page
│   ├── sitemap.ts         # Dynamic search engine sitemap
│   ├── robots.ts          # Search engine crawler policies
│   ├── globals.css        # Global design tokens, glass effects, animations
│   └── api/
│       └── recommend/     # Next.js Route Handler for Gemini AI Sommelier
└── public/                # Static assets & brand media
