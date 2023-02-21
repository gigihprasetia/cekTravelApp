import axios from 'axios';
import {APIV1, APIV2} from './index';

export const getHotelAvaliable = async (token = null, data, callback) => {
  console.log(token);
  await APIV2.post('/hotels-available', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(hotel => callback(hotel))
    .catch(err => console.log(err));
};

export const getRoomAvaliable = async (token = null, data, callback) => {
  console.log(token);
  await APIV2.post('/rooms-available', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(room => callback(room))
    .catch(err => console.log(err));
};
export const getRoomLayoutAvaliable = async (token = null, data, callback) => {
  console.log(token);
  await APIV2.post('/layouts-available-index', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(Layout => callback(Layout))
    .catch(err => console.log(err));
};
export const inquiryProcess = async (token = null, data, callback) => {
  console.log(token);
  await APIV2.post('/booking/inquiry-process', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(inquiry => callback(inquiry))
    .catch(err => console.log(err));
};
export const processPayment = async (token = null, data, callback) => {
  console.log(token);
  await APIV2.post('/booking/process', data)
    .then(process => callback(process))
    .catch(err => console.log(err));
};

export const inquiryKeyLogin = async callback => {
  await APIV1.post(`/login/inquiry-basic`, {
    role: 'CUSTOMER',
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};
export const Login = async (data, callback) => {
  // console.log(data);
  await APIV1.post(`/login/basic`, data)
    .then(val => callback({status: 200, result: val}))
    .catch(err => callback({status: 400, result: err}));
};
export const Register = async (data, callback) => {
  // console.log(data);
  await APIV1.post(`/register/basic`, data)
    .then(val => callback({status: 200, result: val}))
    .catch(err => callback({status: 400, result: err}));
};
