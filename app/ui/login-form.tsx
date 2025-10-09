"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "../lib/actions";
// import { ArrowRightIcon } from "@heroicons/react/24/outline";
// import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

// export default function A() {
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl") || "/";
//   const [errorMessage, formAction, isPending] = useActionState(
//     authenticate,
//     undefined
//   );

//   return (
//     <form action={formAction}>
//       <div>
//         <div className="flex mb-4">
//           <label htmlFor="username">username</label>
//           <input type="text" name="username" id="username" required className="border rounded-md w-[140px] mx-5"/>
//         </div>
//         <div className="flex">
//           <label htmlFor="password">Password</label>
//           <input className="border rounded-md w-[140px] mx-5" type="password" name="password" id="password" required />
//         </div>
//       </div>
//       <input type="hidden" name="redirectTo" value={callbackUrl} />
//       <button className="mt-4 w-30 px-5 border rounded-md flex items-center justify-center gap-3  grow" aria-disabled={isPending}>
//         Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-100" />
//       </button>
//       <div
//         className="flex h-8 items-end space-x-1"
//         aria-live="polite"
//         aria-atomic="true"
//       >
//         {errorMessage && (
//           <>
//             <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
//             <p className="text-sm text-red-500">{errorMessage}</p>
//           </>
//         )}
//       </div>
//     </form>
//   );
// }

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
