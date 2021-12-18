import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.18.193:3333',
});

export { api };