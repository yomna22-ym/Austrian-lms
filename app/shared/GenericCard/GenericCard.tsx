"use client";

import React from "react";
import Image from "next/image";
import { CalendarDays, Users } from "lucide-react";
import Button from "@/app/shared/Button/Button";

// ─── Shared sub-types ────────────────────────────────────────────────────────

export interface MetaItem {
  icon?: React.ReactNode;
  text: string;
}

export interface DateBadge {
  day: number | string;
  month: string;
}

/** Flex alignment for a card section or field group. */
export type SectionAlign = "start" | "center" | "end" | "between" | "stretch";

/** Per-section layout overrides (position, spacing, order). */
export interface SectionLayout {
  justify?: SectionAlign;
  align?: SectionAlign;
  /** Extra Tailwind on the section wrapper */
  className?: string;
  order?: number;
}

/** Default pixel sizes per templated variant (Figma). */
export const CARD_TEMPLATE_SIZES = {
  course: { width: 292, height: 420 },
  event: { width: 350, height: 500 },
  blog: { width: 292, height: 320 },
} as const;

// ─── Layout config per variant ───────────────────────────────────────────────

export interface CourseFieldsLayout {
  header?: SectionLayout;
  badge?: SectionLayout;
  price?: SectionLayout;
  body?: SectionLayout;
  title?: SectionLayout;
  description?: SectionLayout;
  meta?: SectionLayout;
  footer?: SectionLayout;
}

export interface EventFieldsLayout {
  image?: SectionLayout;
  dateBadge?: SectionLayout;
  body?: SectionLayout;
  location?: SectionLayout;
  title?: SectionLayout;
  description?: SectionLayout;
  footer?: SectionLayout;
  price?: SectionLayout;
  cta?: SectionLayout;
}

export interface BlogFieldsLayout {
  image?: SectionLayout;
  featuredBadge?: SectionLayout;
  body?: SectionLayout;
  category?: SectionLayout;
  title?: SectionLayout;
  description?: SectionLayout;
}

/** Layout slots for custom cards — union of all variant field layouts. */
export type CustomFieldsLayout = Partial<
  CourseFieldsLayout & EventFieldsLayout & BlogFieldsLayout
>;

/**
 * Reusable content fields — available on `variant="custom"` and shared across templates.
 * Pass only what you need; combine with `sections` to control order.
 */
export interface CardContentFields {
  badge?: string;
  badgeClassName?: string;
  price?: string;
  priceClassName?: string;
  title?: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  meta?: MetaItem[];
  image?: string;
  imageAlt?: string;
  dateBadge?: DateBadge;
  location?: string;
  category?: string;
  featured?: boolean;
  imageHeight?: number | string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaBgColorClass?: string;
  showArrow?: boolean;
  /** `full` = full-width button (course). `row` = price + button (event). */
  ctaStyle?: "full" | "row";
  onRead?: () => void;
}

/** Section keys for custom card composition. */
export type CustomSectionKey =
  | "image"
  | "header"
  | "category"
  | "location"
  | "title"
  | "description"
  | "meta"
  | "divider"
  | "cta"
  | "children";

// ─── Shell props (dimensions + surface) ────────────────────────────────────────

interface TemplatedCardShellProps {
  /**
   * Card width — number = px, string = Tailwind class (`w-[400px]`) or CSS value.
   * Defaults: course 292, event 350, blog 292.
   */
  width: number | string;
  /**
   * Card height — number = px, string = Tailwind class (`h-[500px]`) or CSS value.
   * Defaults: course 420, event 500, blog 320.
   */
  height: number | string;
  /** Background Tailwind class — default `bg-white`. */
  bgClassName?: string;
  className?: string;
}

interface BaseCardProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  bgClassName?: string;
}

// ─── Per-variant prop interfaces ─────────────────────────────────────────────

export interface CourseCardProps extends BaseCardProps {
  variant: "course";
  badge?: string;
  badgeClassName?: string;
  price?: string;
  priceClassName?: string;
  title: string;
  description?: string;
  meta?: MetaItem[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaBgColorClass?: string;
  /** Section / field positioning overrides */
  fields?: CourseFieldsLayout;
}

export interface EventCardProps extends BaseCardProps {
  variant: "event";
  image?: string;
  imageAlt?: string;
  dateBadge?: DateBadge;
  location?: string;
  title: string;
  description?: string;
  price?: string;
  priceClassName?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  showArrow?: boolean;
  /** Fixed image block height inside the card (px or Tailwind h-* class) */
  imageHeight?: number | string;
  fields?: EventFieldsLayout;
}

export interface BlogCardProps extends BaseCardProps {
  variant: "blog";
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  category?: string;
  title: string;
  description?: string;
  layout?: "horizontal" | "vertical";
  onRead?: () => void;
  /** Image column width when layout is horizontal (Tailwind width class) */
  imageWidthClass?: string;
  fields?: BlogFieldsLayout;
}

export interface CustomCardProps extends BaseCardProps, CardContentFields {
  variant: "custom";
  /**
   * Section render order. Omit to auto-detect from provided props
   * (image → header → category → location → title → description → meta → cta → children).
   */
  sections?: CustomSectionKey[];
  fields?: CustomFieldsLayout;
  /** Slot after built-in sections — also add `"children"` to `sections` to position it. */
  children?: React.ReactNode;
  /** Padding on the main content stack — default `p-6`. */
  contentClassName?: string;
}

export type GenericCardProps =
  | CourseCardProps
  | EventCardProps
  | BlogCardProps
  | CustomCardProps;

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_COURSE_META: MetaItem[] = [
  {
    icon: <CalendarDays size={18} className="text-secondary" />,
    text: "8 Weeks | Start: Oct 15",
  },
  {
    icon: <Users size={18} className="text-secondary" />,
    text: "24 Sessions (90 min each)",
  },
];

const DEFAULT_BG = "bg-white";

const SHELL_BASE =
  "group/card rounded-[24px] overflow-hidden shadow-[0_10px_28px_rgba(17,19,21,0.06)] border border-[#f3dfdd] flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(185,19,23,0.12)]";

const DEFAULT_COURSE_FIELDS: CourseFieldsLayout = {
  header: { justify: "between", align: "center", className: "gap-3" },
  body: { align: "stretch" },
  meta: { align: "start", className: "gap-4" },
  footer: { align: "stretch" },
};

const DEFAULT_EVENT_FIELDS: EventFieldsLayout = {
  image: { align: "start" },
  dateBadge: { className: "left-4 top-4" },
  body: { align: "stretch", className: "flex-1" },
  footer: { justify: "between", align: "center" },
};

const DEFAULT_BLOG_FIELDS: BlogFieldsLayout = {
  body: { align: "start", className: "gap-2 justify-center" },
};

// ─── Layout helpers ──────────────────────────────────────────────────────────

const JUSTIFY_MAP: Record<SectionAlign, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  stretch: "justify-stretch",
};

const ALIGN_MAP: Record<SectionAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  between: "items-stretch",
  stretch: "items-stretch",
};

function sectionClasses(slot?: SectionLayout, flex = true): string {
  if (!slot) return "";
  const parts: string[] = [];
  if (flex) parts.push("flex");
  if (slot.justify) parts.push(JUSTIFY_MAP[slot.justify]);
  if (slot.align) parts.push(ALIGN_MAP[slot.align]);
  if (slot.order !== undefined) parts.push(`order-${slot.order}`);
  if (slot.className) parts.push(slot.className);
  return parts.filter(Boolean).join(" ");
}

type ResolvedSize = { className: string; style: React.CSSProperties };

function resolveSize(
  width: number | string,
  height: number | string
): ResolvedSize {
  const style: React.CSSProperties = {};
  const classes: string[] = ["shrink-0"];

  if (typeof width === "number") style.width = width;
  else if (width.startsWith("w-")) classes.push(width);
  else style.width = width;

  if (typeof height === "number") style.height = height;
  else if (height.startsWith("h-")) classes.push(height);
  else style.height = height;

  return { className: classes.join(" "), style };
}

function resolveBlockSize(
  value: number | string | undefined,
  fallback?: string
): { className: string; style?: React.CSSProperties } {
  if (value === undefined) return { className: fallback ?? "" };
  if (typeof value === "number") {
    return { className: "", style: { height: value } };
  }
  if (value.startsWith("h-") || value.startsWith("min-h-")) {
    return { className: value };
  }
  return { className: "", style: { height: value } };
}

function CardShell({
  width,
  height,
  bgClassName = DEFAULT_BG,
  className = "",
  children,
  onClick,
  onKeyDown,
  role,
  tabIndex,
}: TemplatedCardShellProps & {
  children: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  role?: React.AriaRole;
  tabIndex?: number;
}) {
  const size = resolveSize(width, height);

  return (
    <div
      role={role}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={[SHELL_BASE, bgClassName, size.className, className]
        .filter(Boolean)
        .join(" ")}
      style={size.style}
    >
      {children}
    </div>
  );
}

// ─── Course ──────────────────────────────────────────────────────────────────

function CourseCard({
  width = CARD_TEMPLATE_SIZES.course.width,
  height = CARD_TEMPLATE_SIZES.course.height,
  bgClassName,
  badge,
  badgeClassName,
  price,
  priceClassName,
  title,
  description,
  meta = DEFAULT_COURSE_META,
  ctaLabel = "Book Course",
  onCtaClick,
  ctaBgColorClass,
  fields,
  className = "",
}: Omit<CourseCardProps, "variant">) {
  const layout = { ...DEFAULT_COURSE_FIELDS, ...fields };

  return (
    <CardShell
      width={width}
      height={height}
      bgClassName={bgClassName}
      className={className}
    >
      <div
        className={[
          "flex min-h-0 flex-1 flex-col px-5 py-6 text-left",
          sectionClasses(layout.body, false) || "gap-0",
        ].join(" ")}
      >
        {(badge || price) && (
          <div
            className={sectionClasses(
              layout.header ?? { justify: "between", align: "center" }
            )}
          >
            {badge ? (
              <span
                className={[
                  badgeClassName ??
                    "min-w-0 whitespace-nowrap rounded-full bg-[#f4f4f4] px-3 py-2 text-center text-[11px] font-medium uppercase leading-none text-secondary",
                  sectionClasses(layout.badge, false),
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {badge}
              </span>
            ) : (
              <span />
            )}
            {price && (
              <span
                className={[
                  priceClassName ??
                    "shrink-0 text-[24px] font-extrabold leading-none text-secondary",
                  sectionClasses(layout.price, false),
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {price}
              </span>
            )}
          </div>
        )}

        <div className="pt-9">
          <h3
            className={[
              "text-[22px] font-bold leading-tight text-text-primary",
              sectionClasses(layout.title, false),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {title}
          </h3>

          {description && (
            <p
              className={[
                "mt-5 text-[16px] leading-[1.55] text-text-secondary",
                sectionClasses(layout.description, false),
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {description}
            </p>
          )}
        </div>

        {meta.length > 0 && (
          <div
            className={[
              "mt-7 flex flex-col border-t border-[#f4e3e1] pt-5",
              sectionClasses(layout.meta) || "gap-3",
            ].join(" ")}
          >
            {meta.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {item.icon && (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-secondary">
                    {item.icon}
                  </span>
                )}
                <span className="text-[13px] leading-snug text-[#6f7680]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        )}

        <div
          className={[
            "mt-auto pt-6",
            sectionClasses(layout.footer, false),
          ].join(" ")}
        >
          <Button
            label={ctaLabel}
            width="w-full"
            height="h-12"
            bgColorClass={ctaBgColorClass ?? "bg-secondary"}
            textColorClass="text-primary"
            onClick={onCtaClick}
            className="rounded-[14px] text-base font-bold shadow-[0_8px_14px_rgba(17,19,21,0.12)] hover:brightness-105 active:translate-y-0.5"
          />
        </div>
      </div>
    </CardShell>
  );
}

// ─── Event ───────────────────────────────────────────────────────────────────

function EventCard({
  width = CARD_TEMPLATE_SIZES.event.width,
  height = CARD_TEMPLATE_SIZES.event.height,
  bgClassName,
  image,
  imageAlt = "",
  dateBadge,
  location,
  title,
  description,
  price,
  priceClassName,
  ctaLabel = "Book Event",
  onCtaClick,
  showArrow = true,
  imageHeight,
  fields,
  className = "",
}: Omit<EventCardProps, "variant">) {
  const layout = { ...DEFAULT_EVENT_FIELDS, ...fields };
  const imageBlock = resolveBlockSize(imageHeight, "h-[188px]");

  return (
    <CardShell
      width={width}
      height={height}
      bgClassName={bgClassName}
      className={["p-4 text-left", className].filter(Boolean).join(" ")}
    >
      {image && (
        <div
          className={[
            "relative w-full shrink-0 overflow-hidden rounded-[16px]",
            imageBlock.className,
            sectionClasses(layout.image, false),
          ]
            .filter(Boolean)
            .join(" ")}
          style={imageBlock.style}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 320px"
          />

          {dateBadge && (
            <div
              className={[
                "absolute flex h-[70px] w-[52px] flex-col items-center justify-center rounded-[14px] bg-secondary text-white shadow-[0_10px_18px_rgba(17,19,21,0.16)]",
                sectionClasses(
                  layout.dateBadge ?? { className: "left-4 top-4" },
                  false
                ),
              ].join(" ")}
            >
              <span className="text-[24px] font-extrabold leading-none">
                {dateBadge.day}
              </span>
              <span className="mt-1 text-[12px] font-medium uppercase leading-none">
                {dateBadge.month}
              </span>
            </div>
          )}
        </div>
      )}

      <div
        className={[
          "flex min-h-0 flex-1 flex-col pt-5",
          sectionClasses(layout.body, false) || "gap-0",
        ].join(" ")}
      >
        {location && (
          <span
            className={[
              "text-[12px] font-bold uppercase leading-none tracking-[0.14em] text-secondary",
              sectionClasses(layout.location, false),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {location}
          </span>
        )}

        <h3
          className={[
            "mt-4 text-[22px] font-bold leading-tight text-text-primary",
            sectionClasses(layout.title, false),
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {title}
        </h3>

        {description && (
          <p
            className={[
              "mt-4 text-[15px] leading-[1.5] text-text-secondary",
              sectionClasses(layout.description, false),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {description}
          </p>
        )}

        <hr className="mt-5 border-[#e7c5c2]" />

        <div
          className={[
            "mt-auto gap-3 pt-5 max-[340px]:flex-col max-[340px]:items-stretch",
            sectionClasses(layout.footer ?? { justify: "between", align: "center" }),
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {price && (
            <span
              className={[
                priceClassName ??
                  "shrink-0 text-[24px] font-extrabold leading-none text-secondary",
                sectionClasses(layout.price, false),
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {price}
            </span>
          )}
          <div className={sectionClasses(layout.cta, false)}>
            <Button
              label={ctaLabel}
              onClick={onCtaClick}
              bgColorClass="bg-secondary"
              textColorClass="text-primary"
              width={showArrow ? "w-[150px] max-[340px]:w-full" : "w-[120px] max-[340px]:w-full"}
              height="h-[50px]"
              showArrowRight={showArrow}
              className={[
                "relative overflow-hidden rounded-full text-[14px] font-bold shadow-none hover:brightness-105 active:translate-y-0.5",
                showArrow
                  ? "gap-0 pl-4 pr-[48px] [&>span:last-child]:absolute [&>span:last-child]:right-1.5 [&>span:last-child]:top-1/2 [&>span:last-child]:flex [&>span:last-child]:h-[38px] [&>span:last-child]:w-[38px] [&>span:last-child]:-translate-y-1/2 [&>span:last-child]:items-center [&>span:last-child]:justify-center [&>span:last-child]:rounded-full [&>span:last-child]:bg-[#db7274] [&>span:last-child]:text-white [&>span:last-child]:transition-transform [&>span:last-child]:duration-300 group-hover/card:[&>span:last-child]:translate-x-0.5 group-hover/card:[&>span:last-child]:-translate-y-1/2"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          </div>
        </div>
      </div>
    </CardShell>
  );
}

// ─── Blog ────────────────────────────────────────────────────────────────────

function BlogCard({
  width = CARD_TEMPLATE_SIZES.blog.width,
  height = CARD_TEMPLATE_SIZES.blog.height,
  bgClassName,
  image,
  imageAlt = "",
  featured = false,
  category,
  title,
  description,
  layout = "vertical",
  imageWidthClass,
  onRead,
  fields,
  className = "",
}: Omit<BlogCardProps, "variant">) {
  const isHorizontal = layout === "horizontal";
  const fieldLayout = { ...DEFAULT_BLOG_FIELDS, ...fields };

  const imageColumnClass = isHorizontal
    ? imageWidthClass ??
      (featured ? "w-[52%] max-[360px]:w-full" : "w-[40%] max-[360px]:w-full")
    : "w-full";

  return (
    <CardShell
      width={width}
      height={height}
      bgClassName={bgClassName}
      className={[
        isHorizontal ? "flex-row max-[360px]:flex-col" : "",
        onRead ? "cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role={onRead ? "button" : undefined}
      tabIndex={onRead ? 0 : undefined}
      onClick={onRead}
      onKeyDown={onRead ? (e) => e.key === "Enter" && onRead() : undefined}
    >
      {image && (
        <div
          className={[
            "relative shrink-0 overflow-hidden",
            imageColumnClass,
            isHorizontal ? "h-full min-h-0 max-[360px]:h-[170px]" : "aspect-video",
            sectionClasses(fieldLayout.image, false),
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 292px"
          />

          {featured && (
            <div
              className={[
                "absolute",
                sectionClasses(
                  fieldLayout.featuredBadge ?? { className: "left-4 top-4" },
                  false
                ),
              ].join(" ")}
            >
              <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                Featured
              </span>
            </div>
          )}
        </div>
      )}

      <div
        className={[
          "flex min-h-0 flex-1 flex-col",
          "p-4",
          sectionClasses(fieldLayout.body) || "gap-2 justify-center",
        ].join(" ")}
      >
        {category && (
          <span
            className={[
              "text-[10px] font-bold uppercase tracking-widest text-secondary",
              sectionClasses(fieldLayout.category, false),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {category}
          </span>
        )}

        <h3
          className={[
            "font-bold leading-snug text-text-primary",
            featured ? "text-[17px]" : "text-[15px]",
            sectionClasses(fieldLayout.title, false),
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {title}
        </h3>

        {description && (
          <p
            className={[
              "text-xs leading-relaxed text-text-secondary",
              sectionClasses(fieldLayout.description, false),
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {description}
          </p>
        )}
      </div>
    </CardShell>
  );
}

// ─── Custom (composable fields) ──────────────────────────────────────────────

const DEFAULT_CUSTOM_FIELDS: CustomFieldsLayout = {
  header: { justify: "between", align: "center", className: "gap-3" },
  body: { align: "start", className: "gap-4 flex-1" },
  meta: { align: "start", className: "gap-3" },
  footer: { justify: "between", align: "center" },
  dateBadge: { className: "left-4 top-4" },
};

function resolveCustomSections(props: Omit<CustomCardProps, "variant">): CustomSectionKey[] {
  if (props.sections?.length) return props.sections;

  const order: CustomSectionKey[] = [];
  if (props.image) order.push("image");
  if (props.badge || (props.price && props.ctaStyle !== "row")) {
    order.push("header");
  }
  if (props.category) order.push("category");
  if (props.location) order.push("location");
  if (props.title) order.push("title");
  if (props.description) order.push("description");
  if (props.meta?.length && props.ctaStyle === "full") order.push("divider");
  if (props.meta?.length) order.push("meta");
  if (props.ctaLabel || props.onCtaClick || props.price) order.push("cta");
  if (props.children) order.push("children");
  return order;
}

type CardSectionContext = Omit<CustomCardProps, "variant" | "sections"> & {
  fields: CustomFieldsLayout;
  contentClassName: string;
  presentation?: "course";
};

function renderCardSection(
  section: CustomSectionKey,
  ctx: CardSectionContext
): React.ReactNode {
  const layout = ctx.fields;

  switch (section) {
    case "image": {
      if (!ctx.image) return null;
      const imageBlock = resolveBlockSize(ctx.imageHeight, "h-[200px]");
      return (
        <div
          key="image"
          className={[
            "relative w-full shrink-0 overflow-hidden",
            imageBlock.className,
            sectionClasses(layout.image, false),
          ]
            .filter(Boolean)
            .join(" ")}
          style={imageBlock.style}
        >
          <Image
            src={ctx.image}
            alt={ctx.imageAlt ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
          />
          {ctx.dateBadge && (
            <div
              className={[
                "absolute flex min-w-[52px] flex-col items-center rounded-lg bg-secondary px-2.5 py-1.5 text-white",
                sectionClasses(
                  layout.dateBadge ?? { className: "left-4 top-4" },
                  false
                ),
              ].join(" ")}
            >
              <span className="text-2xl font-extrabold leading-none">
                {ctx.dateBadge.day}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {ctx.dateBadge.month}
              </span>
            </div>
          )}
          {ctx.featured && (
            <div
              className={[
                "absolute",
                sectionClasses(
                  layout.featuredBadge ?? { className: "left-4 top-4" },
                  false
                ),
              ].join(" ")}
            >
              <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                Featured
              </span>
            </div>
          )}
        </div>
      );
    }

    case "header": {
      const priceInHeader = ctx.price && ctx.ctaStyle !== "row";
      if (!ctx.badge && !priceInHeader) return null;
      return (
        <div
          key="header"
          className={sectionClasses(
            layout.header ?? { justify: "between", align: "center" }
          )}
        >
          {ctx.badge ? (
            <span
              className={
                ctx.badgeClassName ??
                (ctx.presentation === "course"
                  ? "min-w-0 whitespace-nowrap rounded-full bg-[#f4f4f4] px-3 py-2 text-center text-[11px] font-medium uppercase leading-none text-secondary"
                  : "rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-secondary")
              }
            >
              {ctx.badge}
            </span>
          ) : (
            <span />
          )}
          {priceInHeader && (
            <span
              className={
                ctx.priceClassName ??
                (ctx.presentation === "course"
                  ? "shrink-0 text-[24px] font-extrabold leading-none text-secondary"
                  : "text-xl font-extrabold text-secondary")
              }
            >
              {ctx.price}
            </span>
          )}
        </div>
      );
    }

    case "category":
      if (!ctx.category) return null;
      return (
        <span
          key="category"
          className={[
            "text-[11px] font-bold uppercase tracking-widest text-secondary",
            sectionClasses(layout.category, false),
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {ctx.category}
        </span>
      );

    case "location":
      if (!ctx.location) return null;
      return (
        <span
          key="location"
          className={[
            "text-xs font-bold uppercase tracking-widest text-secondary",
            sectionClasses(layout.location, false),
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {ctx.location}
        </span>
      );

    case "title":
      if (!ctx.title) return null;
      return (
        <h3
          key="title"
          className={[
            ctx.presentation === "course"
              ? "pt-9 text-[22px] font-bold leading-tight text-text-primary"
              : "text-xl font-bold leading-snug text-text-primary",
            ctx.titleClassName,
            sectionClasses(layout.title, false),
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {ctx.title}
        </h3>
      );

    case "description":
      if (!ctx.description) return null;
      return (
        <p
          key="description"
          className={[
            ctx.presentation === "course"
              ? "text-[16px] leading-[1.55] text-text-secondary"
              : "text-sm leading-relaxed text-text-secondary",
            ctx.descriptionClassName,
            sectionClasses(layout.description, false),
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {ctx.description}
        </p>
      );

    case "meta": {
      if (!ctx.meta?.length) return null;
      return (
        <div
          key="meta"
          className={[
            "flex flex-col",
            sectionClasses(layout.meta) || "gap-3",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {ctx.meta.map((item, i) => (
            <div
              key={i}
              className={
                ctx.presentation === "course"
                  ? "flex items-center gap-3"
                  : "flex items-center gap-2.5"
              }
            >
              {item.icon && (
                <span
                  className={
                    ctx.presentation === "course"
                      ? "flex h-5 w-5 shrink-0 items-center justify-center text-secondary"
                      : "shrink-0 text-secondary"
                  }
                >
                  {item.icon}
                </span>
              )}
              <span
                className={
                  ctx.presentation === "course"
                    ? "text-[13px] leading-snug text-[#6f7680]"
                    : "text-sm text-text-secondary"
                }
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      );
    }

    case "divider":
      return (
        <hr
          key="divider"
          className={
            ctx.presentation === "course"
              ? "border-[#f4e3e1]"
              : "border-neutral-100"
          }
        />
      );

    case "cta": {
      const useRow =
        ctx.ctaStyle === "row" || (ctx.ctaStyle !== "full" && ctx.price);
      if (!ctx.ctaLabel && !ctx.onCtaClick && !ctx.price) return null;

      if (useRow) {
        return (
          <div
            key="cta"
            className={sectionClasses(
              layout.footer ?? { justify: "between", align: "center" }
            )}
          >
            {ctx.price && (
              <span
                className={
                  ctx.priceClassName ?? "text-lg font-extrabold text-secondary"
                }
              >
                {ctx.price}
              </span>
            )}
            {(ctx.ctaLabel || ctx.onCtaClick) && (
              <div className={sectionClasses(layout.cta, false)}>
                <Button
                  label={ctx.ctaLabel ?? "Book"}
                  onClick={ctx.onCtaClick}
                  bgColorClass={ctx.ctaBgColorClass ?? "bg-secondary"}
                  textColorClass="text-primary"
                  height="h-[44px]"
                  showArrowRight={ctx.showArrow !== false}
                />
              </div>
            )}
          </div>
        );
      }

      if (!ctx.ctaLabel && !ctx.onCtaClick) return null;
      return (
        <div
          key="cta"
          className={[
            ctx.presentation === "course" ? "mt-auto pt-1" : "",
            sectionClasses(layout.footer ?? { align: "stretch" }, false),
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <Button
            label={ctx.ctaLabel ?? "Book"}
            width="w-full"
            height={ctx.presentation === "course" ? "h-12" : undefined}
            bgColorClass={ctx.ctaBgColorClass ?? "bg-secondary"}
            textColorClass="text-primary"
            onClick={ctx.onCtaClick}
            className={
              ctx.presentation === "course"
                ? "rounded-[14px] text-base font-bold shadow-[0_8px_14px_rgba(17,19,21,0.12)] hover:brightness-105 active:translate-y-0.5"
                : undefined
            }
          />
        </div>
      );
    }

    case "children":
      return ctx.children ? (
        <div key="children" className={sectionClasses(layout.body, false)}>
          {ctx.children}
        </div>
      ) : null;

    default:
      return null;
  }
}

/** Sections rendered inside padded content (everything except full-bleed image). */
const INNER_SECTIONS = new Set<CustomSectionKey>([
  "header",
  "category",
  "location",
  "title",
  "description",
  "meta",
  "divider",
  "cta",
  "children",
]);

function CustomCard(props: Omit<CustomCardProps, "variant">) {
  const {
    width,
    height,
    bgClassName = DEFAULT_BG,
    className = "",
    contentClassName,
    fields,
    children,
    onRead,
    sections: sectionsProp,
    ...content
  } = props;

  const layout = { ...DEFAULT_CUSTOM_FIELDS, ...fields };
  const sections = resolveCustomSections({ ...content, children, sections: sectionsProp });
  const usesCoursePresentation =
    !content.image &&
    content.ctaStyle === "full" &&
    (Boolean(content.badge) || Boolean(content.price)) &&
    Boolean(content.title);
  const ctx: CardSectionContext = {
    ...content,
    children,
    fields: layout,
    contentClassName:
      contentClassName ??
      (usesCoursePresentation ? "px-5 py-6" : "p-5"),
    presentation: usesCoursePresentation ? "course" : undefined,
  };

  const size =
    width !== undefined && height !== undefined
      ? resolveSize(width, height)
      : null;

  const innerSections = sections.filter((s) => INNER_SECTIONS.has(s));
  const hasImage = sections.includes("image");

  const shell = (
    <>
      {hasImage && renderCardSection("image", ctx)}
      {innerSections.length > 0 && (
        <div
          className={[
            "flex min-h-0 flex-1 flex-col",
            ctx.contentClassName,
            usesCoursePresentation ? "text-left" : "",
            usesCoursePresentation
              ? "gap-5"
              : sectionClasses(layout.body, false) || "gap-4",
          ].join(" ")}
        >
          {innerSections.map((key) => renderCardSection(key, ctx))}
        </div>
      )}
    </>
  );

  if (size) {
    return (
      <div
        role={onRead ? "button" : undefined}
        tabIndex={onRead ? 0 : undefined}
        onClick={onRead}
        onKeyDown={onRead ? (e) => e.key === "Enter" && onRead() : undefined}
        className={[
          SHELL_BASE,
          bgClassName,
          size.className,
          onRead ? "cursor-pointer" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={size.style}
      >
        {shell}
      </div>
    );
  }

  return (
    <div
      role={onRead ? "button" : undefined}
      tabIndex={onRead ? 0 : undefined}
      onClick={onRead}
      onKeyDown={onRead ? (e) => e.key === "Enter" && onRead() : undefined}
      className={[
        SHELL_BASE,
        bgClassName,
        onRead ? "cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {shell}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

const GenericCard: React.FC<GenericCardProps> = (props) => {
  switch (props.variant) {
    case "course": {
      const {
        variant: _,
        width = CARD_TEMPLATE_SIZES.course.width,
        height = CARD_TEMPLATE_SIZES.course.height,
        ...rest
      } = props;
      void _;
      return <CourseCard width={width} height={height} {...rest} />;
    }
    case "event": {
      const {
        variant: _,
        width = CARD_TEMPLATE_SIZES.event.width,
        height = CARD_TEMPLATE_SIZES.event.height,
        ...rest
      } = props;
      void _;
      return <EventCard width={width} height={height} {...rest} />;
    }
    case "blog": {
      const {
        variant: _,
        width = CARD_TEMPLATE_SIZES.blog.width,
        height = CARD_TEMPLATE_SIZES.blog.height,
        ...rest
      } = props;
      void _;
      return <BlogCard width={width} height={height} {...rest} />;
    }
    case "custom": {
      const { variant: _, ...rest } = props;
      void _;
      return <CustomCard {...rest} />;
    }
  }
};

export default GenericCard;
