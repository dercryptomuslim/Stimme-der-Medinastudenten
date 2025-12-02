import { Button } from "@/components/ui/button";

export function MarketingExplainer() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Warum "Halal" mehr ist als nur ein Label.</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Muslimische Zielgruppen ticken anders. Vertrauen ist die Währung. Wir kennen die kulturellen Codes, die No-Gos und die Trigger, die eine Community wirklich aktivieren. Wir machen Marketing, das sich gut anfühlt – für dich und deine Kunden. Amanah und Transparenz stehen bei uns an erster Stelle.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">Community Building</span>
          <span className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">Ethical Marketing</span>
          <span className="px-4 py-2 bg-secondary rounded-full text-sm font-medium">Authentizität</span>
        </div>
      </div>
    </section>
  );
}

