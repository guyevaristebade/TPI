import axios from "axios";
import { instance } from "../helpers";

export const searchAddress = async (query) => {
  try {
    const response = await instance.get(`/search/?q=${query}`);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};
