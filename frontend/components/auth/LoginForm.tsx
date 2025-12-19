"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/*
 * LoginForm - a client-side rendered component that handles
 * the action of logging in
 */
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitLogin();
    }
  };

  // This function sends form data instead of a JSON body
  // since the backend is expecting the "password flow" to be
  // in OAuth2 format
  const submitLogin = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include",
          body: new URLSearchParams({
            username,
            password,
          }),
        },
      );

      res.ok ? router.push("/") : alert("Login error");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col">
        <h2 className="text-sm mb-2">Username</h2>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          className="w-75 p-1 mb-5 border border-(--border) rounded-md bg-background drop-shadow-xs"
        />
      </div>

      <div className="flex flex-col">
        <h2 className="text-sm mb-2">Password</h2>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          className="w-75 p-1 mb-8 border border-(--border) rounded-md bg-background drop-shadow-xs"
        />
      </div>

      <button
        type="submit"
        onClick={() => submitLogin()}
        className="text-md mb-10 rounded-md w-75 py-2 border border-(--border) bg-(--button) text-foreground-alt hover:bg-(--button)/85 ease-linear duration-75 cursor-pointer"
      >
        Login
      </button>

      <p className="text-sm">
        Need an account?{" "}
        <a
          href="/register"
          className="underline hover:text-foreground/50 ease-linear duration-75"
        >
          Register here
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
