import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {HeightScreen, Oranges, WidthScreen} from '../../../assets/utils';
import CardPesanan from '../../../assets/Component/cardPesanan';

export default function Pesanan() {
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: WidthScreen * 0.025,
          paddingBottom: 200,
        }}
        showsVerticalScrollIndicator={false}>
        <CardPesanan />
      </ScrollView>
    </SafeAreaView>
  );
}
