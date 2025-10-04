import About from "./(sections)/About";
import Contact from "./(sections)/Contact";
import Footer from "./(sections)/Footer";
import Hero from "./(sections)/Hero";
import Products from "./(sections)/Product";
import ProductCarousel from "./(sections)/ProductCarousel";
import WhyChooseUs from "./(sections)/WhyChooseUs";

export default function Home() {
  return (
    <main >
      <Hero />
      <About />
      <Products/>
      <WhyChooseUs />
      <ProductCarousel/>
      <Contact />
      <Footer />
    </main>
  );
}
