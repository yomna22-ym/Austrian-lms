import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={[
        "flex flex-wrap items-center gap-1 text-[14px] font-medium",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-text-secondary transition-colors hover:text-secondary"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-text-primary" : "text-text-secondary"}>
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight size={14} className="text-text-secondary" aria-hidden="true" />
            )}
          </span>
        );
      })}
    </nav>
  );
}
