import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <div className="flex justify-center mb-20 border-b border-b-(--border)">
      <nav className="flex flex-row justify-between items-center h-14 w-1/2 tracking-tighter">
        <div>
          <a
            href="/"
            className="flex flex-row items-center gap-2 px-2 py-1 hover:text-neutral-500 ease-linear duration-75"
          >
            <h1 className="font-extrabold">.dotconfig</h1>
          </a>
        </div>

        <div className="flex flex-row items-center gap-3">
          <a href="/builder" className="text-xs px-2 py-1 rounded-md border border-(--border) hover:bg-background-alt ease-linear duration-75">
            Builder
          </a>

          <a href="/faq" className="text-xs px-2 py-1 rounded-md border border-(--border) hover:bg-background-alt ease-linear duration-75">
            FAQ
          </a>
        </div>

        <div className="flex flex-row items-center gap-3">
          <ThemeSwitcher />
          <a href="/login" className="text-xs px-2 py-1 rounded-md bg-foreground text-foreground-alt hover:bg-foreground/85 ease-linear duration-75">
            Login
          </a>

          <a href="/register" className="text-xs px-2 py-1 rounded-md bg-foreground text-foreground-alt hover:bg-foreground/85 ease-linear duration-75">
            Register
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
