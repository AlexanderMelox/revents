import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    // Destructures all props
    const { events, deleteEvent } = this.props;
    return (
      <div>
        {/* Loops through the array of events and creates an EventListItem component for each*/}
        {events.map((event) => (
          <EventListItem 
            deleteEvent={deleteEvent}
            key={event.id} 
            event={event} 
          />
        ))}
      </div>
    )
  }
}

export default EventList;