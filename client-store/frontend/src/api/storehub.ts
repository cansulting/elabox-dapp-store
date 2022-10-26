import axios from 'axios';
// get list of store
const baseUrl = `${window.location.protocol}//${window.location.hostname}:4005`;

export const getStoreList = async (): Promise<any> => {
    console.log("connecting to store hub")
    const {data} = await axios.get(`${baseUrl}/api/v1/items`)
    return data
};

export const getApps = async(): Promise<any> => {

}