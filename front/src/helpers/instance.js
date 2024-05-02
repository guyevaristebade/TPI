import axios from 'axios';

export const instance = axios.create({
  baseURL : "https://agentequipement.onrender.com/api",
  //baseURL : "http://localhost:2024/api"
})
