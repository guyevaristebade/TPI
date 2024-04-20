import { instance} from "../helpers";

export const login = async (name, password) =>{
  try{
    const response = await instance.post('/auth/login', {name, password});
    return response.data;
  }catch(error){
    return error.response.data;
  }
}

export const isLoggedIn = async () => {
  try {
    const response = await instance.get("/auth");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await instance.delete("/auth/logout");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
