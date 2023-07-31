import "next-auth";

declare module "next-auth" {

  interface User {
    Plan: string | null;
    created_at: string | null;
    openAI: string | null;
    // api_keys: API[] | [];
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

export interface API {
  secret_key: string | null;
  created_at: string | null;
  created_by: string | null;
}

export interface ChartType {
  title: string;
  chartType: string;
}


export interface DatabaseCredentials {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export type NotificationVariantType = 'warning' | 'error' | 'success';