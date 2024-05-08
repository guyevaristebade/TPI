import { instance } from '../helpers';

export const createSite = async  (siteData) =>{
  try{
    const response = await instance.post('/site', siteData);
    return response.data
  }catch (error) {
    return error.response.data;
  }
}

export const deleteSite = async (_id) =>{
  try {
    const response = await instance.delete(`/site/${_id}`);
    return response.data;
  }catch (error){
    console.error(error);
    return error.response.data;
  }
}


export const getSites = async () =>{
  try{
    const response = await instance.get('/site');
    return response.data
  }catch (error) {
    return error.response.data;
  }
}
