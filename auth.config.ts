
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  
  // ✅ Session configuration (separate from callbacks)
  session: {
    strategy: 'jwt',
  },
  
  callbacks: {
    // ✅ All callbacks go here
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false;
      }
      
      return true;
    },
    
    // ✅ JWT callback - adds data to token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.user_id;
        token.username = user.username;
      }
      return token;
    },
    
    // ✅ Session callback - adds data to session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as number;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  
  providers: [], // Providers added in auth.ts
} satisfies NextAuthConfig;