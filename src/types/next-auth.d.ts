import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "admin";
      plan: "none" | "silver" | "gold";
      status: "active" | "blocked";
    } & DefaultSession["user"];
  }

  interface User {
    role: "user" | "admin";
    plan: "none" | "silver" | "gold";
    status: "active" | "blocked";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "admin";
    plan?: "none" | "silver" | "gold";
    status?: "active" | "blocked";
  }
}
