"use server";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ColorModeIconDropdown from "@/app/lib/theme/ColorModeIconDropdown";
// import { Link, useNavigate } from "react-router-dom";
import Link from "next/link";
import { signOut, auth } from "@/auth";
import MobileAppBar from "./MobileAppBar";
import { StyledToolbar } from "@/app/ui/styledThemes";
import { handleSignOut } from "@/app/lib/actions";


export default async function AppAppBar(/*{ isAuth, setIsAuth }*/) {
  const session = await auth();
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            {/* <Sitemark /> */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <a
                href="https://github.com/daniyal-abbassi"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button variant="text" color="info" size="small">
                  GitHub
                </Button>
              </a>
              <a
                href="https://mastodon.social/@LainShady"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button variant="text" color="info" size="small">
                  Mostodon
                </Button>
              </a>
            </Box>
          </Box>
          {/* conditional rendering if user is sign-in */}
          {session?.user ? (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <form
                action={handleSignOut}
              >
                <Button color="error" variant="outlined" size="small" type="submit">
                  Log Out
                </Button>
              </form>

              <Button
                LinkComponent={Link}
                href="/admin"
                color="primary"
                variant="contained"
                size="small"
              >
                Admin
              </Button>

              <ColorModeIconDropdown />
            </Box>
          ) : (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Link href="/sign-in">
                <Button color="primary" variant="text" size="small">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button color="primary" variant="contained" size="small">
                  Sign up
                </Button>
              </Link>
              <ColorModeIconDropdown />
            </Box>
          )}
          <MobileAppBar session={session} />
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
