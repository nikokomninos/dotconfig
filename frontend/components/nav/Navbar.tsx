import ThemeSwitcher from "./ThemeSwitcher";
import { cookies } from "next/headers";

/*
 * Navbar - the navbar component, entirely server-side rendered
 */
const Navbar = () => {
  return (
    <div className="bg-background flex justify-center border-b border-b-(--border) mb-20">
      <nav className="flex flex-row justify-between items-center h-12 w-3/4 tracking-tighter">
        <div className="flex flex-row items-center gap-2">
          <Logo />
          <NavbarButton route="/builder" text="Builder" />
        </div>

        <div className="flex flex-row items-center gap-2">
          <ThemeSwitcher />
          <AuthMenu />
        </div>
      </nav>
    </div>
  );
};

/*
 * Logo - the dotconfig logo
 */
const Logo = () => {
  return (
    <a
      href="/"
      className="hover:text-neutral-500 ease-linear duration-75 select-none"
    >
      <h1 className="font-extrabold mr-4">(.dotconfig)</h1>
    </a>
  );
};

/*
 * NavbarButton - a reusable navbar button component
 */
const NavbarButton = ({ route, text }: { route: string; text: string }) => {
  return (
    <a
      href={route}
      className="text-xs px-2 py-1 h-fit rounded-md border border-(--border) bg-background hover:bg-background-alt ease-linear duration-75 select-none"
    >
      {text}
    </a>
  );
};

/*
 * AuthMenu - the right side of the navbar, contains any buttons
 * related to authentication. It is entirely server-side rendered,
 * so there is no flicker when checking the auth state (since auth state
 * is fetched from the backend instead)
 */
const AuthMenu = async () => {
  // Grabs the cookie that is storing the JWT
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  let isAuthenticated = false;

  // Performs two authentication checks (one based on the existence
  // of the cookie, and the other is a double-check with the backend
  // for auth status)
  //
  if (accessToken) isAuthenticated = true;
  else isAuthenticated = false;

  if (accessToken) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/status`,
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          cache: "no-store",
        },
      );

      isAuthenticated = res.ok;
    } catch (e) {
      console.error(e);
      isAuthenticated = false;
    }
  }

  return (
    <div className="flex flex-row gap-2">
      {isAuthenticated ? (
        <form
          action={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/logout`}
          method="POST"
        >
          <button
            type="submit"
            className="text-xs px-2 py-1 rounded-md bg-(--button) text-foreground-alt hover:bg-(--button)/85 ease-linear duration-75 select-none cursor-pointer"
          >
            Logout
          </button>
        </form>
      ) : (
        <>
          <a
            href="/login"
            className="text-xs px-2 py-1 rounded-md bg-(--button) text-foreground-alt hover:bg-(--button)/85 ease-linear duration-75 select-none"
          >
            Login
          </a>
          <a
            href="/register"
            className="text-xs px-2 py-1 rounded-md bg-(--button) text-foreground-alt hover:bg-(--button)/85 ease-linear duration-75 select-none"
          >
            Register
          </a>
        </>
      )}
    </div>
  );
};

export default Navbar;
