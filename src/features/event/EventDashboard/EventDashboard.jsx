import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
const { Column } = Grid;

// Mock data for events
const events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]

class EventDashboard extends Component {
  state = {
    events: events,
    isOpen: false,
    selectedEvent: null
  }

  // opens EventForm when clicked and sets selectedEvent to null
  handleFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
  }

  // closes EventForm
  handleCancel = () => {
    this.setState({
      isOpen: false
    });
  }

  /**
   * Creates a new event.
   * @param {Object} newEvent - Event object holding information about the event.
   * @param {string} newEvent.id - The id of the event.
   * @param {string} newEvent.title - The title of the event.
   * @param {string} newEvent.date - The date of the event.
   * @param {string} newEvent.hostPhotoURL - The photo of the Host that posted the event.
   * @param {string} newEvent.city - The city of the event.
   * @param {string} newEvent.venue - The venue of the event.
   * @param {string} newEvent.hostedBy - Who will be hosting this event.
   */
  handleCreateEvent = (newEvent) => {
    // Creates a unique id for the event. (This will be replaced by Firestore in the future)
    newEvent.id = cuid();
    // Sets the photo URL for the host of the event.
    newEvent.hostPhotoURL = '/assets/user.png';
    // Updates the new array of events and adds the newEvent
    const updatedEvents = [...this.state.events, newEvent];
    // Updates the component state to update the events array and closes the EventForm
    this.setState({
      events: updatedEvents,
      isOpen: false
    });
  }

  /**
   * Updates an existing event
   * @param {Object} updatedEvent - Updated event object
   */
  handleUpdateEvent = (updatedEvent) => {
    // Sets the state to update the event that was currently edited.
    this.setState({
      events: this.state.events.map(event => {
        // Checks if the id is the same as the updatedEvent id
        if (event.id === updatedEvent.id) {
          // Returns the updated event
          return { ...updatedEvent }
        } else {
          // Return the unedited event
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    });
  }

  /**
   * Opens an existing event on the EventForm and sets
   * the selectedEvent to the event that was clicked on
   * @param {Object} eventToOpen - An object with the event to open
   */
  handleOpenEvent = (eventToOpen) => () => {
    // Sets the selectedEvent to the event to open. 
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  }

  render () {
    // Destructures and proprerties from the state.
    const { selectedEvent } = this.state;
    return (
      <Grid>
        <Column width={10}>
          <EventList onEventOpen={this.handleOpenEvent} events={this.state.events} />
        </Column>
        <Column width={6}>
          <Button onClick={this.handleFormOpen} positive content="Create Event" />
          {this.state.isOpen && (
            <EventForm updateEvent={this.handleUpdateEvent} selectedEvent={selectedEvent} createEvent={this.handleCreateEvent} handleCancel={this.handleCancel} />
          )}
        </Column>
      </Grid>
    );
  }
}

export default EventDashboard;