import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tighter text-foreground flex items-center gap-2">
          <span className="text-primary text-2xl">NA4MC</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">Über Uns</Link>
          <Link href="#results" className="text-sm font-medium hover:text-primary transition-colors">Ergebnisse</Link>
          <Button variant="default" className="font-semibold">Erstgespräch buchen</Button>
        </div>

        <button className="md:hidden text-foreground">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
}

