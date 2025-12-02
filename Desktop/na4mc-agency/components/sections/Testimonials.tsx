export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Das sagen unsere Partner</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-secondary/20 p-8 rounded-2xl border border-border/50">
              <div className="flex text-primary mb-4">
                {"★★★★★"}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "NA4MC hat unser Marketing komplett transformiert. Endlich eine Agentur, die unsere Werte versteht und trotzdem knallharte Ergebnisse liefert."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full"></div>
                <div>
                  <div className="font-bold">Muslim Founder {i}</div>
                  <div className="text-xs text-muted-foreground">CEO, E-Commerce Brand</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

