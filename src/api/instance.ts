import axios, { AxiosInstance } from 'axios';
import { authInterceptors } from './authInterceptor';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {},
  withCredentials: true,
});

authInterceptors(instance);

export { instance };
