/* eslint-disable react/jsx-indent,react/jsx-indent-props */
import React from 'react';
import PropTypes from 'prop-types';

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

// High Order Components
const InnerMap = withGoogleMap(({ location, marker }) => (
    <GoogleMap
        defaultZoom={12}
        defaultCenter={location}
        center={location}
    >
        {/* ピン */}
        <Marker {...marker} />
    </GoogleMap>
));

const Map = ({ location }) => (
    <InnerMap
        containerElement={(<div />)}
        mapElement={(<div className="map" />)}
        location={location}
        marker={{ position: location }}   // location: location
    />
);


Map.propTypes = {
    location: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Map;
