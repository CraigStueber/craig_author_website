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
  turnstile_token: string;
}

export interface CommentCreateResponse {
  message: string;
}
