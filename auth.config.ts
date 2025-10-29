import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/sign-in'
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) { //auth: session | nextUrl: request
            const isLoggedIn = !!auth?.user; // !! => return a boolean
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            // const isOnEdit = /^\/\d+\/edit/.test(nextUrl.pathname);
            
            // Protect create and edit routes - require login
            if(isOnAdmin) {
                return isLoggedIn; // true if logged in, false if not
            }
            
            // Allow access to all other routes
            return true;
        }
    },
    // Include custom user to token
    async jwt({token, user}) {
        if (user) {
            token.id = user.user_id;
            token.username = user.username;
        };
        return token;
    },
    // Include custom user to session as well
    async session({session, token}) {
        if(session.user) {
            session.user.id = token.id as number;
            session.user.username = token.username as string;
        }
        return session;
    },
    providers: [],
} satisfies NextAuthConfig; //typeScript type check sefaty