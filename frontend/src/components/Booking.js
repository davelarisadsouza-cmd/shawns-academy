import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiClock, FiUser, FiPhone, FiMail, FiMessageCircle, FiCheck } from 'react-icons/fi';

const Booking = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const timeSlots = {
    morning: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
    afternoon: ['02:00 PM', '03:00 PM', '04:00 PM'],
    evening: ['05:00 PM', '06:00 PM', '07:00 PM']
  };

  const serviceOptions = [
    'Music Lessons',
    'Studio Session',
    'Music Production',
    'Worship Training',
    'Composition/Songwriting'
  ];

  useEffect(() => {
    if (date) {
      setSelectedTime('');
      const formatted = date.toISOString().split('T')[0];
      axios.get(`http://localhost:5000/api/available-slots?date=${formatted}`)
        .then(res => setAvailableSlots(res.data))
        .catch(err => console.log('Using all slots'));
    }
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !selectedTime || !serviceType || !formData.name || !formData.email) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        ...formData,
        date,
        time: selectedTime,
        serviceType
      });
      setBookingSuccess(true);
      toast.success('Booking submitted successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedTime('');
      setServiceType('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isToday = (d) => {
    const today = new Date();
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  };

  const customTileContent = ({ date }) => {
    if (isToday(date)) return <span className="today-dot"></span>;
    return null;
  };

  return (
    <section className="booking-section" id="booking">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Book a Session</span>
          <h2 className="section-title">Reserve Your <span className="gradient-text">Class</span></h2>
          <p className="section-subtitle">Choose your date and time - we'll confirm within 24 hours</p>
        </div>

        {bookingSuccess ? (
          <div className="booking-success reveal">
            <div className="success-icon"><FiCheck /></div>
            <h3>Booking Received!</h3>
            <p>Your session request has been sent. We'll get back to you at your email within 24 hours to confirm.</p>
            <button className="btn btn-primary" onClick={() => setBookingSuccess(false)}>Book Another Session</button>
          </div>
        ) : (
          <div className="booking-wrapper reveal-2">
            <div className="calendar-container">
              <h3 className="booking-label"><FiClock /> Select Your Date</h3>
              <Calendar
                onChange={setDate}
                value={date}
                minDate={new Date()}
                tileContent={customTileContent}
                className="custom-calendar"
              />
            </div>

            <div className="booking-form-container">
              <h3 className="booking-label"><FiClock /> Available Time Slots</h3>
              <div className="time-slots">
                {Object.entries(timeSlots).map(([period, slots]) => (
                  <div className="time-period" key={period}>
                    <span className="period-label">{period.charAt(0).toUpperCase() + period.slice(1)}</span>
                    <div className="slot-grid">
                      {slots.map((time) => {
                        const isAvailable = date && availableSlots.length > 0 ? availableSlots.includes(time) : true;
                        return (
                          <button
                            key={time}
                            className={`time-slot ${selectedTime === time ? 'selected' : ''} ${!isAvailable ? 'unavailable' : ''}`}
                            onClick={() => isAvailable && setSelectedTime(time)}
                            disabled={!isAvailable}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-row">
                  <div className="form-group">
                    <label><FiUser /> Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label><FiPhone /> Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label><FiMail /> Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Service Type *</label>
                  <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} required>
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label><FiMessageCircle /> Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific requirements or goals?"
                    rows="3"
                  />
                </div>

                <div className="booking-summary">
                  <p><strong>Date:</strong> {date ? date.toDateString() : 'Not selected'}</p>
                  <p><strong>Time:</strong> {selectedTime || 'Not selected'}</p>
                  <p><strong>Service:</strong> {serviceType || 'Not selected'}</p>
                </div>

                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" autoClose={4000} />
    </section>
  );
};

export default Booking;