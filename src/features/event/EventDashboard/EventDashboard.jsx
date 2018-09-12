import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
const { Column } = Grid;

class EventDashboard extends Component {
  render () {
    return (
      <Grid>
        <Column width={10}>
          <h2>Left Column</h2>
        </Column>
        <Column width={6}>
          <h2>Right Column</h2>
        </Column>
      </Grid>
    );
  }
}

export default EventDashboard;