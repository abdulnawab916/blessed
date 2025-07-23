import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <section id="about" className="about-page">
      <div className="about-container">
        <h2>The Man Behind BlessedDetailz</h2>
        
        {/* CEO Section */}
        <div className="ceo-section">
          <div className="ceo-container">
            <div className="ceo-image">
              <img 
                src="/aboutJunaid.png" 
                alt="CEO of Blessed Detailz" 
                className="ceo-photo"
              />
            </div>
            <div className="ceo-bio">
              <h3 className="ceo-name">Junaid Barak</h3>
              <p className="ceo-title">The Founder</p>
              <div className="ceo-description">
                <p>
                  Junaid, the founder of BlessedDetailz, is both a skilled detailer and a driven entrepreneur. 
                  With over a year of hands-on experience in the industry, he launched BlessedDetailz with a 
                  clear mission: to deliver high-quality car care that goes beyond expectations.
                </p>
                <p>
                  What started as a modest mobile detailing service has quickly grown into a trusted name 
                  in the suburban Sacramento community, proudly serving hundreds of satisfied clients. 
                  Junaid's dedication to quality, precision, and customer satisfaction continues to fuel 
                  the success of BlessedDetailz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage; 