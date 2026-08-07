import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Metadata } from "next";
import { absoluteUrl, IS_INDEXABLE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Stimme der Medinastudenten",
  description: "Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten auf stimme-medinastudenten.de gemäß DSGVO.",
  alternates: {
    canonical: "/datenschutz",
  },
  openGraph: {
    title: "Datenschutzerklärung | Stimme der Medinastudenten",
    description: "Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten.",
    url: absoluteUrl("/datenschutz"),
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Datenschutzerklärung | Stimme der Medinastudenten",
  description: "Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten.",
  },
  robots: IS_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col scroll-smooth">
      <Navbar />
      
      <section className="relative pt-32 pb-16 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
            Datenschutzerklärung
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="prose prose-slate lg:prose-lg mx-auto">
            
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Allgemeine Hinweise</h3>
            <p className="text-slate-600 mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Datenerfassung auf dieser Website</h3>
            
            <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
            <p className="text-slate-600 mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
            </p>

            <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Wie erfassen wir Ihre Daten?</h4>
            <p className="text-slate-600 mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
            <p className="text-slate-600 mb-4">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>

            <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Wofür nutzen wir Ihre Daten?</h4>
            <p className="text-slate-600 mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.
            </p>

            <h4 className="text-lg font-semibold text-slate-900 mt-4 mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
            <p className="text-slate-600 mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
            <p className="text-slate-600 mb-4">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Analyse-Tools und Tools von Drittanbietern</h3>
            <p className="text-slate-600 mb-4">
              Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen. Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Hosting</h2>
            <p className="text-slate-600 mb-4">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Vercel</h3>
            <p className="text-slate-600 mb-4">
              Anbieter ist die Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA (nachfolgend Vercel). Wenn Sie unsere Website besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adressen.
            </p>
            <p className="text-slate-600 mb-4">
              Details entnehmen Sie der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold-dark hover:underline">https://vercel.com/legal/privacy-policy</a>.
            </p>
            <p className="text-slate-600 mb-4">
              Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. für Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="text-slate-600 mb-4">
              Die Datenübermittlung in die USA wird auf die EU-Standardvertragsklauseln gestützt. Vercel ist zudem unter dem EU-US Data Privacy Framework (DPF) zertifiziert.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Datenschutz</h3>
            <p className="text-slate-600 mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="text-slate-600 mb-4">
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>
            <p className="text-slate-600 mb-4">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
            <p className="text-slate-600 mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            {/* TODO vor dem Go-Live: identisch zum Impressum ausfüllen. */}
            <p className="text-slate-600 mb-4">
              [VOLLSTÄNDIGER VOR- UND NACHNAME]<br />
              [STRASSE UND HAUSNUMMER]<br />
              [POSTLEITZAHL UND ORT]<br />
              [LAND]
            </p>
            <p className="text-slate-600 mb-4">
              E-Mail: kontakt@stimme-medinastudenten.de
            </p>
            <p className="text-slate-600 mb-4">
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Speicherdauer</h3>
            <p className="text-slate-600 mb-4">
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
            <p className="text-slate-600 mb-4">
              Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Hinweis zur Datenweitergabe in datenschutzrechtlich nicht sichere Drittstaaten sowie die Weitergabe an US-Unternehmen, die nicht DPF-zertifiziert sind</h3>
            <p className="text-slate-600 mb-4">
              Wir verwenden unter anderem Tools von Unternehmen mit Sitz in datenschutzrechtlich nicht sicheren Drittstaaten sowie US-Tools, deren Anbieter nicht nach dem EU-US-Data Privacy Framework (DPF) zertifiziert sind. Wenn diese Tools aktiv sind, können Ihre personenbezogene Daten in diese Staaten übertragen und dort verarbeitet werden. Wir weisen darauf hin, dass in datenschutzrechtlich unsicheren Drittstaaten kein mit der EU vergleichbares Datenschutzniveau garantiert werden kann.
            </p>
            <p className="text-slate-600 mb-4">
              Wir weisen darauf hin, dass die USA als sicherer Drittstaat grundsätzlich ein mit der EU vergleichbares Datenschutzniveau aufweisen. Eine Datenübertragung in die USA ist danach zulässig, wenn der Empfänger eine Zertifizierung unter dem „EU-US Data Privacy Framework“ (DPF) besitzt oder über geeignete zusätzliche Garantien verfügt. Informationen zu Übermittlungen an Drittstaaten einschließlich der Datenempfänger finden Sie in dieser Datenschutzerklärung.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Empfänger von personenbezogenen Daten</h3>
            <p className="text-slate-600 mb-4">
              Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p className="text-slate-600 mb-4">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4 text-slate-700 text-sm">
              <p className="uppercase font-bold mb-2">WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p>
              <p className="uppercase font-bold">WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).</p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p className="text-slate-600 mb-4">
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Recht auf Datenübertragbarkeit</h3>
            <p className="text-slate-600 mb-4">
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Auskunft, Berichtigung und Löschung</h3>
            <p className="text-slate-600 mb-4">
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Recht auf Einschränkung der Verarbeitung</h3>
            <p className="text-slate-600 mb-4">
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
            </p>
            <ul className="list-disc pl-5 mb-4 text-slate-600 space-y-2">
              <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
              <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
            </ul>
            <p className="text-slate-600 mb-4">
              Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">SSL- bzw. TLS-Verschlüsselung</h3>
            <p className="text-slate-600 mb-4">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
            <p className="text-slate-600 mb-4">
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Widerspruch gegen Werbe-E-Mails</h3>
            <p className="text-slate-600 mb-4">
              Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Datenerfassung auf dieser Website</h2>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Cookies</h3>
            <p className="text-slate-600 mb-4">
              Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
            </p>
            <p className="text-slate-600 mb-4">
              Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
            </p>
            <p className="text-slate-600 mb-4">
              Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies können zur Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden.
            </p>
            <p className="text-slate-600 mb-4">
              Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="text-slate-600 mb-4">
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
            </p>
            <p className="text-slate-600 mb-4">
              Welche Cookies und Dienste auf dieser Website eingesetzt werden, können Sie dieser Datenschutzerklärung entnehmen.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Kontaktformular</h3>
            <p className="text-slate-600 mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="text-slate-600 mb-4">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
            </p>
            <p className="text-slate-600 mb-4">
              Die über das Kontaktformular übermittelten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Google Sheets</h3>
            <p className="text-slate-600 mb-4">
              Die über das Kontaktformular übermittelten Angaben werden in einer Tabelle bei Google Sheets gespeichert. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland. Google verarbeitet die Daten ausschließlich weisungsgebunden für uns; wir haben mit Google einen Vertrag über Auftragsverarbeitung (AVV) geschlossen.
            </p>
            <p className="text-slate-600 mb-4">
              Weitere Informationen finden Sie in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold-dark hover:underline">https://policies.google.com/privacy?hl=de</a>.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Resend</h3>
            <p className="text-slate-600 mb-4">
              Für den Versand der Benachrichtigung über eine neue Anfrage an unser eigenes Postfach nutzen wir den E-Mail-Dienst Resend. Anbieter ist die Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. Dabei werden die von Ihnen im Kontaktformular angegebenen Daten an Resend übermittelt und dort verarbeitet.
            </p>
            <p className="text-slate-600 mb-4">
              Die Nutzung erfolgt auf Grundlage unseres berechtigten Interesses an einer zuverlässigen Bearbeitung eingehender Anfragen (Art. 6 Abs. 1 lit. f DSGVO). Die Datenübermittlung in die USA wird auf die EU-Standardvertragsklauseln gestützt. Weitere Informationen: <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold-dark hover:underline">https://resend.com/legal/privacy-policy</a>.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Analyse-Tools</h2>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Google Analytics</h3>
            <p className="text-slate-600 mb-4">
              Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p className="text-slate-600 mb-4">
              Google Analytics ermöglicht es uns, das Verhalten der Websitebesucher zu erfassen und auszuwerten. Dabei werden verschiedene Nutzungsdaten wie aufgerufene Seiten, Verweildauer, ungefährer Standort und die Herkunft der Zugriffe erhoben. Die IP-Adresse wird gekürzt verarbeitet (IP-Anonymisierung).
            </p>
            <p className="text-slate-600 mb-4">
              Die Speicherung von Google-Analytics-Cookies und der Einsatz dieses Analyse-Tools erfolgen ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG). Ohne Ihre Einwilligung wird Google Analytics nicht geladen. Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die im Browser für diese Website gespeicherten Daten löschen und die Auswahl im Cookie-Hinweis erneut treffen.
            </p>
            <p className="text-slate-600 mb-4">
              Die Datenübermittlung in die USA wird auf die EU-Standardvertragsklauseln gestützt. Wir haben mit Google einen Vertrag über Auftragsverarbeitung (AVV) geschlossen. Weitere Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold-dark hover:underline">https://policies.google.com/privacy?hl=de</a>.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">6. Plugins und Tools</h2>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Google Fonts (lokales Hosting)</h3>
            <p className="text-slate-600 mb-4">
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet dabei nicht statt.
            </p>
            <p className="text-slate-600 mb-4">
              Weitere Informationen zu Google Fonts finden Sie unter <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold-dark hover:underline">https://developers.google.com/fonts/faq</a> und in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="text-navy hover:text-gold-dark hover:underline">https://policies.google.com/privacy?hl=de</a>.
            </p>

            <p className="text-slate-500 text-sm mt-12 border-t border-slate-200 pt-4">
              Quelle: <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer" className="hover:underline">https://www.e-recht24.de</a>
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
