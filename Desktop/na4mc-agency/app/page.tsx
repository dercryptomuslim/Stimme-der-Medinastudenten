import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { MarketingExplainer } from "@/components/sections/MarketingExplainer";
import { Automation } from "@/components/sections/Automation";
import { Consulting } from "@/components/sections/Consulting";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Stats />
      <MarketingExplainer />
      <Automation />
      <Consulting />
      <Testimonials />
      <Footer />
    </main>
  );
}

