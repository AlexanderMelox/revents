import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { createEvent, updateEvent } from '../eventActions';
import { TextInput, TextArea, SelectInput } from '../../../app/common/form';

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {
  // On form submit, updates an existing event or creates an event.
  onFormSubmit = (event) => {
    event.preventDefault();
    // Checks if the event has an id
    if (this.state.event.id) {
      // Since it has an id, it is an existing event and it should be updated
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
      // Create a new event
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createEvent(newEvent);
      // Redirect to /events
      this.props.history.push('/events');
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form onSubmit={this.onFormSubmit}>
              <Field 
                name='title' 
                type='text' 
                component={TextInput} 
                placeholder='Give your event a name'/>
              <Field 
                name='category' 
                type='text' 
                component={SelectInput} 
                options={category}
                placeholder='What is your event about'/>
              <Field 
                name='description' 
                type='text' 
                rows={3}
                component={TextArea} 
                placeholder='Tell us about your event'/>
              <Header sub color='teal' content='Event Location Details'/>
              <Field 
                name='city' 
                type='text' 
                component={TextInput} 
                placeholder='Event City'/>
              <Field 
                name='venue' 
                type='text' 
                component={TextInput} 
                placeholder='Event Venue'/>
              <Field 
                name='date' 
                type='text' 
                component={TextInput} 
                placeholder='Event Date'/>
              <Button positive type="submit">
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // Store the param from the route
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  }
}

const actions = {
  createEvent, 
  updateEvent
}

export default connect(mapStateToProps, actions)(reduxForm({ form: 'eventForm' })(EventForm));
