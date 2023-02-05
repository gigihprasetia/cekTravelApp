import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Button, Checkbox} from 'react-native-paper';
import MapView, {Marker} from 'react-native-maps';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import adjust, {GrayBold, GrayFade, Oranges, WidthScreen} from '../utils';

const Lokasi = ({latitude, longitude, shortDestination, address}) => {
  const lat = parseFloat(latitude);
  const long = parseFloat(longitude);

  return (
    <View>
      <Text
        style={{
          marginHorizontal: 10,
          fontSize: adjust(12),
          color: GrayBold,
          fontWeight: 'bold',
        }}>
        Destinasi Terdekat
      </Text>
      <Text
        style={{
          marginVertical: 10,
          fontSize: adjust(11),
          color: GrayBold,
        }}>
        {address}
      </Text>

      {shortDestination.map((val, index) => {
        return (
          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            {/* <Text style={{marginHorizontal: 5}}>{val.attr_type}</Text> */}
            {val.attr_type === 'SHOP' ? (
              <View
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: Oranges,
                }}>
                <Icon name="shopping-cart" color={'white'} size={adjust(9)} />
              </View>
            ) : val.attr_type === 'RESTAURANT' ? (
              <View
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: '#C084FC',
                }}>
                <Icon name="fastfood" color={'white'} size={adjust(9)} />
              </View>
            ) : val.attr_type === 'HOSPITAL' ? (
              <View
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: 'green',
                }}>
                <Icon name="local-hospital" color={'white'} size={adjust(9)} />
              </View>
            ) : null}

            <Text
              style={{
                marginHorizontal: 5,
                fontSize: adjust(10),
                color: GrayBold,
              }}>
              {val.title}
            </Text>
            <Text
              style={{
                marginHorizontal: 5,
                fontSize: adjust(9),
                color: GrayBold,
              }}>
              {val.distance}
            </Text>
          </View>
        );
      })}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long,
          }}>
          <Image
            source={require('../Images/cektravel.png')}
            style={{width: 30, height: 35}}
          />
        </Marker>
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    // ...StyleSheet.absoluteFill,
    flex: 1,
    height: 300,
  },
});

export default React.memo(Lokasi);
