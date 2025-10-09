import SignUpForm from "@/app/ui/signUp-form";
import { Suspense } from "react";



export default function Page() {
    return (
        <Suspense>
            <SignUpForm />
        </Suspense>
    )
}