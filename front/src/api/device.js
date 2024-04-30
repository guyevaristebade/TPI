import { instance } from '../helpers'

export const createDevice = async (deviceData) =>{
  try{
    const response = await instance.post('/device', deviceData);
    return response.data;
  }catch (error) {
    return error.response.data;
  }
}

export const getDevices = async () =>{
  try{
    const response = await instance.get('/device');
    return response.data;
  }catch (error) {
    return error.response.data;
  }
}
