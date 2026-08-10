import Link from "next/link";
import { tagLabel } from "@/lib/intern";

/**
 * Zeigt die Tags eines Beitrags als anklickbare Chips.
 * Jeder Chip führt zur Themenseite mit allen Beiträgen dieses Tags.
 */
export function TagListe({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/intern/thema/${tag}`}
          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-gold/40 hover:text-navy"
        >
          #{tagLabel(tag)}
        </Link>
      ))}
    </div>
  );
}
