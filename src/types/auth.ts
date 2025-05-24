export interface SyncUserData {
  name: string;
  email: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      syncStatus?: boolean;
      syncError?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    email: string;
    syncStatus?: boolean;
    syncError?: string;
  }
}
