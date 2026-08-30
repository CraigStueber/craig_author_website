export interface PublicComment {
  id: string;

  name: string;
  body: string;

  parent_id: string | null;
  is_author: boolean;

  created_at: string;
}

export interface CommentCreateRequest {
  name: string;
  email: string;
  body: string;
}

export interface CommentCreateResponse {
  message: string;
}
