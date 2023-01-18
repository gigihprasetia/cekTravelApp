import {View, Text, Button, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './ScreenMain/Home';
import Pesanan from './ScreenMain/Pesanan';
import Account from './ScreenMain/Account';
import adjust, {
  Greens,
  HeightScreen,
  Oranges,
  White,
  WidthScreen,
} from '../../assets/utils';
import HeaderTab from '../../assets/Component/HeaderTab';
// import DatePicker from 'react-native-date-ranges';
// <DatePicker
//         style={{
//           height: 36,
//           borderRadius: 8,
//           borderColor: '#cccccc',
//           borderWidth: 1,
//         }}
//         customStyles={{
//           placeholderText: {fontSize: 14}, // placeHolder style
//           headerStyle: {backgroundColor: 'green'}, // title container style
//           headerMarkTitle: {color: 'white'}, // title mark style
//           headerDateTitle: {fontSize: 15}, // title Date style
//           contentInput: {fontSize: 14}, //content text container style
//           contentText: {fontSize: 14}, //after selected text Style
//         }} // optional
//         centerAlign // optional text will align center or not
//         allowFontScaling={true} // optional
//         ButtonStyle={{
//           backgroundColor: 'green',
//           borderWidth: 1,
//           borderRadius: 10,
//           marginHorizontal: 20,
//           borderColor: '#fff',
//         }}
//         ButtonTextStyle={{
//           color: '#fff',
//           alignSelf: 'center',
//           padding: 10,
//           fontSize: 16,
//         }}
//         placeholder={'start Date → end Date'}
//         mode={'range'}
//         markText={'Pickup Your Date'}
//         ButtonText="Select"
//         onConfirm={text => console.log(text)}
//         outFormat={'DD-MM-YYYY'}
//       />

const Tab = createBottomTabNavigator();
export default function DashboardMain() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: props => {
          return <HeaderTab />;
        },
      }}
      tabBar={props => {
        const {routes} = props.state;
        const {navigation} = props;
        const active = props.state.index;
        return (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              backgroundColor: Oranges,
              height: HeightScreen * 0.07,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            {routes.map((val, indexPage) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(val.name)}
                  key={val.key}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    height: HeightScreen * 0.07,
                    justifyContent: 'center',
                  }}>
                  <View>
                    {val.name === 'Pesanan' ? (
                      <View
                        style={{
                          position: 'absolute',
                          top: -3,
                          left: 14,
                          paddingHorizontal: 4,
                          borderRadius: 10,
                          backgroundColor: White,
                          zIndex: 10,
                        }}>
                        <Text style={{fontSize: adjust(10), color: Greens}}>
                          5
                        </Text>
                      </View>
                    ) : null}
                    <Icon
                      name={
                        val.name === 'Home'
                          ? 'home'
                          : val.name === 'Pesanan'
                          ? 'clipboard-text'
                          : val.name === 'Account'
                          ? 'account'
                          : 'biohazard'
                      }
                      size={adjust(15)}
                      color={active === indexPage ? White : '#3d3d3d'}
                    />
                  </View>
                  <Text
                    style={{
                      color: active === indexPage ? White : '#3d3d3d',
                      fontSize: adjust(10),
                    }}>
                    {val.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Pesanan" component={Pesanan} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
