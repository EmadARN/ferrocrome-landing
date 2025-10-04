import About from "./(sections)/About";
import Contact from "./(sections)/Contact";
import Footer from "./(sections)/Footer";
import Hero from "./(sections)/Hero";
import WhyChooseUs from "./(sections)/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </main>
  );
}
