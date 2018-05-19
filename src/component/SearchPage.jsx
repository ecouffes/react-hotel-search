import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

/**
 * ホテル
 * @param hotels {Array}
 * @param sortKey {String}
 * @return {*|Array}
 */
const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, hotel => hotel[sortKey]);

class SearchPage extends Component {

  constructor(props) {
    // console.log(props) // React Router が渡すpropsを確認
    super(props);
    this.state = {
      place: this.getPlaceParam() || '東京タワー',
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
      hotels: [],
      sortKey: 'price',
    };
  }

  // constructor => componentWillMount => render => componentDidMount
  // ページがrenderされた後に実行
  componentDidMount() {
    const place = this.getPlaceParam();
    // 楽天APIを叩いてホテル検索実行
    if (place) {
      this.startSearch(place);
    }
  }

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

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      },
    });
  }

  startSearch() {
    geocode(this.state.place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK' : {
            this.setState({ address, location });
            // 楽天トラベルAPI call
            return searchHotelByLocation(location);
          }
          case 'ZERO_RESULTS' : {
            this.setErrorMessage('結果が見つかりませんでした');
            break;
          }
          default: {
            this.setErrorMessage('エラーが発生しました');
            break;
          }
        }
        return [];  // 本来はpromiseを返すべき
      })
      .then((hotels) => {
        this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
      })
      .catch(() => {
        this.setErrorMessage('通信に失敗しました');
      });
  }

  handlePlaceChange(e) {
    e.preventDefault();
    this.props.onPlaceChange(e.target.value);
  }

  // 子から渡されたstate(place)を処理
  handlePlaceSubmit(e) {
    e.preventDefault();
    // 親のReact Routerから渡されたhistory API の ラッパーオブジェクトhistory
    // へアクセスして、pushState をcall。getパラメータを付与
    this.props.history.push(`/?place=${this.state.place}`);
    this.startSearch();
  }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey),
    });
  }

  render() {
    return (
      <div className="search-page">
        <h1 className="app-title">ホテル検索</h1>
        {/* 子に渡すpropsが関数の場合、子のstateを引数に入れることで、 */}
        {/* 子 => 親へstateを渡す事ができる */}
        <SearchForm
          place={this.props.place}
          onPlaceChange={e => this.handlePlaceChange(e)}
          onSubmit={e => this.handlePlaceSubmit(e)}
        />
        {/*
        <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>ホテル検索結果</h2>
            <HotelsTable
              hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
            />
          </div>
        </div>
        */}
      </div>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  onPlaceChange: PropTypes.func.isRequired,
  place: PropTypes.string.isRequired,
};

export default SearchPage;