import { instance } from '../helpers'


// TODO : comprendre ce qui arrive comme message dans le catch


export const createDevice = async (deviceData) =>{
  try{
    const response = await instance.post('/device', deviceData);
    return response.data;
  }catch (error) {
    return error.message;
  }
}

export const getDevices = async () =>{
  try{
    const response = await instance.get('/device');
    return response.data;
  }catch (error) {
    return error.message;
  }
}


export const deleteDevice = async (id) =>{
  try{
    const response = await instance.delete(`/device/${id}`);
    return response.data;
  }catch (error) {
    return error.message;
  }
}

export const updateDevice = async (id, data) =>{
  try{
    const response = await instance.put(`/device/${id}`, data);
    return response.data;
  }catch (error) {
    return error.message;
  }
}
