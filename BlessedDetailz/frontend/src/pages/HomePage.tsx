import React from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <section id="home" className="home-page">
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
            Welcome to Blessed Detailz! 
            </h1>
            <p className="hero-subtitle">
            Blessed Detailz is a car detailing service that provides a wide range of services to keep your car looking its best.
            Owned by, and managed by Junaid Barak, a car enthusiast and detailer with over a year of experience.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Your Service
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="logo-container">
              <img 
                src="/blessed-detailz-logo.PNG" 
                alt="Blessed Detailz Logo" 
                className="company-logo"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="services-section">
        <h2>Our Services</h2>
        
        <div className="service-category">
          <h3>Sedan Services</h3>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🚿</div>
              <h4>Sedan Exterior Service</h4>
              <p>Complete exterior cleaning and detailing</p>
              <span className="price">$60</span>
            </div>
            <div className="service-card">
              <div className="service-icon">🧽</div>
              <h4>Sedan Interior Service</h4>
              <p>Comprehensive interior cleaning and detailing</p>
              <span className="price">$60 - $100</span>
            </div>
            <div className="service-card">
              <div className="service-icon">✨</div>
              <h4>Sedan Full Detail</h4>
              <p>Complete interior and exterior detailing</p>
              <span className="price">$130</span>
            </div>
          </div>
        </div>

        <div className="service-category">
          <h3>SUV/Truck Services</h3>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🚙</div>
              <h4>SUV/Truck Exterior</h4>
              <p>Complete exterior cleaning and detailing</p>
              <span className="price">$70 - $80</span>
            </div>
            <div className="service-card">
              <div className="service-icon">🧽</div>
              <h4>SUV/Truck Interior</h4>
              <p>Comprehensive interior cleaning and detailing</p>
              <span className="price">$75 - $100</span>
            </div>
            <div className="service-card">
              <div className="service-icon">✨</div>
              <h4>SUV/Truck Full Detail</h4>
              <p>Complete interior and exterior detailing</p>
              <span className="price">$160 - $180</span>
            </div>
          </div>
        </div>

        <div className="service-category">
          <h3>Premium Services</h3>
          <div className="services-grid">
            <div className="service-card premium">
              <div className="service-icon">💎</div>
              <h4>Ceramic Coating</h4>
              <ul className="service-details">
                <li>All 4 tires cleaned</li>
                <li>Pre wash & Hand wash</li>
                <li>Iron remover decontamination</li>
                <li>Clay mitt decontamination</li>
                <li>Hand dried with tire shine</li>
                <li>Alcohol IPA wipe down</li>
                <li>Ceramic Coating application</li>
              </ul>
              <span className="price">$300 - $400</span>
            </div>
            <div className="service-card premium">
              <div className="service-icon">🔧</div>
              <h4>1 Step Paint Correction</h4>
              <ul className="service-details">
                <li>All 4 tires cleaned</li>
                <li>Pre wash & Hand wash</li>
                <li>Iron remover decontamination</li>
                <li>Clay mitt decontamination</li>
                <li>Hand dried with tire shine</li>
                <li>1 Step Paint Correction</li>
              </ul>
              <span className="price">$500 - $600</span>
            </div>
            <div className="service-card premium">
              <div className="service-icon">💎🔧</div>
              <h4>Paint Correction + Ceramic</h4>
              <ul className="service-details">
                <li>All 4 tires cleaned</li>
                <li>Pre wash & Hand wash</li>
                <li>Iron remover decontamination</li>
                <li>Clay mitt decontamination</li>
                <li>Hand dried with tire shine</li>
                <li>1 Step Paint Correction</li>
                <li>Alcohol IPA wipe down</li>
                <li>Ceramic Coating application</li>
              </ul>
              <span className="price">$650 - $750</span>
            </div>
            <div className="service-card premium">
              <div className="service-icon">🌟</div>
              <h4>Premium Exterior Wash</h4>
              <ul className="service-details">
                <li>All 4 tires cleaned</li>
                <li>Pre wash & Hand wash</li>
                <li>Iron remover decontamination</li>
                <li>Clay mitt decontamination</li>
                <li>Alcohol IPA wipe down</li>
                <li>Waxing</li>
              </ul>
              <span className="price">$130 - $150</span>
            </div>
          </div>
        </div>

        <div className="service-category">
          <h3>Maintenance Plans</h3>
          <div className="maintenance-notice">
            <p><strong>⚠️ IMPORTANT:</strong> BEFORE ENROLLING IN THE MAINTENANCE PLAN YOU MUST RECEIVE A FULL DETAIL</p>
          </div>
          <div className="services-grid">
            <div className="service-card maintenance">
              <div className="service-icon">📅</div>
              <h4>Sedan Full Detail - Biweekly</h4>
              <p>Regular maintenance every 2 weeks</p>
              <span className="price">$95</span>
            </div>
            <div className="service-card maintenance">
              <div className="service-icon">📅</div>
              <h4>Sedan Full Detail - Monthly</h4>
              <p>Regular maintenance every month</p>
              <span className="price">$100</span>
            </div>
            <div className="service-card maintenance">
              <div className="service-icon">📅</div>
              <h4>SUV/Truck Full Detail - Biweekly</h4>
              <p>Regular maintenance every 2 weeks</p>
              <span className="price">$105</span>
            </div>
            <div className="service-card maintenance">
              <div className="service-icon">📅</div>
              <h4>SUV/Truck Full Detail - Monthly</h4>
              <p>Regular maintenance every month</p>
              <span className="price">$120</span>
            </div>
          </div>
        </div>

        <div className="established-info">
          <p>Established September 2024</p>
        </div>
      </div>
    </section>
  );
};

export default HomePage; 