# ANALYSE PROJET — Galaxy Solutions SiteWebV3

> Rapport d'analyse pour planifier l'integration de composants 3D (Three.js Hero + systeme planetaire)
> Date : 2026-04-07

---

## 1. STACK TECHNIQUE

| Element | Detail |
|---------|--------|
| **Framework** | **Vite 7.3.1** + React (PAS Next.js) |
| **React** | 18.3.1 |
| **TypeScript** | 5.8.3 (mode non-strict, `noImplicitAny: false`) |
| **Routing** | React Router DOM 6.30.1 (client-side SPA) |
| **CSS** | Tailwind CSS 3.4.17 + PostCSS + Autoprefixer |
| **UI Library** | shadcn/ui (Radix UI primitives) |
| **Animations** | Framer Motion 12.38.0 |
| **Icons** | Lucide React 0.462.0 |
| **Build** | Vite + SWC (`@vitejs/plugin-react-swc`) |
| **3D / Three.js** | **AUCUNE dependance 3D installee** |

### Dependencies completes (package.json)

```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-tooltip": "^1.2.7",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "framer-motion": "^12.38.0",
    "lucide-react": "^0.462.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "next-themes": "^0.3.0"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "vite": "^7.3.1"
  }
}
```

---

## 2. STRUCTURE DES FICHIERS

```
SiteWebV3/
├── index.html                          # Point d'entree HTML
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── components.json                     # Config shadcn/ui
├── public/
│   ├── placeholder.svg
│   └── robots.txt
└── src/
    ├── main.tsx                        # Point d'entree React
    ├── App.tsx                         # Router setup
    ├── index.css                       # Tailwind + styles custom
    ├── vite-env.d.ts
    ├── assets/
    │   ├── hero-bg.jpg
    │   ├── logo-galaxy.png
    │   └── services/
    │       ├── formation.jpg
    │       ├── conseil.jpg
    │       ├── rse.jpg
    │       ├── etudes.jpg
    │       └── securite-incendie.jpg
    ├── components/
    │   ├── landing/
    │   │   └── ServiceDetailSection.tsx
    │   ├── shared/
    │   │   ├── LandingHeader.tsx
    │   │   ├── LandingFooter.tsx
    │   │   └── Logo.tsx
    │   └── ui/                         # shadcn/ui (21 composants)
    │       ├── accordion.tsx
    │       ├── button.tsx
    │       ├── command.tsx
    │       ├── dialog.tsx
    │       ├── dropdown-menu.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── popover.tsx
    │       ├── scroll-area.tsx
    │       ├── select.tsx
    │       ├── separator.tsx
    │       ├── sonner.tsx
    │       ├── textarea.tsx
    │       ├── toast.tsx
    │       ├── toaster.tsx
    │       ├── tooltip.tsx
    │       └── use-toast.ts
    ├── hooks/
    │   └── use-mobile.tsx
    ├── lib/
    │   └── utils.ts
    └── pages/
        └── Index.tsx                   # PAGE PRINCIPALE (730 lignes)
```

---

## 3. PAGE PRINCIPALE

### Fichier : `src/pages/Index.tsx` (730 lignes)

C'est le fichier central de l'application. Il contient toutes les sections de la landing page.

**Contenu complet :**

```tsx
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight, AlertTriangle, FileCheck, Scale, GraduationCap, Award,
  Leaf, TreePine, Flame, Target, Settings, TrendingUp, Quote, Phone, Mail, MapPin, Lock, ChevronRight,
  CheckCircle2, Sparkles,
} from "lucide-react";
import LandingHeader from "@/components/shared/LandingHeader";
import LandingFooter from "@/components/shared/LandingFooter";
import ServiceDetailSections, { servicesData } from "@/components/landing/ServiceDetailSection";
import heroBg from "@/assets/hero-bg.jpg";
import { toast } from "@/hooks/use-toast";

/* -- Stagger container -- */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* -- Counter animation -- */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as any, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* -- Data -- */
const problems = [
  { icon: AlertTriangle, title: "Competences insuffisantes", text: "Sans formation adaptee, vos collaborateurs peinent a adopter les bonnes pratiques QHSE." },
  { icon: FileCheck, title: "Certification complexe", text: "Les exigences ISO evoluent, vos equipes manquent de temps et de methode." },
  { icon: Scale, title: "Pression reglementaire", text: "EIE, RSE, audits clients... Les obligations se multiplient, les delais se resserrent." },
];

const services = [
  { icon: GraduationCap, title: "Formation Professionnelle", desc: "Developpez les competences de vos equipes avec notre pedagogie de l'entrainement.", items: ["Formations QHSE sur-mesure", "Ingenierie pedagogique", "+1700 jours delivres"], badge: "Expertise phare", accent: "from-secondary to-landing-glow", sectionId: "service-formation" },
  { icon: Award, title: "Conseil & Certification", desc: "Obtenez vos certifications ISO avec un accompagnement de bout en bout.", items: ["ISO 9001, 14001, 45001", "HACCP, FSSC 22000, BRC, IFS", "Audits internes"], badge: "Expertise phare", accent: "from-landing-teal to-landing-blue", sectionId: "service-conseil" },
  { icon: Leaf, title: "Demarche RSE", desc: "Repondez aux exigences RSE de vos clients internationaux.", items: ["SMETA, BSCI, ICS", "Strategie RSE"], accent: "from-success to-landing-teal", sectionId: "service-rse" },
  { icon: TreePine, title: "Etudes Environnementales", desc: "Acceptabilite environnementale pour vos projets (Loi 12.03).", items: [], accent: "from-landing-blue to-landing-teal", sectionId: "service-etudes" },
  { icon: Flame, title: "Securite Incendie", desc: "Protegez vos installations avec des solutions de prevention sur-mesure.", items: [], accent: "from-destructive to-secondary", sectionId: "service-securite" },
];

const stats = [
  { value: 1708, suffix: "+", label: "Jours de formation" },
  { value: 246, suffix: "", label: "Jours d'accompagnement" },
  { value: 49, suffix: "", label: "Experts & consultants" },
  { value: 57, suffix: "", label: "Etudes realisees" },
];

const steps = [
  { num: "01", title: "Diagnostic", desc: "Analyse de votre contexte et niveau de maturite" },
  { num: "02", title: "Co-construction", desc: "Objectifs, planning et livrables definis ensemble" },
  { num: "03", title: "Deploiement", desc: "Mise en oeuvre terrain avec vos equipes" },
  { num: "04", title: "Perennisation", desc: "Suivi, amelioration continue et autonomie" },
];

const differentiators = [
  { icon: Target, title: "Expertise sectorielle", text: "49 consultants specialises par secteur : agroalimentaire, automobile, pharmaceutique, energie." },
  { icon: Settings, title: "Approche sur-mesure", text: "Chaque mission est adaptee a votre contexte, vos ressources et vos delais." },
  { icon: TrendingUp, title: "Orientation resultats", text: "Nous nous engageons sur des livrables concrets : certification obtenue, competences validees." },
];

const testimonials = [
  { quote: "Galaxy Solutions nous a accompagnes sur notre certification ISO 14001...", author: "Responsable QHSE", company: "Secteur Agroalimentaire" },
  { quote: "Les formations dispensees ont reellement transforme les pratiques de nos equipes...", author: "Directeur des Ressources Humaines", company: "Secteur Automobile" },
  { quote: "Professionnalisme et reactivite. Notre certification FSSC 22000 a ete obtenue dans les delais prevus.", author: "Directeur Qualite", company: "Secteur Pharmaceutique" },
];

const faqs = [
  { q: "Quels types de formations proposez-vous ?", a: "..." },
  { q: "Combien de temps pour obtenir une certification ISO ?", a: "..." },
  { q: "Vos formations sont-elles en presentiel ou a distance ?", a: "..." },
  { q: "Travaillez-vous avec des entreprises de toutes tailles ?", a: "..." },
  { q: "Comment demarrer une collaboration ?", a: "..." },
];

const trustLogos = ["Safran", "Carrefour", "Label'Vie", "Vitogaz", "MC Pharma", "Supratours", "OCP", "Renault"];

/* -- Page -- */
const Index = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", need: "", message: "" });
  // ... handleSubmit + scrollTo
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <LandingHeader />
      {/* HERO */}
      {/* TRUST BAR */}
      {/* PROBLEMS */}
      {/* SERVICES BENTO */}
      <ServiceDetailSections />
      {/* STATS */}
      {/* METHODOLOGY */}
      {/* WHY US */}
      {/* TESTIMONIALS */}
      {/* FAQ */}
      {/* CONTACT */}
      <LandingFooter />
    </div>
  );
};
```

### Layout principal : `src/App.tsx`

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
```

### Point d'entree : `src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

---

## 4. COMPOSANTS

### Liste complete

| Fichier | Description |
|---------|-------------|
| `components/shared/LandingHeader.tsx` | Header fixe avec nav, scroll progress bar, logo, menu mobile |
| `components/shared/LandingFooter.tsx` | Footer 4 colonnes avec logo, services, contact, CTA |
| `components/shared/Logo.tsx` | Logo Galaxy Solutions (dark/light variants) |
| `components/landing/ServiceDetailSection.tsx` | 5 sections detaillees des services (formation, conseil, RSE, EIE, incendie) |
| `components/ui/accordion.tsx` | Radix UI Accordion (shadcn) |
| `components/ui/button.tsx` | Button avec variants (default, destructive, outline, ghost, hero, etc.) |
| `components/ui/command.tsx` | Command palette (cmdk) |
| `components/ui/dialog.tsx` | Dialog modal (Radix) |
| `components/ui/dropdown-menu.tsx` | Menu deroulant (Radix) |
| `components/ui/input.tsx` | Champ de saisie |
| `components/ui/label.tsx` | Label de formulaire |
| `components/ui/popover.tsx` | Popover (Radix) |
| `components/ui/scroll-area.tsx` | Zone scrollable (Radix) |
| `components/ui/select.tsx` | Select/dropdown (Radix) |
| `components/ui/separator.tsx` | Separateur visuel |
| `components/ui/sonner.tsx` | Toast notifications (Sonner) |
| `components/ui/textarea.tsx` | Zone de texte |
| `components/ui/toast.tsx` | Toast (shadcn) |
| `components/ui/toaster.tsx` | Toaster container |
| `components/ui/tooltip.tsx` | Tooltip (Radix) |
| `hooks/use-toast.ts` | Hook toast |
| `hooks/use-mobile.tsx` | Hook detection mobile (breakpoint 768px) |
| `lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) |

### Hero actuel (inline dans `src/pages/Index.tsx`, lignes 134-256)

Le Hero n'est **PAS** un composant separe. Il est ecrit directement dans `Index.tsx`.

```tsx
{/* HERO — lignes 134-256 de Index.tsx */}
<section className="relative min-h-screen flex items-center overflow-hidden hero-mesh grain">
  {/* Floating shapes (blobs animes) */}
  <motion.div
    className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-secondary/10 blur-3xl"
    animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
  <motion.div
    className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-landing-teal/10 blur-3xl"
    animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  />

  <div className="relative z-10 container px-6 py-32 lg:py-0">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen pt-[70px]">
      {/* COLONNE GAUCHE — Texte */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-xl">
        {/* Badge "Depuis 2008" */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/20 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-secondary" />
          <span className="text-xs font-semibold text-secondary tracking-wide">Depuis 2008 au service de l'excellence</span>
        </motion.div>

        {/* Titre principal */}
        <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-primary-foreground mb-6">
          Formez vos equipes.
          <br />
          <span className="bg-gradient-to-r from-secondary to-landing-glow bg-clip-text text-transparent">
            Certifiez votre excellence.
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p variants={fadeUp} className="text-base sm:text-lg text-primary-foreground/70 mb-10 max-w-lg leading-relaxed">
          Galaxy Solutions accompagne les entreprises marocaines dans le developpement des competences et l'obtention des certifications ISO, RSE et reglementaires.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
          <Button size="lg" onClick={() => scrollTo("#contact")} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8 py-6 rounded-xl glow-orange glow-orange-hover">
            Diagnostic gratuit <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button variant="ghost" size="lg" onClick={() => scrollTo("#services")} className="text-primary-foreground/80 hover:text-primary-foreground">
            Nos services <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>

        {/* Mini stats */}
        <motion.div variants={fadeUp} className="flex items-center gap-8 mt-14 pt-8 border-t border-primary-foreground/10">
          {[
            { val: "1700+", label: "Jours de formation" },
            { val: "49", label: "Experts" },
            { val: "15+", label: "Ans d'experience" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl sm:text-3xl font-bold text-secondary">{s.val}</p>
              <p className="text-xs text-primary-foreground/50 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* COLONNE DROITE — Art geometrique abstrait (anneaux orbitaux + icones) */}
      <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} className="hidden lg:flex items-center justify-center relative">
        <div className="relative w-[420px] h-[420px]">
          {/* 3 anneaux orbitaux CSS */}
          <motion.div className="absolute inset-0 rounded-full border border-primary-foreground/10" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute inset-8 rounded-full border border-secondary/20" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute inset-16 rounded-full border border-primary-foreground/5" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />

          {/* Glow central */}
          <div className="absolute inset-20 rounded-full bg-gradient-to-br from-secondary/30 to-landing-teal/20 blur-2xl" />

          {/* Icones flottantes des services */}
          {[
            { Icon: GraduationCap, x: "10%", y: "15%", delay: 0 },
            { Icon: Award, x: "75%", y: "10%", delay: 0.5 },
            { Icon: Leaf, x: "85%", y: "60%", delay: 1 },
            { Icon: Flame, x: "5%", y: "70%", delay: 1.5 },
          ].map(({ Icon, x, y, delay }) => (
            <motion.div
              key={delay}
              className="absolute glass w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ left: x, top: y }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className="w-5 h-5 text-secondary" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
</section>
```

### ServiceDetailSection.tsx — Structure des services

5 services detailles avec les IDs suivants :
- `id="service-formation"` — Formation Professionnelle
- `id="service-conseil"` — Conseil & Certification
- `id="service-rse"` — Demarche RSE
- `id="service-etudes"` — Etudes Environnementales
- `id="service-securite"` — Securite Incendie

Chaque section contient : header + hero block (image + texte) + features grid (4 colonnes) + highlights + methodology.

---

## 5. SECTIONS DE LA PAGE (dans l'ordre)

| # | Section | Composant/Fichier | ID HTML | Background |
|---|---------|-------------------|---------|------------|
| 1 | **Header** | `LandingHeader.tsx` | - (fixed) | transparent -> card/95 on scroll |
| 2 | **Hero** | Inline dans `Index.tsx` L134-256 | aucun | `hero-mesh grain` (gradient sombre) |
| 3 | **Trust Bar** (Marquee logos) | Inline dans `Index.tsx` L258-277 | aucun | `bg-background` |
| 4 | **Problemes** (3 cards) | Inline dans `Index.tsx` L279-330 | aucun | `bg-background` |
| 5 | **Services Bento** (5 cards grille) | Inline dans `Index.tsx` L332-405 | `id="services"` | `bg-landing-alt` |
| 6 | **Service: Formation** | `ServiceDetailSection.tsx` | `id="service-formation"` | `bg-background` |
| 7 | **Service: Conseil** | `ServiceDetailSection.tsx` | `id="service-conseil"` | `bg-landing-alt` |
| 8 | **Service: RSE** | `ServiceDetailSection.tsx` | `id="service-rse"` | `bg-background` |
| 9 | **Service: Etudes** | `ServiceDetailSection.tsx` | `id="service-etudes"` | `bg-landing-alt` |
| 10 | **Service: Securite** | `ServiceDetailSection.tsx` | `id="service-securite"` | `bg-background` |
| 11 | **Stats** (4 compteurs) | Inline dans `Index.tsx` L410-452 | aucun | `hero-mesh grain` |
| 12 | **Methodologie** (4 etapes) | Inline dans `Index.tsx` L454-491 | aucun | `bg-background` |
| 13 | **Pourquoi nous** (3 cards) | Inline dans `Index.tsx` L493-531 | aucun | `bg-landing-alt` |
| 14 | **Temoignages** (3 cards) | Inline dans `Index.tsx` L533-588 | aucun | `bg-background` |
| 15 | **FAQ** (5 accordion) | Inline dans `Index.tsx` L590-626 | aucun | `bg-landing-alt` |
| 16 | **Contact** (formulaire) | Inline dans `Index.tsx` L628-722 | `id="contact"` | `bg-background` |
| 17 | **Footer** | `LandingFooter.tsx` | - | `hero-mesh grain` |

---

## 6. NAVIGATION

### Structure

Header fixe (`fixed top-0`) avec :
- **Logo** a gauche (dark/light selon scroll)
- **Nav desktop** (>lg) : 5 liens + "Connexion" + "Demander un devis"
- **Nav mobile** (<lg) : DropdownMenu hamburger

### Liens de navigation

```ts
const navLinks = [
  { label: "Formation", to: "#services" },
  { label: "Conseil", to: "#services" },
  { label: "RSE", to: "#services" },
  { label: "Etudes", to: "#services" },
  { label: "Contact", to: "#contact" },
];
```

> **Note :** Tous les liens services pointent vers `#services` (la section Bento). Les cards Bento ont ensuite des boutons "En savoir plus" qui scrollent vers les sections detaillees (`#service-formation`, `#service-conseil`, etc.).

### Mecanisme de scroll

```ts
const scrollTo = (hash: string) => {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
```

Scroll natif `scrollIntoView` avec `behavior: "smooth"`. Pas de librairie de scroll externe.

### Scroll progress bar

Barre de progression en bas du header, couleur orange gradient, largeur proportionnelle au scroll.

---

## 7. STYLES & THEME

### Couleurs principales (variables CSS HSL)

| Token | HSL | Usage |
|-------|-----|-------|
| `--primary` | `213 52% 24%` | Navy fonce — texte, fond hero |
| `--secondary` | `24 82% 53%` | **Orange** — couleur d'accent principale |
| `--landing-teal` | `180 42% 28%` | Teal — accent secondaire |
| `--landing-blue` | `210 68% 50%` | Bleu |
| `--landing-green` / `--success` | `145 63% 42%` | Vert |
| `--landing-red` / `--destructive` | `6 78% 57%` | Rouge |
| `--landing-glow` | `24 100% 60%` | Orange vif (glow effects) |
| `--background` | `210 17% 98%` | Fond clair off-white |
| `--foreground` | `213 52% 24%` | Texte principal (= navy) |
| `--muted-foreground` | `213 20% 45%` | Texte secondaire |

### Fonts

| Famille | Poids | Usage |
|---------|-------|-------|
| **Inter** | 300-800 | `font-sans` — Texte courant |
| **Montserrat** | 400-900 | `font-heading` — Titres |
| **Space Grotesk** | 400-700 | `font-display` — Titres principaux, chiffres stats |

### Fichiers de style

- `src/index.css` : Variables CSS root + classes utilitaires custom (hero-mesh, grain, glass, glow, tilt-card, marquee, bento-services)
- `tailwind.config.ts` : Extensions theme (couleurs, fonts, keyframes, shadows, border-radius)

### Classes CSS custom notables

| Classe | Description |
|--------|-------------|
| `.hero-mesh` | Fond gradient multi-radial (navy/teal/orange) |
| `.grain` | Texture grain SVG en overlay |
| `.glass` | Glassmorphism (blur 16px, border semi-transparent) |
| `.glass-light` | Glassmorphism renforce |
| `.glow-orange` | Box-shadow orange |
| `.glow-orange-hover` | Box-shadow orange au hover |
| `.tilt-card` | Effet 3D tilt au hover (rotateX + rotateY) |
| `.animate-marquee` | Animation defilement horizontal infini (30s) |
| `.stat-glow` | Bordure gradient via ::before |
| `.bento-services` | CSS Grid 3 colonnes avec spanning complexe |

---

## 8. ASSETS

### Images

| Fichier | Emplacement | Usage |
|---------|-------------|-------|
| `hero-bg.jpg` | `src/assets/` | Import dans Index.tsx (non utilise visiblement — le hero utilise `.hero-mesh` CSS) |
| `logo-galaxy.png` | `src/assets/` | Logo de l'entreprise |
| `formation.jpg` | `src/assets/services/` | Image section Formation |
| `conseil.jpg` | `src/assets/services/` | Image section Conseil |
| `rse.jpg` | `src/assets/services/` | Image section RSE |
| `etudes.jpg` | `src/assets/services/` | Image section Etudes |
| `securite-incendie.jpg` | `src/assets/services/` | Image section Securite |
| `placeholder.svg` | `public/` | Placeholder generique |

---

## 9. POINTS D'INTEGRATION 3D

### 9.1 Hero actuel — Ou le remplacer ?

**Fichier :** `src/pages/Index.tsx`
**Lignes :** 134-256

Le Hero est une `<section>` inline dans Index.tsx. Structure en 2 colonnes :
- **Gauche :** Texte (badge, h1, sous-titre, CTA, mini-stats)
- **Droite :** Art geometrique CSS (anneaux orbitaux + icones flottantes, **visible uniquement desktop lg+**)

**Pour integrer Three.js :**
1. Extraire le Hero dans un composant `components/landing/HeroSection.tsx`
2. Remplacer la colonne droite (div `w-[420px] h-[420px]` avec les anneaux) par un canvas Three.js
3. Ou remplacer entierement le fond `.hero-mesh` par une scene 3D plein ecran avec le texte en overlay

### 9.2 Sections services — Ou integrer le systeme planetaire ?

Les services detailles sont rendus par `<ServiceDetailSections />` a la **ligne 408** de Index.tsx.

Ce composant est dans `src/components/landing/ServiceDetailSection.tsx` et genere 5 sections avec les IDs :
- `#service-formation`
- `#service-conseil`
- `#service-rse`
- `#service-etudes`
- `#service-securite`

Le systeme planetaire pourrait :
- Remplacer la section Bento Services (lignes 332-405 de Index.tsx, `id="services"`)
- Ou etre ajoute comme section intermediaire entre le Hero et les services

### 9.3 Three.js / librairies 3D

**Aucune dependance 3D installee.** Il faudra installer :
```bash
npm install three @types/three @react-three/fiber @react-three/drei
```

### 9.4 Client-side rendering

Le projet est 100% **client-side** (Vite SPA). Pas de SSR, pas de `'use client'` (ce n'est pas Next.js).
Three.js peut etre integre directement sans contrainte SSR.

### 9.5 Performance considerations

- Le projet utilise deja **Framer Motion** avec beaucoup d'animations (floating shapes, rotations infinies, stagger animations). Three.js ajoutera une charge GPU supplementaire.
- Le Hero a des `blur-3xl` (blur gaussien lourd) sur les floating shapes. Ceux-ci pourraient etre remplaces par des effets Three.js plus performants.
- Les images des services sont en `loading="lazy"`.

### 9.6 Resume des modifications necessaires

| Action | Fichier | Lignes |
|--------|---------|--------|
| Installer `three`, `@react-three/fiber`, `@react-three/drei` | `package.json` | - |
| Extraire Hero en composant separe | `src/pages/Index.tsx` | 134-256 |
| Creer composant Three.js Hero | `src/components/landing/Hero3D.tsx` | nouveau |
| Remplacer colonne droite du Hero (anneaux CSS) | `src/pages/Index.tsx` | 208-253 |
| Optionnel : creer systeme planetaire pour services | `src/components/landing/PlanetarySystem.tsx` | nouveau |
| Adapter styles hero-mesh si fond 3D | `src/index.css` | 104-110 |

---

## 10. RESUME EXECUTIF

- **Projet :** Landing page marketing Vite + React 18 + TypeScript + Tailwind
- **Pas de Next.js** — SPA pure, client-side only
- **Hero actuel :** CSS-only (gradient mesh + Framer Motion + anneaux orbitaux CSS)
- **Pas de 3D** — Aucune librairie Three.js/WebGL installee
- **Animations existantes :** Framer Motion partout (stagger, fade, scale, rotation infinie)
- **Le Hero n'est pas un composant separe** — il est inline dans `Index.tsx` (lignes 134-256)
- **Integration 3D simple** : pas de SSR a gerer, pas de `'use client'`, SPA classique
- **5 services** avec sections detaillees et IDs d'ancrage dedies
- **Design system :** palette navy/orange/teal, fonts Inter/Montserrat/Space Grotesk, shadcn/ui
