import { instance } from '../helpers';

export const createSite = async  (site_name, address) =>{
  try{
    const response = await instance.post('/site', { name : site_name, address : address });
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
