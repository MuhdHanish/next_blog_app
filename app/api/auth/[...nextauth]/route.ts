import prisma from "@/lib/prisma";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import nextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: AuthOptions = {
  adapter: <Adapter>PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
