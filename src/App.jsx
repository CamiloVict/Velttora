import { About } from './components/About';
import { Capabilities } from './components/Capabilities';
import { Contact } from './components/Contact';
import { Divider } from './components/Divider';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Products } from './components/Products';
import { Team } from './components/Team';
import { useNavScroll } from './hooks/useNavScroll';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  useNavScroll();
  useSmoothScroll();

  return (
    <>
      <Nav />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Products />
      <Divider />
      <Capabilities />
      <Divider />
      <Team />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}
