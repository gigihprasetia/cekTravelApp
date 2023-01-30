import axios from 'axios';
import {APIV1, APIV2} from './index';

export const getHotel = async res => {
  // await API.get('/hotels-featured')
  //   .then(val => console.log(val))
  //   .catch(err => console.log(err));

  await APIV2.get('/hotels-featured')
    .then(va => res(va.data.data))
    .catch(err => console.log(err));
};

export const getDetailHotel = async (slug, callback) => {
  await APIV1.get(`/hotels-available/${slug}`)
    .then(val => callback(val))
    .catch(err => console.log(err));
};
