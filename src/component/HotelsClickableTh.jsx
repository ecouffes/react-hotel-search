import React from 'react';
import PropTypes from 'prop-types';

const HotelsClickableTh = ({ label, sortKey, isSelected, onSort }) => (
  <th
    className="hotels-clickable-th"
    onClick={() => onSort(sortKey)}
  >{ label }{isSelected ? '▲' : ''}</th>
);

HotelsClickableTh.propTypes = {
  label: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,  // onSort関数は、バケツリレーで親の親まで上がっていく
};

export default HotelsClickableTh;
