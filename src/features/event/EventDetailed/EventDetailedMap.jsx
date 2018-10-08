import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => <Icon name='marker' size='big' color='red' />;

const mapContainerStyles = {
  padding: 0
};

const EventDetailedMap = ({ lat, lng }) => {
  const center = [lat, lng];
  const zoom = 14;
  return (
    <Segment attached='bottom' style={mapContainerStyles}>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAc1mQTK6dJM7RtPafrXUelIaUvPop5_y4' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={lat}
            lng={lng}
          />
        </GoogleMapReact>
      </div>
    </Segment>
  );
}

export default EventDetailedMap;