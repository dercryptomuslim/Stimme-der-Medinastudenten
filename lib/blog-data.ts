export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription?: string;
  date: string;
  dateISO: string;
  readTime: string;
  content: string;
  image?: string;
  category: "studium" | "leben" | "bewerbung";
}

export function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) =>
    new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );
}

export const blogCategories = {
  studium: { label: "Studium", icon: "BookOpen" },
  leben: { label: "Leben in Medina", icon: "Home" },
  bewerbung: { label: "Bewerbung", icon: "FileCheck" },
};

export const blogPostsDe: BlogPost[] = [
  {
    slug: "probeaufenthalt-vor-dem-studium",
    image: "/blog/probeaufenthalt.svg",
    title: "Bevor du nach Medina ziehst: Mach dir erst ein Bild",
    excerpt:
      "Warum ein kurzer Probeaufenthalt mit Touristenvisum vor dem Studium so wichtig ist und wie du ihn am besten planst.",
    metaDescription:
      "Probeaufenthalt in Medina vor dem Studium: Warum sich ein Besuch mit Touristenvisum lohnt, wie du ihn planst und was du daraus mitnimmst.",
    date: "10. August 2026",
    dateISO: "2026-08-10",
    readTime: "5 min",
    category: "bewerbung",
    content: `
<p class="lead">Jedes Jahr kommen Brüder mit großen Erwartungen nach Medina, packen ihr ganzes Leben zusammen, kündigen ihren Job, verabschieden sich von der Familie und beginnen ihr Studium an der Islamischen Universität. Und jedes Jahr gibt es auch Brüder, die nach wenigen Monaten wieder abreisen, weil das Leben hier einfach nicht zu ihnen gepasst hat. Nicht weil sie es nicht ernst gemeint hätten, sondern weil sie vorher nie wirklich wussten, worauf sie sich einlassen.</p>

<p>Das lässt sich vermeiden. Und die Lösung ist einfacher, als viele denken.</p>

<h2>Warum ein Probebesuch so wichtig ist</h2>

<p>Medina von außen zu kennen, durch Videos, Erzählungen oder ein paar Wochen Umrah, ist etwas völlig anderes, als hier tatsächlich als Student zu leben. Der Alltag zwischen Vorlesungen, Halaqat, Wohnungssuche, Verwaltung und dem Leben fernab der Familie fühlt sich anders an, als man es sich zu Hause vorstellt.</p>

<p>Ein kurzer Aufenthalt vor dem eigentlichen Studienbeginn gibt dir die Möglichkeit, das wirklich zu spüren, bevor du eine langfristige Entscheidung triffst. Das ist heute unkomplizierter als je zuvor, du brauchst kein Stipendium und keine Immatrikulation, um herzukommen und dir selbst ein Bild zu machen.</p>

<h2>Wie so ein Probeaufenthalt aussehen kann</h2>

<h3>Visum beantragen</h3>

<p>Über die offizielle Seite ein Touristenvisum für Saudi-Arabien beantragen. Das geht mittlerweile unkompliziert online und ist innerhalb weniger Tage erledigt.</p>

<h3>Unterkunft organisieren</h3>

<p>Für die ersten Tage ein Hotel oder eine Unterkunft über Airbnb buchen. Danach lohnt es sich, nach einer möblierten Wohnung auf Zeit zu suchen, so wie viele Studenten hier tatsächlich leben, das gibt dir ein realistischeres Bild als ein Hotelzimmer.</p>

<h3>Etwas Geld einplanen</h3>

<p>Du brauchst kein großes Budget, aber genug, um einige Wochen zu leben, ohne dich ständig sorgen zu müssen. Das nimmt Druck raus und lässt dich die Zeit wirklich nutzen.</p>

<h3>Die Universität besuchen</h3>

<p>Geh zur Islamischen Universität, schau dir das Gelände an, sprich mit Studenten vor Ort, wenn möglich, sitz in einer Vorlesung oder einer Halaqah mit. So bekommst du ein echtes Gefühl für den akademischen Alltag, nicht nur eine Vorstellung davon.</p>

<h3>In einer Halaqah mitlaufen</h3>

<p>Schreib dich für die Zeit deines Aufenthalts in einer Halaqah ein und nimm ehrlich am Ablauf teil, so wie ein Student es später tun würde. Frühes Aufstehen, feste Zeiten, das Lernen selbst, all das gehört dazu.</p>

<h3>Den Alltag eines Studenten nachleben</h3>

<p>Versuch für ein paar Wochen wirklich so zu leben, wie ein Student hier lebt. Einkaufen, kochen, zur Moschee gehen, den Tagesrhythmus einhalten. Genau das zeigt dir, ob dieses Leben zu dir passt.</p>

<h2>Was du daraus mitnimmst</h2>

<p>Nach so einem Aufenthalt weißt du deutlich klarer, ob Medina und das Studentenleben hier wirklich das Richtige für dich sind. Diese Klarheit ist wertvoll, in beide Richtungen.</p>

<p>Wenn es passt, gehst du mit echtem Vertrauen in deinen Umzug, du weißt, worauf du dich einlässt, und die Umstellung fällt dir leichter, weil du sie schon einmal erlebt hast.</p>

<p>Wenn es nicht passt, hast du eine wichtige Entscheidung getroffen, bevor du dein Leben zu Hause aufgegeben hast. Das ist keine Niederlage, das ist Weisheit.</p>

<h2>Ein Punkt, der oft übersehen wird</h2>

<p>Es geht hier nicht nur um dich selbst. Jeder Studienplatz und jedes Stipendium, das jemand beginnt und dann abbricht, hätte auch einem anderen Bruder zugutekommen können, der wirklich bereit war und durchgehalten hätte. Wenn du dir vorher ein ehrliches Bild machst, schützt du nicht nur deine eigene Zeit und dein Vertrauen, sondern respektierst auch die Gelegenheit selbst und die, die sie ernsthaft suchen.</p>

<p>Ein paar Wochen Probeaufenthalt kosten wenig im Vergleich zu dem, was ein abgebrochenes Studium an Zeit, Geld und Enttäuschung kosten kann, für dich und für andere. Mach dir erst ein Bild, dann triff deine Entscheidung.</p>
`,
  },
  {
    slug: "bewerbungstipps",
    image: "/blog/bewerbung.svg",
    title: "Bewerbung an der Islamischen Universität Medina – der Ablauf im Überblick",
    excerpt:
      "Voraussetzungen, Unterlagen und der Weg über das Portal Minhati – was Studieninteressierte aus dem DACH-Raum vor der Bewerbung wissen sollten.",
    metaDescription:
      "Bewerbung an der Islamischen Universität Medina: Voraussetzungen, benötigte Unterlagen, Altersgrenzen und der Ablauf über das Portal Minhati.",
    date: "7. August 2026",
    dateISO: "2026-08-07",
    readTime: "6 min",
    category: "bewerbung",
    content: `
<p class="lead">Die Bewerbung an der Islamischen Universität Medina läuft anders ab als an einer deutschen Hochschule. Es gibt kein zentrales Portal wie Hochschulstart, keine Bewerbungsfrist, die überall gleich kommuniziert wird, und keine Studienberatung, die man anrufen kann. Dieser Text ordnet die Schritte, die tatsächlich anfallen.</p>

<h2>Bevor die Unterlagen zusammengesucht werden</h2>

<p>Der erste Schritt ist kein formaler. Bevor man diesen Weg einschlägt, sollte man sich ernsthaft damit auseinandersetzen, ob er wirklich der eigene ist. Das Streben nach Wissen ist keine kurzfristige Angelegenheit, sondern eine lebenslange Aufgabe.</p>

<p>Drei Fragen helfen bei der Einordnung:</p>

<ul>
  <li><strong>Was ist mein Ziel?</strong> Ein Abschluss ist nicht dasselbe wie Wissen, und Wissen ist nicht dasselbe wie danach zu handeln.</li>
  <li><strong>Warum möchte ich studieren?</strong> Aufrichtigkeit gehört zu den wichtigsten Grundlagen. Es geht nicht darum, mit einem Titel zurückzukehren.</li>
  <li><strong>Was habe ich bereits für diesen Weg getan?</strong> Wer sich bisher nicht mit den Grundlagen befasst hat, wird das in Medina nachholen müssen – nur dann unter erheblich höherem Druck.</li>
</ul>

<p>Diese Selbstprüfung ist kein Beiwerk. Sie entscheidet häufiger über den Verlauf des Studiums als die Formalien.</p>

<h2>Die formalen Voraussetzungen</h2>

<p>Für ein Bachelorstudium gelten im Wesentlichen folgende Punkte:</p>

<ul>
  <li>Hochschulreife – Abitur, Matura oder ein gleichwertiger Abschluss</li>
  <li>Gültiger Reisepass, mindestens sechs Monate über den Bewerbungszeitpunkt hinaus gültig</li>
  <li>Digitales Passbild</li>
  <li>Ärztliches Gutachten, das die Freiheit von ansteckenden Krankheiten bescheinigt</li>
  <li>Zwei Tazkiyah – Empfehlungsschreiben</li>
  <li>Altersgrenze: bis 25 Jahre für den Bachelor, bis 30 Jahre für den Master</li>
  <li>Muslim, gutes Benehmen und Verhalten</li>
  <li>Bereitschaft, sich an die Regeln der Universität zu halten</li>
  <li>Körperliche Eignung für das Studium</li>
</ul>

<p>Die Altersgrenze ist der Punkt, an dem die meisten Bewerbungen scheitern, bevor sie begonnen haben. Wer nah an der Grenze ist, sollte sich nicht auf das kommende Jahr vertrösten.</p>

<h3>Zur Tazkiyah</h3>

<p>Die beiden Empfehlungsschreiben sind keine Formsache, die sich kurz vor Abgabe erledigen lässt. Sie sollten von Personen stammen, die einen tatsächlich kennen und die Auskunft über Charakter und bisherigen Lernweg geben können. Wer erst bei der Bewerbung merkt, dass niemand in Frage kommt, hat ein Problem, das sich nicht mit einem Formular lösen lässt.</p>

<h2>Vorher hinfahren</h2>

<p>Wir empfehlen, vor einer endgültigen Entscheidung mit einem Besuchs- oder Touristenvisum nach Saudi-Arabien zu reisen. Der Grund ist einfach: Vorstellung und Wirklichkeit gehen bei diesem Schritt oft auseinander, und das lässt sich vor Ort in zwei Wochen klären statt nach dem Umzug in zwei Jahren.</p>

<p>Wer die Möglichkeit hat, sollte die Zeit nutzen, um mit Studenten zu sprechen, die bereits dort sind – nicht nur über das Studium, sondern über den Alltag, das Klima, die Entfernung zur Familie.</p>

<h2>Die eigentliche Bewerbung über Minhati</h2>

<p>Die Bewerbung erfolgt über das offizielle Online-Portal <a href="https://minhati.sa" target="_blank" rel="noopener noreferrer">minhati.sa</a>. Dort wird das Bewerbungsformular ausgefüllt und die Unterlagen werden hochgeladen.</p>

<p>Zwei praktische Hinweise:</p>

<ul>
  <li>Die Angaben im Portal müssen exakt mit dem Reisepass übereinstimmen – Schreibweise des Namens, Passnummer, Geburtsdatum. Abweichungen führen später zu Verzögerungen.</li>
  <li>Dokumente sollten sauber eingescannt vorliegen, nicht als abfotografierte Bildschirmaufnahme.</li>
</ul>

<p>Aktuelle Informationen zum Bewerbungsprozess, insbesondere zu Zeiträumen, werden auch über den Telegram-Kanal <em>InfoStudiumKSA</em> geteilt.</p>

<h2>Was das Stipendium umfasst</h2>

<p>Das Studium ist für angenommene internationale Studenten kostenlos. Zum Stipendium gehören darüber hinaus:</p>

<ul>
  <li>Ein monatliches Taschengeld von 840 SAR zur freien Verfügung</li>
  <li>Ein möbliertes Zimmer im Studentenwohnheim</li>
  <li>Stark vergünstigte Mahlzeiten in der Mensa</li>
  <li>Hin- und Rückflugtickets in das Heimatland</li>
  <li>Medizinische Grundversorgung</li>
  <li>Die Aufenthaltsgenehmigung (Iqama), die von der Universität arrangiert und finanziert wird</li>
</ul>

<h2>Nach der Bewerbung</h2>

<p>Zwischen Bewerbung und Rückmeldung liegt Wartezeit, und sie lässt sich nicht abkürzen. Wer in dieser Phase Arabisch lernt, verliert nichts – unabhängig davon, wie die Entscheidung ausfällt.</p>

<p>Eine Bitte in eigener Sache: Anfragen an uns können wir erst berücksichtigen, wenn eine Zusage der Universität vorliegt. Wir sind keine Vermittlung und haben keinen Einfluss auf das Verfahren. Sobald du angenommen wurdest, melde dich gern – dann können wir bei den Fragen helfen, die danach kommen.</p>
`,
  },
  {
    slug: "arabisch-lernen",
    image: "/blog/arabisch.svg",
    title: "Arabisch für das Studium in Medina – worauf es ankommt",
    excerpt:
      "Warum Arabisch über den Studienerfolg entscheidet, was die Fakultät für Arabische Sprache lehrt und wie man die Zeit vor der Abreise sinnvoll nutzt.",
    metaDescription:
      "Arabisch lernen für das Studium an der Islamischen Universität Medina: Bedeutung der Sprache, Inhalte der Sprachfakultät und Vorbereitung vor der Abreise.",
    date: "7. August 2026",
    dateISO: "2026-08-07",
    readTime: "5 min",
    category: "studium",
    content: `
<p class="lead">Arabisch ist an der Islamischen Universität Medina kein Nebenfach, sondern die Voraussetzung für alles andere. Wer die Sprache nicht beherrscht, kommt an die Texte nicht heran – und das Studium besteht zu einem großen Teil aus dem Lesen und Verstehen klassischer Texte.</p>

<h2>Warum die Sprache alles andere trägt</h2>

<p>Die Studiengänge verbinden die Arbeit an klassischen Texten mit akademischer Ausbildung. Das bedeutet konkret: Vorlesungen auf Arabisch, Prüfungen auf Arabisch, Literatur auf Arabisch. Übersetzungen sind eine Hilfe für den Anfang, aber kein Ersatz. Wer Tafsir, Fiqh oder die Hadith-Wissenschaften ernsthaft studieren will, muss die Quellsprache lesen können.</p>

<p>Das gilt auch außerhalb des Hörsaals. Der Alltag in Medina – Behördengänge, Einkäufe, Gespräche mit Kommilitonen aus über hundert Ländern – läuft auf Arabisch. Diese ständige Umgebung ist der größte Vorteil des Studienorts, aber sie nützt nur dem, der genug Grundlage mitbringt, um daran anzuknüpfen.</p>

<h2>Was die Fakultät für Arabische Sprache lehrt</h2>

<p>Die Sprache wird an der Universität als eigene Wissenschaft behandelt, nicht als Kommunikationstraining. Die Fakultät für Arabische Sprache deckt im Kern folgende Bereiche ab:</p>

<ul>
  <li><strong>Nahw</strong> – die Grammatik, also der Satzbau und die Flexion</li>
  <li><strong>Sarf</strong> – die Morphologie, der Aufbau der Wortformen aus den Wurzeln</li>
  <li><strong>Balagha</strong> – die Rhetorik, die Lehre vom sprachlichen Ausdruck</li>
  <li><strong>Arabische Literatur</strong> und <strong>Linguistik</strong></li>
</ul>

<p>Nahw und Sarf sind dabei das Fundament. Sie erklären, warum ein Satz bedeutet, was er bedeutet – und genau darauf beruht die gesamte klassische Textarbeit. Wer sie beherrscht, kann sich einen unbekannten Text selbst erschließen. Wer sie nicht beherrscht, bleibt auf fremde Erklärungen angewiesen.</p>

<h2>Die Zeit vor der Abreise nutzen</h2>

<p>Zwischen Bewerbung und Zusage liegen Monate. Diese Zeit ist der beste Moment, um mit der Sprache anzufangen – und zwar unabhängig davon, wie die Entscheidung ausfällt. Nichts von dem, was man hier lernt, ist verloren.</p>

<p>Sinnvolle Reihenfolge für den Anfang:</p>

<ul>
  <li><strong>Das Alphabet und flüssiges Lesen.</strong> Nicht buchstabierend, sondern in normalem Tempo. Das klingt banal und wird regelmäßig unterschätzt.</li>
  <li><strong>Die Vokalzeichen sicher beherrschen.</strong> Ohne sie lässt sich die Grammatik später nicht sinnvoll erarbeiten.</li>
  <li><strong>Grundwortschatz aufbauen.</strong> Konsequent und täglich, lieber zwanzig Minuten jeden Tag als drei Stunden am Wochenende.</li>
  <li><strong>Erste Grundlagen in Nahw und Sarf.</strong> Am besten mit jemandem, der korrigieren kann – falsch Eingeübtes wieder abzulegen kostet mehr Zeit, als es gekostet hat, es zu lernen.</li>
</ul>

<h3>Was realistisch ist</h3>

<p>Niemand kommt nach einem halben Jahr Vorbereitung fließend in Medina an, und das wird auch nicht erwartet. Das Ziel ist ein anderes: nicht bei null anzufangen, wenn ohnehin schon alles neu ist – neues Land, neues Klima, neue Umgebung, Entfernung zur Familie. Wer die Schrift beherrscht und die Grundstrukturen kennt, hat in den ersten Monaten deutlich mehr Kapazität für alles Übrige.</p>

<h2>In Medina selbst</h2>

<p>Der Vorteil des Studienorts ist die Selbstverständlichkeit, mit der die Sprache überall vorkommt. Dieser Vorteil stellt sich allerdings nicht von allein ein. Studenten aus dem DACH-Raum finden schnell andere Deutschsprachige – das ist menschlich nachvollziehbar und für die Sprache das Schlechteste, was passieren kann.</p>

<p>Wer die Umgebung nutzen will, muss sich bewusst dafür entscheiden: Arabisch sprechen, auch wenn es holprig ist, auch wenn es länger dauert, auch wenn Deutsch bequemer wäre.</p>
`,
  },
  {
    slug: "leben-in-medina",
    image: "/blog/leben.svg",
    title: "Studieren in Medina – Stipendium, Unterkunft und Alltag",
    excerpt:
      "Was die Universität internationalen Studenten konkret stellt, wie sich die Lebenshaltung zusammensetzt und worauf man sich einstellen sollte.",
    metaDescription:
      "Leben als Student in Medina: Vollstipendium, Taschengeld, Unterkunft, Mensa und medizinische Versorgung an der Islamischen Universität im Überblick.",
    date: "7. August 2026",
    dateISO: "2026-08-07",
    readTime: "5 min",
    category: "leben",
    content: `
<p class="lead">Über das Studium in Medina kursieren sehr unterschiedliche Vorstellungen – von der romantisierten Version bis zur abschreckenden. Dieser Text hält sich an das, was die Universität internationalen Studenten tatsächlich stellt, und an das, worauf man sich einstellen sollte.</p>

<h2>Was das Stipendium abdeckt</h2>

<p>Alle angenommenen internationalen Studenten erhalten ein Vollstipendium. Das Studium selbst ist vollständig kostenlos. Dazu kommen:</p>

<ul>
  <li><strong>Monatliches Taschengeld:</strong> 840 SAR zur freien Verfügung</li>
  <li><strong>Unterkunft:</strong> ein möbliertes Zimmer im Studentenwohnheim, kostenlos</li>
  <li><strong>Verpflegung:</strong> stark subventionierte Mahlzeiten in der Mensa – Frühstück 1 SAR, Mittagessen 3 SAR, Abendessen 2 SAR</li>
  <li><strong>Flüge:</strong> Hin- und Rückflugtickets in das Heimatland</li>
  <li><strong>Medizinische Grundversorgung</strong> während des gesamten Studiums</li>
  <li><strong>Aufenthaltsgenehmigung:</strong> die Iqama wird von der Universität arrangiert und finanziert und während des Studiums aufrechterhalten</li>
</ul>

<p>Rechnet man Mensa und Unterkunft gegen das Taschengeld, sind die Grundkosten gedeckt. Das Taschengeld ist kein Gehalt – es reicht für den Alltag, nicht für größere Anschaffungen oder häufige Heimflüge über die gestellten hinaus.</p>

<h2>Die Universität und ihre Fakultäten</h2>

<p>Die Universität wurde 1961 gegründet. Studenten aus über hundert Ländern studieren dort gemeinsam, in unmittelbarer Nähe zur Prophetenmoschee.</p>

<p>Der Schwerpunkt liegt auf den islamischen Wissenschaften, aufgeteilt auf fünf Fakultäten:</p>

<ul>
  <li><strong>Scharia</strong> – Fiqh, Usul al-Fiqh, Erbrecht, vergleichende Rechtswissenschaft, islamische Wirtschaftslehre</li>
  <li><strong>Da'wa und Usul ad-Din</strong> – Aqidah, Da'wa, vergleichende Religionswissenschaft, Pädagogik, Psychologie</li>
  <li><strong>Hadith und Islamische Studien</strong> – Hadith-Wissenschaften, Überlieferungsketten, Hadith-Kritik, Sira, islamische Geschichte</li>
  <li><strong>Qur'an und Islamische Studien</strong> – Tafsir, Tilawa, Qur'an-Wissenschaften, Tajwid</li>
  <li><strong>Arabische Sprache</strong> – Nahw, Sarf, Balagha, Literatur, Linguistik</li>
</ul>

<h2>Worauf man sich einstellen sollte</h2>

<p>Die materielle Seite ist geregelt. Die Anpassung ist es nicht, und darüber wird seltener gesprochen.</p>

<h3>Entfernung</h3>

<p>Die Familie ist mehrere Flugstunden entfernt. Bei Geburten, Krankheiten und Todesfällen ist man nicht da. Das ist der Punkt, der erfahrungsgemäß schwerer wiegt als alles andere – und er lässt sich vorher schlecht abschätzen.</p>

<h3>Sprache und Umfeld</h3>

<p>Der Alltag läuft auf Arabisch. Wer ohne Grundlagen ankommt, verbringt die erste Zeit vor allem damit, sich zurechtzufinden, statt zu studieren.</p>

<h3>Eigenverantwortung</h3>

<p>Es gibt keine Struktur, die einen trägt, wenn die eigene Motivation nachlässt. Das Studium ist eine Möglichkeit zum Erwerb von Wissen – wie dieses Wissen verstanden, umgesetzt und weitergegeben wird, liegt in der Verantwortung der jeweiligen Person.</p>

<h2>Eine Einordnung zum Schluss</h2>

<p>Nicht jede Aussage, jedes Verhalten oder jede Position von Personen, die in Medina studieren oder studiert haben, repräsentiert automatisch das, was dort gelehrt wird. Der Studienort verleiht keine Autorität, und ein Abschluss ersetzt weder Verständnis noch Charakter.</p>

<p>Wer den Weg erwägt, sollte ihn wegen des Wissens gehen – nicht wegen des Titels, der am Ende steht.</p>
`,
  },
];
