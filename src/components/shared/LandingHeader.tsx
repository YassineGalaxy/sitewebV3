import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Formation", to: "#services" },
  { label: "Conseil", to: "#services" },
  { label: "RSE", to: "#services" },
  { label: "Études", to: "#services" },
  { label: "Contact", to: "#contact" },
];

const LandingHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[70px] ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div
        className="absolute bottom-0 left-0 h-[2px] scroll-progress"
        style={{ width: `${progress * 100}%` }}
      />
      <div className="container flex items-center justify-between h-full px-6">
        <Logo variant={scrolled ? "dark" : "light"} />
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.to)}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-2 ml-3">
            <Button variant="ghost" size="sm" asChild className={scrolled ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}>
              <a href="/login">Connexion</a>
            </Button>
            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground" onClick={() => scrollTo("#contact")}>
              Demander un devis
            </Button>
          </div>
        </nav>
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className={scrolled ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}>
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.label} onClick={() => scrollTo(link.to)}>
                  {link.label}
                </DropdownMenuItem>
              ))}
              <div className="border-t border-border my-1" />
              <DropdownMenuItem asChild>
                <a href="/login" className="w-full cursor-pointer">Connexion</a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => scrollTo("#contact")}>
                Demander un devis
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
