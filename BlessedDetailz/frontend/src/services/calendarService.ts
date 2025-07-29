import { google } from 'googleapis';
import { CALENDAR_CONFIG } from '../config/calendarConfig';

export interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
  description?: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
  eventId?: string;
}

export class CalendarService {
  private static calendar: any;
  private static calendarId: string = CALENDAR_CONFIG.GOOGLE.CALENDAR_ID;

  public static async initialize(): Promise<void> {
    try {
      // For now, we'll use a simplified approach
      // In production, you'd need proper OAuth2 authentication
      console.log('Calendar service initialized with config:', {
        calendarId: this.calendarId,
        businessHours: CALENDAR_CONFIG.BUSINESS_HOURS
      });
    } catch (error) {
      console.error('Error initializing calendar service:', error);
    }
  }

  public static async getAvailableTimeSlots(date: string): Promise<TimeSlot[]> {
    try {
      // For demo purposes, we'll generate mock time slots
      // In production, this would fetch from Google Calendar API
      const timeSlots: TimeSlot[] = [];
      const selectedDate = new Date(date);
      
      // Use configuration for business hours
      const startHour = CALENDAR_CONFIG.BUSINESS_HOURS.START_HOUR;
      const endHour = CALENDAR_CONFIG.BUSINESS_HOURS.END_HOUR;
      const slotDuration = CALENDAR_CONFIG.BUSINESS_HOURS.SLOT_DURATION;
      
      for (let hour = startHour; hour < endHour; hour += slotDuration) {
        const startTime = new Date(selectedDate);
        startTime.setHours(hour, 0, 0, 0);
        
        const endTime = new Date(selectedDate);
        endTime.setHours(hour + slotDuration, 0, 0, 0);
        
        // Check if the time is in the past
        const now = new Date();
        const isPast = startTime < now;
        
        // Randomly mark some slots as unavailable for demo (but not past times)
        const isAvailable = !isPast && Math.random() > 0.3; // 70% chance of being available
        
        timeSlots.push({
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          available: isAvailable,
          eventId: isAvailable ? undefined : `mock-event-${hour}`
        });
      }
      
      return timeSlots;
    } catch (error) {
      console.error('Error fetching time slots:', error);
      return [];
    }
  }

  public static async getEventsForDate(date: string): Promise<CalendarEvent[]> {
    try {
      // For demo purposes, we'll return mock events
      // In production, this would fetch from Google Calendar API
      const mockEvents: CalendarEvent[] = [
        {
          id: '1',
          summary: 'Car Detail - John Doe',
          start: `${date}T10:00:00Z`,
          end: `${date}T12:00:00Z`,
          description: 'Sedan Full Detail'
        },
        {
          id: '2',
          summary: 'Car Detail - Jane Smith',
          start: `${date}T14:00:00Z`,
          end: `${date}T16:00:00Z`,
          description: 'SUV Exterior Service'
        }
      ];
      
      return mockEvents;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  public static formatTimeSlot(timeSlot: TimeSlot): string {
    const start = new Date(timeSlot.start);
    const end = new Date(timeSlot.end);
    
    const startTime = start.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    const endTime = end.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    return `${startTime} - ${endTime}`;
  }

  public static isTimeSlotAvailable(timeSlot: TimeSlot): boolean {
    return timeSlot.available;
  }

  public static async createBookingEvent(bookingData: any): Promise<{ success: boolean; eventId?: string; message: string }> {
    try {
      // For demo purposes, we'll simulate creating an event
      // In production, this would create an actual Google Calendar event
      console.log('Creating booking event:', bookingData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const eventId = `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        eventId,
        message: 'Booking event created successfully'
      };
    } catch (error) {
      console.error('Error creating booking event:', error);
      return {
        success: false,
        message: 'Failed to create booking event'
      };
    }
  }
}