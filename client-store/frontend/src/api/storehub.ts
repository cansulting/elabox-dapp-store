import axios from 'axios';
// get list of store
export const getStoreList = async (): Promise<any> => {
    const {data} = await axios.get('/api/v1/store-client/items')
    return data
};