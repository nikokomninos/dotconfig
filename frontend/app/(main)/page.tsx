import Hero from "@/components/home/Hero";

/*
 * Home - the home page
 */
const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center tracking-tighter">
      <section id="hero" className="flex flex-row w-3/4 mb-40">
        <Hero />
      </section>
    </div>
  );
};

export default Home;
