import React from 'react';
import PropTypes from 'prop-types';

const HotelRow = ({ hotel }) => (
  <tr>
    <td><img src={hotel.thumbUrl} alt={hotel.name} /></td>
    <td><a href={hotel.url} target="_blank">{hotel.name}</a></td>
    <td>{hotel.price !== null ? `${hotel.price}円` : '空室無し'}</td>
    <td>{hotel.reviewAverage}</td>
    <td>{hotel.reviewCount}</td>
    <td>{hotel.distance}</td>
  </tr>
);

HotelRow.propTypes = {
  hotel: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    thumb: PropTypes.string,
    price: PropTypes.number,
    reviewAverage: PropTypes.number,
    reviewCount: PropTypes.number,
    distance: PropTypes.number,
  }).isRequired,
};

export default HotelRow;
