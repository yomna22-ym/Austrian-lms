export interface TipTapNode {
  type: string;
  text?: string;
  content?: TipTapNode[];
  attrs?: Record<string, unknown>;
}

export interface TipTapDoc {
  type: "doc";
  content: TipTapNode[];
}

export type BlogPlacement = "default" | "featured" | "top";

export interface BlogCard {
  id: string;
  image: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  authorName: string;
  placement?: BlogPlacement;
  isActive: boolean;
  createdAt: string;
}

export interface BlogDetail extends BlogCard {
  content: TipTapDoc;
  updatedAt: string;
}

export interface ListBlogsQuery {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  placement?: BlogPlacement;
}

/** @deprecated Use BlogCard or BlogDetail */
export type BlogPost = BlogDetail;
