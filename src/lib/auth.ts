import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = "admin@balephi.com";
const ADMIN_PASSWORD_HASH =
  "$2b$12$BS0P6NBigvDIVbeCI/yPNOfBudjh2Ju92Y0.QyY6i6tm5kaf3NtAC";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (credentials.email !== ADMIN_EMAIL) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          String(credentials.password),
          ADMIN_PASSWORD_HASH
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: "admin-1",
          email: ADMIN_EMAIL,
          name: "Admin",
          role: "admin",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
