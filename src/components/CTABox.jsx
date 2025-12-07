import React from 'react';
import './CTABox.css';

const CTABox = () => {
  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAskMe = () => {
    document.getElementById('askme').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta-box-section">
      <div className="cta-box-container">
        <div className="cta-box">
          <div className="cta-content">
            <h2 className="cta-title">Make an Offer or Ask More Questions</h2>
            <p className="cta-description">
              Ready to collaborate? Send me your project details or continue the conversation with my AI assistant.
            </p>
            <div className="cta-buttons">
              <button onClick={scrollToContact} className="cta-btn cta-btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Get in Touch
              </button>
              <button onClick={scrollToAskMe} className="cta-btn cta-btn-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
                Ask AI Assistant
              </button>
            </div>
          </div>
          <div className="cta-decoration">
            <div className="cta-circle"></div>
            <div className="cta-circle"></div>
            <div className="cta-circle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABox;
