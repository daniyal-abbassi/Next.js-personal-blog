"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "../lib/actions";


import ColorModeSelect from "@/app/lib/theme/ColorModeSelect";
import { SignInContainer,SignInCard } from "@/app/ui/styledThemes";
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, TextField, Typography } from "@mui/material";
import Link from "next/link";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
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
          <Box
            component="form"
            // onSubmit={formAction}
            action={formAction}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                error={!!errorMessage}
                helperText={errorMessage}
                id="username"
                type="username"
                name="username"
                placeholder="slim shady"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errorMessage ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={!!errorMessage}
                helperText={errorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errorMessage ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign in
            </Button>
          </Box>
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
