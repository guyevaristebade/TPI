import { instance } from '../helpers';

export const createSite = async  (siteData) =>{
  try{
    const response = await instance.post('/site', siteData);
    return response.data
  }catch (error) {
    return error.response.data;
  }
}

export const deleteSite = async (id) =>{
  try {
    const response = await instance.delete(`/site/${id}`);
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

export const getSiteById = async (id) =>{
  try{
    const response = await instance.get(`/site/${id}`);
    return response.data
  }catch (error) {
    return error.response.data;
  }
}


export const updateSite = async (id, siteData) =>{
  try {
    const response = await instance.put(`/site/${id}`,siteData);
    return response.data;
  }catch (error){
    return error;
  }
}
