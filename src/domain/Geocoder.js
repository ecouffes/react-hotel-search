import axios from 'axios';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

export const geocode = async (place) => {
    const results = await axios.get(GEOCODE_ENDPOINT, { params: { address: place } });
    const data = results.data;
    const status = data.status;
    const result = data.results[0];

    // status OK以外は、statusのみ返す
    if (typeof result === 'undefined') {
        return { status };
    }

    const address = result.formatted_address;
    const location = result.geometry.location;

    return { status, address, location };
};

export const reverseGeocode = () => null;
