import axios from 'axios';
import {APIV1, APIV2} from './index';

export const getHotel = async (token = null, res) => {
  await APIV2.get('/hotels-featured', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(va => res(va.data.data))
    .catch(err => console.log(err));
};

export const getDetailHotel = async (token = null, slug, callback) => {
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
  await APIV1.get(`/token/validate`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};

export const HistoryPayment = async (token, callback) => {
  await APIV2.get(`/customer-sys/transactions/history`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};
export const LocationHotel = async (token, query, callback) => {
  await APIV2.get(`/master/district/fetch`, {
    params: {q: query},
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};

export const WaitPayment = async (token, callback) => {
  await APIV2.get(`/customer-sys/transactions/wait-payment`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};
export const locationHotel = async (token = null, callback) => {
  await APIV2.get(`/master/district/fetch`, {
    params: {q: 'NESTED_EACH'},
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};
export const Revoke = async (token, callback) => {
  await APIV1.get(`/token/revoke`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};

export const CetakInvoice = async (id, token = '', callback) => {
  // console.log(id, token);
  await APIV2.get(`/customer-sys/transactions/${id}/invoice`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => callback(val.data.data))
    .catch(err => console.log(err));
};
export const CetakETicket = async (id, token = '', callback) => {
  // console.log(id, token);
  await APIV2.get(`/customer-sys/transactions/${id}/e-ticket`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => callback(val.data.data))
    .catch(err => console.log(err));
};
