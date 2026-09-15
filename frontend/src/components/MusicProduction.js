import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FiMic, FiMail, FiUser, FiPhone, FiSend, FiMusic, FiArrowRight } from 'react-icons/fi';
import { FaRecordVinyl } from 'react-icons/fa';

const MusicProduction = ({ teaser }) => {
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInquiry({ ...inquiry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inquiry.name || !inquiry.email || !inquiry.message) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/inquiries', {
        ...inquiry,
        subject: `Music Production Inquiry - ${inquiry.projectType || 'General'}`,
        type: 'production'
      });
      toast.success('Inquiry sent! Shawn will get back to you soon.');
      setInquiry({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const projectTypes = [
    'Song Production',
    'Album/EP',
    'Recording Session',
    'Mixing & Mastering',
    'Original Composition',
    'Jingle/Commercial'
  ];

  if (teaser) {
    return (
      <section className="production-section production-teaser" id="production">
        <div className="container">
          <div className="production-teaser-card reveal-2">
            <div className="production-info">
              <span className="section-tag">Music Production</span>
              <h2 className="section-title">Let's Create Something <span className="gradient-text">Legendary</span></h2>
              <p className="section-subtitle">
                Shawn doesn't just teach music — he creates it. Original tracks, full studio
                sessions, mixing & mastering. Bring your vision to life.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/production')}>
                Start a Project <FiArrowRight className="btn-icon" />
              </button>
            </div>
            <div className="production-teaser-icons">
              <div className="teaser-icon"><FiMic /></div>
              <div className="teaser-icon"><FiMusic /></div>
              <div className="teaser-icon"><FiSend /></div>
              <div className="teaser-icon"><FaRecordVinyl /></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="production-section" id="production">
      <div className="container">
        <div className="production-wrapper">
          <div className="production-info">
            <span className="section-tag">Music Production</span>
            <h2 className="section-title">Let's Create Something <span className="gradient-text">Legendary</span></h2>
            <p className="section-subtitle">
              Shawn doesn't just teach music - he creates it. From producing original tracks to
              full-scale studio sessions, if you have a vision, he can bring it to life.
            </p>

            <div className="production-features">
              <div className="production-feature">
                <div className="pf-icon"><FiMic /></div>
                <div>
                  <h4>Professional Studio Quality</h4>
                  <p>State-of-the-art recording and mixing that sounds radio-ready.</p>
                </div>
              </div>
              <div className="production-feature">
                <div className="pf-icon"><FiMusic /></div>
                <div>
                  <h4>Original Compositions</h4>
                  <p>Custom music created for worship, personal use, or commercial projects.</p>
                </div>
              </div>
              <div className="production-feature">
                <div className="pf-icon"><FiSend /></div>
                <div>
                  <h4>Collaborative Process</h4>
                  <p>Work closely with Shawn from concept to final master.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="production-form-wrap">
            <h3>Send a Production Inquiry</h3>
            <form onSubmit={handleSubmit} className="production-form">
              <div className="form-group">
                <label><FiUser /> Name *</label>
                <input type="text" name="name" value={inquiry.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label><FiMail /> Email *</label>
                <input type="email" name="email" value={inquiry.email} onChange={handleChange} placeholder="Your email" required />
              </div>
              <div className="form-group">
                <label><FiPhone /> Phone</label>
                <input type="tel" name="phone" value={inquiry.phone} onChange={handleChange} placeholder="Your phone" />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Project Type</label>
                  <select name="projectType" value={inquiry.projectType} onChange={handleChange}>
                    <option value="">Select type</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Budget Range</label>
                  <select name="budget" value={inquiry.budget} onChange={handleChange}>
                    <option value="">Select range</option>
                    <option value="Under ₹2,000">Under ₹2,000</option>
                    <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
                    <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                    <option value="₹10,000+">₹10,000+</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Tell Us Your Vision *</label>
                <textarea name="message" value={inquiry.message} onChange={handleChange} rows="4" placeholder="Describe your project, musical style, references..." required />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={4000} />
    </section>
  );
};

export default MusicProduction;