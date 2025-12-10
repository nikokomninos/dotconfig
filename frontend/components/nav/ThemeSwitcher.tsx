"use client";

import { useTheme } from "next-themes";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="text-xs flex flex-row tracking-tighter">
      <button
        type="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="p-1 border border-(--border) rounded-md hover:bg-background-alt ease-linear duration-75 cursor-pointer"
      >
        {theme === "light" ? (
          <IoSunnyOutline size={14} />
        ) : (
          <IoMoonOutline size={14} />
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
