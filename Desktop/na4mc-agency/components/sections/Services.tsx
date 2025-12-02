import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Video, DollarSign, Bot, Globe, BookOpen, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Social Media Growth",
    desc: "TikTok, Instagram & YouTube Strategien, die echte Reichweite aufbauen. Branding & Content Creation für muslimische Zielgruppen.",
  },
  {
    icon: DollarSign,
    title: "Performance Ads",
    desc: "Meta, TikTok & Google Ads. Skalierbare Kampagnen mit Multi-Touch Attribution und Fokus auf ROAS.",
  },
  {
    icon: Users,
    title: "Influencer Marketing",
    desc: "Zugang zu 100+ muslimischen Content Creatorn. Micro-Influencer Kampagnen & Ambassador-Systeme.",
  },
  {
    icon: Video,
    title: "Content Strategy",
    desc: "Virale Content Funnels, Storytelling und Hook-Entwicklung. Wir verwandeln Viewer in Kunden.",
  },
  {
    icon: Bot,
    title: "Automation & AI",
    desc: "Lead-Automation mit n8n & AI Agents. CRM-Integration und automatische WhatsApp Funnels.",
  },
  {
    icon: Globe,
    title: "Consulting & Setup",
    desc: "Skalierungsstrategien, Business Setup (US LLC), Marktpositionierung und Pricing für Muslime.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Unsere Expertise für dein Wachstum</h2>
          <p className="text-muted-foreground text-lg">
            Alles was du brauchst, um als muslimische Brand im DACH-Raum zu dominieren.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-border/50 hover:border-primary/50 transition-all hover:shadow-md bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

