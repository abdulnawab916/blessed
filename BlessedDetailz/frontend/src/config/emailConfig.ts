// Email Configuration
// Update these values with your actual email service credentials

export const EMAIL_CONFIG = {
  // Your business email address where booking requests will be sent
  BUSINESS_EMAIL: process.env.REACT_APP_BUSINESS_EMAIL || 'blesseddetailz1@gmail.com',
  
  // EmailJS Configuration (if using EmailJS)
  // Get these from https://www.emailjs.com/
  EMAILJS: {
    SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_4lo16hw',
    TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_1fv341n',
    PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '-2nhlm9d-wwnbbdUm',
  },
  
  // Alternative: SendGrid API Key (if using SendGrid)
  SENDGRID_API_KEY: process.env.REACT_APP_SENDGRID_API_KEY || 'your_sendgrid_api_key',
  
  // Alternative: Your own backend API URL (if using custom backend)
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
};

// Instructions for setting up email functionality:
/*
1. For EmailJS (Recommended for simple setup):
   - Sign up at https://www.emailjs.com/
   - Create a new email service (Gmail, Outlook, etc.)
   - Create an email template
   - Update the EMAILJS values above
   - Uncomment the EmailJS implementation in emailService.ts

2. For SendGrid:
   - Sign up at https://sendgrid.com/
   - Get your API key
   - Update SENDGRID_API_KEY above
   - Uncomment the SendGrid implementation in emailService.ts

3. For your own backend:
   - Set up a backend server (Node.js, Python, etc.)
   - Create an endpoint to handle email sending
   - Update API_URL above
   - Uncomment the backend implementation in emailService.ts

4. For immediate testing:
   - The current implementation logs the email data to the console
   - Check the browser console to see what would be sent
   - This allows you to test the form without setting up email services
*/