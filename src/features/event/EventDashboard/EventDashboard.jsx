import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';
const { Column } = Grid;

class EventDashboard extends Component {
  state = {
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
    this.props.createEvent(newEvent);
    // Updates the component state to update the events array and closes the EventForm
    this.setState({
      isOpen: false
    });
  }

  /**
   * Updates an existing event
   * @param {Object} updatedEvent - Updated event object
   */
  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent);
    // Sets the state to update the event that was currently edited.
    this.setState({
      isOpen: false,
      selectedEvent: null
    });
  }

  /**
   * Deletes an event
   * @param {string} eventId - The Id of a current event 
   */ 
  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
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
    const { events } = this.props;
    return (
      <Grid>
        <Column width={10}>
          <EventList 
            deleteEvent={this.handleDeleteEvent} 
            onEventOpen={this.handleOpenEvent} 
            events={events} 
          />
        </Column>
        <Column width={6}>
          <Button 
            onClick={this.handleFormOpen} 
            positive 
            content="Create Event" 
          />
          {this.state.isOpen && (
            <EventForm 
              updateEvent={this.handleUpdateEvent} 
              selectedEvent={selectedEvent} 
              createEvent={this.handleCreateEvent} 
              handleCancel={this.handleCancel} 
            />
          )}
        </Column>
      </Grid>
    );
  }
}

// Maps the redux state to the component props
const mapStateToProps = (state) => ({
  events: state.events
});

// Adds the actions to the components props
const actions = {
  createEvent,
  deleteEvent,
  updateEvent
};

export default connect(mapStateToProps, actions)(EventDashboard);