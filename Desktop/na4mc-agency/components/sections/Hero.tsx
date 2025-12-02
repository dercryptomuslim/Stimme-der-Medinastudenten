import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      {/* Background Pattern - subtle noise or lines could be added here via CSS */}
      <div className="absolute inset-0 opacity-10 bg-[url('/bg-pattern.svg')] bg-repeat opacity-5"></div>
      
      <div className="container px-4 mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up">
          <Star className="w-4 h-4 fill-primary" />
          <span>#1 Agency für Muslim Brands im DACH-Raum</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-tight">
          Halal Growth Marketing für die <span className="text-primary">digitale Ära</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Wir skalieren muslimische Brands durch datengetriebenes Social Media, Performance Ads & ethische Automatisierung.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12">
            Kostenloses Erstgespräch
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-12">
            Case Studies ansehen
          </Button>
        </div>

        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <div className="flex -space-x-2">
            {/* Avatars placeholder */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p>Vertraut von über 50+ muslimischen Unternehmen</p>
          <p className="font-semibold text-foreground">4 Mio. € generierter Umsatz</p>
        </div>
      </div>
    </section>
  );
}

