import "server-only";

import { resolveLmsAssetUrl } from "@/lib/media";
import type { BlogDetail, TipTapDoc, TipTapNode } from "@/types/webhook/blogs";
import type { BlogDetailArticle } from "../types";
import { mapBlogCardToArticle } from "./blogs.mapper";

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function extractPlainText(doc: TipTapDoc): string {
  const parts: string[] = [];

  function walk(nodes?: TipTapNode[]) {
    for (const node of nodes ?? []) {
      if (node.text) parts.push(node.text);
      walk(node.content);
    }
  }

  walk(doc.content);
  return parts.join(" ");
}

export function extractHeadings(doc: TipTapDoc): string[] {
  const headings: string[] = [];

  function walk(nodes?: TipTapNode[]) {
    for (const node of nodes ?? []) {
      if (node.type === "heading") {
        const text = extractPlainText({
          type: "doc",
          content: node.content ?? [],
        });
        if (text) headings.push(text);
      }
      walk(node.content);
    }
  }

  walk(doc.content);
  return headings;
}

export async function renderTipTapHtml(doc: TipTapDoc): Promise<string> {
  const { generateHTML } = await import("@tiptap/html");
  const StarterKit = (await import("@tiptap/starter-kit")).default;
  const Link = (await import("@tiptap/extension-link")).default;
  const Image = (await import("@tiptap/extension-image")).default;
  const Underline = (await import("@tiptap/extension-underline")).default;

  const html = generateHTML(doc, [
    StarterKit,
    Underline,
    Link.configure({ openOnClick: false }),
    Image,
  ]);

  return html.replace(/src="([^"]+)"/g, (_match, src: string) => {
    const resolved = resolveLmsAssetUrl(src);
    return `src="${resolved}"`;
  });
}

export async function mapBlogDetailToArticle(
  detail: BlogDetail,
): Promise<BlogDetailArticle> {
  const base = mapBlogCardToArticle({
    ...detail,
    image: resolveLmsAssetUrl(detail.image) || detail.image,
  });
  const plainText = extractPlainText(detail.content);

  return {
    ...base,
    image: resolveLmsAssetUrl(detail.image) || "/event.png",
    readTime: estimateReadTime(plainText || detail.description),
    contentHtml: await renderTipTapHtml(detail.content),
    tableOfContents: extractHeadings(detail.content),
    updatedAt: detail.updatedAt,
  };
}
