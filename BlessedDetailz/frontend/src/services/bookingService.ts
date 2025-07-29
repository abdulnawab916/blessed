import { EmailService, BookingFormData } from './emailService';

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
}

export class BookingService {
  public static async submitBooking(formData: BookingFormData): Promise<BookingResponse> {
    try {
      // Validate form data
      const validation = EmailService.validateFormData(formData);
      
      if (!validation.isValid) {
        return {
          success: false,
          message: `Please fix the following errors:\n${validation.errors.join('\n')}`
        };
      }

      // Send email notification
      const emailResult = await EmailService.sendBookingEmail(formData);
      
      if (!emailResult.success) {
        return {
          success: false,
          message: emailResult.message
        };
      }

      // Generate a simple booking ID (in production, this would come from a database)
      const bookingId = `BD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Store booking data in localStorage for demo purposes
      // In production, this would be stored in a database
      const bookings = JSON.parse(localStorage.getItem('blessedDetailzBookings') || '[]');
      bookings.push({
        id: bookingId,
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      });
      localStorage.setItem('blessedDetailzBookings', JSON.stringify(bookings));

      return {
        success: true,
        message: emailResult.message,
        bookingId
      };
    } catch (error) {
      console.error('Error submitting booking:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again or contact us directly.'
      };
    }
  }

  public static getBookingHistory(): any[] {
    try {
      return JSON.parse(localStorage.getItem('blessedDetailzBookings') || '[]');
    } catch (error) {
      console.error('Error retrieving booking history:', error);
      return [];
    }
  }

  public static clearBookingHistory(): void {
    localStorage.removeItem('blessedDetailzBookings');
  }
}