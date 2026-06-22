interface RichTextContentProps {
  html: string;
  className?: string;
}

export default function RichTextContent({
  html,
  className = "",
}: RichTextContentProps) {
  return (
    <div
      className={[
        "prose prose-neutral max-w-none text-[15px] leading-[1.85] text-text-primary",
        "[&_h2]:mt-9 [&_h2]:text-[27px] [&_h2]:font-extrabold [&_h2]:leading-tight",
        "[&_h3]:mt-7 [&_h3]:text-[22px] [&_h3]:font-bold",
        "[&_p]:mt-5 [&_ul]:mt-5 [&_ol]:mt-5 [&_blockquote]:my-9",
        "[&_blockquote]:border-l-4 [&_blockquote]:border-secondary [&_blockquote]:bg-[#f7f7f7] [&_blockquote]:px-7 [&_blockquote]:py-6",
        "[&_img]:my-6 [&_img]:rounded-[8px]",
        "[&_a]:text-secondary [&_a]:underline",
        className,
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
