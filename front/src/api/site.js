import { instance } from '../helpers';
import axios from 'axios'

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



export const getAddress = async (complement, code) =>{
  try{
    const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${complement}&postcode=${code}`)
    return response.data.features
  }  catch (e) {
    return e.message;
  }
}


export const updateSite = async (id, siteData) =>{
  try {
    const response = await instance.post(`/site/${id}`,siteData);
    return response.data;
  }catch (error){
    console.error(error);
    return error;
  }
}
