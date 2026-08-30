export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;

  hero_image_url: string | null;
  hero_image_alt: string | null;

  tags: string[];

  published_at: string | null;
}

export interface PostDetail {
  id: string;

  title: string;
  slug: string;
  excerpt: string | null;
  content: string;

  hero_image_url: string | null;
  hero_image_alt: string | null;

  tags: string[];

  seo_title: string | null;
  seo_description: string | null;

  original_medium_url: string | null;
  original_published_at: string | null;

  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminPostSummary {
  id: string;

  title: string;
  slug: string;
  excerpt: string | null;

  status: "draft" | "published";

  hero_image_url: string | null;
  hero_image_alt: string | null;

  tags: string[];

  published_at: string | null;
  created_at: string;
  updated_at: string;
}
export interface AdminPostDetail {
  id: string;

  title: string;
  slug: string;
  excerpt: string | null;
  content: string;

  status: "draft" | "published";

  hero_image_url: string | null;
  hero_image_alt: string | null;

  tags: string[];

  seo_title: string | null;
  seo_description: string | null;

  original_medium_url: string | null;
  original_published_at: string | null;

  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminPostCreate {
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  content: string;

  status: "draft" | "published";

  hero_image_url?: string | null;
  hero_image_alt?: string | null;

  tags: string[];

  seo_title?: string | null;
  seo_description?: string | null;

  original_medium_url?: string | null;
  original_published_at?: string | null;
}
export interface AdminPostUpdate {
  title: string;
  slug: string;

  excerpt?: string | null;
  content: string;

  status: "draft" | "published";

  hero_image_url?: string | null;
  hero_image_alt?: string | null;

  tags: string[];

  seo_title?: string | null;
  seo_description?: string | null;

  original_medium_url?: string | null;
  original_published_at?: string | null;
}
