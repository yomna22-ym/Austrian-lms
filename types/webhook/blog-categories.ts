export interface BlogCategoryItem {
  id: string;
  name: string;
}

export interface ListBlogCategoriesQuery {
  page?: number;
  limit?: number;
}
