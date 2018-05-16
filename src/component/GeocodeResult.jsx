import React from 'react';
import PropTypes from 'prop-types';

const GeocodeResult = ({ address, location  }) => (
  <ul className="geocode-result">
    <li>住所：{address}</li>
    <li>緯度：{location.lat}</li>
    <li>軽度：{location.lng}</li>
  </ul>
);

GeocodeResult.propTypes = {
  address: PropTypes.string,
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

// PropTypes に isRequired が無い場合は、
// 親からpropsの値が渡されなくても機能するように
// 初期値を指定する必要がある
GeocodeResult.defaultProps = {
  address: '',
};

export default GeocodeResult;