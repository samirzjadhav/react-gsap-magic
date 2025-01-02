import "./App.css";
import About from "./components/About";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  );
}

export default App;
