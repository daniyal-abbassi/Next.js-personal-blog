import { Container, CssBaseline } from "@mui/material";
import AppTheme from "../lib/theme/AppTheme";
import AppAppBar from "../components/public/AppBar";


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
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
     
  );
}
