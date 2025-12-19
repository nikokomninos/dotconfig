import Builder from "@/components/builder/Builder";
import { pageRequiresAuth } from "@/lib/auth";

/*
 * Arch - the page for building a system setup
 * script for Arch Linux
 */
const Arch = async () => {
  await pageRequiresAuth();

  return (
    <div className="flex flex-col justify-center items-center tracking-tighter">
      <section id="builder" className="flex flex-col w-3/4 mb-40">
        <Builder />
      </section>
    </div>
  );
}

export default Arch;
