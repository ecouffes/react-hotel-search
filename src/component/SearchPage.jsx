import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import queryString from 'query-string';

import SearchForm from '../containers/SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import HotelsTable from './HotelsTable';

class SearchPage extends Component {

  getPlaceParam() {
    // ?key=value&key=value 文字列をObject形式にパース
    const params = queryString.parse(this.props.location.search);
    // console.log(params);
    const place = params.place;

    // getオプションにplaceがが一文字でも存在していたら
    if (place && place.length > 0) {
      return place;
    }
    return null;
  }

  // 子から渡されたstate(place)を処理
  // handlePlaceSubmit(e) {
  //   e.preventDefault();
  //   // 親のReact Routerから渡されたhistory API の ラッパーオブジェクトhistory
  //   // へアクセスして、pushState をcall。getパラメータを付与
  //   this.props.history.push(`/?place=${this.state.place}`);
  //   this.startSearch();
  // }


  render() {
    // console.log(this.props);
    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        {/* 子に渡すpropsが関数の場合、子のstateを引数に入れることで、 */}
        {/* 子 => 親へstateを渡す事ができる */}
        <SearchForm />
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
  // history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  geocodeResult: PropTypes.shape({
    address: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

// contextに入っているStoreが保持するstateを、当該componentのpropsへ変換
const mapStateToProps = state => ({
  geocodeResult: state.geocodeResult,
});

// Storeが保持するstateとaction dispatcherを当該componentに結合
export default connect(mapStateToProps)(SearchPage);
