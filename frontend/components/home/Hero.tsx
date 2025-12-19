import Image from "next/image";
import { FaApple, FaFedora, FaSuse, FaWindows } from "react-icons/fa";
import { GrArchlinux, GrDebian } from "react-icons/gr";
import { IoMdArrowDropright } from "react-icons/io";
import { SiFreebsd, SiGentoo, SiOpenbsd, SiVoidlinux } from "react-icons/si";

/*
 * Hero - the hero on the homepage
 */
const Hero = () => {
  return (
    <div className="grid grid-cols-2 gap-20">
      <div className="col-span-1">
        <h1 className="text-4xl font-extrabold mb-2 select-none">(.dotconfig)</h1>
        <h1 className="text-2xl font-bold mb-6">
          The Simple System Setup Script Builder
        </h1>

        <p className="text-xl text-neutral-500 mb-6">
          You're a busy person. Setting up your new machine shouldn’t take
          hours. Choose your programs, packages, and preferences, and instantly
          generate a setup script that rebuilds your environment for you.
        </p>

        <a
          href="/builder"
          className="text-md mb-6 w-fit flex flex-row gap-1 hover:gap-2 justify-center items-center px-4 py-2 rounded-md bg-(--button) text-foreground-alt hover:bg-(--button)/85 ease-linear duration-75"
        >
          Get Started
          <IoMdArrowDropright />
        </a>

        <h2 className="font-bold mb-2">Supported Operating Systems</h2>
        <div className="flex flex-row flex-wrap gap-2 mb-4">
          <OSBadge logo={<GrArchlinux size={18} />} os="Arch Linux" />
        </div>

        <h2 className="font-bold mb-2">Supported In The Future</h2>
        <div className="flex flex-row flex-wrap gap-2">
          <OSBadge logo={<FaWindows size={18} />} os="Windows 10 / 11" />
          <OSBadge logo={<FaApple size={18} />} os="macOS" />
          <OSBadge logo={<GrDebian size={18} />} os="Debian" />
          <OSBadge logo={<FaFedora size={18} />} os="Fedora" />
          <OSBadge logo={<FaSuse size={22} />} os="openSUSE" />
          <OSBadge logo={<SiVoidlinux size={18} />} os="Void Linux" />
          <OSBadge logo={<SiGentoo size={18} />} os="Gentoo" />
          <OSBadge logo={<SiOpenbsd size={24} />} os="OpenBSD" />
          <OSBadge logo={<SiFreebsd size={18} />} os="FreeBSD" />
        </div>
      </div>

      <div className="col-span-1">
        <Image
          src="/example.png"
          alt="Example script"
          width={700}
          height={700}
          className="drop-shadow-3xl border border-(--border) rounded-sm"
        />
      </div>
    </div>
  );
};

/*
 * OSBadge - a badge component to show operating systems
 */
const OSBadge = ({ logo, os }: { logo: React.ReactNode; os: string }) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 px-4 py-2 rounded-md border border-(--border) text-sm bg-background select-none">
      {logo}
      {os}
    </div>
  );
};

export default Hero;
