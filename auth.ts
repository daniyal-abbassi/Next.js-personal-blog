import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import { User } from "@prisma/client";
import {prisma} from "@/app/lib/prisma";
import bcrypt from "bcrypt";

async function getUser(username: string) : Promise<User | undefined> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            }
        });
        return user;        
    } catch (error) {
        console.log('Failed to fetch user: ',error);
        throw new Error('Failed to fetch user.')
    }
};

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) { //authorize called upon every logged in(its a build is Next.js function) + run on server 
            const parsedCredentials = z
                .object({username: z.string().min(3), password: z.string().min(3)})
                .safeParse(credentials);

            if(parsedCredentials.success) {
                const {username, password} = parsedCredentials.data;
                const user = await getUser(username);
                if(!user) return null;
                const passwordMatch = await bcrypt.compare(password, user.password);
                if(passwordMatch) return user;
            }
            console.log('Invalid credentials');
            return null;
        } //async authorize function
    })] //providers
}) //nextAuth