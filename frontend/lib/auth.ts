import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/*
 * auth.ts - contains helper methods that are
 * ran on certain pages to perform actions based
 * on auth status
 */

/**
 * pageRequiresAuth - redirects to the login page if the user
 * is attempting to access a page that can only be accessed if
 * they are logged in
 */
export const pageRequiresAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) redirect("/login");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/status`,
      {
        headers: { Cookie: `access_token=${token}` },
        cache: "no-store",
      },
    );

    if (!res.ok) redirect("/login");
  } catch (e) {
    console.error(e);
  }

  return true;
};

/**
 * pageRequiresNoAuth - redirects to the home page if the user
 * is attempting to access a page that can only be accessed if
 * they are not logged in
 */
export const pageRequiresNoAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (token) redirect("/");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/status`,
      {
        headers: { Cookie: `access_token=${token}` },
        cache: "no-store",
      },
    );

    if (res.ok) redirect("/");
  } catch (e) {
    console.error(e);
  }

  return true;
};
