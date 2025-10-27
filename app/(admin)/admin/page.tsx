// app/(admin)/admin/page.tsx
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/app/components/private/AdminDashboard';
// import { auth } from '@/app/lib/auth';
import { getAdminPosts, getPostsCount } from '@/app/lib/data';
import { Loader2 } from 'lucide-react';

type SearchParams = {
  tab?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: string;
};

export default async function AdminPage(props: {searchParams:Promise<SearchParams>} ) {
 

  // 2. Parse params
  const prop = await props.searchParams;
  const tab = prop?.tab || 'posts';
  const search = prop?.search || '';
  const sort = prop?.sort || 'created_at';
  const order = prop?.order || 'desc';
  const currentPage = Number(prop?.page) || 1;
  const pageSize = 6;

  // 3. Fetch data in parallel (only if on posts tab)
  // const [posts, totalPosts] = tab === 'posts' 
  //   ? await Promise.all([
  //       getAdminPosts(search, sort, order, currentPage, pageSize ),
        
  //       getPostsCount(search),
  //     ])
  //   : [[], 0];

  const [posts, totalPosts] =  await Promise.all([
    getAdminPosts(search, sort, order, currentPage, pageSize ),
    
    getPostsCount(search),
  ])
  const totalPages = Math.ceil(totalPosts / pageSize);
  return (
    <main className="p-4">
      <AdminDashboard
        initialTab={tab}
        // user={user}
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