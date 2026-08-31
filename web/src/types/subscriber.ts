export interface AdminSubscriber {
  id: string;
  email: string;
  status: "pending" | "active" | "unsubscribed";

  source: string | null;

  created_at: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
}
