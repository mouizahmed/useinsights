import "next-auth";

declare module "next-auth" {
  interface User {
    Plan: string | null;
    created_at: string | null;
    credits: number | null;
    email: string | null;
    id: string | null;
    image: string | null;
    name: string | null;
  }
  export interface Session {
    user: User;
  }
}