import About from "@/components/home/About";
import Hero from "@/components/home/Hero";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center tracking-tighter">
      <section id="hero" className="flex flex-row w-3/5 mb-40">
        <Hero />
      </section>

      <section id="about">
      </section>
    </div>
  );
};

export default Home;
