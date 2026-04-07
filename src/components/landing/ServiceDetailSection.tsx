import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, CheckCircle2, ChevronRight,
  GraduationCap, Award, Leaf, TreePine, Flame,
  BookOpen, Users, Target, ClipboardCheck, Shield, FileSearch,
  BarChart3, Briefcase, Zap, AlertTriangle, Factory, Building2,
} from "lucide-react";

import formationImg from "@/assets/services/formation.jpg";
import conseilImg from "@/assets/services/conseil.jpg";
import rseImg from "@/assets/services/rse.jpg";
import etudesImg from "@/assets/services/etudes.jpg";
import securiteImg from "@/assets/services/securite-incendie.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

interface ServiceData {
  id: string;
  icon: typeof GraduationCap;
  title: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  features: { icon: typeof BookOpen; title: string; desc: string }[];
  highlights: string[];
  methodology?: string[];
  cta: string;
}

const servicesData: ServiceData[] = [
  {
    id: "service-formation",
    icon: GraduationCap,
    title: "Formation Professionnelle",
    tagline: "Investir dans la formation, c'est conjuguer au présent et au futur le souci des hommes et le souci des résultats.",
    description: "Galaxy Solutions vous accompagne pas à pas dans le développement de vos compétences. Spécialisé dans l'ingénierie de formation professionnelle, nous regroupons des experts et des formateurs qui mettent leur savoir-faire au service de la compétitivité des entreprises et de la performance des salariés.",
    image: formationImg,
    accent: "from-secondary to-landing-glow",
    features: [
      { icon: BookOpen, title: "Ingénierie pédagogique", desc: "Conception de parcours sur-mesure adaptés à vos métiers et à vos objectifs opérationnels." },
      { icon: Users, title: "Pédagogie de l'entraînement", desc: "Challenges, outils et mises en situation pour transformer le quotidien en source d'apprentissage." },
      { icon: Target, title: "Formations QHSE", desc: "Qualité, Hygiène, Sécurité, Environnement, Management, Audits internes, RSE." },
      { icon: BarChart3, title: "Évaluation & suivi", desc: "Mesure de l'impact de nos formations et accompagnement post-formation." },
    ],
    highlights: [
      "+1700 jours de formation délivrés",
      "49 experts et formateurs spécialisés",
      "Formations intra et inter-entreprises",
      "Approche participative et opérationnelle",
      "Supports pédagogiques innovants",
      "Évaluation à chaud et à froid",
    ],
    methodology: [
      "Analyse des besoins et diagnostic",
      "Conception du programme sur-mesure",
      "Animation par des experts terrain",
      "Évaluation et plan de progrès",
    ],
    cta: "Demander un programme de formation",
  },
  {
    id: "service-conseil",
    icon: Award,
    title: "Conseil & Certification",
    tagline: "Obtenez vos certifications avec un accompagnement de bout en bout par des consultants confirmés.",
    description: "Fort de sa solide expérience dans l'accompagnement des entreprises en vue d'améliorer leurs performances QHSE, Galaxy Solutions s'engage à mettre à votre disposition sa forte valeur ajoutée, assure un accompagnement adapté selon votre activité et met à votre disposition des consultants confirmés dans le domaine.",
    image: conseilImg,
    accent: "from-landing-teal to-landing-blue",
    features: [
      { icon: ClipboardCheck, title: "Systèmes de management", desc: "Mise en place des SMQ, SME, SMSST selon ISO 9001, 14001, 45001." },
      { icon: Shield, title: "Sécurité alimentaire", desc: "HACCP, ISO/FSSC 22000, BRC, IFS — accompagnement complet jusqu'à la certification." },
      { icon: FileSearch, title: "Audits internes", desc: "Préparation des référentiels, plan d'échantillonnage, réalisation d'audits sur site." },
      { icon: Briefcase, title: "Conseil sur-mesure", desc: "Prestations personnalisées s'appuyant sur l'efficacité et la performance." },
    ],
    highlights: [
      "ISO 9001, ISO 14001, ISO 45001",
      "HACCP, ISO/FSSC 22000, BRC, IFS",
      "ISO 50001, ISO 21001, ISO 13485",
      "ISO 17025, Labels qualité",
      "Audits 1ère et 2ème partie",
      "Plans d'actions correctives",
    ],
    methodology: [
      "Diagnostic de maturité organisationnelle",
      "Construction du système de management",
      "Déploiement et formation des équipes",
      "Audit à blanc et accompagnement certification",
    ],
    cta: "Planifier un diagnostic certification",
  },
  {
    id: "service-rse",
    icon: Leaf,
    title: "Démarche RSE",
    tagline: "Répondez aux exigences RSE de vos clients internationaux et renforcez l'image de votre entreprise.",
    description: "Galaxy Solutions vous accompagne efficacement à la mise en place d'une démarche RSE et à l'obtention des labels RSE selon une méthodologie efficiente. Parce que vos clients sont de plus en plus réceptifs aux arguments du développement durable, et que ce critère est fréquemment pris en compte dans les nouveaux marchés.",
    image: rseImg,
    accent: "from-success to-landing-teal",
    features: [
      { icon: Target, title: "Stratégie RSE", desc: "Établir une stratégie RSE et un plan d'action aligné sur vos enjeux business." },
      { icon: BarChart3, title: "Indicateurs RSE", desc: "Construire vos indicateurs RSE pour piloter et mesurer votre performance." },
      { icon: FileSearch, title: "État des lieux", desc: "Réaliser un diagnostic complet de votre maturité RSE." },
      { icon: Zap, title: "Labels & Audits", desc: "SMETA, BSCI, ICS, INDITEX, DISNEY — accompagnement aux audits sociaux." },
    ],
    highlights: [
      "Audits SMETA, BSCI, ICS",
      "Conformité INDITEX, DISNEY",
      "Stratégie développement durable",
      "Indicateurs de performance RSE",
      "Attractivité et image employeur",
      "Conformité réglementaire",
    ],
    methodology: [
      "État des lieux et diagnostic RSE",
      "Définition de la stratégie et plan d'action",
      "Déploiement et construction des indicateurs",
      "Communication, valorisation et crédibilisation",
    ],
    cta: "Lancer votre démarche RSE",
  },
  {
    id: "service-etudes",
    icon: TreePine,
    title: "Études Environnementales",
    tagline: "Acceptabilité environnementale pour vos projets — Conformité Loi 12.03.",
    description: "L'étude d'impact sur l'environnement (EIE) est un dossier indispensable à toute demande de permis de construire pour des ouvrages susceptibles d'avoir des incidences sur l'environnement. Nos ingénieurs peuvent prendre en charge tout dossier d'étude d'impact et d'enquête publique, et assister les pétitionnaires dans leurs démarches de concertation.",
    image: etudesImg,
    accent: "from-landing-blue to-landing-teal",
    features: [
      { icon: FileSearch, title: "Études d'impact (EIE)", desc: "Étude préalable pour déterminer les mesures de suppression, atténuation ou compensation des impacts négatifs." },
      { icon: AlertTriangle, title: "Études de dangers (EDD)", desc: "Inventaire des dangers, analyse des risques et proposition de mesures de prévention." },
      { icon: Building2, title: "Enquêtes publiques", desc: "Organisation de réunions, présentation des projets, dossiers d'information." },
      { icon: Shield, title: "Conformité réglementaire", desc: "Obtention de la décision d'acceptabilité environnementale (Loi n°12.03)." },
    ],
    highlights: [
      "Études d'impact sur l'environnement",
      "Études de dangers industriels",
      "Cartographie des risques",
      "Enquêtes publiques",
      "Conformité Loi 12.03",
      "57+ études réalisées",
    ],
    methodology: [
      "Analyse du contexte et cadrage réglementaire",
      "Étude terrain et collecte des données",
      "Rédaction du dossier et mesures compensatoires",
      "Accompagnement à l'enquête publique",
    ],
    cta: "Demander une étude environnementale",
  },
  {
    id: "service-securite",
    icon: Flame,
    title: "Sécurité Incendie",
    tagline: "Protégez vos installations avec des solutions de prévention et de protection sur-mesure.",
    description: "Notre bureau est spécialisé dans la sécurité incendie, la gestion des risques industriels, le risque d'explosion et les formations associées à la sécurité. Nous concevons des solutions de prévention et de protection incendie en toute indépendance des installateurs, en recherchant systématiquement le meilleur rapport qualité/prix.",
    image: securiteImg,
    accent: "from-destructive to-secondary",
    features: [
      { icon: FileSearch, title: "Diagnostic sécurité", desc: "Diagnostic complet de sécurité incendie, analyse de la vulnérabilité et des besoins." },
      { icon: Shield, title: "Plans directeurs", desc: "Élaboration des plans directeurs de prévention et de protection incendie." },
      { icon: Factory, title: "Audits incendie", desc: "Audits pour analyser les risques et proposer des actions de protection optimales." },
      { icon: ClipboardCheck, title: "Procédures & Formation", desc: "Rédaction de politiques, procédures et sensibilisation du personnel." },
    ],
    highlights: [
      "Études de dangers et d'impact",
      "Cartographie des risques incendie",
      "Solutions prévention & protection",
      "Risques d'explosion (ATEX)",
      "Formation sécurité du personnel",
      "Indépendance totale des installateurs",
    ],
    methodology: [
      "Diagnostic et étude des risques incendie",
      "Analyse de vulnérabilité et identification des besoins",
      "Conception du plan directeur de prévention",
      "Formation du personnel et mise en conformité",
    ],
    cta: "Planifier un audit sécurité incendie",
  },
];

const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

export default function ServiceDetailSections() {
  return (
    <>
      {servicesData.map((service, idx) => {
        const isReversed = idx % 2 === 1;

        return (
          <section
            key={service.id}
            id={service.id}
            className={`py-24 relative overflow-hidden ${idx % 2 === 0 ? "bg-background" : "bg-landing-alt"}`}
          >
            {/* Background decorative elements */}
            <div className={`absolute ${isReversed ? "left-0" : "right-0"} top-0 w-[500px] h-[500px] rounded-full bg-secondary/[0.03] blur-3xl -translate-y-1/4 ${isReversed ? "-translate-x-1/4" : "translate-x-1/4"}`} />

            <div className="container px-6 relative z-10">
              {/* Section header */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="mb-16"
              >
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.accent} flex items-center justify-center`}>
                    <service.icon className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                    {service.title}
                  </span>
                </motion.div>
              </motion.div>

              {/* Hero block: image + text */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 ${isReversed ? "lg:direction-rtl" : ""}`}
              >
                <motion.div
                  variants={fadeUp}
                  className={`${isReversed ? "lg:order-2" : ""}`}
                >
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-secondary font-medium text-sm italic mb-6 leading-relaxed">
                    "{service.tagline}"
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <Button
                    onClick={() => scrollTo("#contact")}
                    className={`bg-gradient-to-r ${service.accent} text-secondary-foreground rounded-xl px-8 py-6 text-base glow-orange-hover transition-all duration-300`}
                  >
                    {service.cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>

                <motion.div
                  variants={scaleIn}
                  className={`${isReversed ? "lg:order-1" : ""} relative group`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[320px] lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent`} />
                  </div>
                  {/* Floating badge */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 lg:bottom-6 lg:-right-6 glass-light rounded-xl px-5 py-3 shadow-soft"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <p className="font-display font-bold text-foreground text-sm">{service.highlights[0]}</p>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Features grid */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              >
                {service.features.map((f) => (
                  <motion.div
                    key={f.title}
                    variants={scaleIn}
                    className="group relative p-6 rounded-2xl bg-card border border-border hover:border-secondary/20 transition-all duration-500 tilt-card overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary/15 to-transparent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <f.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <h4 className="font-display font-semibold text-foreground mb-2">{f.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom row: highlights + methodology */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Highlights */}
                <motion.div
                  variants={fadeUp}
                  className="p-8 rounded-2xl bg-card border border-border"
                >
                  <h4 className="font-display font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    Points clés
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2.5 text-sm text-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.accent} shrink-0`} />
                        {h}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Methodology */}
                {service.methodology && (
                  <motion.div
                    variants={fadeUp}
                    className="p-8 rounded-2xl bg-card border border-border"
                  >
                    <h4 className="font-display font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                      <ChevronRight className="w-5 h-5 text-secondary" />
                      Notre démarche
                    </h4>
                    <div className="space-y-4">
                      {service.methodology.map((step, i) => (
                        <div key={step} className="flex items-start gap-4 group/step">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${service.accent} text-secondary-foreground flex items-center justify-center text-xs font-bold shrink-0 group-hover/step:scale-110 transition-transform duration-300`}>
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <p className="text-sm text-foreground pt-1.5 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export { servicesData };
