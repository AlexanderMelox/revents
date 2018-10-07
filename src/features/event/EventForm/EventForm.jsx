/* global google */ 
import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { createEvent, updateEvent } from '../eventActions';
import { TextInput, TextArea, SelectInput, DateInput, PlaceInput } from '../../../app/common/form';

// array containing the options for categories
const category = [
  {key: 'drinks', text: 'Drinks', value: 'drinks'},
  {key: 'culture', text: 'Culture', value: 'culture'},
  {key: 'film', text: 'Film', value: 'film'},
  {key: 'food', text: 'Food', value: 'food'},
  {key: 'music', text: 'Music', value: 'music'},
  {key: 'travel', text: 'Travel', value: 'travel'},
];

// Form validation
const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({ message: 'Description needs to be atleast 5 cahracters' })
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  // turns switchLoaded to true once the script has loaded
  handleScriptLoaded = () => {
    this.setState({ scriptLoaded: true });
  }

  // gets the selectedCity once the user clicks a city
  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({ 
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity)
      })
  }

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({ 
          venueLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('venue', selectedVenue)
      })
  }

  // On form submit, updates an existing event or creates an event.
  onFormSubmit = (values) => {
    // changes the format of the date
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    
    // Checks if the event has an id
    if (this.props.initialValues.id) {
      // Since it has an id, it is an existing event and it should be updated
      this.props.updateEvent(values);
      // Takes the user back to the detailed event
      this.props.history.goBack();
    } else {
      // Create a new event
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob'
      }
      this.props.createEvent(newEvent);
      // Redirect to /events
      this.props.history.push('/events');
    }
  }

  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Script 
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAc1mQTK6dJM7RtPafrXUelIaUvPop5_y4&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
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
                component={PlaceInput} 
                options={{ types: ['(cities)'] }}
                placeholder='Event City'
                onSelect={this.handleCitySelect}/>
              {this.state.scriptLoaded && (
                <Field 
                  name='venue' 
                  type='text' 
                  component={PlaceInput} 
                  options={{ 
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ['establishment'] 
                  }}
                  placeholder='Event Venue'
                  onSelect={this.handleVenueSelect}/>
              )}
              <Field 
                name='date' 
                type='text' 
                component={DateInput} 
                placeholder='Date and time of event'
                dateFormat='YYYY-MM-DD HH:mm'
                time='HH:mm'
                showTimeSelect/>
              <Button disabled={invalid || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button onClick={() => this.props.history.push('/events')} type="button">
                Cancel
              </Button>
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

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  }
}

const actions = {
  createEvent, 
  updateEvent
}

export default connect(mapStateToProps, actions)(
  reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm)
);
