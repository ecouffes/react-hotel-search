import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

/**
 * [action creator]
 * contextに格納されているStoreが保持するaction dispatcherを、
 * import先のcomponent内でpropsとして扱えるようにする
 *
 * middlewareのthunkを使う事で、action dispatcherを直接返すのではなく、
 * 間に引数を渡す関数を返すことが可能になる
 *
 * @param place
 * @return {function(*): *}
 */
export const setPlace = place => dispatch => dispatch({ type: 'CHANGE_PLACE', place });

export const setErrorMessage = message => dispatch => dispatch({ type: 'CHANGE_ERROR_MESSAGE', message });

export const setHotels = hotels => dispatch => dispatch({ type: 'CHANGE_HOTELS', hotels });

export const setSortKey = sortKey => dispatch => dispatch({ type: 'CHANGE_SORT_KEY', sortKey });

export const startSearch = () => (dispatch, getState) => {
  geocode(getState().place)
    .then(({ status, address, location }) => {
      switch (status) {
        case 'OK' : {
          dispatch({ type: 'GEOCODE_FETCHED', address, location });
          // 楽天トラベルAPI call
          return searchHotelByLocation(location);
        }
        case 'ZERO_RESULTS' : {
          dispatch(setErrorMessage('結果が見つかりませんでした'));
          break;
        }
        default: {
          dispatch(setErrorMessage('エラーが発生しました'));
        }
      }
      return [];
    })
  .then((hotels) => {
    dispatch(setHotels(hotels));
  })
  .catch(() => {
    dispatch(setErrorMessage('通信に失敗しました'));
  });
};
