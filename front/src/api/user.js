import { instance } from "../helpers";

export const login = async (userData) =>{
  try{
    const response = await instance.post('/auth/login', userData);
    return response.data;
  }catch(error){
    //console.log(error);
    return error.response.data;
  }
}

export const isLoggedIn = async () => {
  try {
    const response = await instance.get("/auth/is-logged-in");
    return response.data;
  } catch (error) {
    return error.response.data
  }
};

export const logout = async () => {
  try {
    const response = await instance.delete("/auth/logout");
    return response.data;
  } catch (error) {
    return error.response.data
  }
};

export const createUser = async (values) => {
  try {
    const response = await instance.post("/auth/register", values)
    return response.data;
  }catch (error) {
    return error.response.data
  }
}


export const getAllUser = async () => {
  try {
    const response = await instance.get("/auth/users")
    return response.data
  }catch (error) {
    return error.response.data;
  }
}


export const deleteUser = async (_id) => {
  try {
    const response = await instance.delete(`/auth/${_id}`);
    return response.data
  }catch (error) {
    return error.response.data
  }
}

export const getUserByID =  async (id) =>{
  try {
    const response = await instance.get(`/auth/user/${id}`);
    return response.data
  }catch (error) {
    return error.response.data
  }
}
