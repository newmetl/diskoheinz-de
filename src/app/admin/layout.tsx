import Link from "next/link";
import { logoutAction } from "./actions";
import { isAuthenticated } from "@/lib/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="border-b border-white/10 px-6 md:px-12 py-4 flex items-center justify-between">
        <Link
          href="/admin"
          className="text-xl font-headline font-black uppercase tracking-tighter text-white"
        >
          Diskoheinz <span className="text-secondary">Admin</span>
        </Link>
        <nav className="flex items-center gap-4 text-xs uppercase tracking-widest">
          <Link
            href="/"
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            View site
          </Link>
          {authed && (
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-on-surface-variant hover:text-white transition-colors"
              >
                Logout
              </button>
            </form>
          )}
        </nav>
      </header>
      <main className="px-6 md:px-12 py-10 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
