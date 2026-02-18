import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";

type UserRole = "user" | "admin";
type UserPlan = "none" | "silver" | "gold";
type UserStatus = "active" | "blocked";

type AppUser = {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  plan: UserPlan;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

async function findUserByEmail(email: string) {
  const db = await getDb();
  return db.collection<AppUser>("users").findOne({ email });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const email = String(rawCredentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(rawCredentials?.password ?? "");

        if (!email || !password) {
          return null;
        }

        const user = await findUserByEmail(email);
        if (!user) {
          return null;
        }

        if (user.status !== "active") {
          return null;
        }

        const passwordValid = await bcrypt.compare(password, user.passwordHash);
        if (!passwordValid) {
          return null;
        }

        return {
          id: String((user as { _id: unknown })._id),
          name: user.name,
          email: user.email,
          role: user.role,
          plan: user.plan,
          status: user.status,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.plan = user.plan;
        token.status = user.status;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as UserRole) ?? "user";
        session.user.plan = (token.plan as UserPlan) ?? "none";
        session.user.status = (token.status as UserStatus) ?? "active";
      }
      return session;
    },
  },
});
