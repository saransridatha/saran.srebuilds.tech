import { useState, useEffect } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const themes = [
  { id: "fedora", label: "Fedora", color: "#3c78d8" },
  { id: "arch", label: "Arch", color: "#1793d1" },
  { id: "ubuntu", label: "Ubuntu", color: "#E95420" },
  { id: "dracula", label: "Dracula", color: "#bd93f9" },
  { id: "gruvbox", label: "Gruvbox", color: "#fabd2f" },
];

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("fedora");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    // Dispatch custom event for deployment overlay
    window.dispatchEvent(new CustomEvent("theme-change", { detail: themeId }));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:justify-center px-8 py-4 transition-all duration-500 ${
        scrolled ? "glass-card border-b border-white/5" : ""
      }`}
    >
      <div className="md:absolute md:left-8">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors outline-none">
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--glow-primary)]" />
            Theme: {currentTheme}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-background/95 backdrop-blur-xl border-white/10 p-2 min-w-[140px]">
            {themes.map((t) => (
              <DropdownMenuItem 
                key={t.id} 
                onClick={() => changeTheme(t.id)}
                className="flex items-center gap-3 cursor-pointer hover:bg-white/5 font-mono text-[10px] uppercase py-2"
              >
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} />
                {t.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            data-magnetic
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary mr-1">0{i + 1}.</span>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
