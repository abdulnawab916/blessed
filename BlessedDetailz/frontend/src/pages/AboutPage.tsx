import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <section id="about" className="about-page">
      <div className="about-container">
        <h2>About Blessed Detailz</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to Blessed Detailz, where passion meets precision in automotive care. 
              We've been serving our community with professional car detailing services for over 5 years.
            </p>
            <p>
              Our team of certified detailers uses only the highest quality products and 
              state-of-the-art equipment to ensure your vehicle receives the care it deserves.
            </p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <h4>5+ Years Experience</h4>
              </div>
              <div className="feature">
                <span className="feature-icon">🔧</span>
                <h4>Professional Equipment</h4>
              </div>
              <div className="feature">
                <span className="feature-icon">💯</span>
                <h4>100% Satisfaction</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage; 