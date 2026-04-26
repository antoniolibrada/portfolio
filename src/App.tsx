import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Timeline } from './components/Timeline/Timeline';
import { Projects } from './components/Projects/Projects';
import { Principles } from './components/Principles/Principles';
import { Stack } from './components/Stack/Stack';
import { Contact } from './components/Contact/Contact';

export function App() {
  return (
    <main>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Principles />
      <Stack />
      <Contact />
    </main>
  );
}

export default App;
