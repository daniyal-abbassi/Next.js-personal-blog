// app/lib/auth-helpers.ts
import { auth } from '@/auth';
import type { User } from '@prisma/client';
import { prisma } from "@/app/lib/prisma";


/**
 * Get the authenticated user from NextAuth session
 * @returns User object or null if not authenticated
 */
export async function getAuthUser(): Promise<User | null> {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return null;
    }

    // NextAuth session.user might not have all User fields
    // So we fetch the full user from database
    const user = await prisma.user.findUnique({
      where: { user_id: Number(session.user.id) }, // Adjust based on your session structure
    });

    return user;
  } catch (error) {
    console.error('Failed to get authenticated user:', error);
    return null;
  }
}

/**
 * Check if user is authenticated
 * @throws Error if not authenticated
 */
export async function requireAuth(): Promise<User> {
  const user = await getAuthUser();
  
  if (!user) {
    throw new Error('Unauthorized: Please sign in');
  }
  
  return user;
}

/**
 * Check if user owns the resource
 * @param userId - User ID from the resource
 * @param currentUser - Current authenticated user
 * @throws Error if user doesn't own the resource
 */
export function requireOwnership(userId: number, currentUser: User) {
  if (userId !== currentUser.user_id) {
    throw new Error('Forbidden: You can only modify your own content');
  }
}