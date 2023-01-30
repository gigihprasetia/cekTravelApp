import {View, Text} from 'react-native';
import React from 'react';
import adjust, {GrayBold, GrayFade, Oranges} from '../utils';

const Umum = ({nameHotel, text}) => {
  return (
    <View>
      <Text style={{color: Oranges, fontSize: adjust(12), marginBottom: 10}}>
        WELCOME TO {nameHotel}
      </Text>
      <Text style={{color: GrayFade, fontSize: adjust(10)}}>{text}</Text>
    </View>
  );
};

export default Umum;
