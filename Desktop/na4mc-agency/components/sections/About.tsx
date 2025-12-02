import { CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square bg-secondary rounded-2xl overflow-hidden relative">
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center text-muted-foreground">
                [Image: Gründer/Team in Wüsten/Nomaden Setting]
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-lg border border-border max-w-xs">
              <p className="font-bold text-lg mb-1">Authentisch</p>
              <p className="text-sm text-muted-foreground">Gründer mit eigener Migrations- & Business-Erfahrung.</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Bridging Faith & Business.</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Wir sind nicht nur eine Agentur. Wir sind muslimische Unternehmer, die den Spagat zwischen modernen Business-Strategien und unseren Werten verstehen. Gegründet als US-LLC, leben wir das digitale Nomadentum und bringen internationale Best-Practices in den deutschsprachigen Markt.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Muslimische Zielgruppenpsychologie</h3>
                  <p className="text-muted-foreground text-sm">Wir kennen die kulturellen Codes und Trigger.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Datengetrieben & Transparent</h3>
                  <p className="text-muted-foreground text-sm">Ergebnisse zählen, nicht nur Likes. Echte Amanah.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">US LLC & Nomadentum</h3>
                  <p className="text-muted-foreground text-sm">Wissen aus erster Hand für steueroptimiertes Arbeiten.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

