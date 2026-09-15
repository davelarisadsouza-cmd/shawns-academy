import React from 'react';
import { FiMusic, FiSliders, FiCalendar, FiUsers, FiActivity, FiArrowRight } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      icon: <FiMusic />,
      title: 'Music Lessons',
      description: 'One-on-one personalized lessons in vocals, guitar, keyboard, and music theory. Tailored to your skill level.',
      features: ['Vocals', 'Guitar', 'Keyboard', 'Music Theory']
    },
    {
      icon: <FiSliders />,
      title: 'Music Production',
      description: 'Full-service audio production: recording, mixing, and mastering. From your home demo to radio-ready tracks.',
      features: ['Recording', 'Mixing', 'Mastering']
    },
    {
      icon: <FiCalendar />,
      title: 'Studio Sessions',
      description: 'Book dedicated studio time for your project. Professional equipment and a creative environment.',
      features: ['Flexible Hours', 'Pro Equipment', 'Guidance']
    },
    {
      icon: <FiUsers />,
      title: 'Worship Team Training',
      description: 'Specialized training for worship teams: harmony, arrangement, and leading with spiritual depth.',
      features: ['Harmony', 'Arrangement', 'Leadership']
    },
    {
      icon: <FiActivity />,
      title: 'Composition & Songwriting',
      description: 'Get help turning your ideas into complete songs. Co-write and arrange with a professional.',
      features: ['Songwriting', 'Arrangement', 'Lyrics']
    },
    {
      icon: <FiMusic />,
      title: 'Digital Products',
      description: 'Skip the theory and dive into action with our premium learning materials, backing tracks, and sessions.',
      features: ['Online Courses', 'Backing Tracks', 'E-Guides']
    }
  ];

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag section-tag-light">Services</span>
          <h2 className="section-title">What We <span className="gradient-text-light">Offer</span></h2>
          <p className="section-subtitle section-subtitle-light">Everything you need to grow as a musician</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card reveal" key={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-tags">
                {service.features.map((feature, i) => (
                  <span className="service-tag" key={i}>#{feature}</span>
                ))}
              </div>
              <button className="service-link" onClick={scrollToBooking}>
                Book This <FiArrowRight />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;