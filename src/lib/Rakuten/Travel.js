import axios from 'axios';

const URL_BASE = 'https://app.rakuten.co.jp/services/api/Travel';
const SIMPLE_HOTEL_SEARCH_ENDPOINT = `${URL_BASE}/SimpleHotelSearch/20170426`;

export default {
  /**
   * @param params
   * @return Promise
   *         PromiseValue.data.hotels: array
   */
  simpleHotelSearch: params => axios.get(SIMPLE_HOTEL_SEARCH_ENDPOINT, { params }),
};

