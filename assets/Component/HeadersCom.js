import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {HeightScreen, WidthScreen} from '../utils';
const HeadersCom = () => {
  const dataImage = [
    'https://www.travelclub.co.id/wp-content/uploads/2018/08/travel_ajasapa.blogspot.com_.jpg',
    'https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',
    'https://cdn-2.tstatic.net/tribunnews/foto/bank/images/gaya-traveling-orang-indonesia-kamu-masuk-yang-mana-nih.jpg',
  ];
  return (
    <View style={{width: '100%', marginTop: 10}}>
      <SwiperFlatList
        index={0}
        showPagination
        data={dataImage}
        renderItem={({item}) => (
          <Image
            style={{
              width: Dimensions.get('window').width,
              height: HeightScreen * 0.15,
            }}
            source={{uri: item}}
          />
        )}
      />
    </View>
  );
};

export default React.memo(HeadersCom);
