import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {HeightScreen, Oranges} from '../utils';

const LoadingPage = () => {
  return (
    <View
      style={{
        flex: 1,
        height: HeightScreen,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color={Oranges} />
    </View>
  );
};

export default LoadingPage;
