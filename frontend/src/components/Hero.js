import React, { useEffect, useRef, useState } from 'react';
import { FaMusic, FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${(i * 83) % 100}%`,
            top: `${(i * 47) % 100}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${8 + (i % 5) * 2}s`
          }} />
        ))}
      </div>
      <div className="hero-glow" style={{
        background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(147, 51, 234, 0.15), transparent 50%)`
      }} />

      <div className="hero-content">
        <div className="hero-badge">
          <FaMusic className="badge-icon" />
          <span>Premium Music Academy</span>
        </div>

        <h1 className="hero-title">
          <span className="title-gradient">Shawn's</span>
          <span className="title-light">Academy of</span>
          <span className="title-accent">Music</span>
        </h1>

        <p className="hero-subtitle">
          Where talent meets purpose. Learn from a worship leader, produce your own music,
          and book professional studio sessions that elevate your craft.
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => scrollToSection('booking')}>
            Book a Session <FaArrowRight className="btn-icon" />
          </button>
          <button className="btn btn-ghost" onClick={() => scrollToSection('about')}>
            Discover More
          </button>
        </div>
      </div>

      <div className="hero-orbit">
        <div className="orbit-ring orbit-ring-1"></div>
        <div className="orbit-ring orbit-ring-2"></div>
        <div className="orbit-ring orbit-ring-3"></div>
        <div className="orbit-center">
          <div className="orbit-player">
            <FaMusic />
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <span className="stat-number">100%</span>
          <span className="stat-label">Passion</span>
        </div>
        <div className="stat">
          <span className="stat-number">∞</span>
          <span className="stat-label">Melodies</span>
        </div>
        <div className="stat">
          <span className="stat-number">5★</span>
          <span className="stat-label">Rating</span>
        </div>
        <div className="stat">
          <span className="stat-number">1:1</span>
          <span className="stat-label">Mentorship</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;