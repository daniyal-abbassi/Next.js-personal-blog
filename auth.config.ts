import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) { //auth: session | nextUrl: request
            const isLoggedIn = !!auth?.user; // !! => return a boolean
            const isOnCreate = !!nextUrl.pathname.startsWith('/create');
            const isOnEdit = !!nextUrl.pathname.startsWith('/edit');
            if(isOnCreate || isOnEdit) {
                if (isLoggedIn) return true; //user is logged-in and also in create page.
                return false; //user is not logged in => back to log-in page.
            } else if(isLoggedIn) { //user is in create and also is logged-in, so stay(redirect) in /create page.
                return Response.redirect(new URL('/create',nextUrl));
            }
            return true;
        }
    },
    providers: [],
} satisfies NextAuthConfig; //typeScript type check sefaty