import { combineReducers } from 'redux';

/**
 * reducer
 * 以前のstateと、actionを取り、更新されたstateを返す純粋関数
 *
 * @param state
 * @param action
 * @return {*} newState || previousState
 */
const place = (state = '東京タワー', action) => {
  switch (action.type) {
    case 'CHANGE_PLACE':
      return action.place;  // newState
    default:
      return state;         // previousState
  }
};

const geocodeResult = (
  state = {
    address: '',
    location: { lat: 35.6585805, lng: 139.7454329 },
  },
  action,
) => {
  switch (action.type) {
    case 'GEOCODE_FETCHED':
      return {
        address: action.address,
        location: action.location,
      };
    case 'CHANGE_ERROR_MESSAGE':
      return {
        address: action.message,
        location: { lat: 0, lng: 0 },
      };
    default:
      return state;
  }
};

const hotels = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_HOTELS':
      return action.hotels;  // newState
    default:
      return state;         // previousState
  }
};

const sortKey = (state = 'price', action) => {
  switch (action.type) {
    case 'CHANGE_SORT_KEY':
      return action.sortKey;  // newState
    default:
      return state;         // previousState
  }
};

// {stateName: stageValue} 形式で、Storeに複数のstateを一つにまとめるた
// state treeを作成
export default combineReducers({ place, geocodeResult, hotels, sortKey });

