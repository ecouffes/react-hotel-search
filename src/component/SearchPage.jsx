import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from '../containers/SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import HotelsTable from './HotelsTable';
import { startSearch } from '../actions';

class SearchPage extends Component {

  // コンポーネントのrenderが完了した後で、GoogleMap と 楽天APIを叩きに行く
  componentDidMount() {
    // connectによって、storeからpropsへ自動的にaction dispatcherが渡される
    this.props.dispatch(startSearch());
  }

  render() {
    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        {/* 親のReact Routerから渡されたhistory API の ラッパーオブジェクトhistoryをpropsとして持つ */}
        <SearchForm history={this.props.history} />
        <div className="result-area">
          <Map location={this.props.geocodeResult.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.props.geocodeResult.address}
              location={this.props.geocodeResult.location}
            />
            <h2>ホテル検索結果</h2>
            <HotelsTable />
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  geocodeResult: PropTypes.shape({
    address: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// contextに入っているStoreが保持するstateを、当該componentのpropsへ変換
const mapStateToProps = state => ({
  geocodeResult: state.geocodeResult,
});

// Storeが保持するstateとaction dispatcherを当該componentに結合
export default connect(mapStateToProps)(SearchPage);
