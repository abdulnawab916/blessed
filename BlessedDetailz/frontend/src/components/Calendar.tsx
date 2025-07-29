import React, { useState, useEffect } from 'react';
import { CalendarService, TimeSlot, CalendarEvent } from '../services/calendarService';
import './Calendar.css';

interface CalendarProps {
  selectedDate?: string;
  onTimeSlotSelect?: (timeSlot: TimeSlot) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onTimeSlotSelect }) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    CalendarService.initialize();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadCalendarData(selectedDate);
    }
  }, [selectedDate]);

  const loadCalendarData = async (date: string) => {
    setLoading(true);
    try {
      const [slots, dateEvents] = await Promise.all([
        CalendarService.getAvailableTimeSlots(date),
        CalendarService.getEventsForDate(date)
      ]);
      setTimeSlots(slots);
      setEvents(dateEvents);
    } catch (error) {
      console.error('Error loading calendar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    if (timeSlot.available && onTimeSlotSelect) {
      onTimeSlotSelect(timeSlot);
    }
  };

  const getDayName = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getMonthName = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatEventTime = (event: CalendarEvent): string => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    
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
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h3>📅 Available Time Slots</h3>
        {selectedDate && (
          <div className="selected-date">
            <span className="day-name">{getDayName(new Date(selectedDate))}</span>
            <span className="date-display">{new Date(selectedDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="calendar-loading">
          <div className="loading-spinner"></div>
          <p>Loading availability...</p>
        </div>
      ) : (
        <div className="calendar-content">
          {/* Time Slots Section */}
          <div className="time-slots-section">
            <h4>Available Times</h4>
            <div className="time-slots-grid">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`time-slot ${slot.available ? 'available' : 'unavailable'}`}
                  onClick={() => handleTimeSlotClick(slot)}
                  disabled={!slot.available}
                >
                  <span className="time-range">
                    {CalendarService.formatTimeSlot(slot)}
                  </span>
                  <span className="availability-status">
                    {slot.available ? '✓ Available' : '✗ Booked'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Events Section */}
          {events.length > 0 && (
            <div className="events-section">
              <h4>Today's Bookings</h4>
              <div className="events-list">
                {events.map((event) => (
                  <div key={event.id} className="event-item">
                    <div className="event-time">
                      {formatEventTime(event)}
                    </div>
                    <div className="event-summary">
                      {event.summary}
                    </div>
                    {event.description && (
                      <div className="event-description">
                        {event.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Events Message */}
          {events.length === 0 && timeSlots.length > 0 && (
            <div className="no-events">
              <p>No bookings scheduled for this date.</p>
            </div>
          )}

          {/* Instructions */}
          <div className="calendar-instructions">
            <h4>How to Book</h4>
            <ol>
              <li>Select your preferred date in the form</li>
              <li>Choose an available time slot from the calendar</li>
              <li>Fill out the booking form</li>
              <li>Submit your request</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;