import { instance } from '../helpers'

export const getStatistics = async ()=>{
  try{
    const response = await instance.get('/statistics')
    return response.data;
  }catch(error){
    return error.response.data;
  }
}


export const getRepartition = async ()=>{
  try{
    const response = await instance.get('/statistics/repartition')
    return response.data;
  }catch(error){
    return error.response.data;
  }
}
