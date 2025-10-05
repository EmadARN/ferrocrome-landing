import About from "./(sections)/About";
import Contact from "./(sections)/Contact";
import Footer from "./(sections)/Footer";
import Header from "./(sections)/Header";
import Hero from "./(sections)/Hero";
import Products from "./(sections)/Product";
import ProductCarousel from "./(sections)/ProductCarousel";
import Navbar from "./(sections)/Navbar";
import WhyChooseUs from "./(sections)/WhyChooseUs";
import WhatIsFerroChrome from "./(sections)/WhatIsFerroChrome";
export default function Home() {
  return (
    <main>
      <Header />
      <section id="hero" className="lg:pt-32">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="ferrochrome" >
        <WhatIsFerroChrome />
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
