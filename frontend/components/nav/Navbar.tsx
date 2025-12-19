import ThemeSwitcher from "./ThemeSwitcher";
import AuthMenu from "./AuthMenu";

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

export default Navbar;
