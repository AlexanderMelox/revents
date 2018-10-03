import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { createEvent, updateEvent } from '../eventActions';

class EventForm extends Component {
  state = {
    event: {...this.props.event}
  }

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

  // Updates the state based on the input that is being changed
  onInputChange = (event) => {
    // grabs the current event in the state and stores it into a newEvent object
    const newEvent = { ...this.state.event };
    // Updates the property in the object
    newEvent[event.target.name] = event.target.value;
    // Sets the states to reflect the input changes
    this.setState({
      event: newEvent
    });
  }

  render() {
    const { event } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Field name='title' type='text' component='input' placeholder='Event Title'/>
          {/* <Form.Field>
            <label>Event Title</label>
            <input name="title" onChange={this.onInputChange} value={event.title} placeholder="Event Title" />
          </Form.Field> */}
          <Form.Field>
            <label>Event Date</label>
            <input name="date" onChange={this.onInputChange} value={event.date} type="date" placeholder="Event Date" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name="city" onChange={this.onInputChange} value={event.city} placeholder="City event is taking place" />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input name="venue" onChange={this.onInputChange} value={event.venue} placeholder="Enter the Venue of the event" />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input name="hostedBy" onChange={this.onInputChange} value={event.hostedBy} placeholder="Enter the name of person hosting" />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
        </Form>
      </Segment>
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
