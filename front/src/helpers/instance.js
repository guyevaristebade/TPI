import axios from 'axios';

export const instance = axios.create({
  //baseURL : 'http://localhost:2024/api',
  baseURL : 'https://ataliansecurityback.vercel.app/api',
  withCredentials : true,
  headers : { 'Content-Type' : 'application/json'}
})
