import { instance} from "../helpers";

export const login = async (userData) =>{
  try{
    const response = await instance.post('/auth/login', userData);
    return response.data;
  }catch(error){
    return error.response.data;
  }
}

export const isLoggedIn = async () => {
  try {
    const response = await instance.get("/auth/");
    console.log(response, "isloggedIn c'est moi ")
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
