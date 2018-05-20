import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPlace, startSearch } from '../actions';

const SearchForm = props => (
  <form
    className="search-form"
    onSubmit={(e) => {
      e.preventDefault();
      props.startSearch();
    }}
  >
    <input
      className="place-input"
      type="text"
      size="30"
      value={props.place}
      onChange={(e) => {
        e.preventDefault();
        props.setPlace(e.target.value);
      }}
    />
    <input className="submit-button" type="submit" value="検索" />
  </form>
);

SearchForm.propTypes = {
  place: PropTypes.string.isRequired,
  startSearch: PropTypes.func.isRequired,
  setPlace: PropTypes.func.isRequired,
};

// contextに入っているStoreが保持するstateを、当該componentのpropsへ変換
// viewの表示に必要なprops
const mapStateToProps = state => ({
  place: state.place,
});

// Storeが保持するstateとaction dispatcher(action creator)を当該componentに結合
export default connect(mapStateToProps, { setPlace, startSearch })(SearchForm);
