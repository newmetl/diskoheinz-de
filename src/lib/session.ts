import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";

export type SessionData = {
  isAdmin?: boolean;
};

export function getSessionOptions(): SessionOptions {
  const password = process.env.ADMIN_SESSION_SECRET;
  if (!password || password.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set or shorter than 32 characters.",
    );
  }
  return {
    password,
    cookieName: "diskoheinz_admin",
    cookieOptions: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
    ttl: 60 * 60 * 24 * 7, // 7 days
  };
}

export async function getSession() {
  const store = await cookies();
  return getIronSession<SessionData>(store, getSessionOptions());
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session.isAdmin === true;
}
