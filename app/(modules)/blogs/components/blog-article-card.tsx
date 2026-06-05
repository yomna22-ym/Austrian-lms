import Image from "next/image";
import Link from "next/link";
import SurfaceCard from "@/app/shared/SurfaceCard";

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
        "group overflow-hidden rounded-[14px] shadow-[0_12px_26px_rgba(17,19,21,0.08)]",
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
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 460px"
        />
        {featured && (
          <span className="absolute left-5 top-5 rounded-full bg-secondary px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
            Featured
          </span>
        )}
      </div>

      <div className="p-7">
        <p className="text-[10px] font-extrabold uppercase text-secondary">
          {category}
        </p>
        <h3 className="mt-4 text-[21px] font-extrabold leading-tight text-text-primary">
          {title}
        </h3>
        <p className="mt-4 text-[13px] leading-relaxed text-text-secondary">
          {description}
        </p>

        {(author || readTime) && (
          <div className="mt-6 flex items-center justify-between border-t border-[#eeeeee] pt-5 text-[11px] text-text-secondary">
            {author && (
              <span className="flex items-center gap-2 font-semibold text-text-primary">
                <span className="h-5 w-5 rounded-full bg-[linear-gradient(135deg,#18201b,#d8c39b)]" />
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
    <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2">
      {card}
    </Link>
  );
}
