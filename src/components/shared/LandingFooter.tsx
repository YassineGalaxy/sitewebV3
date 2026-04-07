import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

const services = [
  { label: "Formation Professionnelle", href: "#services" },
  { label: "Conseil & Certification", href: "#services" },
  { label: "RSE", href: "#services" },
  { label: "Études Environnementales", href: "#services" },
  { label: "Sécurité Incendie", href: "#services" },
];

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden hero-mesh grain">
      <div className="container px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1 */}
          <div className="space-y-5">
            <Logo variant="light" />
            <p className="text-sm text-primary-foreground/50 leading-relaxed max-w-xs">
              Cabinet de conseil et formation QHSE depuis 2008. Nous accompagnons les entreprises marocaines vers l'excellence.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-secondary/20 transition-colors">
                <svg className="w-4 h-4 text-primary-foreground/70" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-secondary/20 transition-colors">
                <svg className="w-4 h-4 text-primary-foreground/70" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-5 text-primary-foreground/80">
              Nos Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => scrollTo(s.href)}
                    className="text-sm text-primary-foreground/50 hover:text-secondary transition-colors inline-flex items-center gap-1 group"
                  >
                    {s.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-5 text-primary-foreground/80">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/50">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-secondary" />
                </div>
                06 62 81 71 30
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/50">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-secondary" />
                </div>
                contact@galaxysolutions.ma
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/50">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-secondary" />
                </div>
                Bd Zerktouni, Kamal Park Centre, Mohammedia
              </li>
            </ul>
          </div>

          {/* Col 4 — CTA */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-5 text-primary-foreground/80">
              Commencez maintenant
            </h4>
            <p className="text-sm text-primary-foreground/50 leading-relaxed mb-5">
              Discutons de votre projet lors d'un échange gratuit.
            </p>
            <button
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm font-medium transition-colors glow-orange"
            >
              Nous contacter
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 relative z-10">
        <div className="container px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-primary-foreground/30">
            © {currentYear} Galaxy Solutions. Tous droits réservés.
          </p>
          <p className="text-xs text-primary-foreground/30">
            Mohammedia, Maroc
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
