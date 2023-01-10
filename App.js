import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Routes from './src/Routes';
import {Provider} from 'react-redux';
import Store from './Redux/Store';
const App = () => {
  return (
    <Provider store={Store}>
      <Routes />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
