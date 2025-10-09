import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
        <LoginForm/>
    </Suspense>
  );
}
