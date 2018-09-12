import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
const { Column } = Grid;

class EventDashboard extends Component {
  render () {
    return (
      <Grid>
        <Column width={10}>
          <EventList />
        </Column>
        <Column width={6}>
          <h2>Right Column</h2>
        </Column>
      </Grid>
    );
  }
}

export default EventDashboard;