import {View, Text} from 'react-native';
import React from 'react';
import adjust, {GrayFade} from '../utils';

const Fasilitas = ({fasilitas}) => {
  return (
    <View>
      {fasilitas.map((val, index) => {
        return (
          <Text
            // key={index}
            style={{color: GrayFade, fontSize: adjust(12)}}
            key={index}>
            {val.name} *
          </Text>
        );
      })}
    </View>
  );
};

export default Fasilitas;
