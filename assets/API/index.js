import axios from 'axios';

export const APIV2 = axios.create({
  baseURL: 'https://uat-api.cektravel.com/api/v2',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});

export const APIV1 = axios.create({
  baseURL: 'https://uat-api.cektravel.com/api/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
  },
});
