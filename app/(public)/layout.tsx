import { Container, CssBaseline } from "@mui/material";
import AppTheme from "../lib/theme/AppTheme";
import AppAppBar from "../components/public/AppBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InitColorSchemeScript attribute="data-mui-color-scheme" />
      <AppRouterCacheProvider>
        <AppTheme>
          <CssBaseline enableColorScheme>
            <AppAppBar />
            <Container
              maxWidth="lg"
              component="main"
              sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
            >
              {children}
            </Container>
          </CssBaseline>
        </AppTheme>
      </AppRouterCacheProvider>
    </>
  );
}
