import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {HeightScreen, Oranges, WidthScreen} from '../../../assets/utils';

export default function Account() {
  return (
    <SafeAreaView>
      <View style={Style.view}>
        <Image
          style={{width: WidthScreen * 0.161, height: HeightScreen * 0.1}}
          source={require('../../../assets/Images/cektravel.png')}
        />
        <>
          <View style={Style.containInput}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
              <Text name={'email'} style={Style.label}>
                Email
              </Text>
            </View>
            <TextInput
              name={'password'}
              style={Style.input}
              placeholder="yourname@gmail.com"
            />
          </View>

          <View style={Style.containInput}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
              <Text style={Style.label}>Password</Text>
            </View>
            <TextInput
              name={'password'}
              style={Style.input}
              placeholder="*******"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={{marginTop: 15, width: '90%'}}>
            <View style={Style.btn}>
              <Text style={{color: 'white'}}>Login</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 25,
              width: '90%',
              display: 'flex',
              alignItems: 'center',
              borderWidth: 1,
              height: 40,
              justifyContent: 'center',
              borderRadius: 20,
              borderColor: Oranges,
            }}>
            <Text style={{color: Oranges}}>Login With Google</Text>
          </TouchableOpacity>
        </>
      </View>
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  view2: {
    width: 300,
    height: 400,
    backgroundColor: 'red',
  },
  input: {
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Oranges,
    color: 'black',
  },

  label: {
    paddingLeft: 3,
    marginBottom: 5,
    color: Oranges,
  },
  containInput: {
    width: '90%',
    marginTop: 20,
  },
  btn: {
    height: 40,
    borderRadius: 20,
    width: '100%',
    backgroundColor: Oranges,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
