import About from "./(sections)/About";
import Contact from "./(sections)/Contact";
import Footer from "./(sections)/Footer";
import Hero from "./(sections)/Hero";
import Products from "./(sections)/Product";
import ProductCarousel from "./(sections)/ProductCarousel";
import Navbar from "./(sections)/Navbar";
import WhyChooseUs from "./(sections)/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>

      <section id="product">
        <Products />
      </section>
      <section id="whyus">
        <WhyChooseUs />
      </section>
        <section id="carousel">
        <ProductCarousel />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
