import Image from "next/image";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import OSBadge from "./OSBadge";

const Hero = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="col-span-1">
        <h1 className="text-5xl font-bold mb-6">
          Generate Custom Setup Scripts for Any System
        </h1>

        <p className="text-xl text-neutral-400 mb-6">
          You're a busy person. Setting up your new machine shouldn’t take
          hours. Choose your apps, packages, and preferences, and instantly
          generate a universal setup script that rebuilds your environment for
          you.
        </p>

        <div className="flex flex-row gap-3 mb-10">
          <OSBadge icon={<FaLinux size={18} />} os="Arch / Debian" />
          <OSBadge icon={<FaWindows size={18} />} os="Windows 10 / 11" />
          <OSBadge icon={<FaApple size={18} />} os="macOS" />
        </div>

        <div className="flex flex-row gap-3">
          <a
            href="/builder"
            className="text-md flex flex-row gap-1 hover:gap-2 justify-center items-center px-4 py-2 rounded-md bg-foreground text-foreground-alt hover:bg-foreground/85 ease-linear duration-75"
          >
            Get Started
            <IoMdArrowDropright />
          </a>

          <a
            href="/faq"
            className="text-md flex flex-row gap-1 hover:gap-2 justify-center items-center px-4 py-2 rounded-md border border-(--border) hover:bg-background-alt ease-linear duration-75"
          >
            Frequently Asked Questions
            <IoMdArrowDropright />
          </a>
        </div>
      </div>
      <div className="col-span-1">
        <Image
          src="/hero.svg"
          alt="Example script"
          width={700}
          height={700}
          className="drop-shadow-3xl hover:scale-101 ease-linear duration-125"
        />
      </div>
    </div>
  );
};

export default Hero;
