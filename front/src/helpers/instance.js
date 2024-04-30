import axios from 'axios';

export const instance = axios.create({
  baseURL : 'https://tpi-poqp.onrender.com/api',
  timeout: 1000
})
