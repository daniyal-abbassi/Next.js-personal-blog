// app/lib/auth-helper.ts
import { auth } from '@/auth';
import { prisma } from '@/app/lib/prisma';
import type { User } from '@prisma/client';

/**
 * Get the authenticated user from NextAuth session
 * @returns User object or null if not authenticated
 */
export async function getAuthUser(): Promise<User | null> {
  try {
    const session = await auth();
    
    if (!session || !session.user || !session.user.id) {
      return null;
    }

    // Fetch full user from database using the ID from session
    const user = await prisma.user.findUnique({
      where: { 
        user_id: session.user.id // ✅ FIXED: Use session.user.id (not user_id)
      },
    });

    return user;
  } catch (error) {
    console.error('Failed to get authenticated user:', error);
    return null;
  }
}

/**
 * Require authentication - throws if not authenticated
 * @returns User object
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
 * @param resourceUserId - User ID from the resource (e.g., post.author_id)
 * @param currentUser - Current authenticated user
 * @throws Error if user doesn't own the resource
 */
export function requireOwnership(resourceUserId: number, currentUser: User): void {
  if (resourceUserId !== currentUser.user_id) {
    throw new Error('Forbidden: You can only modify your own content');
  }
}

/**
 * Alternative: Get user ID directly from session (faster, no DB query)
 */
export async function getAuthUserId(): Promise<number | null> {
  try {
    const session = await auth();
    return session?.user?.id || null;
  } catch (error) {
    console.error('Failed to get user ID:', error);
    return null;
  }
}