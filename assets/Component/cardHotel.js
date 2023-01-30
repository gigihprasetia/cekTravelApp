import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import adjust, {formatter, GrayBold, GrayFade, Greens} from '../utils';
import Icons from 'react-native-vector-icons/MaterialIcons';

const CardHotel = ({data, onPress}) => {
  // console.log(data);
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        margin: 10,
        borderRadius: 10,
        padding: 2,
      }}>
      <Image
        source={{uri: data.media[0]}}
        style={{flex: 1, height: 100, borderRadius: 10}}
      />
      <View style={{flex: 1, padding: 3}}>
        <Text style={{fontSize: adjust(10), color: GrayBold}}>{data.name}</Text>
        <Text style={{fontSize: adjust(7), color: GrayFade}}>
          {data.district_name}, {data.city_name}, {data.province_name}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: adjust(8), color: GrayBold}}>
            {formatter(data.start_price)} / malam
          </Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Icons name="star" size={adjust(8)} />
            <Text style={{fontSize: adjust(8), color: GrayFade}}>
              {data.rate}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardHotel;
