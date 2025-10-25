import { ThemeProvider } from "@/app/lib/theme/theme-provider";
import { AdminHeader } from "../components/private/admin-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex min-h-screen flex-col">
          <AdminHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </ThemeProvider>
    </>
  );
}
