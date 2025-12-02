import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 pt-20 pb-10 border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-6">NA4MC</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Nomad Agency for Marketing & Consulting LLC.<br/>
              Deine Partner für halal Growth, Content & Automation.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center border border-border">IG</div>
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center border border-border">TK</div>
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center border border-border">LI</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Social Media Growth</li>
              <li>Performance Ads</li>
              <li>Automation & AI</li>
              <li>Consulting & Setup</li>
              <li>Influencer Marketing</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Kontakt</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@na4mc.de</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Termin buchen</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nomad Agency for Marketing & Consulting LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Impressum</span>
            <span>Datenschutz</span>
            <span>AGB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

