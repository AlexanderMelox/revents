import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { incrementAsyc, decrementAsync } from './testActions';
import { openModal } from '../modals/modalActions';

class TestComponent extends Component {
  state = {
    address: '',
    scriptLoaded: false
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }

  onChange = (address) => this.setState({address});

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true });
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    const { incrementAsyc, decrementAsync, data, openModal, loading } = this.props;
    return (
      <div>
        <Script 
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAc1mQTK6dJM7RtPafrXUelIaUvPop5_y4&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <h1>Test Area</h1>
        <h3>The answer is: {data}</h3>
        <Button disabled={loading} loading={loading} onClick={incrementAsyc} color="green" content="Increment"/>
        <Button disabled={loading} loading={loading} onClick={decrementAsync} color="red" content="Decrement"/>
        <Button onClick={() => openModal('TestModal', { data: 43 })} color="teal" content="Open modal"/>
        <br/>
        <br/>
        <br/>
        <form onSubmit={this.handleFormSubmit}>
          {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} />}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.test.data,
  loading: state.test.loading
});

const actions = {
  incrementAsyc,
  decrementAsync,
  openModal
}

export default connect(mapStateToProps, actions)(TestComponent);