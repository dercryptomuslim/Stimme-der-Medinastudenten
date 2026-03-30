import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Voice of the Medina Students",
  description: "Information about privacy and the processing of personal data on stimme-medinastudenten.de in accordance with GDPR.",
  alternates: {
    canonical: "/en/privacy",
    languages: {
      "de": "/datenschutz",
      "en": "/en/privacy",
    },
  },
  openGraph: {
    title: "Privacy Policy | Voice of the Medina Students",
    description: "Information about privacy and the processing of personal data.",
    url: "https://www.stimme-medinastudenten.de/en/privacy",
    siteName: "Voice of the Medina Students",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Voice of the Medina Students",
    description: "Information about privacy and the processing of personal data.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyEnPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col scroll-smooth">
      <Navbar />

      <section className="relative pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Privacy Policy
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="prose prose-slate lg:prose-lg mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Overview</h2>
            <p className="text-slate-600 mb-4">
              This privacy policy explains what happens to your personal data when you visit this
              website. “Personal data” is any data with which you can be personally identified.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Data collection on this website</h3>
            <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Who is responsible?</h4>
            <p className="text-slate-600 mb-4">
              Data processing on this website is carried out by the website operator. Contact
              details can be found in the “Controller” section below.
            </p>

            <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">How do we collect data?</h4>
            <p className="text-slate-600 mb-4">
              Some data is collected when you provide it to us — for example, data you enter into a
              contact form. Other data is collected automatically when you visit the website (e.g.
              browser, operating system, time of access). This collection happens automatically as
              soon as you enter the site.
            </p>

            <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">What do we use your data for?</h4>
            <p className="text-slate-600 mb-4">
              Part of the data is required to ensure the website is provided without errors. Other
              data may be used to analyze user behavior. If contracts can be initiated or concluded
              via the website, submitted data may also be processed to handle offers, orders, or
              service requests.
            </p>

            <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Your rights</h4>
            <p className="text-slate-600 mb-4">
              You have the right to receive information about the origin, recipient and purpose of
              your stored personal data free of charge. You also have the right to request
              correction or deletion of this data, and — where applicable — to request restriction
              of processing. If you have given consent, you can withdraw it at any time with effect
              for the future. You may also have the right to lodge a complaint with a supervisory
              authority.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Hosting</h2>
            <p className="text-slate-600 mb-4">
              We host the contents of our website with the following provider:
            </p>
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Alfahosting</h3>
            <p className="text-slate-600 mb-4">
              Provider is Alfahosting GmbH, Ankerstraße 3b, 06108 Halle (Saale), Germany. When you
              visit our website, Alfahosting collects various log files, including IP addresses.
            </p>
            <p className="text-slate-600 mb-4">
              More details:{" "}
              <a
                href="https://alfahosting.de/datenschutz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                https://alfahosting.de/datenschutz/
              </a>
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">
              3. Controller (responsible entity)
            </h2>
            <p className="text-slate-600 mb-4">The controller for data processing on this website is:</p>
            <p className="text-slate-600 mb-4">
              Stimme der Medinastudenten e.V.
              <br />
              Medina
              <br />
              Saudi Arabia
            </p>
            <p className="text-slate-600 mb-4">
              Email: kontakt@stimme-medinastudenten.de
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Cookies</h2>
            <p className="text-slate-600 mb-4">
              This website may use cookies. Cookies are small text files stored on your device.
              Some cookies are necessary for the website to function properly; others may be used
              for analytics or to improve user experience. You can configure your browser to inform
              you about cookie usage and to allow cookies only in individual cases, to exclude
              cookies for certain cases or in general, and to automatically delete cookies when
              closing the browser.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Contact forms & inquiries</h2>
            <p className="text-slate-600 mb-4">
              If you send us inquiries via the contact form or via the funnel, the details you
              provide (e.g. name, email, phone number, message) are processed to handle your
              request. We do not share this data with third parties unless required to fulfill the
              request or required by law.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">6. Third-party services</h2>
            <p className="text-slate-600 mb-4">
              Our website may link to third-party services (e.g. YouTube, Instagram, Google
              services). When you use these services, the respective providers may process personal
              data according to their policies.
            </p>

            <p className="text-slate-500 text-sm mt-12 border-t border-slate-200 pt-4">
              For the full German legal text, please see the German version of this privacy policy.
            </p>
          </div>
        </div>
      </section>

      <Footer locale="en" />
    </main>
  );
}

