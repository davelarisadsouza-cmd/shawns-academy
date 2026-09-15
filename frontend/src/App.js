import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Booking from './components/Booking';
import Products from './components/Products';
import MusicProduction from './components/MusicProduction';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-2, .reveal-3, .reveal-4, .reveal-5, .reveal-6, .reveal-7').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Services />
              <Products />
              <MusicProduction teaser />
              <Booking />
            </>
          } />
          <Route path="/production" element={<MusicProduction />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;