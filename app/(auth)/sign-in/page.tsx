import ColorModeSelect from "@/app/lib/theme/ColorModeSelect";
import LoginForm from "@/app/ui/login-form";
import { SignInContainer,SignInCard } from "@/app/ui/styledThemes";
import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
        <LoginForm/>
    </Suspense>
  );
}
