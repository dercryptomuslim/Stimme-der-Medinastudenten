import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

/**
 * Rendert den Markdown-Inhalt eines Beitrags.
 *
 * react-markdown rendert kein rohes HTML (ist damit XSS-sicher, auch wenn die
 * Autoren dem Team angehören), remark-gfm ergänzt Tabellen und automatische
 * Links aus nackten URLs. remark-breaks macht jeden einzelnen Zeilenumbruch zu
 * einem echten Umbruch – so verhält sich der Editor wie ein Chat-Feld und die
 * Autoren müssen nicht an Markdown-Leerzeilen denken. Externe Links öffnen in
 * neuem Tab mit noopener.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div
      className="text-slate-700
        [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900
        [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900
        [&_p]:my-4 [&_p]:leading-relaxed
        [&_ul]:my-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-1.5
        [&_ol]:my-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-1.5
        [&_li]:leading-relaxed
        [&_strong]:font-semibold [&_strong]:text-slate-900
        [&_a]:break-words [&_a]:text-navy [&_a]:underline [&_a:hover]:text-gold-dark
        [&_blockquote]:border-l-4 [&_blockquote]:border-gold [&_blockquote]:bg-gold/5 [&_blockquote]:py-1 [&_blockquote]:pl-4
        [&_hr]:my-8 [&_hr]:border-slate-200"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          a: ({ href, children }) => {
            const extern = /^https?:\/\//i.test(href ?? "");
            return (
              <a
                href={href}
                target={extern ? "_blank" : undefined}
                rel={extern ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
