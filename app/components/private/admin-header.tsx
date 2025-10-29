// app/components/admin/admin-header.tsx
'use client';

import { ModeToggle } from '@/app/components/private/ModeToggle';
import { Button } from '@/app/ui/button';
import { handleSignOut } from '@/app/lib/actions';
import { signOut } from '@/auth';
import Link from 'next/link';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background p-4">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="text-xl font-bold">
          Admin Dashboard
        </Link>

        
        <div className="flex items-center gap-4">
          <ModeToggle />
          <form
            action={handleSignOut}
          >
            <Button variant="ghost" size="sm">
              Sign out
            </Button>
          </form>
          <Link href="/posts" className="text-md font-bold border p-2 rounded outline">
          Posts
        </Link>
        </div>
      </div>
    </header>
  );
}