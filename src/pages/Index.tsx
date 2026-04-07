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

/* ── Stagger container ── */
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

/* ── Counter animation ── */
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

/* ── Data ── */
const problems = [
  { icon: AlertTriangle, title: "Compétences insuffisantes", text: "Sans formation adaptée, vos collaborateurs peinent à adopter les bonnes pratiques QHSE." },
  { icon: FileCheck, title: "Certification complexe", text: "Les exigences ISO évoluent, vos équipes manquent de temps et de méthode." },
  { icon: Scale, title: "Pression réglementaire", text: "EIE, RSE, audits clients... Les obligations se multiplient, les délais se resserrent." },
];

const services = [
  { icon: GraduationCap, title: "Formation Professionnelle", desc: "Développez les compétences de vos équipes avec notre pédagogie de l'entraînement.", items: ["Formations QHSE sur-mesure", "Ingénierie pédagogique", "+1700 jours délivrés"], badge: "Expertise phare", accent: "from-secondary to-landing-glow", sectionId: "service-formation" },
  { icon: Award, title: "Conseil & Certification", desc: "Obtenez vos certifications ISO avec un accompagnement de bout en bout.", items: ["ISO 9001, 14001, 45001", "HACCP, FSSC 22000, BRC, IFS", "Audits internes"], badge: "Expertise phare", accent: "from-landing-teal to-landing-blue", sectionId: "service-conseil" },
  { icon: Leaf, title: "Démarche RSE", desc: "Répondez aux exigences RSE de vos clients internationaux.", items: ["SMETA, BSCI, ICS", "Stratégie RSE"], accent: "from-success to-landing-teal", sectionId: "service-rse" },
  { icon: TreePine, title: "Études Environnementales", desc: "Acceptabilité environnementale pour vos projets (Loi 12.03).", items: [], accent: "from-landing-blue to-landing-teal", sectionId: "service-etudes" },
  { icon: Flame, title: "Sécurité Incendie", desc: "Protégez vos installations avec des solutions de prévention sur-mesure.", items: [], accent: "from-destructive to-secondary", sectionId: "service-securite" },
];

const stats = [
  { value: 1708, suffix: "+", label: "Jours de formation" },
  { value: 246, suffix: "", label: "Jours d'accompagnement" },
  { value: 49, suffix: "", label: "Experts & consultants" },
  { value: 57, suffix: "", label: "Études réalisées" },
];

const steps = [
  { num: "01", title: "Diagnostic", desc: "Analyse de votre contexte et niveau de maturité" },
  { num: "02", title: "Co-construction", desc: "Objectifs, planning et livrables définis ensemble" },
  { num: "03", title: "Déploiement", desc: "Mise en œuvre terrain avec vos équipes" },
  { num: "04", title: "Pérennisation", desc: "Suivi, amélioration continue et autonomie" },
];

const differentiators = [
  { icon: Target, title: "Expertise sectorielle", text: "49 consultants spécialisés par secteur : agroalimentaire, automobile, pharmaceutique, énergie." },
  { icon: Settings, title: "Approche sur-mesure", text: "Chaque mission est adaptée à votre contexte, vos ressources et vos délais." },
  { icon: TrendingUp, title: "Orientation résultats", text: "Nous nous engageons sur des livrables concrets : certification obtenue, compétences validées." },
];

const testimonials = [
  { quote: "Galaxy Solutions nous a accompagnés sur notre certification ISO 14001. Leur approche pragmatique et leur connaissance du terrain ont fait la différence.", author: "Responsable QHSE", company: "Secteur Agroalimentaire" },
  { quote: "Les formations dispensées ont réellement transformé les pratiques de nos équipes. Une pédagogie concrète et applicable immédiatement.", author: "Directeur des Ressources Humaines", company: "Secteur Automobile" },
  { quote: "Professionnalisme et réactivité. Notre certification FSSC 22000 a été obtenue dans les délais prévus.", author: "Directeur Qualité", company: "Secteur Pharmaceutique" },
];

const faqs = [
  { q: "Quels types de formations proposez-vous ?", a: "Nous proposons des formations sur-mesure dans les domaines QHSE : qualité, hygiène, sécurité, environnement, management, audits internes, RSE, sécurité incendie." },
  { q: "Combien de temps pour obtenir une certification ISO ?", a: "La durée dépend de votre niveau de maturité. Comptez 6 à 12 mois pour une première certification ISO 9001." },
  { q: "Vos formations sont-elles en présentiel ou à distance ?", a: "Nous privilégions le présentiel mais proposons des formats hybrides selon vos contraintes." },
  { q: "Travaillez-vous avec des entreprises de toutes tailles ?", a: "Oui, PME comme grandes entreprises. Notre approche s'adapte à vos ressources." },
  { q: "Comment démarrer une collaboration ?", a: "Contactez-nous pour un échange gratuit de 30 minutes. Nous analyserons vos besoins sans engagement." },
];

const trustLogos = ["Safran", "Carrefour", "Label'Vie", "Vitogaz", "MC Pharma", "Supratours", "OCP", "Renault"];

/* ── Page ── */
const Index = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", need: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: "Veuillez remplir les champs obligatoires", variant: "destructive" });
      return;
    }
    toast({ title: "Demande envoyée ✓", description: "Nous vous recontacterons dans les 24h." });
    setForm({ name: "", email: "", phone: "", company: "", need: "", message: "" });
  };

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <LandingHeader />

      {/* ════════════════════════════ HERO ════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden hero-mesh grain">
        {/* Floating shapes */}
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
            {/* Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/15 border border-secondary/20 mb-8">
                <Sparkles className="w-3.5 h-3.5 text-secondary" />
                <span className="text-xs font-semibold text-secondary tracking-wide">Depuis 2008 au service de l'excellence</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-primary-foreground mb-6">
                Formez vos équipes.
                <br />
                <span className="bg-gradient-to-r from-secondary to-landing-glow bg-clip-text text-transparent">
                  Certifiez votre excellence.
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base sm:text-lg text-primary-foreground/70 mb-10 max-w-lg leading-relaxed">
                Galaxy Solutions accompagne les entreprises marocaines dans le développement des compétences et l'obtention des certifications ISO, RSE et réglementaires.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollTo("#contact")}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base px-8 py-6 rounded-xl glow-orange glow-orange-hover transition-all duration-300"
                >
                  Diagnostic gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => scrollTo("#services")}
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5 text-base rounded-xl"
                >
                  Nos services <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>

              {/* Mini stats */}
              <motion.div variants={fadeUp} className="flex items-center gap-8 mt-14 pt-8 border-t border-primary-foreground/10">
                {[
                  { val: "1700+", label: "Jours de formation" },
                  { val: "49", label: "Experts" },
                  { val: "15+", label: "Ans d'expérience" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-secondary">{s.val}</p>
                    <p className="text-xs text-primary-foreground/50 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right side — abstract geometric art */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center justify-center relative"
            >
              <div className="relative w-[420px] h-[420px]">
                {/* Orbiting rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary-foreground/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-8 rounded-full border border-secondary/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-16 rounded-full border border-primary-foreground/5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Central glow */}
                <div className="absolute inset-20 rounded-full bg-gradient-to-br from-secondary/30 to-landing-teal/20 blur-2xl" />

                {/* Floating service icons */}
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

      {/* ════════════════════════════ TRUST BAR — MARQUEE ════════════════════════════ */}
      <section className="py-8 bg-background border-y border-border/50 overflow-hidden">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground text-center mb-5">
          Ils nous font confiance
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-marquee w-max">
            {[...trustLogos, ...trustLogos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="mx-8 sm:mx-12 text-sm font-display font-bold text-muted-foreground/30 tracking-widest uppercase whitespace-nowrap select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════ PROBLEMS ════════════════════════════ */}
      <section className="py-24 bg-background relative">
        <div className="container px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Le constat</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Vos enjeux QHSE freinent
              <br className="hidden sm:block" />
              <span className="text-muted-foreground"> votre développement ?</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-secondary/30 transition-all duration-500 tilt-card"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <p.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12 text-secondary font-semibold text-sm flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Galaxy Solutions transforme ces contraintes en leviers de performance.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════ SERVICES — BENTO ════════════════════════════ */}
      <section id="services" className="py-24 bg-landing-alt relative">
        <div className="container px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Nos expertises</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Formation & Conseil
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
              Des solutions concrètes pour développer vos compétences et atteindre vos objectifs QHSE.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="bento-services grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={scaleIn}
                className={`group relative p-7 rounded-2xl bg-card border border-border hover:border-secondary/20 transition-all duration-500 tilt-card overflow-hidden ${
                  i === 0 ? "lg:col-span-2" : ""
                } ${i === 1 ? "lg:row-span-2" : ""}`}
              >
                {/* Gradient accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl`} />

                {s.badge && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider bg-secondary/10 text-secondary px-3 py-1 rounded-full mb-4">
                    <Sparkles className="w-3 h-3" />
                    {s.badge}
                  </span>
                )}

                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/15 to-transparent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <s.icon className="w-6 h-6 text-secondary" />
                </div>

                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>

                {s.items.length > 0 && (
                  <ul className="space-y-2 mb-5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() => scrollTo(`#${s.sectionId}`)}
                  className="text-sm font-medium text-secondary hover:text-secondary/80 inline-flex items-center gap-1.5 group/link"
                >
                  En savoir plus
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════ SERVICE DETAILS ════════════════════════════ */}
      <ServiceDetailSections />

      {/* ════════════════════════════ STATS ════════════════════════════ */}
      <section className="py-24 hero-mesh grain relative overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="container px-6 relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Nos résultats</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
              +15 ans d'impact mesurable
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={scaleIn}
                className="glass rounded-2xl p-6 sm:p-8 text-center stat-glow"
              >
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-2">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs sm:text-sm text-primary-foreground/60">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════ METHODOLOGY ════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="container px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Notre approche</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Méthodologie éprouvée
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          >
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-secondary/30 via-secondary/60 to-secondary/30" />

            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp} className="relative text-center group">
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-landing-glow text-secondary-foreground flex items-center justify-center mx-auto mb-6 text-xl font-display font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {s.num}
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════ WHY US ════════════════════════════ */}
      <section className="py-24 bg-landing-alt">
        <div className="container px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Nos atouts</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Ce qui nous différencie
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {differentiators.map((d) => (
              <motion.div
                key={d.title}
                variants={fadeUp}
                className="group text-center p-8 rounded-2xl bg-card border border-border hover:border-secondary/20 transition-all duration-500 tilt-card"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/15 to-transparent flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <d.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════ TESTIMONIALS ════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="container px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Témoignages</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Ce que nos clients disent
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative p-8 rounded-2xl bg-card border border-border hover:border-secondary/20 transition-all duration-500 group"
              >
                {/* Decorative quote */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center">
                  <Quote className="w-4 h-4 text-secondary/40" />
                </div>

                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  ))}
                </div>

                <p className="text-sm text-foreground leading-relaxed mb-6">{t.quote}</p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-landing-glow flex items-center justify-center text-secondary-foreground text-xs font-bold">
                    {t.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════ FAQ ════════════════════════════ */}
      <section className="py-24 bg-landing-alt">
        <div className="container px-6 max-w-3xl">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3">FAQ</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Questions fréquentes
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-secondary/20 transition-all duration-300">
                  <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-5 font-display">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════ CONTACT ════════════════════════════ */}
      <section id="contact" className="py-24 bg-background relative overflow-hidden">
        {/* Background decor */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container px-6 relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          >
            {/* Left */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Contact</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Prêt à transformer
                <br />
                <span className="text-muted-foreground">vos enjeux QHSE ?</span>
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Discutons de votre projet lors d'un échange gratuit de 30 minutes.
              </p>

              <div className="space-y-5">
                {[
                  { Icon: Phone, label: "Téléphone", value: "06 62 81 71 30" },
                  { Icon: Mail, label: "Email", value: "contact@galaxysolutions.ma" },
                  { Icon: MapPin, label: "Adresse", value: "Bd Zerktouni, Kamal Park Centre, Mohammedia" },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary/15 to-transparent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-8 space-y-5 shadow-card"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Nom *</label>
                  <Input value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Votre nom complet" className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@entreprise.ma" className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Téléphone</label>
                  <Input value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="06 XX XX XX XX" className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Entreprise</label>
                  <Input value={form.company} onChange={(e) => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Nom de votre entreprise" className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Votre besoin</label>
                <Select value={form.need} onValueChange={(v) => setForm(p => ({ ...p, need: v }))}>
                  <SelectTrigger className="rounded-xl"><SelectValue placeholder="Sélectionnez" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formation">Formation</SelectItem>
                    <SelectItem value="certification">Certification ISO</SelectItem>
                    <SelectItem value="rse">RSE</SelectItem>
                    <SelectItem value="eie">Étude réglementaire</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Décrivez brièvement votre projet..." rows={4} className="rounded-xl" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base rounded-xl py-6 glow-orange">
                Demander mon diagnostic gratuit
              </Button>
              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Vos données restent confidentielles
              </p>
            </motion.form>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default Index;
