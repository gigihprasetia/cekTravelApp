import {View, Text} from 'react-native';
import React from 'react';
import adjust, {GrayFade} from '../utils';

const TabelPesananRoomHotel = ({price = '4000000', rate = 5}) => {
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: GrayFade,
        margOutVertical: 15,
        padding: 10,
        marginVertical: 15,
      }}>
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <Text>{price}</Text>
            <Text>Permalam</Text>
          </View>
          <Text>{rate}</Text>
        </View>

        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: GrayFade,
            marginTop: 10,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 5,
              borderBottomWidth: 1,
              borderBottomColor: GrayFade,
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{color: GrayFade, fontSize: adjust(10)}}>
                CheckIn
              </Text>
              <Text style={{color: GrayFade, fontSize: adjust(10)}}>
                CheckIn
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderLeftWidth: 1,
                borderLeftColor: GrayFade,
                alignItems: 'center',
              }}>
              <Text style={{color: GrayFade, fontSize: adjust(10)}}>
                CheckOut
              </Text>
              <Text style={{color: GrayFade, fontSize: adjust(10)}}>
                CheckOut
              </Text>
            </View>
          </View>
          <View style={{padding: 5}}>
            <Text>Tamu</Text>
            <Text>1 Orang</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TabelPesananRoomHotel;
