import { instance} from "../helpers";

export const attributeDevice = async (values) =>{
    try{
      const response = await instance.post(`/sitedevicemapping/${values.site_id}/${values.device_id}`, values);
      return response
    }catch (error) {
      return error.response.data;
    }
}
