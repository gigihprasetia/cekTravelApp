import {View, Text} from 'react-native';
import React from 'react';
import adjust, {GrayFade} from '../utils';
import {Svg, Path} from 'react-native-svg';

const Fasilitas = ({fasilitas}) => {
  return (
    <View>
      {fasilitas.map((val, index) => {
        console.log(val.icon.slice(4));
        return (
          <View key={index} style={{flex: 1, flexDirection: 'row'}}>
            <Svg
              focusable={false}
              width={25}
              height={25}
              xmlns="http://www.w3.org/2000/svg">
              <Path d={val.icon.slice(4)} fill="#063855" fillRule="evenodd" />
            </Svg>
            <Text
              // key={index}
              style={{color: GrayFade, fontSize: adjust(12), marginLeft: 10}}
              key={index}>
              {val.name} *
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Fasilitas;
