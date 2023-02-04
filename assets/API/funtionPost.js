import axios from 'axios';
import {APIV1, APIV2} from './index';

export const getHotelAvaliable = async (data, callback) => {
  //   console.log(data);
  await APIV2.post('/hotels-available', data)
    .then(hotel => callback(hotel))
    .catch(err => console.log(err));
};

export const getRoomAvaliable = async (data, callback) => {
  await APIV2.post('/rooms-available', data)
    .then(room => callback(room))
    .catch(err => console.log(err));
};
export const getRoomLayoutAvaliable = async (data, callback) => {
  await APIV2.post('/layouts-available-index', data)
    .then(Layout => callback(Layout))
    .catch(err => console.log(err));
};
export const inquiryProcess = async (data, callback) => {
  await APIV2.post('/booking/inquiry-process', data)
    .then(inquiry => callback(inquiry))
    .catch(err => console.log(err));
};
export const processPayment = async (data, callback) => {
  await APIV2.post('/booking/process', data)
    .then(process => callback(process))
    .catch(err => console.log(err));
};
