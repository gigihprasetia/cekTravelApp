import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, SafeAreaView, Image} from 'react-native';
import {StackActions} from '@react-navigation/native';
import DashboardMain from './Screens/DashboardMain';
import StackHotel from './Screens/ScreenHotel/StackHotel';

const Stack = createNativeStackNavigator();

const SplashScreen = props => {
  const {navigation} = props;
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(StackActions.replace('DashboardMain'));
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        style={{width: 100, height: 100, resizeMode: 'contain'}}
        source={require('../assets/Images/cektravel.png')}
      />
    </SafeAreaView>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="DashboardMain" component={DashboardMain} />
        <Stack.Screen name="Hotel" component={StackHotel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
