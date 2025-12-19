"use client";

import { useEffect, useState } from "react";

const AuthMenu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/status`, {
          credentials: "include",
          cache: "no-store",
        });
        setIsAuthenticated(res.ok);
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return null;

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

export default AuthMenu;
