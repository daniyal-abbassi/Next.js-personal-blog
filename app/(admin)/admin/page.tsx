import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import AdminDashboard from "@/app/components/private/AdminDashboard";

export default async function AdminPage(props: {
  searchParams?: Promise<{
    tab?: string;
    search?: string;
    sort?: string;
    order?: "asc" | "desc";
    page?: string;
  }>;
}) {
    // User URL rather then UseState
    const prop = await props.searchParams;
    const tab = prop?.tab || 'posts';
    const search = prop?.search || '';
    const sort = prop?.sort || 'created_at';
    const order = prop?.order || 'desc'
    const page = Number(prop?.page) || 1;

    // Check for existing session
    const session = await auth();
    if(!session) {
        redirect('/sign-in')
    }
  return (
        <main className="p-4">
            <Suspense fallback={<DashboardSkeleton />}>
                <AdminDashboard 
                    initialTab={tab}
                    search={search}
                    sort={sort}
                    order={order}
                    page={page}
                />
            </Suspense>
        </main>
  );
}

function DashboardSkeleton() {
    return (
        <div className="min-h-[85vh] flex justify-center items-center">
            <Loader2 className="animate-spin" width={50} height={50} />
        </div>
    )
}


