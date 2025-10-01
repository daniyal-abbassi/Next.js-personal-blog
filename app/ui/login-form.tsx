"use client";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { authenticate } from "../lib/actions";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/create";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction}>
      <div>
        <div className="flex mb-4">
          <label htmlFor="username">username</label>
          <input type="text" name="username" id="username" required className="border rounded-md w-[140px] mx-5"/>
        </div>
        <div className="flex">
          <label htmlFor="password">Password</label>
          <input className="border rounded-md w-[140px] mx-5" type="password" name="password" id="password" required />
        </div>
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button className="mt-4 w-30 px-5 border rounded-md flex items-center justify-center gap-3  grow" aria-disabled={isPending}>
        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-100" />
      </button>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
}
