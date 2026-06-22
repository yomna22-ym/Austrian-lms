import Image from "next/image";
import Link from "next/link";
import SurfaceCard from "@/app/shared/SurfaceCard";
import { isRemoteAssetUrl } from "@/lib/asset-url";

interface BlogArticleCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  author?: string;
  readTime?: string;
  className?: string;
  imageClassName?: string;
  featured?: boolean;
  href?: string;
}

export default function BlogArticleCard({
  image,
  category,
  title,
  description,
  author,
  readTime,
  className = "",
  imageClassName = "h-[210px]",
  featured = false,
  href,
}: BlogArticleCardProps) {
  const card = (
    <SurfaceCard
      className={[
        "group overflow-hidden rounded-[16px] border-[#eadede] shadow-[0_1px_2px_rgba(17,19,21,0.04),0_18px_40px_rgba(17,19,21,0.06)] transition-all duration-300 hover:border-secondary/35 hover:shadow-[0_2px_4px_rgba(17,19,21,0.05),0_24px_54px_rgba(185,19,23,0.1)]",
        href ? "cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={["relative w-full overflow-hidden", imageClassName].join(" ")}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 460px"
          unoptimized={isRemoteAssetUrl(image)}
        />
        {featured && (
          <span className="absolute left-5 top-5 rounded-full bg-secondary px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-[0_8px_18px_rgba(185,19,23,0.22)]">
            Featured
          </span>
        )}
      </div>

      <div className="p-7">
        <p className="text-[10px] font-extrabold uppercase text-secondary">
          {category}
        </p>
        <h3 className="mt-4 text-[21px] font-extrabold leading-tight text-text-primary transition-colors group-hover:text-secondary">
          {title}
        </h3>
        <p className="mt-4 text-[13px] leading-relaxed text-text-secondary">
          {description}
        </p>

        {(author || readTime) && (
          <div className="mt-6 flex items-center justify-between border-t border-[#eadede] pt-5 text-[11px] text-text-secondary">
            {author && (
              <span className="flex items-center gap-2 font-semibold text-text-primary">
                <span className="h-5 w-5 rounded-full border border-[#eadede] bg-white shadow-[inset_0_0_0_5px_rgba(185,19,23,0.12)]" />
                {author}
              </span>
            )}
            {readTime && <span>{readTime}</span>}
          </div>
        )}
      </div>
    </SurfaceCard>
  );

  if (!href) {
    return card;
  }

  return (
    <Link
      href={href}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
    >
      {card}
    </Link>
  );
}
