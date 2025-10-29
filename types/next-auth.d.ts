// types/next-auth.d.ts
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      username: string;
    } & DefaultSession['user'];
  }

  interface User {
    user_id: number;
    username: string;
    email?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: number;
    username: string;
  }
}