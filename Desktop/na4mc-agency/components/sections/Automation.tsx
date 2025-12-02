import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Zap, Cpu } from "lucide-react";

export function Automation() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="bg-secondary/20 rounded-3xl p-8 md:p-12 border border-border/50 relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4 fill-primary" />
                <span>Next Gen Marketing</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Automatisierung & AI: Dein Wettbewerbsvorteil.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Während andere noch manuell posten, bauen wir Systeme. Mit n8n und AI-Agents automatisieren wir deine Lead-Gewinnung und deinen Support. 24/7 erreichbar, ohne Burnout.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border shadow-sm">
                  <Cpu className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">AI Agents</h4>
                    <p className="text-sm text-muted-foreground">Intelligenter Support & Sales rund um die Uhr.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border shadow-sm">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">WhatsApp Funnels</h4>
                    <p className="text-sm text-muted-foreground">Direkte Kundenkommunikation, voll automatisiert.</p>
                  </div>
                </div>
              </div>

              <Button>
                Mehr über AI erfahren
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="relative">
               {/* Visual placeholder for automation flow */}
               <div className="aspect-video bg-background rounded-xl border border-border shadow-lg flex items-center justify-center p-8">
                 <div className="w-full h-full bg-secondary/50 rounded-lg flex items-center justify-center text-muted-foreground">
                   [Grafik: n8n Workflow Visualization]
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

