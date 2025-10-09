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
    providers: [],
} satisfies NextAuthConfig; //typeScript type check sefaty