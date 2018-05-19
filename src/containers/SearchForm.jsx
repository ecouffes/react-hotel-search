import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';  // StoreとComponentをBindingする関数

// contextに入っているStoreが保持するstateを、当該componentのpropsへ変換
// viewの表示に必要なprops
const mapStateToProps = state => ({
  place: state.place,
});

// contentに入っているStoreが保持するaction dispatcherを、当該componentのpropsへ変換
// action発行時に必要なprops
const mapDispatchToProps = dispatch => ({
  onPlaceChange: place => dispatch({ type: 'CHANGE_PLACE', place }),
});

const SearchForm = props => (
  <form className="search-form" onSubmit={e => props.onSubmit(e)}>
    <input
      className="place-input"
      type="text"
      size="30"
      value={props.place}
      onChange={(e) => {
        e.preventDefault();
        props.onPlaceChange(e.target.value);
      }}
    />
    <input className="submit-button" type="submit" value="検索" />
  </form>
);

SearchForm.propTypes = {
  place: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onPlaceChange: PropTypes.func.isRequired,
};

// Storeが保持するstateとaction dispatcherを当該componentに結合
const ConnectedSearchForm
  = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default ConnectedSearchForm;
