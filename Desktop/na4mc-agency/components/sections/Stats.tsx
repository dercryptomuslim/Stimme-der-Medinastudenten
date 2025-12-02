export function Stats() {
  return (
    <section className="py-20 bg-foreground text-background">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">4M €+</div>
            <div className="text-sm md:text-base text-background/80">Umsatz für Kunden</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">300k+</div>
            <div className="text-sm md:text-base text-background/80">Social Media Follower</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">14k+</div>
            <div className="text-sm md:text-base text-background/80">Qualifizierte Leads</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold text-primary">2.4k+</div>
            <div className="text-sm md:text-base text-background/80">Zahlende Kunden</div>
          </div>
        </div>
      </div>
    </section>
  );
}

