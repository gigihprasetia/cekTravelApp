import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {HeightScreen, Oranges} from '../../../assets/utils';
import {useState} from 'react';

export default function ScreenFilterHotel() {
  const [filter, setFilter] = useState({
    active: false,
    resultFilter: {},
  });

  return (
    <SafeAreaView style={{flex: 1, height: '100%'}}>
      <View style={{flex: 1, height: '95%'}}></View>

      <TouchableOpacity
        style={{
          height: '5%',
          backgroundColor: Oranges,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Filter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
