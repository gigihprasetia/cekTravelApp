import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';
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
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Text>splashScreen</Text>
    </View>
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
