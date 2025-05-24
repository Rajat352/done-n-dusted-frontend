import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import syncUser from "@/lib/syncUser";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.name = profile.name!;
        token.email = profile.email!;
      }

      if (account && profile) {
        console.log("Syncing user....");

        const syncResult = await syncUser({
          email: profile?.email!,
          name: profile?.name!,
        });

        token.syncStatus = syncResult.success;

        if (!syncResult.success) {
          token.syncError = syncResult.error;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session && session.user && token) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.syncStatus = token.syncStatus;
        session.user.syncError = token.syncError;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
