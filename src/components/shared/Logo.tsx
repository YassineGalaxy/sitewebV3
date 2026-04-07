import logoImage from "@/assets/logo-galaxy.png";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

const Logo = ({ variant = "dark", className = "" }: LogoProps) => {
  const isLight = variant === "light";
  return (
    <a href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <img
        src={logoImage}
        alt="Galaxy Solutions"
        className={`h-10 w-auto object-contain transition-opacity duration-200 ${
          isLight ? "brightness-0 invert" : ""
        }`}
      />
    </a>
  );
};

export default Logo;
