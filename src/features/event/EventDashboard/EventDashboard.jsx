import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
const { Column } = Grid;

class EventDashboard extends Component {
  /**
   * Deletes an event
   * @param {string} eventId - The Id of a current event 
   */ 
  handleDeleteEvent = (eventId) => () => {
    this.props.deleteEvent(eventId);
  }

  render () {
    // Destructures and proprerties from the state.
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Column width={10}>
          <EventList 
            deleteEvent={this.handleDeleteEvent} 
            events={events} 
          />
        </Column>
        <Column width={6}>

        </Column>
      </Grid>
    );
  }
}

// Maps the redux state to the component props
const mapStateToProps = (state) => ({
  events: state.events,
  loading: state.async.loading
});

// Adds the actions to the components props
const actions = {
  deleteEvent
};

export default connect(mapStateToProps, actions)(EventDashboard);