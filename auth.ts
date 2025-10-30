
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function getUser(username: string): Promise<User | null> {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    return user;
  } catch (error) {
    console.log('Failed to fetch user: ', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string().min(3),
            password: z.string().min(3),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);

          if (!user) {
            console.log('User not found');
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            // ✅ Return user object - this will be passed to jwt() callback
            return {
              id: user.user_id.toString(),
              user_id: user.user_id,
              username: user.username,
            };
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});