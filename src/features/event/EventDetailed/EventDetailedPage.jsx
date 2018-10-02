import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';

const EventDetailedPage = ({ event }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  )
}

// gets the state from the redux store and ownProps stores all the component props
const mapStateToProps = (state, ownProps) => {
  // Gets the eventId from the params
  const eventId = ownProps.match.params.id;

  // Creates an empty event
  let event = {};

  // Checks if there is an eventId and if the redux state events is greter than 0
  if (eventId && state.events.length > 0) {
    // re assign the empty event to the event found inside the array
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return { 
    event
  }
};

export default connect(mapStateToProps)(EventDetailedPage);