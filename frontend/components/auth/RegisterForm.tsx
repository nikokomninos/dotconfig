"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/*
 * RegisterForm - a client-side rendered component that handles
 * the action of registering for a new account
 */
const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitRegister();
    }
  };

  const submitRegister = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        },
      );

      if (res.ok) router.push("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="mb-10">
        <strong>Credential Requirements: </strong> None Currently
      </h1>
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
        onClick={() => submitRegister()}
        className="text-md mb-10 rounded-md w-75 py-2 border border-(--border) bg-(--button) text-foreground-alt hover:bg-(--button)/85 ease-linear duration-75 cursor-pointer"
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
