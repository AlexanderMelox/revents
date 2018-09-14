import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    // Destructures all props
    const { events, onEventOpen, deleteEvent } = this.props;
    return (
      <div>
        <h1>Event List</h1>
        {/* Loops through the array of events and creates an EventListItem component for each*/}
        {events.map((event) => (
          <EventListItem 
            deleteEvent={deleteEvent}
            key={event.id} 
            event={event} 
            onEventOpen={onEventOpen} 
          />
        ))}
      </div>
    )
  }
}

export default EventList;