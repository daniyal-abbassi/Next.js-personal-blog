import { DefaultSession,DefaultUser } from "next-auth";
import {JWT, DefaultJWT} from 'next-auth/jwt';


declare module 'next-auth' {
    interface Session {
        user: {
            id: number;
            username: string;
            user_id: number;
        } & DefaultSession['user']
    }

    interface User extends DefaultUser {
        user_id: number;
        username: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        id: number;
        username: string;
    }
}