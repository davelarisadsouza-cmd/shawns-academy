import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FiMail, FiUser, FiPhone, FiMessageCircle, FiSend, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaGoogle } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contact', {
        ...formData,
        type: 'contact'
      });
      toast.success('Message sent! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
          <p className="section-subtitle">Have a question? We'd love to hear from you.</p>
        </div>

        <div className="contact-wrapper reveal-2">
          <div className="contact-info">
            <h3>Reach Out</h3>
            <p>Whether you want to learn music, book a session, or discuss a production project — Shawn would love to connect.</p>

            <div className="contact-info-items">
              <div className="contact-item">
                <div className="contact-icon"><FaInstagram /></div>
                <div>
                  <span className="contact-label">Instagram</span>
                  <a href="https://instagram.com/shawn_mp.4" target="_blank" rel="noopener noreferrer" className="contact-value link">@shawn_mp.4</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FiMapPin /></div>
                <div>
                  <span className="contact-label">Location</span>
                  <span className="contact-value">India</span>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <p>Follow for daily tips, covers & worship:</p>
              <a href="https://instagram.com/shawn_mp.4" target="_blank" rel="noopener noreferrer" className="social-btn">
                <FaInstagram /> @shawn_mp.4
              </a>
            </div>
          </div>

          <div className="contact-form-wrap">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label><FiUser /> Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label><FiPhone /> Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone" />
                </div>
              </div>
              <div className="form-group">
                <label><FiMail /> Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" />
              </div>
              <div className="form-group">
                <label><FiMessageCircle /> Message *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Your message..." required />
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                <FiSend /> {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={4000} />
    </section>
  );
};

export default Contact;