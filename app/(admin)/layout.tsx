import { ThemeProvider } from "@/app/lib/theme/theme-provider";
import { AdminHeader } from "../components/private/admin-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AdminHeader/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
