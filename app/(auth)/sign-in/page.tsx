import ColorModeSelect from "@/app/lib/theme/ColorModeSelect";
import LoginForm from "@/app/ui/login-form";
import { SignInContainer,SignInCard } from "@/app/ui/styledThemes";
import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignInCard variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
         <Suspense>
            <LoginForm />
         </Suspense>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link href="/sign-up">
                <Button color="primary" variant="outlined" size="small">
                  Sign up
                </Button>
              </Link>
            </Typography>
          </Box>
        </SignInCard>
    </SignInContainer>
  );
}
