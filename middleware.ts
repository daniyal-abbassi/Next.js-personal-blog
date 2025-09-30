import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth; //create automatied pre-defined confituration middleware function

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'], // do not use middleware on api class and static files
    runtime: 'nodejs', //use node.js runtime
  };