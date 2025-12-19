import Image from "next/image";
import { pageRequiresAuth } from "@/lib/auth";

/*
 * Builder - the initial builder page where the user
 * chooses which operating system they would like to
 * generate a system setup script for
 */
const Builder = async () => {
  await pageRequiresAuth();

  return (
    <div className="flex flex-col justify-center items-center tracking-tighter">
      <section id="os" className="flex flex-col items-center w-3/4 mb-40">
        <h1 className="text-4xl font-extrabold mb-20 select-none">
          Select An Operating System
        </h1>
        <div className="flex flex-row flex-wrap">
          <OSCard logo="/arch.png" os="Arch Linux" link="/builder/arch" />
        </div>
      </section>
    </div>
  );
};

/*
 * OSCard - a reusable card component that leads to
 * an operating system's builder page when clicked
 */
const OSCard = ({ logo, os, link }: { logo: string; os: string, link: string }) => {
  return (
    <a href={link} className="w-100 h-50 relative border border-(--border) rounded-md hover:bg-background-alt hover:cursor-pointer ease-linear duration-75 overflow-hidden group">
  <Image
    src={logo}
    alt="Example script"
    width={250}
    height={250}
    className="object-cover opacity-30 group-hover:opacity-50 ease-linear duration-75"
  />
  <div className="absolute inset-0 flex flex-col justify-center items-end pr-15">
    <h2 className="text-xl font-extrabold">{os}</h2>
  </div>
</a>
  );
};

export default Builder;
