import About from "./(sections)/About";
import Contact from "./(sections)/Contact";
import Footer from "./(sections)/Footer";
import Header from "./(sections)/Header";
import Hero from "./(sections)/Hero";
import Navbar from "./(sections)/Navbar";
import WhyChooseUs from "./(sections)/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Header />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="whyus">
        <WhyChooseUs />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
