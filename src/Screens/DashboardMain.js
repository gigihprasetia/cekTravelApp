import {View, Text, Button, Dimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {ValidateIslogin} from '../../assets/API/functionget';
import {useDispatch, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
export default function DashboardMain() {
  const {token} = useSelector(state => state.UserReducers.isAuthenticated);
  const states = useSelector(state => state.UserReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    ValidateIslogin(token, val => {
      dispatch({
        type: 'setUserData',
        data: val.data.data,
      });
    });
  }, [token]);

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
