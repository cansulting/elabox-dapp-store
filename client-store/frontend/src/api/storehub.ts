import axios from 'axios';
// get list of store
const baseUrl = `${window.location.protocol}//${window.location.hostname}:4005`;
export const getStoreList = async (): Promise<any> => {
    const {data} = await axios.get(`${baseUrl}/api/v1/store-client/items`)
    return data
};