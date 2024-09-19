import {instance} from "../helpers";

export const assignDevice = async (deviceId,siteId) =>{
  try{
    const response = await instance.post(`/assignment/assign/${deviceId}/${siteId}`);
    return response.data;
  }catch (error) {
    return error.response.data;
  }
}

export const unassignDevice = async (deviceId,siteId) =>{
  try{
    const response = await instance.delete(`/assignment/unassign/${deviceId}/${siteId}`);
    return response.data;
  }catch (error) {
    return error.response.data;
  }
}


export const getAssignment = async () =>{
  try{
    const response = await instance.get('/assignment');
    return response.data;
  }catch (error) {
    return error.response.data;
  }
}
