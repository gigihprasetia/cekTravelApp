import {Image, Text, View} from 'react-native';
import React, {Component} from 'react';
import {HeightScreen, Oranges, pixelRatio, WidthScreen} from '../utils';
import {PixelRatio} from 'react-native';
const HeaderTab = () => {
  console.log(pixelRatio);
  return (
    <View
      style={{
        width: '100%',
        height: HeightScreen * 0.06,
        justifyContent: 'center',
        paddingHorizontal: WidthScreen * 0.05,
        backgroundColor: Oranges,
      }}>
      <Text style={{color: 'white'}}>Hi people welcome to CekTravel</Text>
    </View>
  );
};

export default React.memo(HeaderTab);
