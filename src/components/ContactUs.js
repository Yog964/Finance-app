import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>Get in touch with us for any queries or support</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <h3>Contact Information</h3>
            <div className="info-item">
              <span className="icon">📧</span>
              <div>
                <strong>Email:</strong>
                <p><a href="mailto:yogbari964@gmail.com">yogbari964@gmail.com</a></p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">📞</span>
              <div>
                <strong>General Phone No:</strong>
                <p>+91 1800-123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <span className="icon">👨‍💼</span>
              <div>
                <strong>Profile Details:</strong>
                <p>Sushant Bari - Founder & Lead Developer</p>
              </div>
            </div>
          </div>
          
          <div className="management-info">
            <span className="icon">🏢</span>
            <p><strong>Aristos group</strong> is Managing this app.</p>
          </div>
        </div>

        <div className="contact-form-container">
          <h3>Send us a message</h3>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Message Sent!"); }}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="4" placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
