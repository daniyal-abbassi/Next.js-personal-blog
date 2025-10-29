// app/(admin)/admin/page.tsx
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/app/components/private/AdminDashboard';
// import { auth } from '@/app/lib/auth';
import { getAdminPosts, getPostsCount } from '@/app/lib/data';
import { Loader2 } from 'lucide-react';
import { auth } from '@/auth';
import { prisma } from '@/app/lib/prisma';
import { requireAuth } from '@/app/lib/auth-helper';

type SearchParams = {
  tab?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: string;
};

export default async function AdminPage(props: {searchParams:Promise<SearchParams>} ) {
 
  const session = await auth();
  // const session = await auth();
  
  // console.log('=== SESSION DEBUG ===');
  // console.log('Session:', JSON.stringify(session, null, 2));
  // console.log('User ID:', session?.user?.id);
  // console.log('Username:', session?.user?.username);
  // console.log('====================');
  if (!session || !session.user) {
    redirect('/sign-in');
  }

  if (!session || !session.user) {
    console.log('No session, redirecting to sign-in');
    redirect('/sign-in');
  }

  // Check if user.id exists
  if (!session.user.id) {
    console.error('Session user has no ID!');
    redirect('/sign-in');
  }

  // 2. GET FULL USER FROM DATABASE
  const user = await prisma.user.findUnique({
    where: { user_id: session.user.id },
  });

  // console.log('User from DB:', user ? `Found (${user.username})` : 'Not found');

  if (!user) {
    console.error('User not found in database');
    redirect('/sign-in');
  }


  // 2. Parse params
  const prop = await props.searchParams;
  const tab = prop?.tab || 'posts';
  const search = prop?.search || '';
  const sort = prop?.sort || 'created_at';
  const order = prop?.order || 'desc';
  const currentPage = Number(prop?.page) || 1;
  const pageSize = 6;

  // 3. Fetch data in parallel (only if on posts tab)
  const [posts, totalPosts] = tab === 'posts' 
    ? await Promise.all([
        getAdminPosts(search, sort, order, currentPage, pageSize ),
        
        getPostsCount(search),
      ])
    : [[], 0];

  // const [posts, totalPosts] =  await Promise.all([
  //   getAdminPosts(search, sort, order, currentPage, pageSize ),
    
  //   getPostsCount(search),
  // ])
  const totalPages = Math.ceil(totalPosts / pageSize);
  return (
    <main className="p-4">
      <AdminDashboard
        initialTab={tab}
        user={user}
        // Posts data
        posts={posts}
        currentPage={currentPage}
        totalPages={totalPages}
        // Filter/sort values
        search={search}
        sort={sort}
        order={order}
      />
    </main>
  );
}