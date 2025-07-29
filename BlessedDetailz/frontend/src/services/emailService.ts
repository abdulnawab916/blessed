import { EMAIL_CONFIG } from '../config/emailConfig';
import emailjs from '@emailjs/browser';

export interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  vehicleType: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  vehicleLocation: string;
  address: string;
  specialRequests?: string;
  agreement: boolean;
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export class EmailService {
  private static formatBookingEmail(formData: BookingFormData): EmailData {
    const serviceTypeLabels: { [key: string]: string } = {
      'sedan-exterior': 'Sedan Exterior Service - $60',
      'sedan-interior': 'Sedan Interior Service - $60-$90',
      'sedan-full': 'Sedan Full Detail - $130',
      'suv-exterior': 'SUV/Truck Exterior - $70-$80',
      'suv-interior': 'SUV/Truck Interior - $75-$100',
      'suv-full': 'SUV/Truck Full Detail - $160-$180',
      'ceramic-coating': 'Ceramic Coating - $300-$400',
      'paint-correction': '1 Step Paint Correction - $500-$600',
      'paint-ceramic': 'Paint Correction + Ceramic - $650-$750',
      'premium-wash': 'Premium Exterior Wash - $130-$150',
      'sedan-biweekly': 'Sedan Full Detail - Biweekly - $95',
      'sedan-monthly': 'Sedan Full Detail - Monthly - $100',
      'suv-biweekly': 'SUV/Truck Full Detail - Biweekly - $105',
      'suv-monthly': 'SUV/Truck Full Detail - Monthly - $120'
    };

    const timeSlotLabels: { [key: string]: string } = {
      'morning': 'Morning (8 AM - 12 PM)',
      'afternoon': 'Afternoon (12 PM - 4 PM)',
      'evening': 'Evening (4 PM - 8 PM)'
    };

    const locationLabels: { [key: string]: string } = {
      'home': 'At my home',
      'work': 'At my workplace',
      'other': 'Other location'
    };

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #546e7a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .section { margin-bottom: 20px; }
          .section h3 { color: #546e7a; border-bottom: 2px solid #546e7a; padding-bottom: 5px; }
          .field { margin-bottom: 10px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-left: 10px; }
          .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; border-left: 4px solid #2196f3; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚗 New Booking Request</h1>
            <p>Blessed Detailz - Car Detailing Service</p>
          </div>
          <div class="content">
            <div class="section">
              <h3>👤 Customer Information</h3>
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${formData.firstName} ${formData.lastName}</span>
              </div>
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value">${formData.phone}</span>
              </div>
            </div>

            <div class="section">
              <h3>🚙 Service Details</h3>
              <div class="field">
                <span class="label">Vehicle Type:</span>
                <span class="value">${formData.vehicleType}</span>
              </div>
              <div class="field">
                <span class="label">Service Requested:</span>
                <span class="value">${serviceTypeLabels[formData.serviceType] || formData.serviceType}</span>
              </div>
            </div>

            <div class="section">
              <h3>📅 Appointment Details</h3>
              <div class="field">
                <span class="label">Preferred Date:</span>
                <span class="value">${new Date(formData.preferredDate).toLocaleDateString()}</span>
              </div>
              <div class="field">
                <span class="label">Preferred Time:</span>
                <span class="value">${timeSlotLabels[formData.preferredTime] || formData.preferredTime}</span>
              </div>
            </div>

            <div class="section">
              <h3>📍 Location Information</h3>
              <div class="field">
                <span class="label">Vehicle Location:</span>
                <span class="value">${locationLabels[formData.vehicleLocation] || formData.vehicleLocation}</span>
              </div>
              <div class="field">
                <span class="label">Full Address:</span>
                <span class="value">${formData.address}</span>
              </div>
            </div>

            ${formData.specialRequests ? `
            <div class="section">
              <h3>📝 Special Requests</h3>
              <div class="highlight">
                ${formData.specialRequests}
              </div>
            </div>
            ` : ''}

            <div class="section">
              <h3>📊 Booking Summary</h3>
              <div class="highlight">
                <strong>Customer:</strong> ${formData.firstName} ${formData.lastName}<br>
                <strong>Service:</strong> ${serviceTypeLabels[formData.serviceType] || formData.serviceType}<br>
                <strong>Date:</strong> ${new Date(formData.preferredDate).toLocaleDateString()}<br>
                <strong>Time:</strong> ${timeSlotLabels[formData.preferredTime] || formData.preferredTime}<br>
                <strong>Location:</strong> ${formData.address}
              </div>
            </div>

            <div style="margin-top: 30px; padding: 15px; background: #e8f5e8; border-radius: 5px; border-left: 4px solid #4caf50;">
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Review the booking request</li>
                <li>Contact the customer to confirm availability</li>
                <li>Send confirmation email to customer</li>
                <li>Schedule the appointment in your calendar</li>
              </ul>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
New Booking Request - Blessed Detailz

CUSTOMER INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}

SERVICE DETAILS:
Vehicle Type: ${formData.vehicleType}
Service Requested: ${serviceTypeLabels[formData.serviceType] || formData.serviceType}

APPOINTMENT DETAILS:
Preferred Date: ${new Date(formData.preferredDate).toLocaleDateString()}
Preferred Time: ${timeSlotLabels[formData.preferredTime] || formData.preferredTime}

LOCATION INFORMATION:
Vehicle Location: ${locationLabels[formData.vehicleLocation] || formData.vehicleLocation}
Full Address: ${formData.address}

${formData.specialRequests ? `SPECIAL REQUESTS: ${formData.specialRequests}` : ''}

BOOKING SUMMARY:
Customer: ${formData.firstName} ${formData.lastName}
Service: ${serviceTypeLabels[formData.serviceType] || formData.serviceType}
Date: ${new Date(formData.preferredDate).toLocaleDateString()}
Time: ${timeSlotLabels[formData.preferredTime] || formData.preferredTime}
Location: ${formData.address}

Next Steps:
- Review the booking request
- Contact the customer to confirm availability
- Send confirmation email to customer
- Schedule the appointment in your calendar
    `;

    return {
      to: EMAIL_CONFIG.BUSINESS_EMAIL,
      subject: `New Booking Request - ${formData.firstName} ${formData.lastName} - ${serviceTypeLabels[formData.serviceType] || formData.serviceType}`,
      html,
      text
    };
  }

  public static async sendBookingEmail(formData: BookingFormData): Promise<{ success: boolean; message: string }> {
    try {
      const emailData = this.formatBookingEmail(formData);
      
      // Check if EmailJS is configured
      if (EMAIL_CONFIG.EMAILJS.SERVICE_ID === 'your_service_id' || 
          EMAIL_CONFIG.EMAILJS.TEMPLATE_ID === 'your_template_id' || 
          EMAIL_CONFIG.EMAILJS.PUBLIC_KEY === 'your_public_key') {
        
        console.log('EmailJS not configured yet. Email would be sent to:', emailData.to);
        console.log('Email subject:', emailData.subject);
        console.log('Email content:', emailData.text);
        
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          success: true,
          message: 'Booking request submitted successfully! We will contact you soon to confirm your appointment. (EmailJS not configured yet - check console for email data)'
        };
      }

      // Send email using EmailJS
      const templateParams = {
        to_email: emailData.to,
        to_name: 'Blessed Detailz',
        from_name: `${formData.firstName} ${formData.lastName}`,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_phone: formData.phone,
        vehicle_type: formData.vehicleType,
        service_type: formData.serviceType,
        preferred_date: new Date(formData.preferredDate).toLocaleDateString(),
        preferred_time: formData.preferredTime,
        vehicle_location: formData.vehicleLocation,
        address: formData.address,
        special_requests: formData.specialRequests || 'None',
        message: emailData.html
      };

      await emailjs.send(
        EMAIL_CONFIG.EMAILJS.SERVICE_ID,
        EMAIL_CONFIG.EMAILJS.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.EMAILJS.PUBLIC_KEY
      );

      return {
        success: true,
        message: 'Booking request submitted successfully! We will contact you soon to confirm your appointment.'
      };
    } catch (error) {
      console.error('Error sending booking email:', error);
      return {
        success: false,
        message: 'There was an error submitting your booking request. Please try again or contact us directly.'
      };
    }
  }

  public static validateFormData(formData: BookingFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.vehicleType) errors.push('Vehicle type is required');
    if (!formData.serviceType) errors.push('Service type is required');
    if (!formData.preferredDate) errors.push('Preferred date is required');
    if (!formData.preferredTime) errors.push('Preferred time is required');
    if (!formData.vehicleLocation) errors.push('Vehicle location is required');
    if (!formData.address.trim()) errors.push('Address is required');
    if (!formData.agreement) errors.push('You must agree to the terms and conditions');

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.push('Please enter a valid phone number');
    }

    // Date validation
    if (formData.preferredDate) {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.push('Preferred date cannot be in the past');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}