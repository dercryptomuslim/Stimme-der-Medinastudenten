import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { SuccessStoriesTeaser } from "@/components/success-stories-teaser";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { StatsSection } from "@/components/stats-section";
import { ProcessSteps } from "@/components/process-steps";
import { BlogTeaser } from "@/components/blog-teaser";
import { InvestmentBanner } from "@/components/investment-banner";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Hero />
        <About />
        <Services />
        <ProcessSteps />
        <SuccessStoriesTeaser />
        <InvestmentBanner />
        <StatsSection />
        <BlogTeaser />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
