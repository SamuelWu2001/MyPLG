import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import getEnvVars from '../../config';
import { navigate } from './navigationService';

const { API_URL } = getEnvVars(process.env.NODE_ENV);

const axiosJWT = axios.create({
  baseURL: API_URL,
}); 

axiosJWT.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosJWT.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  if (error.response.status === 401) {
    await AsyncStorage.removeItem('token');
    Alert.alert('Session expired', 'Please log in again');
    navigate('Login');
  } 
  return Promise.reject(error);
});

export default axiosJWT;


