import React, { useState } from 'react';
import './HomePage.css';
import { BookingService } from '../services/bookingService';
import { BookingFormData } from '../services/emailService';

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    vehicleType: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    vehicleLocation: '',
    address: '',
    specialRequests: '',
    agreement: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle type is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';
    if (!formData.vehicleLocation) newErrors.vehicleLocation = 'Vehicle location is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.agreement) newErrors.agreement = 'You must agree to the terms and conditions';

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation
    if (formData.preferredDate) {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.preferredDate = 'Preferred date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitMessage({
        type: 'error',
        text: 'Please fix the errors in the form before submitting.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const result = await BookingService.submitBooking(formData);
      
      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: result.message
        });
        
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          vehicleType: '',
          serviceType: '',
          preferredDate: '',
          preferredTime: '',
          vehicleLocation: '',
          address: '',
          specialRequests: '',
          agreement: false
        });
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.message
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName: string) => {
    return `form-group ${errors[fieldName] ? 'error' : ''}`;
  };

  return (
    <section id="home" className="home-page">
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
            Blessed Detailz
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
              <h4>Sedan Exterior Service</h4>
              <p>Complete exterior cleaning and detailing</p>
              <span className="price">$60</span>
            </div>
            <div className="service-card">
              <h4>Sedan Interior Service</h4>
              <p>Comprehensive interior cleaning and detailing</p>
              <span className="price">$60 - $90</span>
            </div>
            <div className="service-card">
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
              <h4>SUV/Truck Exterior</h4>
              <p>Complete exterior cleaning and detailing</p>
              <span className="price">$70 - $80</span>
            </div>
            <div className="service-card">
              <h4>SUV/Truck Interior</h4>
              <p>Comprehensive interior cleaning and detailing</p>
              <span className="price">$75 - $100</span>
            </div>
            <div className="service-card">
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
            <p><strong>IMPORTANT:</strong> BEFORE ENROLLING IN THE MAINTENANCE PLAN YOU MUST RECEIVE A FULL DETAIL</p>
          </div>
          <div className="services-grid">
            <div className="service-card maintenance">
              <h4>Sedan Full Detail - Biweekly</h4>
              <p>Regular maintenance every 2 weeks</p>
              <span className="price">$95</span>
            </div>
            <div className="service-card maintenance">
              <h4>Sedan Full Detail - Monthly</h4>
              <p>Regular maintenance every month</p>
              <span className="price">$100</span>
            </div>
            <div className="service-card maintenance">
              <h4>SUV/Truck Full Detail - Biweekly</h4>
              <p>Regular maintenance every 2 weeks</p>
              <span className="price">$105</span>
            </div>
            <div className="service-card maintenance">
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

      {/* Booking Section */}
      <div id="reservation" className="booking-section">
        <div className="booking-container">
          <h2>Book Your Service</h2>
          <p className="booking-subtitle">
            Ready to give your vehicle the care it deserves? Fill out the form below to schedule your appointment. 
            We will reach out to you via phone or email to confirm availability and schedule a legitimate time to get your work done.
          </p>
          
          {submitMessage && (
            <div className={`submit-message ${submitMessage.type}`}>
              {submitMessage.text}
            </div>
          )}
          
          <div className="booking-form-container">
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className={getInputClassName('firstName')}>
                  <label htmlFor="firstName">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className={getInputClassName('lastName')}>
                  <label htmlFor="lastName">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row phone-row">
                <div className={getInputClassName('phone')}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>

              <div className={getInputClassName('vehicleType')}>
                <label htmlFor="vehicleType">Vehicle Type *</label>
                <select 
                  id="vehicleType" 
                  name="vehicleType" 
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                >
                  <option value="">Select your vehicle type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                  <option value="other">Other</option>
                </select>
                {errors.vehicleType && <span className="error-message">{errors.vehicleType}</span>}
              </div>

              <div className={getInputClassName('serviceType')}>
                <label htmlFor="serviceType">Service Type *</label>
                <select 
                  id="serviceType" 
                  name="serviceType" 
                  value={formData.serviceType}
                  onChange={handleInputChange}
                >
                  <option value="">Select a service</option>
                  <optgroup label="Sedan Services">
                    <option value="sedan-exterior">Sedan Exterior Service - $60</option>
                    <option value="sedan-interior">Sedan Interior Service - $60-$90</option>
                    <option value="sedan-full">Sedan Full Detail - $130</option>
                  </optgroup>
                  <optgroup label="SUV/Truck Services">
                    <option value="suv-exterior">SUV/Truck Exterior - $70-$80</option>
                    <option value="suv-interior">SUV/Truck Interior - $75-$100</option>
                    <option value="suv-full">SUV/Truck Full Detail - $160-$180</option>
                  </optgroup>
                  <optgroup label="Premium Services">
                    <option value="ceramic-coating">Ceramic Coating - $300-$400</option>
                    <option value="paint-correction">1 Step Paint Correction - $500-$600</option>
                    <option value="paint-ceramic">Paint Correction + Ceramic - $650-$750</option>
                    <option value="premium-wash">Premium Exterior Wash - $130-$150</option>
                  </optgroup>
                  <optgroup label="Maintenance Plans">
                    <option value="sedan-biweekly">Sedan Full Detail - Biweekly - $95</option>
                    <option value="sedan-monthly">Sedan Full Detail - Monthly - $100</option>
                    <option value="suv-biweekly">SUV/Truck Full Detail - Biweekly - $105</option>
                    <option value="suv-monthly">SUV/Truck Full Detail - Monthly - $120</option>
                  </optgroup>
                </select>
                {errors.serviceType && <span className="error-message">{errors.serviceType}</span>}
              </div>

              <div className="form-row">
                <div className={getInputClassName('preferredDate')}>
                  <label htmlFor="preferredDate">Preferred Date *</label>
                  <input 
                    type="date" 
                    id="preferredDate" 
                    name="preferredDate" 
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.preferredDate && <span className="error-message">{errors.preferredDate}</span>}
                </div>
                <div className={getInputClassName('preferredTime')}>
                  <label htmlFor="preferredTime">Preferred Time *</label>
                  <select 
                    id="preferredTime" 
                    name="preferredTime" 
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                  >
                    <option value="">Select preferred time</option>
                    <option value="morning">Morning (8 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                  {errors.preferredTime && <span className="error-message">{errors.preferredTime}</span>}
                </div>
              </div>

              <div className={getInputClassName('vehicleLocation')}>
                <label htmlFor="vehicleLocation">Vehicle Location *</label>
                <select 
                  id="vehicleLocation" 
                  name="vehicleLocation" 
                  value={formData.vehicleLocation}
                  onChange={handleInputChange}
                >
                  <option value="">Select vehicle location</option>
                  <option value="home">At my home</option>
                  <option value="work">At my workplace</option>
                  <option value="other">Other location</option>
                </select>
                {errors.vehicleLocation && <span className="error-message">{errors.vehicleLocation}</span>}
              </div>

              <div className={getInputClassName('address')}>
                <label htmlFor="address">Full Address *</label>
                <textarea 
                  id="address" 
                  name="address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter the full address where the service will be performed"
                  rows={3}
                ></textarea>
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests or Notes</label>
                <textarea 
                  id="specialRequests" 
                  name="specialRequests" 
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Any special requests, vehicle conditions, or additional notes..."
                  rows={3}
                ></textarea>
              </div>

              <div className={`form-group checkbox-group ${getInputClassName('agreement')}`}>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="agreement" 
                    checked={formData.agreement}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  I agree to the terms and conditions and understand that a deposit may be required to confirm my booking.
                </label>
                {errors.agreement && <span className="error-message">{errors.agreement}</span>}
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage; 