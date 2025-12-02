import { Button } from "@/components/ui/button";

export function Consulting() {
  return (
    <section className="py-20 bg-foreground text-background">
       <div className="container px-4 mx-auto text-center max-w-4xl">
         <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Unternehmerische Freiheit & US LLC Setup</h2>
         <p className="text-lg text-gray-300 mb-10 leading-relaxed">
           Vom richtigen Mindset bis zum rechtlichen Setup. Wir teilen unser Wissen, wie man als digitaler Unternehmer ortsunabhängig und steueroptimiert lebt und arbeitet. Profitiere von unserer Erfahrung mit US-LLCs und internationalem Business.
         </p>
         <Button variant="outline" className="text-white border-white hover:bg-white hover:text-foreground">
           Beratungstermin vereinbaren
         </Button>
       </div>
    </section>
  );
}

