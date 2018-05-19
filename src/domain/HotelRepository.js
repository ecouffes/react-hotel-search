import geolib from 'geolib';
import Rakuten from '../lib/Rakuten';

const RAKUTEN_APP_ID = '1061418173616156212';

/**
 * 位置情報をinputし、楽天ホテル検索APIを叩き情報をget
 *
 * @see https://webservice.rakuten.co.jp/api/simplehotelsearch/
 * @param location {Object}
 * @return {Promise<{id: *, name: *, url: *, thumbUrl: *, price: *, reviewAverage: *, reviewCount: *, distance: *}[]>}
 */
// eslint-disable-next-line import/prefer-default-export
export const searchHotelByLocation = (location) => {
  const params = {
    applicationId: RAKUTEN_APP_ID,
    datumType: 1,
    latitude: location.lat,
    longitude: location.lng,
  };
  return Rakuten.Travel.simpleHotelSearch(params)
    .then(result =>
      result.data.hotels.map((hotel) => {
        // console.log(hotel);
        const basicInfo = hotel.hotel[0].hotelBasicInfo;
        const distance = geolib.getDistance(
          { latitude: location.lat, longitude: location.lng },
          { latitude: basicInfo.latitude, longitude: basicInfo.longitude },
        );
        return {
          id: basicInfo.hotelNo,
          name: basicInfo.hotelName,
          url: basicInfo.hotelInformationUrl,
          thumbUrl: basicInfo.hotelThumbnailUrl,
          price: basicInfo.hotelMinCharge,
          reviewAverage: basicInfo.reviewAverage,
          reviewCount: basicInfo.reviewCount,
          distance,
        };
      }),
    );
};

