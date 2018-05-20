import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSortKey } from '../actions';

const HotelsClickableTh = props => (
  <th
    className="hotels-clickable-th"
    onClick={() => props.setSortKey(props.sortKey)}
  >
    { props.label }{props.isSelected ? '▲' : ''}
  </th>
);

HotelsClickableTh.propTypes = {
  label: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setSortKey: PropTypes.func.isRequired,
};

// contextに入っているStoreが保持するstateを、当該componentのpropsへ変換
// ownProps は、コンポーネント自体が保持するprops
const mapStateToProps = (state, ownProps) => ({
  isSelected: ownProps.sortKey === state.sortKey,
});

// Storeが保持するstateとaction dispatcherを当該componentに結合
export default connect(mapStateToProps, { setSortKey })(HotelsClickableTh);

