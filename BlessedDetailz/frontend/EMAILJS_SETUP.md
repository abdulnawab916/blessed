# EmailJS Setup Guide for Blessed Detailz

This guide will walk you through setting up EmailJS to send booking form submissions to your `blesseddetailz1@gmail.com` email.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Gmail as Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **"Add New Service"**
3. Choose **"Gmail"** from the list
4. Click **"Connect Account"**
5. Sign in with your Gmail account: `blesseddetailz1@gmail.com`
6. Grant the necessary permissions
7. Give your service a name like "Blessed Detailz Gmail"
8. Click **"Create Service"**

## Step 3: Create Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **"Create New Template"**
3. Give it a name like "Blessed Detailz Booking"
4. Set the **Subject** to: `New Booking Request - {{customer_name}} - {{service_type}}`
5. In the **Content** section, paste this HTML template:

```html
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
          <span class="value">{{customer_name}}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value">{{customer_email}}</span>
        </div>
        <div class="field">
          <span class="label">Phone:</span>
          <span class="value">{{customer_phone}}</span>
        </div>
      </div>

      <div class="section">
        <h3>🚙 Service Details</h3>
        <div class="field">
          <span class="label">Vehicle Type:</span>
          <span class="value">{{vehicle_type}}</span>
        </div>
        <div class="field">
          <span class="label">Service Requested:</span>
          <span class="value">{{service_type}}</span>
        </div>
      </div>

      <div class="section">
        <h3>📅 Appointment Details</h3>
        <div class="field">
          <span class="label">Preferred Date:</span>
          <span class="value">{{preferred_date}}</span>
        </div>
        <div class="field">
          <span class="label">Preferred Time:</span>
          <span class="value">{{preferred_time}}</span>
        </div>
      </div>

      <div class="section">
        <h3>📍 Location Information</h3>
        <div class="field">
          <span class="label">Vehicle Location:</span>
          <span class="value">{{vehicle_location}}</span>
        </div>
        <div class="field">
          <span class="label">Full Address:</span>
          <span class="value">{{address}}</span>
        </div>
      </div>

      <div class="section">
        <h3>📝 Special Requests</h3>
        <div class="highlight">
          {{special_requests}}
        </div>
      </div>

      <div class="section">
        <h3>📊 Booking Summary</h3>
        <div class="highlight">
          <strong>Customer:</strong> {{customer_name}}<br>
          <strong>Service:</strong> {{service_type}}<br>
          <strong>Date:</strong> {{preferred_date}}<br>
          <strong>Time:</strong> {{preferred_time}}<br>
          <strong>Location:</strong> {{address}}
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
```

6. Click **"Save"**

## Step 4: Get Your Credentials

1. **Service ID**: Go to Email Services, find your Gmail service, and copy the Service ID
2. **Template ID**: Go to Email Templates, find your booking template, and copy the Template ID  
3. **Public Key**: Go to Account → API Keys, and copy your Public Key

## Step 5: Update Your Configuration

Open `frontend/src/config/emailConfig.ts` and update these values:

```typescript
export const EMAIL_CONFIG = {
  BUSINESS_EMAIL: 'blesseddetailz1@gmail.com',
  
  EMAILJS: {
    SERVICE_ID: 'your_actual_service_id_here',
    TEMPLATE_ID: 'your_actual_template_id_here', 
    PUBLIC_KEY: 'your_actual_public_key_here',
  },
  // ... rest of config
};
```

## Step 6: Test the Setup

1. Start your development server: `npm start`
2. Fill out the booking form on your website
3. Submit the form
4. Check your `blesseddetailz1@gmail.com` inbox for the email

## Troubleshooting

### If emails aren't sending:
1. Check the browser console for error messages
2. Verify all three credentials are correct
3. Make sure your Gmail service is connected properly
4. Check your EmailJS dashboard for any error logs

### If you get CORS errors:
- This is normal for development. The form will still work in production.

### Free Plan Limits:
- EmailJS free plan allows 200 emails per month
- This should be plenty for a car detailing business

## Next Steps

Once EmailJS is working:
1. Test with a few sample bookings
2. Deploy your website to production
3. Monitor your email inbox for real booking requests
4. Consider upgrading to a paid plan if you exceed 200 emails/month

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/
- If you need help, check the browser console for specific error messages