export type CommentStatus = "pending" | "approved" | "rejected" | "spam";

export interface AdminComment {
  id: string;

  post_id: string;
  post_title: string;
  post_slug: string;

  parent_id: string | null;

  name: string;
  email: string | null;
  body: string;

  status: CommentStatus;
  moderation_flags: string[];

  is_author: boolean;

  created_at: string;
  approved_at: string | null;
}
