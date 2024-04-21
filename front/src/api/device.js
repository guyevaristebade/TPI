import { instance } from '../helpers'

export const createDevice = async (deviceData) =>{
  try{
    const response = await instance.post('/device', deviceData);
    return response.data;
  }catch (error) {
    return error.response.data;
  }
}
