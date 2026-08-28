import type {
  AdminPostCreate,
  AdminPostDetail,
  AdminPostSummary,
  PostDetail,
  PostSummary,
} from "@/types/blog";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

interface NewsletterSubscribeResponse {
  message: string;
}

export async function subscribeToNewsletter(
  email: string,
): Promise<NewsletterSubscribeResponse> {
  const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail ?? "Unable to subscribe. Please try again.");
  }

  return data;
}

export interface ContactMessageRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactMessageResponse {
  message: string;
}

export async function sendContactMessage(
  request: ContactMessageRequest,
): Promise<ContactMessageResponse> {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ?? "Unable to send your message. Please try again.",
    );
  }

  return data;
}

export async function getPublishedPosts(): Promise<PostSummary[]> {
  const response = await fetch(`${API_BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error("Unable to load blog posts.");
  }

  return response.json();
}

export async function getPublishedPost(
  slug: string,
): Promise<PostDetail | null> {
  const response = await fetch(
    `${API_BASE_URL}/posts/${encodeURIComponent(slug)}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load blog post.");
  }

  return response.json();
}
export interface AdminSession {
  authenticated: boolean;
  username: string;
}

export async function adminLogin(
  username: string,
  password: string,
): Promise<AdminSession> {
  const response = await fetch(`${API_BASE_URL}/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail ?? "Unable to log in.");
  }

  return data;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const response = await fetch(`${API_BASE_URL}/admin/auth/me`, {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to verify admin session.");
  }

  return response.json();
}

export async function adminLogout(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to log out.");
  }
}

export async function getAdminPosts(): Promise<AdminPostSummary[] | null> {
  const response = await fetch(`${API_BASE_URL}/admin/posts`, {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Unable to load admin posts.");
  }

  return response.json();
}
export async function uploadBlogImage(file: File): Promise<string> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/admin/posts/image`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail ?? "Unable to upload image.");
  }

  return data.url;
}

export async function createAdminPost(
  post: AdminPostCreate,
): Promise<AdminPostDetail | null> {
  const response = await fetch(`${API_BASE_URL}/admin/posts`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (response.status === 401) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail ?? "Unable to create post.");
  }

  return data;
}
