"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {
    error: undefined as string | undefined,
  });
  const next = useSearchParams().get("next") ?? "/admin";

  return (
    <div className="max-w-sm mx-auto mt-16">
      <h1 className="text-3xl font-headline font-black uppercase tracking-tighter text-white mb-6">
        Login
      </h1>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <div>
          <label
            htmlFor="password"
            className="block text-xs uppercase tracking-widest text-on-surface-variant mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoFocus
            required
            className="w-full px-4 py-3 bg-surface-container border border-outline-variant text-white focus:outline-none focus:border-secondary"
          />
        </div>
        {state?.error && (
          <p className="text-sm text-error">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full px-6 py-3 bg-secondary text-on-secondary text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {pending ? "…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
