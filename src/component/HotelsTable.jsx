import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import _ from 'lodash';

import HotelRow from './HotelRow';
import HotelsClickableTh from './HotelsClickableTh';

const HotelsTable = ({ hotels }) => (
  <table>
    <tbody>
      <tr>
        <th>画像</th>
        <th>ホテル名</th>
        <HotelsClickableTh
          label="値段"
          sortKey="price"
        />
        <HotelsClickableTh
          label="レビュー"
          sortKey="reviewAverage"
        />
        <th>レビュー件数</th>
        <th>距離</th>
      </tr>
      {/* JSX内では、JS式を{}で記述可 */}
      {hotels.map(hotel => <HotelRow key={hotel.id} hotel={hotel} />)}
    </tbody>
  </table>
);

HotelsTable.propTypes = {
  hotels: PropTypes.arrayOf(PropTypes.any),
};

HotelsTable.defaultProps = {
  hotels: [],
};

/**
 * 配列要素をソートする
 * @param hotels {Array}    配列
 * @param sortKey {String}  配列要素のキー
 * @return {*|Array}
 */
const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, hotel => hotel[sortKey]);

// contextに入っているStoreが保持するstateを、当該componentのpropsへ変換
const mapStateToProps = state => ({
  hotels: sortedHotels(state.hotels, state.sortKey),
});

// Storeが保持するstateとaction dispatcherを当該componentに結合
export default connect(mapStateToProps)(HotelsTable);

