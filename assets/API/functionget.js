import axios from 'axios';
import {APIV1, APIV2} from './index';

export const getHotel = async (token = null, res) => {
  console.log(token);
  await APIV2.get('/hotels-featured', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(va => res(va.data.data))
    .catch(err => console.log(err));
};

export const getDetailHotel = async (token = null, slug, callback) => {
  console.log(token);
  await APIV1.get(`/hotels-available/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};
export const paymentInquirySucsess = async (
  token = null,
  booking_code,
  callback,
) => {
  console.log(token);
  await APIV2.get(`/payment/inquiry`, {
    params: {booking_code},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};

export const ValidateIslogin = async (token, callback) => {
  console.log(token);
  await APIV1.get(`/token/validate`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};

export const HistoryPayment = async (token, callback) => {
  console.log(token);
  await APIV2.get(`/customer-sys/transactions/history`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};
export const WaitPayment = async (token, callback) => {
  console.log(token);
  await APIV2.get(`/customer-sys/transactions/wait-payment`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};
export const Revoke = async (token, callback) => {
  console.log(token);
  await APIV1.get(`/token/revoke`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};
