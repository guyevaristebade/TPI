import axios from 'axios';

export const instance = axios.create({
  //baseURL : 'http://localhost:2024/api',
  baseURL : 'https://ataliantsecurityback.vercel.app/api',
  withCredentials : true,
  //headers : { 'Content-Type' : 'application/json'}
})
