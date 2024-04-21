import axios from 'axios';

export const instance = axios.create({
  baseURL : 'http://localhost:2024/api',
  timeout: 1000
})
