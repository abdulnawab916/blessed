// Google Calendar Configuration
// Update these values with your actual Google Calendar API credentials

export const CALENDAR_CONFIG = {
  // Google Calendar API Configuration
  GOOGLE: {
    // Your Google Calendar ID (usually your email address or 'primary' for main calendar)
    CALENDAR_ID: process.env.REACT_APP_GOOGLE_CALENDAR_ID || 'primary',
    
    // Google API Key (for public calendar access)
    API_KEY: process.env.REACT_APP_GOOGLE_API_KEY || 'your_google_api_key',
    
    // Google OAuth2 Client ID (for authenticated access)
    CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your_google_client_id',
    
    // Google OAuth2 Client Secret (for authenticated access)
    CLIENT_SECRET: process.env.REACT_APP_GOOGLE_CLIENT_SECRET || 'your_google_client_secret',
  },
  
  // Business hours configuration
  BUSINESS_HOURS: {
    START_HOUR: 8, // 8 AM
    END_HOUR: 20,  // 8 PM
    SLOT_DURATION: 2, // 2 hours per slot
    TIMEZONE: 'America/New_York', // Adjust to your timezone
  },
  
  // Booking configuration
  BOOKING: {
    ADVANCE_BOOKING_DAYS: 30, // How many days in advance customers can book
    MIN_NOTICE_HOURS: 24, // Minimum notice required for bookings
    MAX_BOOKINGS_PER_DAY: 6, // Maximum bookings per day
  }
};

// Instructions for setting up Google Calendar API:
/*
1. Go to Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click on it and press "Enable"

4. For Public Calendar Access (Simpler setup):
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key and add it to your .env file:
     REACT_APP_GOOGLE_API_KEY=your_api_key_here
   - Make sure your calendar is set to public

5. For Authenticated Access (More secure):
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add your domain to authorized origins
   - Copy the Client ID and Client Secret
   - Add them to your .env file:
     REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
     REACT_APP_GOOGLE_CLIENT_SECRET=your_client_secret_here

6. Set your calendar ID:
   - For your main calendar, use 'primary'
   - For a specific calendar, use the calendar ID from Google Calendar settings
   - Add to your .env file:
     REACT_APP_GOOGLE_CALENDAR_ID=your_calendar_id_here

7. Create a .env file in your frontend directory with:
   REACT_APP_GOOGLE_API_KEY=your_api_key_here
   REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
   REACT_APP_GOOGLE_CLIENT_SECRET=your_client_secret_here
   REACT_APP_GOOGLE_CALENDAR_ID=your_calendar_id_here

8. Restart your development server after adding environment variables

Note: For production, you'll need to implement proper OAuth2 flow for user authentication.
The current implementation uses mock data for demonstration purposes.
*/