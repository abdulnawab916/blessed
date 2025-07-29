# Booking Service Setup Guide

This guide explains how to set up the booking service to send form submissions to your business email.

## Current Implementation

The booking service is now fully functional with:

- ✅ Form validation (client-side)
- ✅ User feedback and error handling
- ✅ Form data parsing and formatting
- ✅ Email template generation (HTML and text)
- ✅ Booking storage (localStorage for demo)
- ✅ Responsive design and animations

## Email Setup Options

### Option 1: EmailJS (Recommended - Easiest)

1. **Sign up for EmailJS**:
   - Go to https://www.emailjs.com/
   - Create a free account

2. **Set up Email Service**:
   - Add a new email service (Gmail, Outlook, etc.)
   - Connect your business email account

3. **Create Email Template**:
   - Create a new email template
   - Use the HTML template from `emailService.ts` as a starting point

4. **Get Credentials**:
   - Copy your Service ID, Template ID, and Public Key
   - Update `src/config/emailConfig.ts` with these values

5. **Install EmailJS**:
   ```bash
   npm install @emailjs/browser
   ```

6. **Update emailService.ts**:
   - Uncomment the EmailJS implementation
   - Import EmailJS: `import emailjs from '@emailjs/browser';`

### Option 2: SendGrid

1. **Sign up for SendGrid**:
   - Go to https://sendgrid.com/
   - Create a free account (100 emails/day)

2. **Get API Key**:
   - Generate an API key in your SendGrid dashboard
   - Update `src/config/emailConfig.ts` with your API key

3. **Install SendGrid**:
   ```bash
   npm install @sendgrid/mail
   ```

4. **Update emailService.ts**:
   - Uncomment the SendGrid implementation
   - Import SendGrid: `import sgMail from '@sendgrid/mail';`

### Option 3: Custom Backend

1. **Set up a backend server** (Node.js, Python, etc.)
2. **Create an email endpoint** (e.g., `/api/send-booking-email`)
3. **Update `src/config/emailConfig.ts`** with your API URL
4. **Update emailService.ts** to call your backend endpoint

### Option 4: Netlify Functions (Deployment)

1. **Create a Netlify function** in `/netlify/functions/send-email.js`
2. **Use a service like SendGrid or Nodemailer**
3. **Deploy to Netlify** for serverless email sending

## Configuration

Update `src/config/emailConfig.ts` with your email service credentials:

```typescript
export const EMAIL_CONFIG = {
  BUSINESS_EMAIL: 'your-actual-business-email@example.com',
  // ... other config options
};
```

## Testing

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Fill out the booking form** on your website

3. **Check the browser console** to see the email data that would be sent

4. **Set up your chosen email service** and test with real emails

## Email Template

The email template includes:

- Customer information (name, email, phone)
- Service details (vehicle type, service type, pricing)
- Appointment details (date, time)
- Location information (address)
- Special requests (if any)
- Booking summary
- Next steps for the business

## Form Validation

The form validates:

- Required fields
- Email format
- Phone number format
- Date (cannot be in the past)
- Terms agreement

## Error Handling

- Client-side validation with real-time feedback
- Server-side error handling
- User-friendly error messages
- Loading states during submission

## Next Steps

1. Choose your preferred email service
2. Update the configuration
3. Test the booking form
4. Deploy to production
5. Monitor email delivery

## Support

If you need help setting up any of these email services, refer to their official documentation or contact the development team.