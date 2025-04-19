
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Shield } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl">SecureTeams</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="#scanner" className="text-foreground/80 hover:text-foreground transition-colors">
            Scanner
          </Link>
          <Link to="#policy" className="text-foreground/80 hover:text-foreground transition-colors">
            Policy Template
          </Link>
          <Link to="#contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" className="hidden md:flex">
            Contact Sales
          </Button>
        </div>
      </div>
    </header>
  );
}
