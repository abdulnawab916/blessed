# Google Calendar Integration Setup Guide

## Overview
This guide explains how to set up the Google Calendar integration for the Blessed Detailz booking system. The calendar displays available time slots and existing bookings on the right side of the booking form.

## Features Implemented

### ✅ Completed Features
1. **Calendar Component** - Displays available time slots and existing bookings
2. **Time Slot Selection** - Users can click on available time slots to auto-fill the time field
3. **Responsive Design** - Calendar adapts to mobile devices
4. **Mock Data** - Currently uses mock data for demonstration
5. **Configuration System** - Centralized configuration for business hours and API settings

### 🔄 Current Implementation
- **Mock Calendar Service** - Generates realistic time slots and events for demo purposes
- **Two-Column Layout** - Form on left, calendar on right
- **Interactive Time Slots** - Click to select available times
- **Business Hours Configuration** - Configurable start/end times and slot duration

## File Structure
```
src/
├── components/
│   ├── Calendar.tsx          # Main calendar component
│   └── Calendar.css          # Calendar styling
├── services/
│   ├── calendarService.ts    # Calendar API service
│   └── CALENDAR_SETUP.md     # This file
├── config/
│   └── calendarConfig.ts     # Calendar configuration
└── pages/
    └── HomePage.tsx          # Updated with calendar integration
```

## Configuration

### Environment Variables
Create a `.env` file in the `frontend` directory:

```env
# Google Calendar API Configuration
REACT_APP_GOOGLE_API_KEY=your_api_key_here
REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
REACT_APP_GOOGLE_CLIENT_SECRET=your_client_secret_here
REACT_APP_GOOGLE_CALENDAR_ID=your_calendar_id_here
```

### Business Hours Configuration
Edit `src/config/calendarConfig.ts` to set your business hours:

```typescript
BUSINESS_HOURS: {
  START_HOUR: 8,    // 8 AM
  END_HOUR: 20,     // 8 PM
  SLOT_DURATION: 2, // 2 hours per slot
  TIMEZONE: 'America/New_York', // Your timezone
}
```

## Google Calendar API Setup

### Step 1: Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing (required for API access)

### Step 2: Enable Google Calendar API
1. Go to "APIs & Services" > "Library"
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

### Step 3: Create Credentials

#### Option A: API Key (Simpler - Public Calendar)
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key
4. Add to `.env`: `REACT_APP_GOOGLE_API_KEY=your_api_key_here`
5. Make your calendar public in Google Calendar settings

#### Option B: OAuth 2.0 (More Secure - Private Calendar)
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add your domain to authorized origins
5. Copy Client ID and Client Secret
6. Add to `.env`:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here
   REACT_APP_GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```

### Step 4: Set Calendar ID
1. For main calendar: use `primary`
2. For specific calendar: get ID from Google Calendar settings
3. Add to `.env`: `REACT_APP_GOOGLE_CALENDAR_ID=your_calendar_id_here`

## Implementation Details

### Calendar Service (`calendarService.ts`)
- **Mock Data Generation**: Currently generates realistic time slots and events
- **Business Hours**: Respects configured start/end times
- **Past Time Filtering**: Automatically marks past times as unavailable
- **Event Creation**: Simulates creating calendar events for bookings

### Calendar Component (`Calendar.tsx`)
- **Time Slot Display**: Shows available and unavailable time slots
- **Event Display**: Shows existing bookings for the selected date
- **Interactive Selection**: Click time slots to auto-fill form
- **Loading States**: Shows spinner while fetching data
- **Responsive Design**: Adapts to mobile screens

### Integration with Booking Form
- **Date Selection**: Calendar updates when user selects a date
- **Time Auto-fill**: Clicking time slots updates the time dropdown
- **Real-time Updates**: Calendar refreshes when date changes

## Next Steps for Production

### 1. Replace Mock Data with Real API Calls
```typescript
// In calendarService.ts, replace mock functions with:
public static async getAvailableTimeSlots(date: string): Promise<TimeSlot[]> {
  const calendar = google.calendar({ version: 'v3', auth: this.auth });
  const response = await calendar.events.list({
    calendarId: this.calendarId,
    timeMin: startOfDay,
    timeMax: endOfDay,
    singleEvents: true,
    orderBy: 'startTime',
  });
  // Process real events and return available slots
}
```

### 2. Implement OAuth2 Authentication
```typescript
// Add proper OAuth2 flow for user authentication
const auth = new google.auth.OAuth2(
  CALENDAR_CONFIG.GOOGLE.CLIENT_ID,
  CALENDAR_CONFIG.GOOGLE.CLIENT_SECRET,
  'http://localhost:3000/callback'
);
```

### 3. Add Real Event Creation
```typescript
// Create actual Google Calendar events for bookings
public static async createBookingEvent(bookingData: any) {
  const calendar = google.calendar({ version: 'v3', auth: this.auth });
  const event = {
    summary: `Car Detail - ${bookingData.firstName} ${bookingData.lastName}`,
    description: `${bookingData.serviceType} - ${bookingData.address}`,
    start: { dateTime: bookingData.startTime },
    end: { dateTime: bookingData.endTime },
  };
  return await calendar.events.insert({
    calendarId: this.calendarId,
    resource: event,
  });
}
```

### 4. Add Error Handling
- Network error handling
- API rate limiting
- Invalid date/time handling
- Calendar access permission errors

### 5. Add Caching
- Cache calendar data to reduce API calls
- Implement refresh mechanisms
- Handle stale data scenarios

## Testing

### Current Mock Data
The system currently generates:
- 6 time slots per day (8 AM - 8 PM, 2-hour slots)
- 70% availability rate (random)
- 2 mock events per day
- Past times automatically marked as unavailable

### Testing Scenarios
1. **Date Selection**: Select different dates to see calendar updates
2. **Time Slot Selection**: Click available slots to auto-fill time
3. **Mobile Responsiveness**: Test on different screen sizes
4. **Form Integration**: Verify time selection updates the form

## Troubleshooting

### Common Issues
1. **Calendar not loading**: Check browser console for errors
2. **Time slots not showing**: Verify date is selected in form
3. **Styling issues**: Check CSS file paths and imports
4. **API errors**: Verify environment variables are set correctly

### Debug Mode
Enable debug logging in `calendarService.ts`:
```typescript
console.log('Calendar service initialized with config:', {
  calendarId: this.calendarId,
  businessHours: CALENDAR_CONFIG.BUSINESS_HOURS
});
```

## Support
For issues or questions about the calendar integration, check:
1. Browser console for error messages
2. Network tab for API call failures
3. Environment variable configuration
4. Google Calendar API documentation