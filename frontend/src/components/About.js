import React from 'react';
import { FaHeart, FaUsers, FaChurch, FaGuitar } from 'react-icons/fa';
import { FiMusic, FiMic, FiArrowRight } from 'react-icons/fi';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">About</span>
          <h2 className="section-title">Meet <span className="gradient-text">Shawn Saldana</span></h2>
          <p className="section-subtitle">Dedicated to music, devoted to worship</p>
        </div>

        <div className="about-hero reveal-2">
          <div className="about-photo-wrap">
            <div className="about-photo-glow"></div>
            <img src="/shawn.jpg" alt="Shawn Saldana" className="about-photo" />
          </div>
          <div className="about-bio">
            <h3>A Heart for Music & Worship</h3>
            <p>
              Shawn is a passionate worship leader serving under the grace and guidance of
              <span className="highlight-text"> Pastor Sijo Mathew</span> and
              <span className="highlight-text"> Pastor Ashwini Sijo Mathew</span>.
            </p>
            <p>
              As the founder of Shawn's Academy of Music, he has dedicated his life to
              nurturing the next generation of musicians — with excellence, humility,
              and grace. Every lesson and every note is a reflection of his faith and love for music.
            </p>
            <div className="about-icons-row">
              <div className="about-role"><FiMic /> Worship Leader</div>
              <div className="about-role"><FaGuitar /> Guitarist</div>
              <div className="about-role"><FiMusic /> Music Teacher</div>
              <div className="about-role"><FaUsers /> Mentor</div>
              <div className="about-role"><FaChurch /> Faith-Led</div>
              <div className="about-role"><FaHeart /> Producer</div>
            </div>
          </div>
        </div>

        <div className="about-bottom reveal-3">
          <div className="about-card-bottom">
            <div className="card-icon-wrap"><FaChurch /></div>
            <h4>Worship Leader</h4>
            <p>Leading with authenticity and spiritual depth, creating an atmosphere where heaven and earth meet.</p>
          </div>
          <div className="about-card-bottom">
            <div className="card-icon-wrap"><FaUsers /></div>
            <h4>1-on-1 Mentor</h4>
            <p>Personalized mentorship helping each student discover their unique musical voice.</p>
          </div>
          <div className="about-card-bottom">
            <div className="card-icon-wrap"><FaGuitar /></div>
            <h4>Music Producer</h4>
            <p>Crafting original compositions and producing sessions for artists bringing visions to life.</p>
          </div>
          <div className="about-card-bottom">
            <div className="card-icon-wrap"><FaHeart /></div>
            <h4>Faith-Filled</h4>
            <p>Every lesson, every session, anchored in faith and a commitment to excellence.</p>
          </div>
        </div>

        <div className="about-tagline reveal-4">
          <p>
            <span className="quote-mark">"</span>
            Music is the language of the soul. Let's create something beautiful together.
            <span className="quote-mark">"</span>
          </p>
          <span className="tagline-author">- Shawn Saldana</span>
        </div>
      </div>
    </section>
  );
};

export default About;