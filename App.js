import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Routes from './src/Routes';
import {Provider} from 'react-redux';
import Store from './Redux/Store';
import {Provider as PaperProvider} from 'react-native-paper';
const App = () => {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
